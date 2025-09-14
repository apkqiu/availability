import json
from .. import CompilerBase
import jinja2
from .. import execlib
import os
import logging as log
import bs4

def make_context(path, **ex):
    ret = {}
    ret["path"] = path
    ret["filename"] = os.path.basename(path)
    ret["dirname"] = os.path.dirname(path)
    ret["relpath"] = os.path.relpath(path, "templates").replace("\\", "/")
    # calculate the relative path to the root of the docs directory
    ret["root"] = "../" * (ret["relpath"].count("/"))
    ret["root"] = ret["root"][:-1] if ret["root"] else "."
    node_modules = ret["node_modules"] = os.path.join(ret["root"], "..", "node_modules")

    ret["true_root"] = ret["root"]
    ret["breadcrumbs"] = ret["relpath"].split("/")
    ret["breadcrumbs"] = ret["breadcrumbs"]

    # add os to the context
    ret["os"] = os
    # add functions
    def listdir(dir):
        absdir = os.path.join("templates", dir)
        for i in os.listdir(absdir):
            yield [i[:i.rfind(".")], os.path.join(absdir, i)]
    ret["listdir"] = listdir
    def list_newspaper():
        ret = []
        for i in os.listdir("templates/res/pdf"):
            if i.endswith(".pdf"):
                # extract the id (zhoubao1.pdf)
                ret.append(i[7:-4])
        # sort them (1,2,3,...,5,5.5,...,10)
        ret.sort(key=lambda x: float(x) if "." in x else int(x))
        return ret

    ret["list_newspaper"] = list_newspaper

    def get_title(path):
        if not os.path.isfile(path):
            return ""
        soup = bs4.BeautifulSoup(open(path, "r", encoding="utf-8"), "html.parser")
        # first match title
        for i in soup.find_all("title"):
            return i.text
        # then match h
        for i in range(1,7):
            for j in soup.find_all("h"+str(i)):
                return j.text
        return "无标题"
    ret["get_title"] = get_title
    def load_node_module(module, file=None, type_module=True):
        # make a script tag with src="node_modules/"+module+"/"+[main file that defined in package.json]
        # and append it to the head
        node_module = os.path.join("node_modules", module, "package.json")
        if not os.path.isfile(node_module):
            return ""
        if file:
            main = file
        else:
            with open(node_module, "r", encoding="utf-8") as f:
                package = json.load(f)
            main = package.get("main", "index.js")
        if type_module:
            return f'<script type="module" src="{node_modules}/{module}/{main}"></script>'
        
        return f'<script src="{node_modules}/{module}/{main}"></script>'
    ret["load_node_module"] = load_node_module
    def get_node_module_file(module, file=None):
        node_module = os.path.join("node_modules", module, "package.json")
        if not os.path.isfile(node_module):
            return ""
        if file:
            main = file
        else:
            with open(node_module, "r", encoding="utf-8") as f:
                package = json.load(f)
            main = package.get("main", "index.js")
        return f"{node_modules}/{module}/{main}"
    ret["get_node_module_file"] = get_node_module_file
    ret.update(ex)
    return ret
env = jinja2.Environment(
    loader=jinja2.loaders.FileSystemLoader("templates", encoding="utf-8", followlinks=False),
)


class HtmlCompiler(CompilerBase.CompilerBase):
    name = "HTML渲染"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        template = env.get_template(
            os.path.relpath(self.in_path, "templates").replace("\\", "/"), 1
        )
        block_names = list(env.get_template("parts/main.html").blocks.keys())
        data = template.render(**make_context(self.in_path))
        soup = bs4.BeautifulSoup(data, "html.parser")
        # 处理所有内联script
        for i in soup.find_all("script"):
            if i.get("src"):
                continue

            if i.get("when") and i.get("target"): # 处理事件绑定
                if i.get("global"):
                    raise Exception("global属性不能用于事件绑定")
                i.string = f"""
                    {i.get("target")}.addEventListener("{i.get("when")}", function() {{
                        {i.string}
                    }});
                """
                del i.attrs["when"]
                del i.attrs["target"]
            elif i.get("when") or i.get("target"):
                raise Exception("script标签的when和target属性必须同时存在")
            
            if "global" in i.attrs: # 处理非全局script
                del i.attrs["global"]
            else:
                i.string = f"""
                    (function() {{
                        {i.string}
                    }})();
                """

        data = soup.prettify()
        with open(self.copy_path, "w", encoding="utf-8") as f:
            f.write(data)
        data = execlib.exec_node("compress_html.js", self.copy_path)
        with open(self.copy_path, "wb") as f:
            f.write(data)
        data = data.decode()
        jsondata = {}
        # 将所有处理过的块全部整理到Json里面去
        for name in block_names:
            start = data.find(f"<!-- block {name} -->") + len(f"<!-- block {name} -->")
            end = data.find(f"<!-- endblock -->", start)
            jsondata[name] = data[start:end].strip()

        json.dump(jsondata, open(self.copy_path + ".json", "w", encoding="utf-8"), ensure_ascii=True, indent=4)
        

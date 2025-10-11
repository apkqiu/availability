import json
from .. import CompilerBase
import jinja2
from .. import execlib
import os
import bs4
from .. import templib
from bs4 import BeautifulSoup
from . import JsCompiler
env = jinja2.Environment(
    loader=jinja2.loaders.FileSystemLoader(
        "templates", encoding="utf-8", followlinks=False
    ),
)


class HtmlCompiler(CompilerBase.CompilerBase):
    name = "HTML渲染"

    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def make_context(self, path, **ex):
        ret = {}
        ret["path"] = path
        ret["filename"] = os.path.basename(path)
        ret["dirname"] = os.path.dirname(path)
        ret["relpath"] = os.path.relpath(path, "templates").replace("\\", "/")
        # calculate the relative path to the root of the docs directory
        ret["root"] = "../" * (ret["relpath"].count("/"))
        ret["root"] = ret["root"][:-1] if ret["root"] else "."
        ret["true_root"] = ret["root"]
        if not self.is_spa(path):
            ret["root"] = "../" * (ret["relpath"].count("/") - 1)
        node_modules = ret["node_modules"] = os.path.join(
            ret["root"], "..", "node_modules"
        )

        # add os to the context
        ret["os"] = os

        # add functions
        def listdir(dir):
            absdir = os.path.join("templates", dir)
            for i in os.listdir(absdir):
                yield [i[: i.rfind(".")], os.path.join(absdir, i)]

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

        def get_title(path, default="无标题"):
            if not os.path.isfile(path):
                return ""
            soup = bs4.BeautifulSoup(open(path, "r", encoding="utf-8"), "html.parser")
            # first match title
            for i in soup.find_all("title"):
                return i.text
            # then match h
            for i in range(1, 7):
                for j in soup.find_all("h" + str(i)):
                    return j.text
            return default

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

    def post_render(self, data, compress=True):
        soup = bs4.BeautifulSoup(data, "html.parser")
        # 自定义的语法糖

        # 处理所有内联script
        for i in soup.find_all("script"):
            # 外部script：跳过
            if i.get("src"):
                continue
            # 事件绑定
            if i.get("when") and i.get("target"):
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
            # 全局script
            if "global" in i.attrs:
                del i.attrs["global"]
            else:
                i.string = f"""
                    !(function() {{
                        {i.string}
                    }})();
                """
            # 然后然后解决所有CJS的问题
            #i.string = JsCompiler.compile_js(i.string)
        data = soup.prettify()
        if compress:
            temp = templib.TemproaryFile()
            temp.write(data)
            temp.close()
            #data = execlib.exec_node("compress_html.js", temp.name)
        return data

    def is_spa(self, file):
        SPA = False
        with open(file, "r", encoding="utf-8") as f:
            if (
                f.readline()
                .replace(" ", "")
                .replace("'", '"')
                .startswith('{%extends"parts/main.html"%}')
            ):
                SPA = True
        return SPA

    def load_basic(self):
        return env.get_template("parts/main.html").render(
            **self.make_context(self.in_path)
        )

    def compile(self):
        template_path = self.in_path
        try:
            template_data = open(template_path, "r", encoding="utf-8").read()
        except:
            template_data = open(template_path, "r", encoding="gb18030").read()
        template = env.from_string(template_data)
        ctx = self.make_context(self.in_path)
        # 检查是否包含SPA标记
        self.jsondata = {}
        if self.is_spa(self.in_path):
            for name, data in template.blocks.items():
                context = template.new_context(ctx)
                blockdata = "".join(data(context))
                blockdata = self.post_render(blockdata)
                self.jsondata[name] = str(
                    blockdata
                )  # 不知道为什么，如果直接用blockdata，会报错
            self.jsondata["rootdef"] = ctx["root"]

            temp = templib.TemproaryFile()
            temp.write(self.load_basic())
            temp.close()
            minified_html = execlib.exec_node("compress_html.js", temp.name)
            with open(self.copy_path, "w", encoding="utf-8") as f:
                f.write(minified_html)
            json.dump(
                self.jsondata,
                open(self.copy_path + ".json", "w", encoding="utf-8"),
                ensure_ascii=True,
            )
        else:
            main_content = self.post_render(template.render(ctx))
            with open(self.copy_path, "w", encoding="utf-8") as f:
                f.write(main_content)

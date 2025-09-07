from . import CompilerBase
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
        print(path)
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
        data = template.render(**make_context(self.in_path))
        with open(self.copy_path, "w", encoding="utf-8") as f:
            f.write(data)
        cont = execlib.exec_node("compress_html.js", self.copy_path)
        with open(self.copy_path, "wb") as f:
            f.write(cont)

from . import CompilerBase
import jinja2
from .. import execlib
import os
import logging as log

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
    ret.update(ex)
    return ret

class HtmlCompiler(CompilerBase.CompilerBase):
    name = "HTML渲染"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        env = jinja2.Environment(
            loader=jinja2.loaders.FileSystemLoader("templates", encoding="utf-8")
        )
        template = env.get_template(
            os.path.relpath(self.in_path, "templates").replace("\\", "/"), 1
        )
        data = template.render(**make_context(self.in_path))
        with open(self.copy_path, "w", encoding="utf-8") as f:
            f.write(data)
        cont = execlib.exec_node("compress_html.js", self.copy_path)
        with open(self.copy_path, "wb") as f:
            f.write(cont)

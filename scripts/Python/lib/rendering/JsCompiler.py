from .. import CompilerBase
from .. import execlib
from .. import templib
import os


def compile_js(code):
    temp = templib.TemproaryFile()
    temp.write(code)
    temp.close()
    code = execlib.exec_node("esbuild", temp.name, "--minify")
    temp.reopen()
    temp.clear()
    temp.write(code)
    temp.close()
    # 为了兼容性，将代码转换为CommonJS格式
    # code = execlib.exec_node(
    # "babel", temp.name, "--config-file", os.path.abspath("babel.config.json")
    # )
    # temp.reopen()
    # temp.clear()
    # temp.write(code)
    # temp.close()
    # code = execlib.exec_node("uglifyjs", temp.name, "--compress")
    return code


class JsCompiler(CompilerBase.CompilerBase):
    name = "JS压缩"

    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "src"))

    def run(self):
        open(self.copy_path, "w", encoding="utf-8").write(
            compile_js(open(self.in_path, "r", encoding="utf-8").read())
        )

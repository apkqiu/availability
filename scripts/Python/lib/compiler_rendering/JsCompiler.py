from .. import CompilerBase
from .. import execlib
from .. import templib
import os

class JsCompiler(CompilerBase.CompilerBase):
    name = "JS压缩"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        code = execlib.exec_node("esbuild", self.in_path, "--minify").decode()


        with open(self.copy_path, "w") as f:
            f.write(code)
        
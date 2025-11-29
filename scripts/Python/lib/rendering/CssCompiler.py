from .. import CompilerBase
from .. import execlib
import os

class CssCompiler(CompilerBase.CompilerBase):
    name = "CSS压缩"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def run(self):
        code = execlib.exec_node("esbuild", self.in_path, "--minify")

        with open(self.copy_path, "w") as f:
            f.write(code)

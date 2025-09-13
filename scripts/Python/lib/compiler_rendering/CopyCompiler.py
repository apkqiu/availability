from .. import CompilerBase
from .. import execlib
import os

class CopyCompiler(CompilerBase.CompilerBase):
    name = "复制"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        with open(self.in_path, "rb") as f:
            code = f.read()
        with open(self.copy_path, "wb") as f:
            f.write(code)

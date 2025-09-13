from .. import CompilerBase
from .. import execlib
import os

class SvgCompiler(CompilerBase.CompilerBase):
    name = "SVG优化"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        with open(self.in_path, "rb") as f:
            data = f.read()
        with open(self.copy_path, "wb") as f:
            f.write(data)
        if execlib.exec_node('svgo', "-i", self.copy_path):
            data = execlib.exec_node("compress_html.js", self.copy_path)
            with open(self.copy_path, "w", encoding="utf-8") as f:
                f.write(data)
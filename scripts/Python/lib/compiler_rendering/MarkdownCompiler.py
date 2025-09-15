from .. import CompilerBase
import os
from .. import execlib
class MarkdownCompiler(CompilerBase.CompilerBase):
    name = "Markdown渲染"
    def __init__(self, in_path:str):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path.removesuffix(".md")+".html", "templates"))
    def compile(self):
        execlib.exec_node("markdown-it", self.in_path, "-o", self.copy_path)
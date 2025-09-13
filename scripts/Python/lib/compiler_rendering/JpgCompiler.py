from .. import CompilerBase
import PIL.Image
import os

class JpgCompiler(CompilerBase.CompilerBase):
    name = "JPG压缩"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        img = PIL.Image.open(self.in_path)
        img.save(self.copy_path, quality=100, optimize=True, progressive=True)

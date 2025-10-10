from .. import CompilerBase
import PIL.Image
import os

class PngCompiler(CompilerBase.CompilerBase):
    name = "PNG压缩"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        img = PIL.Image.open(self.in_path)
        # 简略化调色盘
        img = img.convert("P", palette=PIL.Image.ADAPTIVE)
        # 交错式png，最大化压缩率
        img.save(self.copy_path, optimize=True, interlace=True)

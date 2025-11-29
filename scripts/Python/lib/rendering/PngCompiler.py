from .. import CompilerBase
import PIL.Image
import os

class PngCompiler(CompilerBase.CompilerBase):
    name = "PNG压缩"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def run(self):
        img = PIL.Image.open(self.in_path)
        # 简略化调色盘
        img = img.convert("P", palette=PIL.Image.ADAPTIVE)
        # 从EXIF中获取旋转角度并旋转
        exif = img.getexif()
        if exif is not None:
            orientation = exif.get(274)
            if orientation == 3:
                img = img.rotate(180, expand=True)
            elif orientation == 6:
                img = img.rotate(270, expand=True)
            elif orientation == 8:
                img = img.rotate(90, expand=True)
        # 交错式png，最大化压缩率
        img.save(self.copy_path, optimize=True, interlace=True)

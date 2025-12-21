from .. import CompilerBase
import PIL.Image
import os

class JpgCompiler(CompilerBase.CompilerBase):
    name = "JPG压缩"
    header = b"\xFF\xD8\xFF\xDB"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "src"))
    def run(self):
        img = PIL.Image.open(self.in_path)
        # 获取EXIF朝向
        exif = img.getexif()
        if exif is not None:
            orientation = exif.get(274)
            if orientation == 3:
                img = img.rotate(180, expand=True)
            elif orientation == 6:
                img = img.rotate(270, expand=True)
            elif orientation == 8:
                img = img.rotate(90, expand=True)
        img.save(self.copy_path, quality=80, optimize=True, progressive=True)

import lzma
import os
from .. import CompilerBase

class LzmaZipper(CompilerBase.CompilerBase):
    name = "LZMA压缩"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("zipped", os.path.relpath(in_path+".7z", "docs"))

    def compile(self):
        with lzma.open(self.copy_path, "wb") as f:
            with open(self.in_path, "rb") as f2:
                f.write(f2.read())

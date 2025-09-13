from .. import CompilerBase

class EncodingFixer(CompilerBase.CompilerBase):
    name = "编码修复"
    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = in_path

    def compile(self):
        try:
            open(self.in_path, "r", encoding="utf-8").read()
            return
        except:
            pass # gb18030
        try:
            cont = open(self.in_path, "r", encoding="gb18030").read()
            open(self.copy_path, "w", encoding="utf-8").write(cont)
        except:
            pass # utf-8

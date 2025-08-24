from . import CompilerBase
from .. import execlib
import os


class PdfCompiler(CompilerBase.CompilerBase):
    name = "PDF压缩"

    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = os.path.join("docs", os.path.relpath(in_path, "templates"))

    def compile(self):
        execlib.exec_wsl(
            "gs",
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.4",
            "-dPDFSETTINGS=/ebook",
            "-dNOPAUSE",
            "-dQUIET",
            "-dBATCH",
            "-sOutputFile=" + self.copy_path.replace("\\", "/"),
            self.in_path.replace("\\", "/"),
        )


import tempfile
import os
tempfile.tempdir = "temp"
class TemproaryFile:
    def __init__(self):
        self.file = tempfile.NamedTemporaryFile(mode="w", delete=False, encoding="utf-8")
        # 至于为什么delete=False，是因为这个文件要被编译器、npm等程序读取

    def write(self, content:str):
        if self.file.closed:
            self.reopen()
        self.file.write(content)

    def close(self):
        self.file.close()

    def reopen(self):
        self.file = open(self.file.name, "a")

    @property
    def name(self):
        return self.file.name
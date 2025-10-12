import tempfile
import os
tempfile.tempdir = "temp"
class TemproaryFile:
    def __init__(self,encoding="utf-8"):
        self.encoding = encoding
        self.file = tempfile.NamedTemporaryFile(mode="w", delete=False, encoding=self.encoding)
        # 至于为什么delete=False，是因为这个文件要被编译器、npm等程序读取

    def __del__(self):
        try:
            self.close()
        except:
            pass
        try:
            os.remove(self.file.name)
        except:
            pass
        # 生命周期结束（现在没有任何Python对象能够访问），删除文件

    def clear(self):
        self.file.truncate(0)
        self.file.seek(0)

    def write(self, content:str):
        if self.file.closed:
            self.reopen()
        self.file.write(content)

    def close(self):
        self.file.close()

    def reopen(self):
        self.file = open(self.file.name, "a",encoding=self.encoding)

    def read(self):
        self.file.close()
        self.file = open(self.file.name, "r", encoding=self.encoding)
        content = self.file.read()
        self.file.close()
        self.file = open(self.file.name, "a", encoding=self.encoding)
        return content

    @property
    def name(self):
        return self.file.name
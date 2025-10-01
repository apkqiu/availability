from .. import execlib
from .. import templib
from . import HtmlCompiler

class MarkdownCompiler(HtmlCompiler.HtmlCompiler):
    name = "Markdown渲染"

    def __init__(self, in_path):
        super().__init__(in_path)
        self.copy_path = self.copy_path.replace(".md", ".html")

    def post_render(self, data):
        data = super().post_render(data, compress=False)
        temp = templib.TemproaryFile()
        temp.write(data)
        temp.close()
        data = execlib.exec_node("markdown-it", temp.name).decode()
        temp.reopen() # 重用（嘿嘿）
        temp.clear()
        temp.write(data)
        temp.close()
        data = execlib.exec_node("compress_html.js", temp.name).decode()
        return data

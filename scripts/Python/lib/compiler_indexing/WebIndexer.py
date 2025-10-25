from .. import CompilerBase
from .. import execlib
import os
import json
import bs4
class WebIndexer(CompilerBase.CompilerBase):
    name = "网页索引建立"
    def __init__(self):
        super().__init__("")

    def fetch_title(self, html):
        soup = bs4.BeautifulSoup(html, "html.parser")
        # find the first h1 tag, if not found then search h2, and so on
        for tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            title = soup.find(tag)
            if title is not None:
                return title.text
        return "无标题"

    def fetch_author(self, html):
        soup = bs4.BeautifulSoup(html, "html.parser")
        # find the first p tag, if not found then search div, and so on
        for tag in ["p", "div"]:
            author = soup.find(tag)
            if author is not None:
                return author.text
        return "无作者"

    def compile(self):
        obj_index = []
        for i in os.scandir("docs/news/content"):
            if i.is_file():
                with open(i.path, "r", encoding="utf-8") as f:
                    html = f.read()
                    title = self.fetch_title(html)
                    obj_index.append({"url": "embed.html?"+i.name, "title": title, "tag":"文章"})
        for i in os.scandir("docs/news/newspaper"):
            if i.is_file():
                with open(i.path, "r", encoding="utf-8") as f:
                    html = f.read()
                    num = i.name.lower().strip("abcdefghijklmnopqrstuvwxyz.")
                    title = f"周恩来周报 第{num}期"
                    obj_index.append({"url": "pdf_embed.html#p="+num, "title": title, "tag":"文章"})
        for i in os.scandir("docs/text/poems"):
            if i.is_file():
                with open(i.path, "r", encoding="utf-8") as f:
                    html = f.read()
                    title = self.fetch_title(html) + "\u3000" + self.fetch_author(html)
                    obj_index.append({"url": "embed.html?!p"+i.name.removesuffix(".html")+".md", "title": title, "tag":"学生创作 · 诗"})
        for i in os.scandir("docs/text/songs"):
            if i.is_file():
                with open(i.path, "r", encoding="utf-8") as f:
                    html = f.read()
                    title = self.fetch_title(html) + "\u3000" + self.fetch_author(html)
                    obj_index.append({"url": "embed.html?!s"+i.name.removesuffix(".html")+".md", "title": title, "tag":"学生创作 · 曲"})
        for i in os.scandir("docs/text/words"):
            if i.is_file():
                with open(i.path, "r", encoding="utf-8") as f:
                    html = f.read()
                    title = self.fetch_title(html) + "\u3000" + self.fetch_author(html)
                    obj_index.append({"url": "embed.html?!w"+i.name.removesuffix(".html")+".md", "title": title, "tag":"学生创作 · 词"})
        for i in os.scandir("docs/text/writings"):
            if i.is_file():
                with open(i.path, "r", encoding="utf-8") as f:
                    html = f.read()
                    title = self.fetch_title(html) + "\u3000" + self.fetch_author(html)
                    obj_index.append({"url": "embed.html?!c"+i.name.removesuffix(".html")+".md", "title": title, "tag":"学生创作 · 书法"})
        open("docs/res/js/obj_index.js", "a", encoding="utf-8").write(
            "var documents = " + json.dumps(obj_index) + ";"
        )

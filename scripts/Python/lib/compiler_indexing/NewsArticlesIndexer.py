from .. import CompilerBase
from .. import execlib
import os
import json
import bs4

def get_title(path, default="无标题"):
    if not os.path.isfile(path):
        return ""
    soup = bs4.BeautifulSoup(open(path, "r", encoding="utf-8"), "html.parser")
    # match h
    for i in range(1, 7):
        for j in soup.find_all("h" + str(i)):
            # 获取内部完整HTML
            return j.decode_contents()
    return default


class NewsArticlesIndexer(CompilerBase.CompilerBase):
    name = "新闻索引建立"
    def __init__(self):
        super().__init__("")
    def compile(self):
        resource_index = {}
        for file in os.listdir("docs/news/content"):
            resource_index[get_title("docs/news/content/" + file)] = file
        with open("docs/news/articles.json", "w") as f:
            json.dump(resource_index, f)
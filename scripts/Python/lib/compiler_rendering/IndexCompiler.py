from .. import CompilerBase
from .. import execlib
import os
import json
import bs4
class IndexCompiler(CompilerBase.CompilerBase):
    name = "网页索引建立"
    def __init__(self):
        super().__init__("")

    def compile(self):
        obj_index = [
        {
            "title": "藤崖伫月 · 草皮土壤",
            "tag": "网页",
            "url": "/soil_grass/index.html",
        },
        {"title": "石窦收云 · 文学创作", "tag": "网页", "url": "/text/index.html"},
        {"title": "棕亭霁雪 · 自制网页", "tag": "网页", "url": "/web_maker/index.html"},
        {"title": "柳荫眠琴 · 账号管理", "tag": "网页", "url": "/account/index.html"},
        {"title": "屏山听瀑 · 新闻", "tag": "网页", "url": "/news/index.html"},
        {"title": "柳荫系舫 · 一草种", "tag": "网页", "url": "/school/index.html"},
        {"title": "林屋探奇 · 资料整理", "tag": "网页", "url": "/resource/index.html"},
        {"title": "荷岸观鱼 · 小游戏", "tag": "网页", "url": "/game/index.html"},
        ]
        # 欠维护，现已废弃

        # # 使用爬虫方式建立索引 | 文学创作
        # bs = bs4.BeautifulSoup(
        #     open("docs/text/index.html", encoding="utf-8").read(), "html.parser"
        # )
        # # 诗
        # xpath = "#collapse1 > div > ul"
        # for j in bs.select(xpath):
        #     for k in j.select("a"):
        #         obj_index.append(
        #             {
        #                 "title": k.text,
        #                 "tag": "文学创作 · 诗",
        #                 "url": "/text/index.html" + k["href"],
        #             }
        #         )
        # # 词
        # xpath = "#collapse2 > div > ul"
        # for j in bs.select(xpath):
        #     for k in j.select("a"):
        #         obj_index.append(
        #             {
        #                 "title": k.text,
        #                 "tag": "文学创作 · 词",
        #                 "url": "/text/index.html" + k["href"],
        #             }
        #         )
        # # 曲
        # xpath = "#collapse3 > div > ul"
        # for j in bs.select(xpath):
        #     for k in j.select("a"):
        #         obj_index.append(
        #             {
        #                 "title": k.text,
        #                 "tag": "文学创作 · 曲",
        #                 "url": "/text/index.html" + k["href"],
        #             }
        #         )

        # # 使用爬虫方式建立索引 | 热点新闻
        # bs = bs4.BeautifulSoup(
        #     open("docs/news/index.html", encoding="utf-8").read(), "html.parser"
        # )
        # xpath = "#news-list"
        # for j in bs.select(xpath):
        #     for k in j.select("a"):
        #         obj_index.append(
        #             {
        #                 "title": k.text,
        #                 "tag": "新闻",
        #                 "url": "/news/index.html" + k["href"],
        #             }
        #         )
        # xpath = "#news-tab"
        # for j in bs.select(xpath):
        #     for k in j.select("a"):
        #         if k.get("href"):
        #             obj_index.append(
        #                 {
        #                     "title": "周报" + k.text,
        #                     "tag": "周报",
        #                     "url": "/news/index.html" + k["href"],
        #                 }
        #             )
        # # 写入索引
        open("docs/res/js/obj_index.js", "a", encoding="utf-8").write(
            "var documents = " + json.dumps(obj_index) + ";"
        )

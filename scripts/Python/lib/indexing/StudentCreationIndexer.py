from .. import CompilerBase
from .. import execlib
import os
import json
def drop_empty_item(list):
    return [item for item in list if item.strip()]
class StudentCreationIndexer(CompilerBase.CompilerBase):
    name = "创作索引建立"
    def __init__(self):
        super().__init__("")
    def run(self):
        index = {}
        for poem in os.listdir("src/text/poems"):
            lines = drop_empty_item(open("src/text/poems/"+poem, "r", encoding="utf-8").readlines())
            index["p"+poem] = f"<b>诗</b> {lines[0].replace("#","").strip()} <small>作者：{lines[1].strip()}</small>"
        for word in os.listdir("src/text/words"):
            lines = drop_empty_item(open("src/text/words/"+word, "r", encoding="utf-8").readlines())
            index["w"+word] = f"<b>词</b> {lines[0].replace("#","").strip()} <small>作者：{lines[1].strip()}</small>"
        for song in os.listdir("src/text/songs"):
            lines = drop_empty_item(open("src/text/songs/"+song, "r", encoding="utf-8").readlines())
            index["s"+song] = f"<b>曲</b> {lines[0].replace("#","").strip()} <small>作者：{lines[1].strip()}</small>"
        for writing in os.listdir("src/text/writings"):
            lines = drop_empty_item(open("src/text/writings/"+writing, "r", encoding="utf-8").readlines())
            index["c"+writing] = f"<b>书法</b> {lines[0].replace("#","").strip()} <small>作者：{lines[1].strip()}</small>"
        # reverse key-value
        index = {v: k for k, v in index.items()}
        json.dump(index, open("docs/text/index.json", "w", encoding="utf-8"), ensure_ascii=False, indent=4)
from .. import CompilerBase
from .. import execlib
import os
import json
import bs4

class ResourceIndexer(CompilerBase.CompilerBase):
    name = "资源索引建立"
    def __init__(self):
        super().__init__("")
    def run(self):
        resource_index = {}
        resource_index.update(self.make_resource("docs/resource/objects"))
        resource_index["网站资源"] = {
            "PDF": self.make_resource("docs/res/pdf"),
            "图片": self.make_resource("docs/res/img"),
            "视频": self.make_resource("docs/res/video", )
        }
        resource_index["wwwroot"] = self.make_resource("docs/")
        with open("docs/resource/index.json", "w", encoding="utf-8") as f:
            json.dump(resource_index, f, ensure_ascii=False, indent=4)

    def make_resource(self, path):
        current = {}
        for file in os.listdir(path):
            if os.path.isdir(path + "/" + file):
                current[file] = self.make_resource(path + "/" + file)
            else:
                current[file] = os.path.relpath(path, "docs/resource").replace("\\","/") + "/" + file
        return current
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
        resource_index = self.make_resource("docs/resource/objects")
        with open("docs/resource/index.json", "w", encoding="utf-8") as f:
            json.dump(resource_index, f, ensure_ascii=False, indent=4)

    def make_resource(self, path):
        current = {}
        for file in os.listdir(path):
            if os.path.isdir(path + "/" + file):
                current[file] = self.make_resource(path + "/" + file)
            else:
                current[file] = path + "/" + file
        return current
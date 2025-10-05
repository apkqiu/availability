from .. import CompilerBase
from .. import execlib
import os
import json
import bs4

class ResourceIndexer(CompilerBase.CompilerBase):
    name = "资源索引建立"
    def __init__(self):
        super().__init__("")
    def compile(self):
        resource_index = {}
        for type in os.listdir("docs/res"):
            resource_index[type] = []
            if not os.path.isdir("docs/res/" + type):
                continue
            for file in os.listdir("docs/res/" + type):
                resource_index[type].append(file)
        with open("docs/res/resources.json", "w") as f:
            json.dump(resource_index, f)
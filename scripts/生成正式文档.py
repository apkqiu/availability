import time
import jinja2
import os
import json
import concurrent.futures
import bs4
start = time.time()
pool = concurrent.futures.ThreadPoolExecutor(max_workers=1)
os.system("rd /s /q docs")
def make_context(path):
    ret = {}
    ret["path"] = path
    ret["filename"] = os.path.basename(path)
    ret["dirname"] = os.path.dirname(path)
    ret["relpath"] = os.path.relpath(path, "templates").replace("\\", "/")
    # calculate the relative path to the root of the docs directory
    ret["root"] = "../" * (ret["relpath"].count("/"))
    ret["root"] = ret["root"][:-1] if ret["root"] else "."
    ret["breadcrumbs"] = ret["relpath"].split("/")
    ret["breadcrumbs"] = ret["breadcrumbs"]

    return ret

def render(path, copy_path):
    print("[渲染]",path)
    if os.path.exists(copy_path):
        os.remove(copy_path)
    env = jinja2.Environment(loader=jinja2.loaders.FileSystemLoader("templates"))
    template = env.get_template(os.path.relpath(path, "templates").replace("\\","/"), 1)
    data = template.render(**make_context(path))
    with open(copy_path, 'w', encoding='utf-8') as f:
        f.write(data)

def copy(path, copy_path):
    print("[复制]",path)
    # copy as-is
    with open(path, 'rb') as f:
        data = f.read()
    with open(copy_path, 'wb') as f:
        f.write(data)

for dirpath, dirs, files in os.walk('templates'):
    for file in files:
        path = os.path.join(dirpath, file)
        copy_path = path.replace("templates\\", "docs\\", 1)
        # ensure the directory exists
        os.makedirs(os.path.dirname(copy_path), exist_ok=True)
        if file.endswith('.html'):
            render(path, copy_path)
        else:
            copy(path, copy_path)
pool.shutdown(True)
obj_index = {}
obj_index = json.load(open("scripts/base_index.json",encoding="utf-8"))
# 使用爬虫方式建立索引
bs = bs4.BeautifulSoup(open("docs/text/index.html",encoding="utf-8").read(), "html.parser")
# 诗
xpath = "#collapse1 > div > ul"
for j in bs.select(xpath):
    for k in j.select("a"):
        obj_index.append({
            "title": k.text,
            "tag": "文学创作 · 诗",
            "url": "/text/index.html"+k["href"]
        })
# 词
xpath = "#collapse2 > div > ul"
for j in bs.select(xpath):
    for k in j.select("a"):
        obj_index.append({
            "title": k.text,
            "tag": "文学创作 · 词",
            "url": "/text/index.html"+k["href"]
        })
# 曲
xpath = "#collapse3 > div > ul"
for j in bs.select(xpath):
    for k in j.select("a"):
        obj_index.append({
            "title": k.text,
            "tag": "文学创作 · 曲",
            "url": "/text/index.html"+k["href"]
        })

open("docs/res/js/obj_index.js","a",encoding="utf-8").write("var documents = " + json.dumps(obj_index) + ";")

end = time.time()
print("全部完成，耗时：", end - start,"s")
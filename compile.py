import time
import jinja2
import os
import json
import concurrent.futures
import bs4
import queue
import threading



outbuf = queue.Queue()
start = time.time()
pool = concurrent.futures.ThreadPoolExecutor(max_workers=128)
def output_daemon():
    while True:
        try:
            print(outbuf.get())
        except Exception as e:
            print(e)

if __name__ == "__main__":
    threading.Thread(target=output_daemon, daemon=True).start()


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
    start = time.time()
    
    env = jinja2.Environment(loader=jinja2.loaders.FileSystemLoader("templates"))
    template = env.get_template(
        os.path.relpath(path, "templates").replace("\\", "/"), 1
    )
    data = template.render(**make_context(path))
    if copy_path:
        if os.path.exists(copy_path):
            os.remove(copy_path)
        with open(copy_path, "w", encoding="utf-8") as f:
            f.write(data)
        end = time.time()
        outbuf.put(f"[渲染, {(end - start)*1000: 4.2f} ms] {path}")
    else:
        return data

def copy(path, copy_path):
    start = time.time()
    # copy as-is
    with open(path, "rb") as f:
        data = f.read()
    with open(copy_path, "wb") as f:
        f.write(data)
    end = time.time()
    outbuf.put(f"[复制, {(end - start)*1000: 4.2f} ms] {path}")


def make_index():
    start = time.time()

    obj_index = [
        {
            "title": "藤崖伫月 · 草皮土壤",
            "tag": "网页",
            "url": "/soil_grass/index.html",
        },
        {"title": "石窦收云 · 文学创作", "tag": "网页", "url": "/text/index.html"},
        {"title": "棕亭霁雪 · 自制网页", "tag": "网页", "url": "/web_maker/index.html"},
        {"title": "柳荫眠琴 · 账号管理", "tag": "网页", "url": "/account/index.html"},
        {"title": "屏山听瀑 · 周报", "tag": "网页", "url": "/news/index.html"},
        {"title": "柳荫系舫 · 一草种", "tag": "网页", "url": "/school/index.html"},
        {"title": "林屋探奇 · 资料整理", "tag": "网页", "url": "/resource/index.html"},
        {"title": "荷岸观鱼 · 小游戏", "tag": "网页", "url": "/game/index.html"},
    ]
    # 使用爬虫方式建立索引
    bs = bs4.BeautifulSoup(
        open("docs/text/index.html", encoding="utf-8").read(), "html.parser"
    )
    # 诗
    xpath = "#collapse1 > div > ul"
    for j in bs.select(xpath):
        for k in j.select("a"):
            obj_index.append(
                {
                    "title": k.text,
                    "tag": "文学创作 · 诗",
                    "url": "/text/index.html" + k["href"],
                }
            )
    # 词
    xpath = "#collapse2 > div > ul"
    for j in bs.select(xpath):
        for k in j.select("a"):
            obj_index.append(
                {
                    "title": k.text,
                    "tag": "文学创作 · 词",
                    "url": "/text/index.html" + k["href"],
                }
            )
    # 曲
    xpath = "#collapse3 > div > ul"
    for j in bs.select(xpath):
        for k in j.select("a"):
            obj_index.append(
                {
                    "title": k.text,
                    "tag": "文学创作 · 曲",
                    "url": "/text/index.html" + k["href"],
                }
            )

    open("docs/res/js/obj_index.js", "a", encoding="utf-8").write(
        "var documents = " + json.dumps(obj_index) + ";"
    )
    end = time.time()
    outbuf.put(f"[索引, {(end - start)*1000:4.2f} ms] 已索引{len(obj_index)}条数据")

if __name__ == "__main__":
    os.system("rd /s /q docs")
    for dirpath, dirs, files in os.walk("templates"):
        for file in files:
            path = os.path.join(dirpath, file)
            copy_path = path.replace("templates\\", "docs\\", 1)
            # ensure the directory exists
            os.makedirs(os.path.dirname(copy_path), exist_ok=True)
            if file.endswith(".html"):
                pool.submit(render, path, copy_path)
            else:
                pool.submit(copy, path, copy_path)
    pool.shutdown(True)
    make_index()
    end = time.time()
    outbuf.put(f"全部完成，耗时：{end - start}s")
    while not outbuf.empty():
        pass

import time
from flask import g
import jinja2
import os
import json
import concurrent.futures
import bs4
import queue
import threading
import subprocess
import sys
import argparse
import traceback

parser = argparse.ArgumentParser(description="Compile a website from a template")
parser.add_argument("--no-build", action="store_true", help="Do not build the website")
args = parser.parse_args()

outbuf = queue.Queue()
start = time.time()
pool = concurrent.futures.ThreadPoolExecutor(max_workers=512)


def output_daemon():
    while True:
        try:
            if count == 0:
                print(f"?/?, ??%\t", outbuf.get(), flush=True)
            else:
                print(f"{fin}/{count}, {fin*100//count}% | ETA:{(time.time()-start)/fin*(count-fin):.2f}s".ljust(30), outbuf.get(), flush=True)
        except Exception as e:
            print(e)


def make_context(path, **ex):
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
    ret.update(ex)
    return ret


def render(path, copy_path):
    global fin
    start = time.time()

    env = jinja2.Environment(
        loader=jinja2.loaders.FileSystemLoader("templates", encoding="utf-8")
    )
    template = env.get_template(
        os.path.relpath(path, "templates").replace("\\", "/"), 1
    )
    data = template.render(**make_context(path))
    if os.path.exists(copy_path):
        os.remove(copy_path)
    with open(copy_path, "w", encoding="utf-8") as f:
        f.write(data)
    if not args.no_build:
        cont = subprocess.getoutput(
            f'node scripts/Node/compress_html.js "{copy_path}"', encoding="utf-8"
        )
        with open(copy_path, "w", encoding="utf-8") as f:
            f.write(cont)
    end = time.time()
    outbuf.put(f"[渲染, {(end - start)*1000: 4.2f} ms] {path}")
    fin += 1


def svg_process(path, copy_path):
    global fin

    start = time.time()
    with open(path, "rb") as f:
        data = f.read()
    with open(copy_path, "wb") as f:
        f.write(data)
    if not args.no_build:
        if os.system(f'npm exec -- svgo -i "{copy_path}" > NUL'):
            outbuf.put("[错误] svgo 优化失败，回退到html压缩")
            data = subprocess.getoutput(
                f'node scripts/Node/compress_html.js "{copy_path}"', encoding="utf-8"
            )
            with open(copy_path, "w", encoding="utf-8") as f:
                f.write(data)
    end = time.time()
    outbuf.put(f"[优化, {(end - start)*1000: 4.2f} ms] {path}")
    fin += 1


def js_process(path, copy_path):
    global fin

    start = time.time()
    if args.no_build:
        code = open(path, "r", encoding="utf-8").read()
    else:
        code = subprocess.getoutput(
            f'npm exec -- esbuild "{path}" --minify', encoding="utf-8"
        )
    with open(copy_path, "w", encoding="utf-8") as f:
        f.write(code)
    end = time.time()
    outbuf.put(f"[编译, {(end - start)*1000: 4.2f} ms] {path}")
    fin += 1


def css_process(path, copy_path):
    global fin

    start = time.time()
    if args.no_build:
        code = open(path, "r", encoding="utf-8").read()
    else:
        code = subprocess.getoutput(
            f'npm exec -- esbuild "{path}" --minify', encoding="utf-8"
        )
    with open(copy_path, "w", encoding="utf-8") as f:
        f.write(code)
    end = time.time()
    outbuf.put(f"[编译, {(end - start)*1000: 4.2f} ms] {path}")
    fin += 1


def copy(path, copy_path):
    global fin
    start = time.time()
    # copy as-is
    with open(path, "rb") as f:
        data = f.read()
    with open(copy_path, "wb") as f:
        f.write(data)
    end = time.time()
    outbuf.put(f"[复制, {(end - start)*1000: 4.2f} ms] {path}")
    fin += 1


def make_index():
    global fin
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
    # 使用爬虫方式建立索引 | 文学创作
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

    # 使用爬虫方式建立索引 | 热点新闻
    bs = bs4.BeautifulSoup(
        open("docs/news/index.html", encoding="utf-8").read(), "html.parser"
    )
    xpath = "#news-list"
    for j in bs.select(xpath):
        for k in j.select("a"):
            obj_index.append(
                {
                    "title": k.text,
                    "tag": "新闻",
                    "url": "/news/index.html" + k["href"],
                }
            )
    xpath = "#news-tab"
    for j in bs.select(xpath):
        for k in j.select("a"):
            if k.get("href"):
                obj_index.append(
                    {
                        "title": "周报"+k.text,
                        "tag": "周报",
                        "url": "/news/index.html" + k["href"],
                    }
                )
    # 写入索引
    open("docs/res/js/obj_index.js", "a", encoding="utf-8").write(
        "var documents = " + json.dumps(obj_index) + ";"
    )
    end = time.time()
    outbuf.put(f"[索引, {(end - start)*1000: 4.2f} ms] 已为{len(obj_index)}条数据编制索引")
    fin += 1


count = 0
fin = 0
if __name__ == "__main__":
    threading.Thread(target=output_daemon, daemon=True).start()
    os.system("rd /s /q docs")
    futures: list[concurrent.futures.Future] = []
    for dirpath, dirs, files in os.walk("templates"):
        for file in files:
            path = os.path.join(dirpath, file)
            copy_path = path.replace("templates\\", "docs\\", 1)
            # ensure the directory exists
            os.makedirs(os.path.dirname(copy_path), exist_ok=True)
            count += 1
            if file.endswith(".html"):
                f = pool.submit(render, path, copy_path)
            elif file.endswith(".svg"):
                f = pool.submit(svg_process, path, copy_path)
            elif file.endswith(".js") or file.endswith(".mjs"):
                f = pool.submit(js_process, path, copy_path)
            elif file.endswith(".css"):
                f = pool.submit(css_process, path, copy_path)
            else:
                f = pool.submit(copy, path, copy_path)
            futures.append((f, path))
    count += 1
    wait = concurrent.futures.wait([f[0] for f in futures])
    for f in futures:
        if f[0].exception():
            print("at", f[1])
            traceback.print_exception(f[0].exception())
    make_index()
    end = time.time()
    outbuf.put(f"全部完成，耗时：{end - start}s，共处理{count}个文件")
    while not outbuf.empty():
        pass

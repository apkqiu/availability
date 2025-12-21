import os
import lib.rendering as rendering
import lib.indexing as indexing
from lib.CompilerBase import CompilerPool, Skip
import lib.stringlib as stringlib
import lib.execlib as execlib
import json
import hashlib
import argparse
import requests
parser = argparse.ArgumentParser(description='编译工具')
parser.add_argument('--recompile', help='完整重编译，包括资源索引建立和JS压缩', action='store_true')
parser.add_argument('--clean', help='清理编译结果', action='store_true')
parser.add_argument('--pre-configure', help='预配置', action='store_true')
parser.add_argument('--post-configure', help='后配置', action='store_true')
parser.add_argument('--configure', help='配置', action='store_true')
parser.add_argument('--compile', help='编译', action='store_true')
parser.add_argument('--run', help='运行', action='store_true')
args = parser.parse_args()
def show_error():
    if len(cpool.errors):
        os.chdir(old_dir)
        print(stringlib.special_text("编译失败", "31m"))
        cpool.print_errors()
        exit(1)

old_dir = os.getcwd()
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..",".."))
os.system("del /f /s /q ~$* > NUL 2>NUL")
calc_hash = hashlib.md5
if args.pre_configure:
    print("Not Implemented.")
if args.configure:
    print("Not Implemented.")
if args.post_configure:
    print("Not Implemented.")
if args.clean or args.recompile:
    execlib.remove_item("docs")
    execlib.remove_item("temp")
    execlib.remove_item("filehash.json")
if args.recompile or args.compile:
    recompile = args.recompile
    if os.path.exists("filehash.json"):
        filehash = json.loads(open("filehash.json").read())
    else:
        filehash = {}
    execlib.ensure_item("docs",is_dir=True)
    execlib.ensure_item("temp",is_dir=True)
    new_filehash = {}
    cpool = CompilerPool(rendering.factory)
    changed = False
    should_all_change = {}
    script_hash = {}
    # 检查编译脚本是否改变
    for dirpath, dirnames, filenames in os.walk("scripts"):
        for filename in filenames:
            path = os.path.join(dirpath, filename)
            old_hash = filehash.get(path)
            new_hash = calc_hash(open(path, "rb").read()).hexdigest()
            if old_hash != new_hash:
                filehash = {}
            script_hash[path] = new_hash
    new_filehash.update(script_hash)
    # 检查所有基础架构没有修改
    for file, hash in filehash.items():
        if file.startswith("src\\parts\\"):
            new_hash = calc_hash(open(file, "rb").read()).hexdigest()
            if hash != new_hash:
                should_all_change[".html"] = True
    for dirpath, dirs, files in os.walk("src"):
        for file in files:
            path = os.path.join(dirpath, file)
            relpath = os.path.relpath(path, "src")
            copy_path = os.path.join("docs", relpath)
            new_hash = calc_hash(open(path, "rb").read()).hexdigest()
            if filehash.get(path) == new_hash and not should_all_change.get("."+path.split(".")[-1]):
                new_filehash[path] = filehash[path]
                continue
            else:
                new_filehash[path] = new_hash
                changed = True
            # ensure the directory exists
            execlib.ensure_item(os.path.dirname(copy_path), is_dir=True)
            #open(path, "a").close()  # touch the file
            cpool.add(path)
    cpool.waitall()
    show_error()
    if changed:
        cpool = CompilerPool(indexing.factory)
        indexing.start(cpool)
        cpool.waitall()
        show_error()

    json.dump(new_filehash, open("filehash.json", "w"), indent=4)
    execlib.remove_item("temp")
    print(stringlib.special_text("编译完成", "32m"))
    
if args.run:
    try:
        requests.get("http://127.0.0.1:5000/")
        # call the server
        print("\033[31mE: \033[0m服务器已启动，请勿重复启动")
    except:
        os.system("start python scripts/python/basic_server.py 5000")
        # start the server
os.chdir(old_dir)
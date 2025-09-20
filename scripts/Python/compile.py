import os
import lib.compiler_inplace as compiler_inplace
import lib.compiler_rendering as compiler_rendering
import lib.compiler_docs_zipping as compiler_docs_zipping
import lib.compiler_indexing as compiler_indexing
from lib.CompilerBase import CompilerPool
import lib.stringlib as stringlib
import lib.execlib as execlib

def show_error():
    if len(cpool.errors):
        os.chdir(old_dir)
        print(stringlib.special_text("编译失败", "31m"))
        cpool.print_errors()
        exit(1)

print("进行开始前的准备工作")
old_dir = os.getcwd()
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..",".."))
os.system("del /f /s /q ~$*")
execlib.remove_item("docs")
execlib.remove_item("zipped")

cpool = CompilerPool(compiler_inplace.factory)
for dirpath, dirs, files in os.walk("templates"):
    for file in files:
        path = os.path.join(dirpath, file)
        cpool.add(path)
cpool.waitall()
show_error()

cpool = CompilerPool(compiler_rendering.factory)
for dirpath, dirs, files in os.walk("templates"):
    for file in files:
        path = os.path.join(dirpath, file)
        relpath = os.path.relpath(path, "templates")
        copy_path = os.path.join("docs", relpath)
        # ensure the directory exists
        execlib.ensure_item(os.path.dirname(copy_path), is_dir=True)
        #open(path, "a").close()  # touch the file
        cpool.add(path)
cpool.waitall()
show_error()

cpool = CompilerPool(compiler_indexing.factory)
compiler_indexing.start(cpool)
cpool.waitall()
show_error()

print(stringlib.special_text("编译完成", "32m"))
print("清理中...")
os.chdir(old_dir)
execlib.remove_item("temp")
execlib.ensure_item("temp", is_dir=True)
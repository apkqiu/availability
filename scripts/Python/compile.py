import os
import lib.compiler as compiler
import lib.compiler.IndexCompiler as IndexCompiler
import lib.stringlib as stringlib
import lib.execlib as execlib

old_dir = os.getcwd()
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..",".."))
execlib.remove_item("docs")
cpool = compiler.CompilerPool(compiler.factory, max_workers=512)
for dirpath, dirs, files in os.walk("templates"):
    for file in files:
        path = os.path.join(dirpath, file)
        relpath = os.path.relpath(path, "templates")
        copy_path = os.path.join("docs", relpath)
        # ensure the directory exists
        execlib.ensure_item(os.path.dirname(copy_path), is_dir=True)
        cpool.add(path)
cpool.waitall()

cpool.add(IndexCompiler.IndexCompiler())
cpool.waitall()

os.chdir(old_dir)
if len(cpool.errors):
    print(stringlib.special_text("编译失败", "31m"))
    cpool.print_errors()
    exit(1)
print(stringlib.special_text("编译完成", "32m"))

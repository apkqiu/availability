import time
import jinja2
import os
import concurrent.futures
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

end = time.time()
print("全部完成，耗时：", end - start,"s")
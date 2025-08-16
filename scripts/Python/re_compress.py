import time
class args:
    no_build = False
import subprocess
import queue
import sys
outbuf = queue.Queue()
def js_process(path, copy_path):
    start = time.time()
    if args.no_build:
        code = open(path, "r", encoding="utf-8").read()
    else:
        code = subprocess.getoutput(f'npm exec -- esbuild "{path}" --minify')
    with open(copy_path, "w") as f:
        f.write(code)
    end = time.time()
    outbuf.put(f"[编译, {(end - start)*1000: 4.2f} ms] {path}")

def css_process(path, copy_path):
    start = time.time()
    if args.no_build:
        code = open(path, "r", encoding="utf-8").read()
    else:
        code = subprocess.getoutput(f'npm exec -- esbuild "{path}" --minify')
    with open(copy_path, "w") as f:
        f.write(code)
    end = time.time()
    outbuf.put(f"[编译, {(end - start)*1000: 4.2f} ms] {path}")

for i in range(1, len(sys.argv)):
    if sys.argv[i].endswith(".js"):
        js_process(sys.argv[i], sys.argv[i])
    elif sys.argv[i].endswith(".css"):
        css_process(sys.argv[i], sys.argv[i])
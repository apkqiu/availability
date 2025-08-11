from encodings.cp437 import encoding_map
import os
import time
start = time.time()

def probe_encoding(file):
    encoding = ("utf-8", "utf-8-sig", "gb18030", "utf-16-be", "utf-16-le")
    for enc in encoding:
        try:
            with open(file, 'r', encoding=enc) as f:
                content = f.read()
                return enc
        except:
            pass
    return None

for dirpath, dirs, files in os.walk('.'):
    for file in files:
        if file.split('.')[-1] not in ("js","css","html","txt"): continue
        encoding = probe_encoding(os.path.join(dirpath, file))
        if encoding != "utf-8":
            with open(os.path.join(dirpath, file), 'r', encoding=encoding) as f:
                content = f.read()
            with open(os.path.join(dirpath, file), 'w', encoding="utf-8") as f:
                f.write(content)
            print("修复编码问题：", os.path.join(dirpath, file))
end = time.time()
print("转换完毕，耗时：", end - start,"s")
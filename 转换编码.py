import os
for dirpath, dirs, files in os.walk('.'):
    for file in files:
        if file.split('.')[-1] not in ("js","css","html"): continue
        try:
            with open(os.path.join(dirpath, file), 'r', encoding='gbk') as f:
                content = f.read()
        except:
            with open(os.path.join(dirpath, file), 'r', encoding='utf-8') as f:
                content = f.read()
        with open(os.path.join(dirpath, file), 'w', encoding='utf-8', newline="\r\n") as f: # CRLF
            f.write(content)
        print(f'{file} 转换成功')
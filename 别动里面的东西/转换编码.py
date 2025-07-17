import os

for dirpath, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            try:
                with open(os.path.join(dirpath, file), 'r', encoding='gbk') as f:
                    content = f.read()
                with open(os.path.join(dirpath, file), 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'{file} 转换成功')
            except:
                pass
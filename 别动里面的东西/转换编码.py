import os
import bs4
os.system("git pull")
for dirpath, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            try:
                with open(os.path.join(dirpath, file), 'r', encoding='gbk') as f:
                    content = f.read()
            except:
                with open(os.path.join(dirpath, file), 'r', encoding='utf-8') as f:
                    content = f.read()
            with open(os.path.join(dirpath, file), 'w', encoding='utf-8') as f:
                if not content.startswith("<!DOCTYPE html>"):
                    content = "<!DOCTYPE html>\n" + content
                f.write(content)
            print(f'{file} 转换成功')
if os.system("npx prettier -l . --color>NUL ") == 2:
    exit()
os.system("npx prettier --write . --color --tab-width 4")
print('转换完成')
os.system("git add .")
os.system(f"git commit -m '{input('请输入提交信息：')}'")
os.system("git push")
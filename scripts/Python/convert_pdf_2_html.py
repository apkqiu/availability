import win32com.client
import os
for i in os.listdir("templates/news"):
    if i.endswith(".files"):
        os.system(f"rmdir /s /q {os.path.join('templates\\news', i)}")
    elif i.startswith("zhoubao"):
        os.remove(os.path.join("templates\\news", i))
for i in os.listdir("templates/res/pdf"):
    if i.startswith("~$"):
        continue
    print(i)
    path = os.path.abspath(os.path.join("templates/res/pdf", i))
    out = os.path.abspath(os.path.join("templates/news/", i.replace(".pdf", ".html")))
    # 创建 Word 应用程序对象
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = 0 # 后台运行
    word.DisplayAlerts = 0 # 不显示警告

    # 打开已有的 Word 文档
    doc = word.Documents.Open(path)

    # 将文档另存为 HTML 格式
    doc.SaveAs(out, FileFormat=8,Encoding=65001)

    # 关闭文档和 Word 应用程序
    doc.Close()
    print("OK:",i)
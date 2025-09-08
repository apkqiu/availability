import win32com.client
import os
import concurrent.futures
for i in os.listdir("templates/news"):
    if i.endswith(".files"):
        os.system(f"rmdir /s /q {os.path.join('templates\\news', i)}")
    elif i.startswith("zhoubao"):
        os.remove(os.path.join("templates\\news", i))
def convert_pdf_2_html(path):
    print(i)
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    doc = word.Documents.Open(path)
    doc.SaveAs(os.path.join(os.path.dirname(path), os.path.basename(path).replace(".pdf", ".html")), FileFormat=8)
    doc.Close()
    word.Quit()
    print("OK:",i)
pool = concurrent.futures.ThreadPoolExecutor(max_workers=4) 
# set as 4 because each convert needs a new Word.exe instance
for i in os.listdir("templates/res/pdf"):
    if i.startswith("~$"):
        continue
    pool.submit(convert_pdf_2_html, os.path.join("templates/res/pdf", i))
pool.shutdown()
import concurrent
import concurrent.futures
import win32com.client
import os
for i in os.listdir("templates/news"):
    if i.endswith(".files"):
        os.system(f"rmdir /s /q {os.path.join('templates\\news', i)}")
    elif i.startswith("zhoubao"):
        os.remove(os.path.join("templates\\news", i))
word = win32com.client.Dispatch("Word.Application")
print("OPENING WORD")
word.Visible = False
for i in os.listdir("templates/res/pdf"):
    if i.startswith("~$"):
        continue
    fulpath = os.path.abspath(os.path.join("templates\\res\\pdf", i))
    print("OPEN\t",i)
    doc = word.Documents.Open(fulpath,ReadOnly=True)
    print("SAVE\t", i)
    doc.SaveAs(os.path.abspath(os.path.join("templates\\news", os.path.basename(fulpath).replace(".pdf", ".html"))), FileFormat=8)
    print("CLOSE\t", i)
    doc.Close()
    print("OK\t",i)
    #pool.submit(convert_pdf_2_html, os.path.abspath(os.path.join("templates\\res\\pdf", i)))
print("ALL DONE")
word.Quit()
print("EXITING")
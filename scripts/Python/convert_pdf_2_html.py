import concurrent
import concurrent.futures
import win32com.client
import os
word = win32com.client.Dispatch("Word.Application")
print("OPENING WORD")
word.Visible = False
for i in os.listdir("templates/res/pdf"):

    if i.startswith("~$"):
        continue
    fulpath = os.path.abspath(os.path.join("templates\\res\\pdf", i))
    if os.path.exists(os.path.join("templates\\news\\newspaper", os.path.basename(fulpath).replace(".pdf", ".html"))):
        continue
    print("OPEN\t",i)
    doc = word.Documents.Open(fulpath,ReadOnly=True)
    print("SAVE\t", i)
    doc.SaveAs(os.path.abspath(os.path.join("templates\\news\\newspaper", os.path.basename(fulpath).replace(".pdf", ".html"))), FileFormat=8)
    print("CLOSE\t", i)
    doc.Close()
    print("OK\t",i)
    #pool.submit(convert_pdf_2_html, os.path.abspath(os.path.join("templates\\res\\pdf", i)))
print("ALL DONE")
word.Quit()
print("EXITING")
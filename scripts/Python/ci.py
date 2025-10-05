import lib.execlib as execlib
import os
execlib.exec_cmd("python", os.path.join("scripts", "Python", "convert_pdf_2_html.py"))
execlib.exec_cmd("python", os.path.join("scripts", "Python", "compile.py"), "--recompile")
execlib.exec_cmd("git", "add", ".")
execlib.exec_cmd("git", "commit", "-m", "build")
while True:
    # with proxy
    execlib.exec_cmd("git", "config", "set","http.proxy", "127.0.0.1:10808")
    try:
        execlib.exec_cmd("git", "push")
        break
    except:
        pass
    # without proxy
    execlib.exec_cmd("git", "config", "unset","http.proxy")
    try:
        execlib.exec_cmd("git", "push")
        break
    except:
        pass
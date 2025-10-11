import lib.execlib as execlib
import os
# execlib.run("python", os.path.join("scripts", "Python", "convert_pdf_2_html.py"))
execlib.run("python", os.path.join("scripts", "Python", "compile.py"), "--recompile")
execlib.run("git", "add", ".")
execlib.run("git", "commit", "-m", "build")
while True:
    # with proxy
    execlib.run("git", "config", "set","http.proxy", "127.0.0.1:10808")
    try:
        execlib.run("git", "push")
        break
    except:
        pass
    # without proxy
    execlib.run("git", "config", "unset","http.proxy")
    try:
        execlib.run("git", "push")
        break
    except:
        pass
import lib.execlib as execlib
import os
import sys
local = "--local" in sys.argv
server = "--server" in sys.argv
if not local:
    # checkout and pull
    execlib.run("git", "pull")
    execlib.run("git", "checkout", "master")
    execlib.run("pip", "install", "-r", "requirements.txt")
    execlib.run("npm", "i", "--include=dev")
# execlib.run("python", os.path.join("scripts", "Python", "convert_pdf_2_html.py"))
execlib.run("python", os.path.join("scripts", "Python", "compile.py"), "--recompile")
if not server:
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
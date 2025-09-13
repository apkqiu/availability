import lib.execlib as execlib
import os
execlib.exec_cmd("python", "-u", os.path.join("scripts", "Python", "convert_pdf_2_html.py"),console=True)
execlib.exec_cmd("python", "-u", os.path.join("scripts", "Python", "fix_encoding.py"),console=True)
execlib.exec_cmd("python", "-u", os.path.join("scripts", "Python", "compile.py"),console=True)
execlib.exec_cmd("git", "add", ".",console=True)
execlib.exec_cmd("git", "commit", "-m", "CI build",console=True)
execlib.exec_cmd("git", "tag", input("Tag: "),console=True)
while True:
    # with proxy
    execlib.exec_cmd("git", "config", "set","http.proxy", "127.0.0.1:10808",console=True)
    ret = execlib.exec_cmd("git", "push",console=True)
    if ret == 0:
        break
    # without proxy
    execlib.exec_cmd("git", "config", "unset","http.proxy",console=True)
    ret = execlib.exec_cmd("git", "push",console=True)
    if ret == 0:
        break
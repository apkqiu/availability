import subprocess
import os
from tabnanny import check

def check_exit(process:subprocess.Popen):
    if process.poll() is not None:
        if process.poll() != 0:
            raise Exception(f"Process exited with code {process.poll()}", process.stderr.read())
        return 0
    return None


def exec_cmd(cmd, *args, wait=True):
    p = subprocess.check_output([cmd, *args], shell=True)
    return p

def exec_node(npm_tool:str, *args, wait=True):
    if npm_tool.endswith(".js"):
        npm_tool = os.path.abspath(".\\scripts\\node\\"+npm_tool)
        cmd = ["node", npm_tool, *args]
    else:
        npm_tool = os.path.abspath(".\\node_modules\\.bin\\"+npm_tool+".CMD")
        cmd = [npm_tool, *args]
    p = subprocess.check_output(cmd, shell=True)
    return p

def exec_wsl(cmd, *args, wait=True):
    p = subprocess.check_output(["wsl", cmd, *args], shell=True)
    return p

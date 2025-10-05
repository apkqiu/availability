import subprocess
import os
import sys

def check_exit(process:subprocess.Popen):
    if process.poll() is not None:
        if process.poll() != 0:
            raise Exception(f"Process exited with code {process.poll()}", process.stderr.read())
        return 0
    return None


def exec_cmd(cmd, *args):
    try:
        p = subprocess.check_output([cmd, *args], shell=True)
    except subprocess.CalledProcessError as e:
        raise Exception(f"Command \"{" ".join(e.cmd)}\" failed with code {e.returncode}", e.output,e.stderr.read() if e.stderr else None, e.stdout.read() if e.stdout else None)
    return p

def exec_node(npm_tool:str, *args):
    if npm_tool.endswith(".js"):
        npm_tool = os.path.abspath(os.path.join("scripts", "node", npm_tool))
        cmd = ["node", npm_tool, *args]
    else:
        if sys.platform == "win32":
            npm_tool = os.path.abspath(os.path.join("node_modules", ".bin", npm_tool+".cmd"))
        else:
            npm_tool = os.path.abspath(os.path.join("node_modules", ".bin", npm_tool))
        cmd = [npm_tool, *args]
    p = exec_cmd(*cmd)
    return p

def exec_wsl(cmd, *args):
    if sys.platform == "win32":
        p = exec_cmd("wsl", cmd, *args)
    else:
        p = exec_cmd(cmd, *args)
    return p

def remove_item(file_or_dir):
    if not os.path.exists(file_or_dir):
        return
    if os.path.isfile(file_or_dir):
        os.remove(file_or_dir)
    elif os.path.isdir(file_or_dir):
        for i in os.listdir(file_or_dir):
            remove_item(os.path.join(file_or_dir, i))
        os.rmdir(file_or_dir)

def ensure_item(file_or_dir, is_dir=False):
    if not os.path.exists(file_or_dir):
        if is_dir:
            os.makedirs(file_or_dir)
        else:
            os.makedirs(os.path.dirname(file_or_dir))
            open(file_or_dir, "w").close()

def copy_item(src, dst):
    if os.path.isfile(src):
        rfd = open(src, "rb")
        wfd = open(dst, "wb")
        while True:
            buf = rfd.read(1024)
            if len(buf) == 0:
                break
            wfd.write(buf)
        rfd.close()
        wfd.close()
    elif os.path.isdir(src):
        ensure_item(os.path.join(dst, os.path.basename(src)), True)
        for i in os.listdir(src):
            copy_item(os.path.join(src, i), os.path.join(dst, os.path.basename(src), i))
import os

def clean_cache(dir):
    for item in os.scandir(dir):
        if item.is_dir():
            if item.name == "__pycache__":
                os.system("rmdir /s /q \""+item.path+"\"")
            else:
                clean_cache(item.path)
        elif item.is_file():
            if item.name.endswith(".pyc"):
                os.remove(item.path)
            elif item.name.endswith(".log"):
                os.remove(item.path)

clean_cache(os.getcwd())
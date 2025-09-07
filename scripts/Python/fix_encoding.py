import os


def fix_encoding(path):
    with open(path, "rb") as f:
        content = f.read()
    for enc in ["utf-8", "gb18030", "utf16le", "utf16be"]:
        try:
            content = content.decode(enc).replace("\r\n", "\n").replace("\r", "\n")
            break
        except:
            pass
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


for dirpath, dirs, files in os.walk("templates"):
    for file in files:
        path = os.path.join(dirpath, file)
        if (file.endswith(".html") or 
            file.endswith(".htm") or
            file.endswith(".css") or 
            file.endswith(".js") or 
            file.endswith(".md") or 
            file.endswith(".txt") or 
            file.endswith(".json") or 
            file.endswith(".xml") or 
            file.endswith(".yml") or 
            file.endswith(".csv")):
                fix_encoding(path)
                print(f"Fixed encoding: {path}")


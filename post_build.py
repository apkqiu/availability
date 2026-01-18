import os

scripts = os.listdir("dist/assets")
scripts = [script for script in scripts if script.startswith("index")and script.endswith(".js")][0]

with open("dist/assets/"+scripts,"rb") as f:
    size = len(f.read())

with open("entry.html","r",encoding="utf-8") as f:
    code = f.read()
    code = code.replace("![[__ENTRY__]]", "assets/"+scripts)
    code = code.replace('"![[__SIZE__]]"', str(size))

with open("dist/index.html", "w",encoding="utf-8") as f:
    f.write(code)
    
with open("dist/404.html", "w",encoding="utf-8") as f:
    f.write(code)

with open("dist/.nojekyll", "w",encoding="utf-8") as f:
    pass
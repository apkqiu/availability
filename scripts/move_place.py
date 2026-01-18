import json
import os
package = json.load(open("package.json", "r", encoding="utf-8"))
deps:dict = package["dependencies"]
dev_deps:dict = package["devDependencies"]

all_deps = []
all_deps.extend(deps.keys())
all_deps.extend(dev_deps.keys())

def has_dep(dep, code):
    if f'"{dep}"' in code:
        return True
    if f"'{dep}'" in code:
        return True
    return False

wrong_deps = set()

# open source folder and check all imports
for dirpath, dirs, files in os.walk("src"):
    for file in files:
        if file.split('.')[-1] in "js ts jsx tsx vue".split():
            code = open(os.path.join(dirpath, file), "r", encoding="utf-8").read()
            for dep in all_deps:
                if has_dep(dep,code):
                    if dep not in deps.keys():
                        wrong_deps.add((dep, "dependencies"))

# open vite config
code = open("vite.config.js", "r", encoding="utf-8").read()
for dep in all_deps:
    if has_dep(dep,code):
        if dep not in dev_deps.keys():
            wrong_deps.add((dep, "devDependencies"))
# backup package.json
open("package.json.bak", "w", encoding="utf-8").write(open("package.json", "r", encoding="utf-8").read())

for i in wrong_deps:
    if i[1] == "dependencies":
        package["dependencies"][i[0]] = package["devDependencies"].pop(i[0])
    else:
        package["devDependencies"][i[0]] = package["dependencies"].pop(i[0])

open("package.json", "w", encoding="utf-8").write(json.dumps(package, indent=4, ensure_ascii=False))
print("Done")
import json
import os
package = json.load(open("package.json", "r", encoding="utf-8"))
deps:dict = package["dependencies"]
dev_deps:dict = package["devDependencies"]

all_deps = []
all_deps.extend(deps.keys())
all_deps.extend(dev_deps.keys())

used_deps = set()

# open source folder and check all imports
for dirpath, dirs, files in os.walk("."):
    for file in files:
        if file.split('.')[-1] in "js ts jsx tsx vue".split():
            code = open(os.path.join(dirpath, file), "r", encoding="utf-8").read()
            for dep in all_deps:
                if dep in code:
                    used_deps.add(dep)
unused_deps = set(all_deps) - used_deps
old_unused_dict = json.load(open("removed_items.json", "r", encoding="utf-8"))

unused_log = open("removed_items.json", "w", encoding="utf-8")
unused_dep_dict = {"dependencies":{}, "devDependencies":{}}
unused_dep_dict.update(old_unused_dict)
for dep in unused_deps:
    if dep in package["devDependencies"]:
        unused_dep_dict["devDependencies"][dep] = package["devDependencies"][dep]
        del package["devDependencies"][dep]
    else:
        unused_dep_dict["dependencies"][dep] = package["dependencies"][dep]
        del package["dependencies"][dep]

json.dump(unused_dep_dict, unused_log, indent=4, ensure_ascii=False)
json.dump(package, open("package.json", "w", encoding="utf-8"), indent=4, ensure_ascii=False)
print("Done")
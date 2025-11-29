# this file is a shortcut to python scripts
# and an IDE shortcut(because there is a build, clean, rebuild button in VSCode)
# it is not a part of the project

PYTHON = "D:/Program Files/Python313/python3.13t.exe"

# CMD: make
# ↑ This is the most convient way to compile the files
docs/* all: 
	$(PYTHON) scripts/Python/compile.py --compile

# CMD: make full_compile
recompile:
	$(PYTHON) scripts/Python/compile.py --recompile

# CMD: make clean
clean:
	$(PYTHON) scripts/Python/compile.py --clean
# CMD: make serve
serve run:
	$(PYTHON) scripts/Python/compile.py --run

# CMD: make push
# CI Build in this computer and push to github
push:
	$(PYTHON) scripts/Python/ci.py --local

pull:
	git pull
.PHONY: full_compile serve push all run pull

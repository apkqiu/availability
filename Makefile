# this file is a shortcut to python scripts
# and an IDE shortcut(because there is a build, clean, rebuild button in VSCode)
# it is not a part of the project

# CMD: make
# ↑ This is the most convient way to compile the files
docs\* all: 
	python scripts\Python\compile.py --compile

# CMD: make full_compile
recompile:
	python scripts\Python\compile.py --recompile

# CMD: make clean
clean:
	python scripts\Python\compile.py --clean
# CMD: make serve
serve run:
	python scripts\Python\compile.py --run

# CMD: make push
# CI Build in this computer and push to github
push:
	python scripts\Python\ci.py --local
.PHONY: full_compile serve push all run

import lib.execlib as execlib
import os
import sys
print("Getting ready for CI build...")
print("Initalizing Python and Node.js environment...")
print("Installing Python dependencies...")
execlib.exec_cmd("pip", "install", "-r", "requirements.txt",console=True)
print("Installing Node.js dependencies...")
execlib.exec_cmd("npm", "install",console=True)
print("CI build environment initialized.")
print("Starting CI build...")
execlib.exec_cmd("python", "-u", os.path.join("scripts", "Python", "compile.py"),console=True)
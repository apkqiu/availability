import argparse
import lib.execlib

args = argparse.ArgumentParser()
args.add_argument("--release", action="store_true")
args = args.parse_args()
if args.release:
    lib.execlib.exec_node("electron-builder", "--win")
else:
    lib.execlib.exec_node("electron", ".", "--trace-warnings")

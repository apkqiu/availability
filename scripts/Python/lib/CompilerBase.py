import os
import concurrent.futures
import collections.abc
import time
import threading
import traceback
from . import stringlib
class CompilerBase:
    name = "编译"

    def __init__(self, in_path):
        self.in_path: str = in_path

    def compile(self):
        raise NotImplementedError()


class CompilerFactory:
    def __init__(self):
        self.compilers: dict[str, type[CompilerBase]] = {}

    def register(self, ext, compiler):
        self.compilers[ext.lower()] = compiler

    def set_fallback(self, compiler):
        self.compilers[""] = compiler

    def get_compiler(self, path):
        ext = os.path.splitext(path)[1].lower()
        return self.compilers.get(ext, self.compilers.get(""))(path)

    def compile(self, in_path):
        compiler = self.get_compiler(in_path)
        if compiler:
            compiler.compile()


class CompilerPool:
    def __init__(self, factory: CompilerFactory, max_workers=1024):
        self.pool = concurrent.futures.ThreadPoolExecutor(max_workers=max_workers)
        self.max_workers = max_workers
        self.factory = factory
        self.finished = 0
        self.started = 0
        self.total = 0
        self.io_lock = threading.Lock()
        self.errors = {}
        self.futures = []
        self.require_log = True
    def print(self, *data, **kwargs):
        self.io_lock.acquire()
        print(*data, **kwargs)
        # To prevent the output from being mixed up
        self.io_lock.release()
    def warp_func(self, context, func, *args, **kwargs):
        self.started += 1
        start = time.time()
        error = None
        try:
            func(*args, **kwargs)
        except BaseException as e:
            error = e
            self.errors[context["path"]] = e
        end = time.time()
        self.finished += 1
        
        sname = stringlib.ljust(context["name"], 10)
        sname = stringlib.special_text(sname, "34m")
        stime = stringlib.ljust(f"{(end-start)*1000:.0f}ms", 7)
        stime = stringlib.special_text(stime, "32m")
        spath = context["path"]
        spath = stringlib.special_text(spath, "37m")
        if error is None:
            self.print(sname, stime, spath,sep="\t")
        else:
            self.print(sname, stringlib.special_text("ERROR", "31m"), spath, "\n", error, sep="\t")
            
    def skip(self, task):
        self.add(Skip(task))
    def add(self, task):
        self.total += 1
        if isinstance(task, str):  # Use default compiler
            compiler = self.factory.get_compiler(task)
            f = self.pool.submit(
                self.warp_func,
                {"name": compiler.name, "path": compiler.in_path},
                compiler.compile,
            )
            self.futures.append(f)
            return f
        elif isinstance(task, collections.abc.Iterable):
            ret = []
            for t in task:
                ret.append(self.add(t))  # Recursively add tasks
            return ret
        elif isinstance(task, CompilerBase):  # A configured compiler
            f = self.pool.submit(
                self.warp_func,
                {"name": task.name, "path": task.in_path},
                task.compile,
            )
            self.futures.append(f)
            return f
        else:
            self.total -= 1
            raise Exception("Invalid task type")
    def print_errors(self):
        for path, error in self.errors.items():
            print(f"Error in {path}: {error.__class__.__name__} -> {error}")
            traceback.print_exception(type(error), error, error.__traceback__)

    def waitfor(self, futures):
        if isinstance(futures, collections.abc.Iterable):
            futures = list(futures)
        else:
            futures = [futures]
        concurrent.futures.wait(futures)

    def waitall(self):
        self.pool.shutdown(wait=True)
        self.pool = concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers)
        self.futures = []

class Skip(CompilerBase):
    name="跳过"
    def compile(self):
        pass
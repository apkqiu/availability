import os
import concurrent.futures
import collections.abc
import string
import time
import threading
import traceback
from . import stringlib

class CompilerBase:
    name = "编译"

    def __init__(self, in_path):
        self.in_path: str = in_path

    def run(self):
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
            compiler.run()


class CompilerPool:
    def __init__(self, factory: CompilerFactory, max_workers=512):
        self.pool = concurrent.futures.ThreadPoolExecutor(max_workers=max_workers)
        self.max_workers = max_workers
        self.factory = factory
        self.finished = 0
        self.started = 0
        self.total = 0
        self.io_lock = threading.Lock()
        self.counter_lock = threading.Lock()
        self.errors = {}
        self.futures = []
        self.unstarted_futures = []
        self.require_log = True
    def print(self, *data, **kwargs):
        self.io_lock.acquire()
        kwargs.update({"flush": True})

        print(*data, **kwargs)
        # To prevent the output from being mixed up
        self.io_lock.release()
    def wrap_func2(self,context, func, *args, **kwargs):
        try:
            func(*args, **kwargs)
        except BaseException as e:
            self.errors[context["path"]] = e
    def warp_func(self, context, func, *args, **kwargs):
        with self.counter_lock:
            self.started += 1
        start = time.time()
        error = None
        try:
            func(*args, **kwargs)
        except BaseException as e:
            self.errors[context["path"]] = e
            error = e
        end = time.time()
        with self.counter_lock:
            self.finished += 1


        sprogress_start = stringlib.special_text("", "s")# save cursor
        sprogress_start += stringlib.special_text("", "40000B")
        sprogress_end = stringlib.special_text("", "u")# restore cursor
        sprogress = f"Waiting:{self.total-self.started}\tRunning:{self.started-self.finished}\tFinished:{self.finished}\tTotal:{self.total}\t{self.finished*100/self.total:.1f}%"
        sprogress = stringlib.special_text(sprogress, "32m")
        sprogress = sprogress_start + sprogress + sprogress_end

        sname = stringlib.ljust(context["name"], 15)
        clean = stringlib.special_text("", "K")
        sname = stringlib.special_text(sname, "34m")
        if end-start < 1:
            stime = stringlib.ljust(f"{(end-start)*1000:.0f}ms", 10)
        else:
            stime = stringlib.ljust(f"{(end-start):.2f}s", 10)
        stime = stringlib.special_text(stime, "32m")
        spath = context["path"]
        spath = stringlib.special_text(spath, "37m")
        if error is None:
            self.print(clean, sname, stime, spath,sep="")
        else:
            self.print(clean, sname, stringlib.ljust(stringlib.special_text("ERROR", "31m"),10), spath, sep="")
        self.print(sprogress,end="\r")
    def skip(self, task):
        self.add(Skip(task))
    def add(self, task):
        self.total += 1
        if isinstance(task, str):  # Use default compiler
            compiler = self.factory.get_compiler(task)
            f = (
                self.warp_func,
                {"name": compiler.name, "path": compiler.in_path},
                compiler.run,
            )
            self.unstarted_futures.append(f)
            return f
        elif isinstance(task, collections.abc.Iterable):
            ret = []
            for t in task:
                ret.append(self.add(t))  # Recursively add tasks
            return ret
        elif isinstance(task, CompilerBase):  # A configured compiler
            f = (
                self.warp_func,
                {"name": task.name, "path": task.in_path},
                task.run,
            )
            self.unstarted_futures.append(f)
            return f
        else:
            self.total -= 1
            raise Exception("Invalid task type")
    def start(self):
        for i in self.unstarted_futures:
            self.futures.append(self.pool.submit(*i))
        self.unstarted_futures.clear()
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
        start_time = time.time()
        self.start() # start all futures
        self.pool.shutdown(wait=True)
        end_time = time.time()
        print(stringlib.special_text("","K"))
        print(f"编译阶段结束，耗时 {end_time - start_time:.2f} 秒")
        self.pool = concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers)
        self.futures = []

class Skip(CompilerBase):
    name="跳过"
    def run(self):
        pass
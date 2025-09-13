from .. import CompilerBase
from . import LzmaZipper
factory = CompilerBase.CompilerFactory()
factory.set_fallback(LzmaZipper.LzmaZipper)
from .. import CompilerBase
from . import HtmlCompiler
from . import JsCompiler
from . import CssCompiler
from . import SvgCompiler
from . import CopyCompiler
from . import PngCompiler
from . import JpgCompiler
from . import MarkdownCompiler
from . import PdfCompiler
factory = CompilerBase.CompilerFactory()
factory.set_fallback(CopyCompiler.CopyCompiler)
factory.register(".html", HtmlCompiler.HtmlCompiler)

factory.register(".js", JsCompiler.JsCompiler)
factory.register(".mjs", JsCompiler.JsCompiler)
factory.register(".ts", JsCompiler.JsCompiler)
factory.register(".tsx", JsCompiler.JsCompiler)
factory.register(".jsx", JsCompiler.JsCompiler)
factory.register(".cjs", JsCompiler.JsCompiler)

factory.register(".css", CssCompiler.CssCompiler)

factory.register(".svg", SvgCompiler.SvgCompiler)

factory.register(".png", PngCompiler.PngCompiler)

factory.register(".jpg", JpgCompiler.JpgCompiler)

factory.register(".jpeg", JpgCompiler.JpgCompiler)

factory.register(".md", MarkdownCompiler.MarkdownCompiler)

# factory.register(".pdf", PdfCompiler.PdfCompiler) 
# PdfCompiler is disabled because it needs wsl, but github actions does not support wsl
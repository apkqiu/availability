from .. import CompilerBase
from . import EncodingFixer
factory = CompilerBase.CompilerFactory()
for ext in """
htm
html
js
mjs
css
json

""".strip().split():
    factory.register("."+ext, EncodingFixer.EncodingFixer)
factory.set_fallback(CompilerBase.Skip)
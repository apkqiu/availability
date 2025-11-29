from .. import CompilerBase
from . import ResourceIndexer
from . import WebIndexer
from . import NewsArticlesIndexer
from . import StudentCreationIndexer
factory = CompilerBase.CompilerFactory()
def start(pool):
    # 为什么要在这里创建start函数，而不是使用factory.register()函数？
    # 因为在factory.register()函数中，注册factory需要指定文件扩展名，但是索引器不需要指定文件扩展名，所以在这里创建start函数
    pool.add(ResourceIndexer.ResourceIndexer())
    pool.add(WebIndexer.WebIndexer())
    pool.add(NewsArticlesIndexer.NewsArticlesIndexer())
    pool.add(StudentCreationIndexer.StudentCreationIndexer())
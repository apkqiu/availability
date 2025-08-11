import os
import 服务器 as server
import waitress
import logging
logging.basicConfig(filename='app.log', encoding='utf-8', level=logging.DEBUG)
waitress.serve(server.app, host='::', port=1111)
# 替换成你的服务器地址和端口
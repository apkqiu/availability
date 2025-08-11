from flask import *
import os
import waitress
import logging
app = Flask(__name__)
logging.basicConfig(filename='server.log', encoding='utf-8', level=logging.DEBUG)

@app.before_request
def before_request():
    # Log
    # Sender -[method]-> Receiver
    logging.info(f"{request.remote_addr} --[{request.method.center(25)}]-> {request.url}")
@app.after_request
def after_request(response):
    # Log
    # Sender <-[Status]- Receiver
    logging.info(f"{request.remote_addr} <-[{str(response.status).center(25)}]-- {request.url}")
    return response
@app.route('/')
def index():
    return send_file('index.html')
def fix_encoding(filename):
    try: 
        cont = open(filename, 'r', encoding="gbk").read()
        open(filename, 'w', encoding="utf-8").write(cont)
    except:
        pass

def send_page(path):
    if os.path.isfile(path):
        fix_encoding(path)
        return send_file(path)
    elif os.path.isdir(path):
        fix_encoding(os.path.join(path, 'index.html'))
        return send_from_directory(path, 'index.html')
    else:
        return Response("File not found", status=404)
@app.route('/<path:path>')
def dir(path):
    return send_page(path)
@app.route('/availability/<path:path>')
def avalibility(path):
    return send_page(path)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

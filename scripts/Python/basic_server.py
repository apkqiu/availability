import flask
import os
app = flask.Flask(__name__)

@app.route("/<path:path>")
def hello(path):
    if os.path.isdir(path):
        path = os.path.join(path, "index.html")
    resp = flask.send_file("../../"+path)
    if path.endswith(".mjs"):
        resp.headers["Content-Type"] = "application/javascript"
    return resp

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
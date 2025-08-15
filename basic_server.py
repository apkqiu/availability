import flask
import compile
import os
app = flask.Flask(__name__)
@app.route("/")
def index():
    return flask.redirect("/home.html")
@app.route("/old/<path:path>")
def send_old_file(path):
    return flask.send_from_directory("old", path)
@app.route("/<path:path>")
def send_file(path, dir="templates"):
    # detect ext and send file with correct mime type
    if path.endswith(".html"):
        return compile.render(os.path.join(dir, path), None)
    elif path.endswith(".css"):
        return flask.send_from_directory(dir, path, mimetype="text/css")
    elif path.endswith(".js"):
        return flask.send_from_directory(dir, path, mimetype="text/javascript")
    elif path.endswith(".mjs"):
        return flask.send_from_directory(dir, path, mimetype="text/javascript")
    elif path.endswith(".png"):
        return flask.send_from_directory(dir, path, mimetype="image/png")
    elif path.endswith(".jpg"):
        return flask.send_from_directory(dir, path, mimetype="image/jpeg")
    elif path.endswith(".gif"):
        return flask.send_from_directory(dir, path, mimetype="image/gif")
    elif path.endswith(".svg"):
        return flask.send_from_directory(dir, path, mimetype="image/svg+xml")
    else:
        return flask.send_from_directory(dir, path)
app.run(debug=True, host="0.0.0.0")
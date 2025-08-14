import flask
app = flask.Flask(__name__)
@app.route("/<path:path>")
def send_file(path, dir="docs"):
    # detect ext and send file with correct mime type
    if path.endswith(".html"):
        return flask.send_from_directory(dir, path, mimetype="text/html")
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
@app.route("/old/<path:path>")
def send_old_file(path):
    return send_file(path, dir="old")
app.run(debug=True)
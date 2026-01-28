import os

assets = os.listdir("./dist/assets")
links_to_add = []
mapping = {
    "mp3": "audio",
    "png": "image",
    "jpg": "image",
    "jpeg": "image",
    "gif": "image",
    "svg": "image",
    "webp": "image",
    "ico": "image",
    "js": "script",
    "css": "style",
    "mjs": "script",
    "pdf": "fetch",
    "mp4": "video",
}
priority = ["script", "style", "image", "audio", "video", "fetch"]
assets.sort(key=lambda x: priority.index(mapping.get(x.split(".")[-1],'fetch')))
for asset in assets:
    type = mapping.get(asset.split(".")[-1],'fetch')
    links_to_add.append(f'<link rel="preload" href="/availability/assets/{asset}" as="{type}" {'crossorigin' if type in ("fetch", "font", "script", "style") else ''}>')
    print("Added preload for",asset,"as",mapping[asset.split(".")[-1]])
with open("./dist/index.html", "r") as f:
    html = f.read()
    html = html.replace("</head>", f"\n{''.join(links_to_add)}</head>")
    with open("./dist/index.html", "w") as f:
        f.write(html)
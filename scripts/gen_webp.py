import os
from PIL import Image
for folders in ["src", "public"]:
    for dirpath, dirs, files in os.walk("src"):
        for filename in files:
            if filename.split(".")[-1] in ["png", "jpg", "jpeg", "gif"]:
                print(filename)
                im = Image.open(os.path.join(dirpath, filename))
                im.save(os.path.join(dirpath, filename[:filename.rindex(".")] + ".webp"), "webp")
import os
import lib.execlib as execlib
# 合并docs和old目录到web_dist
execlib.remove_item("web_dist")
execlib.ensure_item("web_dist",True)
execlib.copy_item("docs", "web_dist")
execlib.copy_item("old", "web_dist")
execlib.copy_item("templates", "web_dist")

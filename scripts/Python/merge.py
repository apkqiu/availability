import os
# 合并docs和old目录到web_dist
os.system("rmdir /s /q web_dist")
os.makedirs("web_dist", exist_ok=True)
os.system("xcopy /i /e /y docs\\* web_dist\\docs")
os.system("xcopy /i /e /y old\\* web_dist\\old")
os.system("xcopy /i /e /y templates\\* web_dist\\templates")
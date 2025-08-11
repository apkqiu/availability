@echo off
pushd %~dp0
cd ..
rem 拆除venv
if exist .venv (
    rmdir /s /q ..\.venv
)
rem 修复pip
title 5%% 修复pip
Python\python.exe "环境修复\不要动\get-pip.py" -i https://pypi.tuna.tsinghua.edu.cn/simple --no-warn-script-location
rem 解决pth问题
title 30%% 解决pth问题
echo python38.zip> Python\python38._pth
echo .>> Python\python38._pth
echo.>> Python\python38._pth
echo import site>> Python\python38._pth
rem 安装必要的包
title 45%% 安装必要的包
Python\Scripts\pip.exe install virtualenv -i https://pypi.tuna.tsinghua.edu.cn/simple --no-warn-script-location
rem 生成虚拟环境
title 75%% 生成虚拟环境
Python\python.exe -m virtualenv ..\.venv
cd ..
rem 激活虚拟环境
title 80%% 激活虚拟环境
call .venv\Scripts\activate.bat
rem 安装必要的包
title 85%% 安装必要的包
pip install -r "requirements.txt" -i https://pypi.tuna.tsinghua.edu.cn/simple --no-warn-script-location
rem 退出虚拟环境
title 90%% 退出虚拟环境
call deactivate.bat
popd
cls
title 100%% 完成
echo 完成
echo.
echo 使用脚本目录下脚本运行程序
echo.
echo 现在可以关闭这个窗口了
:infloop
pause > nul
goto infloop
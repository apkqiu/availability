@echo off
title %1
set CMD=%1
if "%1" equ "" (
    rem 输入
    set /p CMD="将脚本拖动到此处，并按下回车键："
)
pushd %~dp0
cd ..
call .venv\Scripts\activate.ba
python %CMD% --is-console

:infloop
pause > nul
goto infloop

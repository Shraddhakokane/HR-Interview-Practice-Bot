@echo off
title HR Interview Practice Bot
cd /d "%~dp0"
echo ========================================================
echo        HR Interview Practice Bot
echo ========================================================
echo.
echo Starting local web server for voice recognition & microphone access...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
if %errorlevel% neq 0 (
    echo.
    echo Opening directly in default browser...
    start "" "%~dp0index.html"
)
pause

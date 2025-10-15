@echo off
title Stop Legacy Planner
color 0C

echo ========================================
echo    STOPPING LEGACY PLANNER
echo ========================================
echo.
echo Closing all Node.js processes...
echo.

taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo SUCCESS: All servers stopped!
) else (
    echo INFO: No running servers found.
)

echo.
echo ========================================
echo    LEGACY PLANNER STOPPED
echo ========================================
echo.
echo This window will close in 3 seconds...
timeout /t 3 /nobreak >nul
exit
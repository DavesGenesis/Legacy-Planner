@echo off
title Legacy Planner Control Panel
color 0B

:menu
cls
echo ========================================
echo    LEGACY PLANNER CONTROL PANEL
echo ========================================
echo.
echo    1. START Application (One-Click)
echo    2. STOP Application
echo    3. Open Backend Folder
echo    4. Open Frontend Folder
echo    5. Check if Running
echo    6. Exit
echo.
echo ========================================
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto backend
if "%choice%"=="4" goto frontend
if "%choice%"=="5" goto check
if "%choice%"=="6" goto exit
echo Invalid choice!
timeout /t 2 /nobreak >nul
goto menu

:start
cls
echo ========================================
echo    STARTING LEGACY PLANNER...
echo ========================================
echo.
cd /d C:\Simulator\legacy-planner
call START-LEGACY-PLANNER.bat
goto menu

:stop
cls
echo ========================================
echo    STOPPING LEGACY PLANNER...
echo ========================================
echo.
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo SUCCESS: All servers stopped!
) else (
    echo INFO: No running servers found.
)
echo.
pause
goto menu

:backend
cls
echo Opening Backend folder...
start explorer C:\Simulator\legacy-planner\backend
goto menu

:frontend
cls
echo Opening Frontend folder...
start explorer C:\Simulator\legacy-planner\frontend
goto menu

:check
cls
echo ========================================
echo    CHECKING SERVER STATUS...
echo ========================================
echo.
echo Checking for Node.js processes...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if %errorlevel% equ 0 (
    echo STATUS: Servers are RUNNING
    echo.
    echo Testing connections...
    curl -s http://localhost:3001/api/health >nul 2>&1
    if %errorlevel% equ 0 (
        echo - Backend API (3001): ONLINE
    ) else (
        echo - Backend API (3001): OFFLINE
    )
    echo - Frontend App (3000): Check browser
) else (
    echo STATUS: Servers are NOT running
)
echo.
pause
goto menu

:exit
cls
echo.
echo Thank you for using Legacy Planner!
echo.
timeout /t 2 /nobreak >nul
exit
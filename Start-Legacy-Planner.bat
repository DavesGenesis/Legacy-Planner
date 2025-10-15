@echo off
title Legacy Planner Launcher
color 0A

echo ========================================
echo    LEGACY PLANNER - ONE CLICK START
echo ========================================
echo.
echo Starting both Backend and Frontend...
echo.
echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo     Node.js: OK
echo.

echo [2/3] Starting Backend Server...
cd /d C:\Simulator\legacy-planner\backend
start "Legacy Planner - Backend API" cmd /k "color 0B && echo ========================================= && echo    BACKEND API SERVER (Port 3001) && echo ========================================= && echo. && npm run dev"

echo     Backend: Starting...
timeout /t 3 /nobreak >nul
echo.

echo [3/3] Starting Frontend Application...
cd /d C:\Simulator\legacy-planner\frontend
start "Legacy Planner - Frontend App" cmd /k "color 0E && echo ========================================= && echo    FRONTEND WEB APP (Port 3000) && echo ========================================= && echo. && npm run dev"

echo     Frontend: Starting...
timeout /t 5 /nobreak >nul
echo.

echo ========================================
echo    LAUNCHING IN BROWSER...
echo ========================================
echo.
echo Waiting for servers to start...
timeout /t 8 /nobreak >nul

echo Opening browser...
start http://localhost:3000

echo.
echo ========================================
echo    LEGACY PLANNER IS NOW RUNNING!
echo ========================================
echo.
echo Backend API:  http://localhost:3001/api
echo Frontend App: http://localhost:3000
echo.
echo Two command windows are now open:
echo   - Green window  = Backend Server
echo   - Yellow window = Frontend App
echo.
echo To STOP the application:
echo   Close both command windows (Green + Yellow)
echo.
echo ========================================
echo.
echo This window will close in 5 seconds...
timeout /t 5 /nobreak >nul
exit
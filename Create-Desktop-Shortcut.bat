@echo off
title Create Desktop Shortcuts
color 0B

echo ========================================
echo   CREATE DESKTOP SHORTCUTS
echo ========================================
echo.
echo Creating shortcuts on your desktop...
echo.

set SCRIPT_DIR=C:\Simulator\legacy-planner
set DESKTOP=%USERPROFILE%\Desktop

echo Creating "Start Legacy Planner" shortcut...
powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Start Legacy Planner.lnk'); $SC.TargetPath = '%SCRIPT_DIR%\START-LEGACY-PLANNER.bat'; $SC.WorkingDirectory = '%SCRIPT_DIR%'; $SC.IconLocation = 'shell32.dll,137'; $SC.Description = 'Start Legacy Planner Application'; $SC.Save()"

echo Creating "Stop Legacy Planner" shortcut...
powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Stop Legacy Planner.lnk'); $SC.TargetPath = '%SCRIPT_DIR%\STOP-LEGACY-PLANNER.bat'; $SC.WorkingDirectory = '%SCRIPT_DIR%'; $SC.IconLocation = 'shell32.dll,131'; $SC.Description = 'Stop Legacy Planner Application'; $SC.Save()"

echo Creating "Legacy Planner Menu" shortcut...
powershell -Command "$WS = New-Object -ComObject WScript.Shell; $SC = $WS.CreateShortcut('%DESKTOP%\Legacy Planner Menu.lnk'); $SC.TargetPath = '%SCRIPT_DIR%\LEGACY-PLANNER-MENU.bat'; $SC.WorkingDirectory = '%SCRIPT_DIR%'; $SC.IconLocation = 'shell32.dll,165'; $SC.Description = 'Legacy Planner Control Panel'; $SC.Save()"

echo.
echo ========================================
echo   SUCCESS!
echo ========================================
echo.
echo 3 shortcuts created on your desktop:
echo   1. Start Legacy Planner
echo   2. Stop Legacy Planner  
echo   3. Legacy Planner Menu
echo.
echo You can now start the app from your desktop!
echo.
pause
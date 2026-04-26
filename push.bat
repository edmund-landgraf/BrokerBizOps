@echo off
title Sams Valuations Git Sync
echo ========================================
echo   Sams Valuations - Git Sync Utility
echo ========================================
echo.

echo [1/3] Staging changes...
git add .

echo.
set /p msg="Enter commit message (Leave blank for 'Update platform'): "
if "%msg%"=="" set msg=Update platform

echo.
echo [2/3] Committing changes...
git commit -m "%msg%"

echo.
echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   Sync Complete! All changes are live.
echo ========================================
pause

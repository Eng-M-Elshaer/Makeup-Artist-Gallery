@echo off
setlocal
Title Prepare docs (convert to JPG + manifest)

REM Move to project root (script directory)
PUSHD "%~dp0"

REM Basic sanity check
if not exist "package.json" (
  echo [!] package.json not found. Please run from project root.
  pause
  exit /b 1
)

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 goto :error

echo [2/3] Converting gallery images to JPG...
call npm run convert:jpg
if errorlevel 1 goto :error

echo [3/3] Generating gallery manifest...
call npm run gen:manifest
if errorlevel 1 goto :error

echo.
echo [Done] Everything completed successfully.
echo.
echo Optional: start local preview server at http://localhost:5500
set /p startServer="Start server now? (y/N): "
if /I "%startServer%"=="Y" (
  npx --yes serve -s docs -l 5500
)

POPD
exit /b 0

:error
echo.
echo [Error] Something went wrong. Make sure Node.js and npm are installed.
POPD
pause
exit /b 1
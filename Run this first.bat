@echo off
setlocal
Title Prepare Gallery (Generate Manifest)

REM Move to project root (script directory)
PUSHD "%~dp0"

REM Basic sanity check
if not exist "package.json" (
  echo [!] package.json not found. Please run from project root.
  pause
  exit /b 1
)

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 goto :error

echo [2/3] Generating gallery manifest from docs/gallery...
call npm run gen:manifest
if errorlevel 1 goto :error

echo [3/3] Embedding manifest in index.html...
call npm run embed:manifest
if errorlevel 1 goto :error

echo.
echo [Optional] Cleaning up HEIC files (delete if JPG exists)...
call npm run cleanup:heic

echo.
echo [Done] Gallery ready!
echo.
echo You can now:
echo   - Open docs\index.html directly in your browser (no server needed!)
echo   - Or use: npx serve docs -l 3000
echo   - Add more images to docs\gallery\ and run this script again
echo.

POPD
exit /b 0

:error
echo.
echo [Error] Something went wrong. Make sure Node.js and npm are installed.
POPD
pause
exit /b 1
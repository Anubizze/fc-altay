@echo off
setlocal EnableExtensions
cd /d "%~dp0"

if not exist "frontend\package.json" (
  echo [flatten] Папки frontend нет — проект уже в корне или путь неверный.
  exit /b 1
)

echo [flatten] Копирование src...
robocopy "frontend\src" "src" /E /IS /IT /NFL /NDL /NJH /NJS /nc /ns /np
if errorlevel 8 exit /b 1

if exist "frontend\public" (
  echo [flatten] Копирование public...
  robocopy "frontend\public" "public" /E /IS /IT /NFL /NDL /NJH /NJS /nc /ns /np
  if errorlevel 8 exit /b 1
) else (
  if not exist "public" mkdir "public"
)

copy /Y "frontend\package.json" "package.json" >nul || exit /b 1
copy /Y "frontend\pnpm-lock.yaml" "pnpm-lock.yaml" >nul || exit /b 1
copy /Y "frontend\next.config.mjs" "next.config.mjs" >nul || exit /b 1
copy /Y "frontend\tsconfig.json" "tsconfig.json" >nul || exit /b 1
copy /Y "frontend\.eslintrc.json" ".eslintrc.json" >nul || exit /b 1
copy /Y "frontend\next-env.d.ts" "next-env.d.ts" >nul || exit /b 1
copy /Y "frontend\vercel.json" "vercel.json" >nul || exit /b 1
copy /Y "frontend\.nvmrc" ".nvmrc" >nul || exit /b 1
copy /Y "frontend\.npmrc" ".npmrc" >nul || exit /b 1
copy /Y "frontend\.gitignore" ".gitignore" >nul || exit /b 1

echo [flatten] Удаление папки frontend...
rd /s /q "frontend"

echo [flatten] Готово. Дальше: pnpm install
endlocal
exit /b 0

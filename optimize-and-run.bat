@echo off
echo 🚀 BSM Project System Optimization Starting...
echo.

REM Set Node.js memory optimization
set NODE_OPTIONS=--max-old-space-size=4096 --optimize-for-size
echo ✅ Node.js memory optimization set

REM Clean up hanging processes
taskkill /F /IM node.exe >nul 2>&1
echo ✅ Cleaned up hanging Node.js processes

REM Clear caches
npm cache clean --force >nul 2>&1
echo ✅ npm cache cleared

REM Clear Next.js build cache
if exist .next rmdir /s /q .next >nul 2>&1
echo ✅ Next.js build cache cleared

REM Clear Turbo cache
npx turbo daemon stop >nul 2>&1
echo ✅ Turbo cache cleared

echo.
echo 🎉 System optimization complete!
echo 📱 Customer Portal: http://localhost:3000
echo 👨‍💼 Admin Dashboard: http://localhost:3001
echo.
echo Starting development server...
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev

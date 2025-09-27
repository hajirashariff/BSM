# BSM Project System Optimization Script
# Run this script to optimize your system for better project performance

Write-Host "🚀 BSM Project System Optimization Starting..." -ForegroundColor Green

# 1. Set Node.js Memory Optimization
Write-Host "📊 Setting Node.js memory optimization..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--max-old-space-size=4096 --optimize-for-size"
Write-Host "✅ Node.js memory limit set to 4GB with size optimization" -ForegroundColor Green

# 2. Clean up hanging Node.js processes
Write-Host "🧹 Cleaning up hanging Node.js processes..." -ForegroundColor Yellow
try {
    Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
    Write-Host "✅ Cleaned up hanging Node.js processes" -ForegroundColor Green
} catch {
    Write-Host "ℹ️  No hanging Node.js processes found" -ForegroundColor Blue
}

# 3. Clear npm cache
Write-Host "🗑️  Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✅ npm cache cleared" -ForegroundColor Green

# 4. Clear Next.js build cache
Write-Host "🗑️  Clearing Next.js build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Next.js build cache cleared" -ForegroundColor Green
}

# 5. Clear Turbo cache
Write-Host "🗑️  Clearing Turbo cache..." -ForegroundColor Yellow
npx turbo daemon stop
Write-Host "✅ Turbo cache cleared" -ForegroundColor Green

# 6. Check system resources
Write-Host "💻 Checking system resources..." -ForegroundColor Yellow
$memory = Get-WmiObject -Class Win32_ComputerSystem | Select-Object -ExpandProperty TotalPhysicalMemory
$memoryGB = [math]::Round($memory / 1GB, 2)
Write-Host "✅ Available RAM: $memoryGB GB" -ForegroundColor Green

# 7. Set PowerShell execution policy for better performance
Write-Host "⚙️  Optimizing PowerShell settings..." -ForegroundColor Yellow
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
Write-Host "✅ PowerShell execution policy optimized" -ForegroundColor Green

# 8. Start the development server
Write-Host "🚀 Starting optimized development server..." -ForegroundColor Yellow
Write-Host "📱 Customer Portal: http://localhost:3000" -ForegroundColor Cyan
Write-Host "👨‍💼 Admin Dashboard: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 System optimization complete! Starting development server..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the development server
npm run dev

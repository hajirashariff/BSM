# BSM Project Performance Monitor
# Run this script to monitor your project's performance

Write-Host "📊 BSM Project Performance Monitor" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Function to get memory usage
function Get-MemoryUsage {
    $processes = Get-Process | Where-Object {$_.ProcessName -like "*node*"}
    if ($processes) {
        $totalMemory = ($processes | Measure-Object WorkingSet -Sum).Sum
        $memoryMB = [math]::Round($totalMemory / 1MB, 2)
        return $memoryMB
    }
    return 0
}

# Function to check if ports are active
function Test-Port {
    param($Port)
    try {
        $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet
        return $connection
    } catch {
        return $false
    }
}

# Function to get response time
function Get-ResponseTime {
    param($Url)
    try {
        $response = Measure-Command { Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5 }
        return [math]::Round($response.TotalMilliseconds, 2)
    } catch {
        return "Error"
    }
}

Write-Host "🔄 Monitoring performance... (Press Ctrl+C to stop)" -ForegroundColor Yellow
Write-Host ""

while ($true) {
    Clear-Host
    Write-Host "📊 BSM Project Performance Monitor" -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Green
    Write-Host "Time: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
    Write-Host ""
    
    # Memory Usage
    $memoryUsage = Get-MemoryUsage
    Write-Host "💾 Memory Usage: $memoryUsage MB" -ForegroundColor Cyan
    
    # Port Status
    $port3000 = Test-Port 3000
    $port3001 = Test-Port 3001
    
    if ($port3000) {
        Write-Host "✅ Customer Portal (Port 3000): Active" -ForegroundColor Green
        $responseTime3000 = Get-ResponseTime "http://localhost:3000"
        Write-Host "   Response Time: $responseTime3000 ms" -ForegroundColor Gray
    } else {
        Write-Host "❌ Customer Portal (Port 3000): Inactive" -ForegroundColor Red
    }
    
    if ($port3001) {
        Write-Host "✅ Admin Dashboard (Port 3001): Active" -ForegroundColor Green
        $responseTime3001 = Get-ResponseTime "http://localhost:3001"
        Write-Host "   Response Time: $responseTime3001 ms" -ForegroundColor Gray
    } else {
        Write-Host "❌ Admin Dashboard (Port 3001): Inactive" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "🔄 Refreshing in 5 seconds... (Press Ctrl+C to stop)" -ForegroundColor Yellow
    
    Start-Sleep -Seconds 5
}

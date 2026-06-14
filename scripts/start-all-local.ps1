param()
Write-Host "Starting backend and frontend for local development..."
& "$PSScriptRoot\start-backend.ps1"
Start-Sleep -Seconds 2
& "$PSScriptRoot\start-frontend.ps1"

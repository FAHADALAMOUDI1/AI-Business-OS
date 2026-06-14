param()
Set-Location -Path "$PSScriptRoot\..\frontend"

$npmCommand = Get-Command npm -ErrorAction SilentlyContinue
$nodeDir = Join-Path $env:ProgramFiles 'nodejs'
if (-not $npmCommand -and Test-Path $nodeDir) {
    Write-Host "Adding Node.js install path to PATH: $nodeDir"
    $env:PATH = "$nodeDir;$env:PATH"
    $npmCommand = Get-Command npm -ErrorAction SilentlyContinue
}

if (-not $npmCommand) {
    $npmCmdPath = Join-Path $nodeDir 'npm.cmd'
    if (Test-Path $npmCmdPath) {
        Write-Host "Using npm.cmd at: $npmCmdPath"
        $npmCommand = $npmCmdPath
    }
}

if (-not $npmCommand) {
    Write-Host "npm was not found on PATH. Install Node.js with npm and rerun this script."
    exit 1
}

$npmPath = if ($npmCommand -is [System.String]) { $npmCommand } else { $npmCommand.Path }

if (-not (Test-Path -Path "node_modules")) {
    Write-Host "Installing frontend dependencies... (npm install)"
    & "$npmPath" install
}

Write-Host "Starting frontend (Next.js) in a new PowerShell window..."
$cmd = "cd '$PWD' ; & '$npmPath' run dev"
Start-Process -FilePath powershell -ArgumentList ('-NoExit','-Command', $cmd)

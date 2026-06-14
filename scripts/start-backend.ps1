param()
Set-Location -Path "$PSScriptRoot\..\backend"

$python = "python"
if (-not (Get-Command $python -ErrorAction SilentlyContinue)) {
    Write-Host "python not found on PATH, trying py -3..."
    $python = "py -3"
}

$venvPython = ".venv\Scripts\python.exe"
if (-not (Test-Path -Path $venvPython)) {
    Write-Host "Creating Python virtual environment..."
    if ($env:PYTHONHOME) {
        Write-Host "Clearing PYTHONHOME for venv creation..."
        Remove-Item Env:\PYTHONHOME -ErrorAction SilentlyContinue
    }
    & $python -m venv .venv
}

Write-Host "Installing Python dependencies... (this may take a while)"
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

Write-Host "Starting backend (uvicorn) in a new PowerShell window..."if ($env:PYTHONHOME) {
    Write-Host "Clearing PYTHONHOME for runtime..."
    Remove-Item Env:\PYTHONHOME -ErrorAction SilentlyContinue
}$cmd = "cd '$PWD' ; .\\.venv\\Scripts\\Activate.ps1 ; uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
Start-Process -FilePath powershell -ArgumentList ('-NoExit','-Command', $cmd)

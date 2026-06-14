param()
Write-Host "Stopping local dev servers (ports 8000 and 3000 if present)..."

function Stop-PortProcess($port) {
    try {
        $conn = Get-NetTCPConnection -LocalPort $port -ErrorAction Stop
        $pid = $conn.OwningProcess
        if ($pid -and (Get-Process -Id $pid -ErrorAction SilentlyContinue)) {
            Write-Host "Stopping process $pid listening on port $port"
            Stop-Process -Id $pid -Force
        }
    } catch {
        # no process on port
    }
}

Stop-PortProcess -port 8000
Stop-PortProcess -port 3000

Write-Host "Done."

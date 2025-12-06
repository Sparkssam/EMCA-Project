# prepare-deploy.ps1

Write-Host "Preparing deployment package..."

# Define paths
$rootDir = Get-Location
$standaloneDir = "$rootDir\.next\standalone"
$publicDir = "$rootDir\public"
$staticDir = "$rootDir\.next\static"
$destPublic = "$standaloneDir\public"
$destStatic = "$standaloneDir\.next\static"

# Check if build exists
if (-not (Test-Path $standaloneDir)) {
    Write-Error "Standalone build not found. Please run 'npm run build' first."
    exit 1
}

# 1. Copy public folder
Write-Host "Copying public folder..."
if (Test-Path $publicDir) {
    Copy-Item -Path $publicDir -Destination $standaloneDir -Recurse -Force
}
else {
    Write-Warning "Public folder not found."
}

# 2. Copy static folder
Write-Host "Copying static assets..."
if (Test-Path $staticDir) {
    # Create destination directory if it doesn't exist
    if (-not (Test-Path $destStatic)) {
        New-Item -ItemType Directory -Force -Path $destStatic | Out-Null
    }
    Copy-Item -Path "$staticDir\*" -Destination $destStatic -Recurse -Force
}
else {
    Write-Warning "Static folder not found."
}

# 2.5 Copy .npmrc (Crucial for cPanel)
Write-Host "Copying .npmrc configuration..."
if (Test-Path "$rootDir\.npmrc") {
    Copy-Item -Path "$rootDir\.npmrc" -Destination $standaloneDir -Force
}
else {
    Write-Warning ".npmrc not found! Creating one..."
    Set-Content -Path "$standaloneDir\.npmrc" -Value "legacy-peer-deps=true"
}

Write-Host "Deployment files prepared in .next\standalone"
Write-Host "Zipping files to deploy.zip..."

# 3. Zip the content of standalone folder
# We need to zip the *contents* of standalone, not the folder itself, so that server.js is at the root of the zip
# EXCLUDE node_modules to prevent Windows binaries from causing issues on Linux
$compressSource = Get-ChildItem -Path $standaloneDir -Exclude "node_modules"
Compress-Archive -Path $compressSource.FullName -DestinationPath "$rootDir\deploy.zip" -Force

Write-Host "SUCCESS: deploy.zip created at $rootDir\deploy.zip"
Write-Host "You can now upload 'deploy.zip' to cPanel."

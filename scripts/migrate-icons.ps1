# Migrate Lucide Icons to Radix Icons
# This script helps identify components that use Lucide icons and need migration

Write-Host "FreelPay Lucide to Radix Icons Migration Helper" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Define paths to search
$searchPaths = @(
    "src/app/dashboard",
    "src/components/onboarding"
)

# Function to find Lucide imports
function Find-LucideImports {
    param (
        [string]$path
    )
    
    Write-Host "Searching for Lucide imports in $path..." -ForegroundColor Yellow
    
    $lucideFiles = @()
    $files = Get-ChildItem -Path $path -Recurse -Include "*.tsx", "*.jsx", "*.ts", "*.js"
    
    foreach ($file in $files) {
        $content = Get-Content -Path $file.FullName -Raw
        if ($content -match "from\s+['""]lucide-react['""]") {
            $lucideFiles += $file.FullName
            
            # Extract the imported icons
            $importMatch = $content | Select-String -Pattern "import\s+{([^}]+)}\s+from\s+['""]lucide-react['""]" -AllMatches
            if ($importMatch.Matches.Count -gt 0) {
                $icons = $importMatch.Matches[0].Groups[1].Value
                $iconList = $icons -split "," | ForEach-Object { $_.Trim() }
                
                Write-Host "  File: $($file.FullName)" -ForegroundColor Green
                Write-Host "  Lucide Icons: $($iconList -join ", ")" -ForegroundColor Magenta
                Write-Host ""
            }
        }
    }
    
    return $lucideFiles
}

# Main execution
$allLucideFiles = @()

foreach ($path in $searchPaths) {
    $lucideFiles = Find-LucideImports -path $path
    $allLucideFiles += $lucideFiles
}

# Summary
Write-Host "Migration Summary:" -ForegroundColor Cyan
Write-Host "================" -ForegroundColor Cyan
Write-Host "Total files to migrate: $($allLucideFiles.Count)" -ForegroundColor Yellow

if ($allLucideFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Green
    Write-Host "1. Review each file listed above" -ForegroundColor White
    Write-Host "2. Replace Lucide imports with Radix equivalents (see RADIX_ICONS_MIGRATION_GUIDE.md)" -ForegroundColor White
    Write-Host "3. Update icon usage in components" -ForegroundColor White
    Write-Host "4. Test the components to ensure icons display correctly" -ForegroundColor White
    Write-Host ""
    Write-Host "For detailed instructions, refer to RADIX_ICONS_MIGRATION_GUIDE.md" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Migration script completed." -ForegroundColor Green 
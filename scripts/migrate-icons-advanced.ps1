# Advanced Migrate Lucide Icons to Radix Icons
# This script helps identify and suggest replacements for Lucide icons

Write-Host "FreelPay Advanced Lucide to Radix Icons Migration Helper" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

# Define icon mapping from Lucide to Radix
$iconMapping = @{
    "FileText" = "FileTextIcon"
    "Plus" = "PlusIcon"
    "PlusCircle" = "PlusCircledIcon"
    "Search" = "MagnifyingGlassIcon"
    "ArrowUpRight" = "ArrowUpIcon"
    "ArrowDownRight" = "ArrowDownIcon"
    "Clock" = "ClockIcon"
    "AlertCircle" = "ExclamationTriangleIcon"
    "CheckCircle2" = "CheckCircledIcon"
    "DollarSign" = "DashboardIcon"
    "Calendar" = "CalendarIcon"
    "Download" = "DownloadIcon"
    "ExternalLink" = "ExternalLinkIcon"
    "Eye" = "EyeOpenIcon"
    "UserPlus" = "PersonIcon"
    "BarChart3" = "BarChartIcon"
    "TrendingUp" = "UploadIcon"
    "Wallet" = "BackpackIcon"
    "Sparkles" = "LightningBoltIcon"
    "ChevronLeft" = "ChevronLeftIcon"
    "ChevronRight" = "ChevronRightIcon"
    "Users" = "PersonIcon"
    "Settings" = "GearIcon"
    "Building" = "HomeIcon"
    "CreditCard" = "CardStackIcon"
    "LogOut" = "ExitIcon"
    "ArrowLeft" = "ChevronLeftIcon"
    "Trash2" = "TrashIcon"
    "Info" = "InfoCircledIcon"
    "X" = "Cross1Icon"
    "Check" = "CheckIcon"
    "Bell" = "BellIcon"
    "User" = "PersonIcon"
    "Mail" = "EnvelopeClosedIcon"
    "Phone" = "MobileIcon"
    "Home" = "HomeIcon"
    "Edit" = "Pencil1Icon"
    "Copy" = "CopyIcon"
    "Share" = "Share1Icon"
    "Filter" = "MixerHorizontalIcon"
    "MoreHorizontal" = "DotsHorizontalIcon"
    "MoreVertical" = "DotsVerticalIcon"
    "Loader" = "UpdateIcon"
    "Upload" = "UploadIcon"
    "Lock" = "LockClosedIcon"
    "Unlock" = "LockOpen1Icon"
    "Star" = "StarIcon"
    "Heart" = "HeartIcon"
    "Bookmark" = "BookmarkIcon"
    "Trash" = "TrashIcon"
}

# Define paths to search
$searchPaths = @(
    "src/app/dashboard",
    "src/components/onboarding"
)

# Function to find and suggest replacements for Lucide imports
function Find-And-Suggest-Replacements {
    param (
        [string]$path
    )
    
    Write-Host "Analyzing files in $path..." -ForegroundColor Yellow
    
    $files = Get-ChildItem -Path $path -Recurse -Include "*.tsx", "*.jsx", "*.ts", "*.js"
    
    foreach ($file in $files) {
        $content = Get-Content -Path $file.FullName -Raw
        if ($content -match "from\s+['""]lucide-react['""]") {
            Write-Host "File: $($file.FullName)" -ForegroundColor Green
            
            # Extract the imported icons
            $importMatch = $content | Select-String -Pattern "import\s+{([^}]+)}\s+from\s+['""]lucide-react['""]" -AllMatches
            if ($importMatch.Matches.Count -gt 0) {
                $icons = $importMatch.Matches[0].Groups[1].Value
                $iconList = $icons -split "," | ForEach-Object { $_.Trim() }
                
                Write-Host "  Lucide Icons:" -ForegroundColor Magenta
                
                $radixImports = @()
                
                foreach ($icon in $iconList) {
                    $radixEquivalent = $iconMapping[$icon]
                    if ($radixEquivalent) {
                        Write-Host "    $icon -> $radixEquivalent" -ForegroundColor White
                        $radixImports += $radixEquivalent
                    } else {
                        Write-Host "    $icon -> No direct mapping found (check migration guide)" -ForegroundColor Yellow
                    }
                }
                
                if ($radixImports.Count -gt 0) {
                    Write-Host ""
                    Write-Host "  Suggested Radix Import:" -ForegroundColor Cyan
                    Write-Host "    import { $($radixImports -join ", ") } from `"@radix-ui/react-icons`"" -ForegroundColor White
                    
                    Write-Host ""
                    Write-Host "  Alternative Icon Component Usage:" -ForegroundColor Cyan
                    Write-Host "    import { Icon } from `"@/components/ui/icon`"" -ForegroundColor White
                    
                    foreach ($icon in $iconList) {
                        $radixEquivalent = $iconMapping[$icon]
                        if ($radixEquivalent) {
                            Write-Host "    // Replace <$icon /> with:" -ForegroundColor DarkGray
                            Write-Host "    <Icon name=`"$radixEquivalent`" />" -ForegroundColor White
                        }
                    }
                }
            }
            
            Write-Host ""
            Write-Host "  ----------------------------------------" -ForegroundColor DarkGray
            Write-Host ""
        }
    }
}

# Main execution
foreach ($path in $searchPaths) {
    Find-And-Suggest-Replacements -path $path
}

# Instructions
Write-Host "Migration Instructions:" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host "1. For each file, replace the Lucide import with the suggested Radix import" -ForegroundColor White
Write-Host "2. Replace each Lucide icon usage with the corresponding Radix icon" -ForegroundColor White
Write-Host "3. Consider using the Icon component for consistent styling" -ForegroundColor White
Write-Host "4. Test the components to ensure icons display correctly" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, refer to RADIX_ICONS_MIGRATION_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Migration script completed." -ForegroundColor Green 
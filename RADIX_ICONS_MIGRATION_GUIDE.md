# Migrating from Lucide Icons to Radix Icons

This guide provides instructions for migrating from Lucide icons to Radix icons in the FreelPay application.

## Why Migrate?

- **Consistent styling**: Radix icons have a consistent design language that matches our UI components
- **Better performance**: Radix icons are optimized for web use
- **Thinner stroke width**: Radix icons have a thinner stroke width that matches our design system
- **Simpler API**: Our new Icon component provides a simpler API for using icons

## Migration Steps

### 1. Replace Lucide Icon Imports

Replace imports from `lucide-react` with imports from `@radix-ui/react-icons`:

```tsx
// Before
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

// After
import { ChevronLeftIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
```

### 2. Replace Icon Usage

#### Option 1: Direct Component Usage

Replace Lucide icon components with Radix icon components:

```tsx
// Before (Lucide)
<ArrowLeft className="h-4 w-4 mr-2" />
<Plus className="h-5 w-5" />
<Trash2 className="h-4 w-4 text-destructive" />

// After (Radix)
<ChevronLeftIcon className="h-4 w-4 mr-2" />
<PlusIcon className="h-5 w-5" />
<TrashIcon className="h-4 w-4 text-destructive" />
```

Note that Radix icons already come with a default size, but you can override it with className as shown above.

#### Option 2: Icon Component Usage

Use our new Icon component for more consistent styling:

```tsx
// Before (Lucide)
<ArrowLeft className="h-4 w-4 mr-2" />
<Plus className="h-5 w-5" />
<Trash2 className="h-4 w-4 text-destructive" />

// After (Icon component)
<Icon name="ChevronLeftIcon" size="sm" className="mr-2" />
<Icon name="PlusIcon" size="md" />
<Icon name="TrashIcon" size="sm" className="text-destructive" />
```

The Icon component automatically handles sizing and consistent styling, making your code cleaner and more maintainable.

### 3. Icon Name Mapping

Here's a mapping of common Lucide icons to their Radix equivalents:

| Lucide Icon | Radix Icon |
|-------------|------------|
| `FileText` | `FileTextIcon` |
| `Plus` | `PlusCircledIcon` or `PlusIcon` |
| `Search` | `MagnifyingGlassIcon` |
| `ArrowUpRight` | `ArrowUpIcon` |
| `ArrowDownRight` | `ArrowDownIcon` |
| `PlusCircle` | `PlusCircledIcon` |
| `Clock` | `ClockIcon` |
| `AlertCircle` | `ExclamationTriangleIcon` |
| `CheckCircle2` | `CheckCircledIcon` |
| `DollarSign` | `DashboardIcon` (closest equivalent) |
| `Calendar` | `CalendarIcon` |
| `Download` | `DownloadIcon` |
| `ExternalLink` | `ExternalLinkIcon` |
| `Eye` | `EyeOpenIcon` |
| `UserPlus` | `PersonIcon` |
| `BarChart3` | `BarChartIcon` |
| `TrendingUp` | `UploadIcon` |
| `Wallet` | `BackpackIcon` |
| `Sparkles` | `LightningBoltIcon` |
| `ChevronLeft` | `ChevronLeftIcon` |
| `ChevronRight` | `ChevronRightIcon` |
| `Users` | `PersonIcon` |
| `Settings` | `GearIcon` |
| `Building` | `HomeIcon` |
| `CreditCard` | `CardStackIcon` |
| `LogOut` | `ExitIcon` |

For a complete list of available Radix icons, visit the [Radix Icons documentation](https://www.radix-ui.com/icons) or check the `node_modules/@radix-ui/react-icons/dist/index.d.ts` file.

### 4. Global Styling

We've added global styling for Radix icons in `globals.css`:

```css
/* Global styling for Radix icons - thinner stroke */
[class*="radix-icons"] svg,
svg[class*="Icon"],
svg[data-radix-icon-name] {
  stroke-width: 1.25 !important; /* Thinner stroke width with higher specificity */
  stroke: currentColor;
}
```

This ensures all Radix icons have a consistent stroke width throughout the application.

## Using the Icon Component

Our new Icon component provides a convenient way to use Radix icons with consistent styling:

```tsx
import { Icon } from "@/components/ui/icon"

// Basic usage
<Icon name="HomeIcon" />

// With size
<Icon name="GearIcon" size="lg" />

// With custom class
<Icon name="FileTextIcon" className="text-primary" />

// Available sizes
// xs: "h-3 w-3"
// sm: "h-4 w-4"
// md: "h-5 w-5" (default)
// lg: "h-6 w-6"
// xl: "h-8 w-8"
```

## Components to Update

The following components still use Lucide icons and need to be updated:

- `src/components/onboarding/OnboardingFlow.tsx`
- `src/components/onboarding/steps/*.tsx`
- `src/app/login/page.tsx`
- `src/app/dashboard/support/page.tsx`
- `src/app/dashboard/settings/page.tsx`
- `src/app/dashboard/payments/page.tsx`
- `src/app/dashboard/financing/new/page.tsx`
- `src/app/dashboard/financing/page.tsx`
- `src/app/dashboard/financing/simulation/page.tsx`
- `src/app/dashboard/invoices/create/page.tsx`
- `src/app/dashboard/feedback/page.tsx`
- `src/app/dashboard/documents/page.tsx`
- `src/app/dashboard/clients/page.tsx` 

## Practical Example: Migrating a Component

Let's walk through migrating a component from Lucide to Radix icons. We'll use the `src/app/dashboard/invoices/create/page.tsx` as an example:

### Before Migration

```tsx
// Import from Lucide
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

// Usage in the component
<Button variant="ghost" className="mb-4">
  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
</Button>

<Button type="button" onClick={addItem} className="w-full">
  <Plus className="mr-2 h-4 w-4" /> Ajouter un article
</Button>

<Button 
  type="button" 
  variant="ghost" 
  size="icon" 
  onClick={() => removeItem(index)} 
  className="text-destructive"
>
  <Trash2 className="h-4 w-4" />
</Button>
```

### After Migration (Option 1: Direct Component Usage)

```tsx
// Import from Radix
import { ChevronLeftIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"

// Usage in the component
<Button variant="ghost" className="mb-4">
  <ChevronLeftIcon className="mr-2 h-4 w-4" /> Retour
</Button>

<Button type="button" onClick={addItem} className="w-full">
  <PlusIcon className="mr-2 h-4 w-4" /> Ajouter un article
</Button>

<Button 
  type="button" 
  variant="ghost" 
  size="icon" 
  onClick={() => removeItem(index)} 
  className="text-destructive"
>
  <TrashIcon className="h-4 w-4" />
</Button>
```

### After Migration (Option 2: Icon Component)

```tsx
// Import the Icon component
import { Icon } from "@/components/ui/icon"

// Usage in the component
<Button variant="ghost" className="mb-4">
  <Icon name="ChevronLeftIcon" size="sm" className="mr-2" /> Retour
</Button>

<Button type="button" onClick={addItem} className="w-full">
  <Icon name="PlusIcon" size="sm" className="mr-2" /> Ajouter un article
</Button>

<Button 
  type="button" 
  variant="ghost" 
  size="icon" 
  onClick={() => removeItem(index)} 
  className="text-destructive"
>
  <Icon name="TrashIcon" size="sm" />
</Button>
```

## Tips for Migration

1. **Use the Icon component when possible**: It provides consistent sizing and styling.
2. **Check the icon mapping table**: Find the closest Radix equivalent for each Lucide icon.
3. **Test thoroughly**: Ensure icons render correctly after migration.
4. **Update one component at a time**: This makes it easier to catch and fix any issues.
5. **Consider accessibility**: Ensure icons have appropriate aria labels when used without text.

```tsx
// Accessible icon button example
<Button 
  variant="ghost" 
  size="icon" 
  aria-label="Delete item"
>
  <Icon name="TrashIcon" />
</Button>
```

## Need Help?

If you encounter any issues during migration or can't find a suitable Radix icon replacement, please reach out to the design team.

## Migration Scripts

To help with the migration process, we've created two PowerShell scripts:

### Basic Migration Script

The basic script (`scripts/migrate-icons.ps1`) helps identify components that use Lucide icons:

```powershell
# Run from the project root
.\scripts\migrate-icons.ps1
```

This script will:
1. Search for files that import from `lucide-react`
2. List the Lucide icons used in each file
3. Provide a summary of files that need migration

### Advanced Migration Script

The advanced script (`scripts/migrate-icons-advanced.ps1`) provides more detailed suggestions:

```powershell
# Run from the project root
.\scripts\migrate-icons-advanced.ps1
```

This script will:
1. Search for files that import from `lucide-react`
2. List the Lucide icons used in each file
3. Suggest Radix icon replacements for each Lucide icon
4. Provide example import statements for both direct usage and the Icon component
5. Show example replacements for each icon

### Using the Scripts

1. Open PowerShell in the project root directory
2. Run either script using the commands above
3. Follow the suggestions to update your components
4. Test your changes to ensure icons display correctly

These scripts are meant to assist with the migration process, but manual verification is still required to ensure all icons are correctly replaced. 
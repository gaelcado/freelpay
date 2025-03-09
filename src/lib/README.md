# Typography System

This project uses a custom typography system designed specifically for SaaS dashboards. The system provides consistent text styling across the application with a focus on readability and hierarchy.

## Typescale

The typescale follows a modular scale with a ratio of 1.2 (minor third) for a balanced, professional look. It is defined in `src/lib/typography.ts`.

### Categories

The typescale is organized into the following categories:

1. **Display** - For hero sections and major headings
   - `display-xl`: 48px (text-5xl)
   - `display-lg`: 36px (text-4xl)
   - `display-md`: 30px (text-3xl)
   - `display-sm`: 24px (text-2xl)

2. **Heading** - For section headers
   - `heading-xl`: 30px (text-3xl)
   - `heading-lg`: 24px (text-2xl)
   - `heading-md`: 20px (text-xl)
   - `heading-sm`: 18px (text-lg)
   - `heading-xs`: 16px (text-base)

3. **Body** - For main content
   - `body-lg`: 18px (text-lg)
   - `body-md`: 16px (text-base)
   - `body-sm`: 14px (text-sm)
   - `body-xs`: 12px (text-xs)

4. **Label** - For form labels and captions
   - `label-lg`: 16px (text-base)
   - `label-md`: 14px (text-sm)
   - `label-sm`: 12px (text-xs)

5. **Monospace** - For code and technical data
   - `mono-md`: 16px (text-base)
   - `mono-sm`: 14px (text-sm)
   - `mono-xs`: 12px (text-xs)

6. **Special** - For specific UI elements
   - `stat`: For dashboard statistics
   - `cardTitle`: For card titles
   - `badge`: For badges
   - `button`: For button text
   - `nav`: For navigation items

7. **Responsive Typography** - For responsive text that adapts to screen size
   - `responsive-heading-xl`, `responsive-heading-lg`, `responsive-heading-md`, `responsive-heading-sm`
   - `responsive-body-lg`, `responsive-body-md`, `responsive-body-sm`

## Usage

### Using Typography Components

The typography system provides React components for each typography style:

```tsx
import { 
  DisplayXL, 
  HeadingLG, 
  BodyMD, 
  Label, 
  Stat,
  ResponsiveHeadingMD,
  TruncatedText
} from "@/components/ui/typography";

function MyComponent() {
  return (
    <div>
      <DisplayXL>Welcome to the Dashboard</DisplayXL>
      <HeadingLG>Recent Activity</HeadingLG>
      <BodyMD>Here's a summary of your recent activity.</BodyMD>
      <Label size="md" htmlFor="email">Email</Label>
      <Stat>$12,345</Stat>
      
      {/* Responsive typography that adapts to screen size */}
      <ResponsiveHeadingMD>Responsive Heading</ResponsiveHeadingMD>
      
      {/* Text with truncation */}
      <TruncatedText variant="body-sm" lines={2}>
        This text will be truncated after two lines with an ellipsis.
      </TruncatedText>
    </div>
  );
}
```

### Using the Typography Component Directly

For more flexibility, you can use the base Typography component with additional styling options:

```tsx
import { Typography } from "@/components/ui/typography";

function MyComponent() {
  return (
    <Typography 
      variant="heading-lg" 
      as="h3" 
      className="my-custom-class"
      truncate="singleLine"
      align="center"
      transform="uppercase"
      weight="semibold"
    >
      Custom Heading
    </Typography>
  );
}
```

### Using the Helper Function

For advanced use cases, you can use the typography helper function:

```tsx
import { typography } from "@/lib/typography";

function MyComponent() {
  const headingClasses = typography("heading", "lg", "my-custom-class");
  
  return (
    <h3 className={headingClasses}>Custom Heading</h3>
  );
}
```

### Additional Utilities

The typography system includes several utility functions for common text styling needs:

#### Text Truncation

```tsx
import { truncate } from "@/lib/typography";

// Single line truncation with ellipsis
<p className={truncate.singleLine}>Long text that will be truncated</p>

// Multi-line truncation (2 lines)
<p className={truncate.twoLines}>Long text that will be truncated after two lines</p>

// Multi-line truncation (3 lines)
<p className={truncate.threeLines}>Long text that will be truncated after three lines</p>
```

#### Text Alignment

```tsx
import { textAlign } from "@/lib/typography";

<p className={textAlign.left}>Left-aligned text</p>
<p className={textAlign.center}>Center-aligned text</p>
<p className={textAlign.right}>Right-aligned text</p>
<p className={textAlign.justify}>Justified text</p>
```

#### Text Transformation

```tsx
import { textTransform } from "@/lib/typography";

<p className={textTransform.uppercase}>uppercase text</p>
<p className={textTransform.lowercase}>LOWERCASE TEXT</p>
<p className={textTransform.capitalize}>capitalize text</p>
<p className={textTransform.normalCase}>Normal case text</p>
```

#### Font Weight

```tsx
import { fontWeight } from "@/lib/typography";

<p className={fontWeight.light}>Light text</p>
<p className={fontWeight.normal}>Normal text</p>
<p className={fontWeight.medium}>Medium text</p>
<p className={fontWeight.semibold}>Semibold text</p>
<p className={fontWeight.bold}>Bold text</p>
```

## Best Practices

1. Use the appropriate typography scale for each UI element
2. Maintain consistent spacing between text elements
3. Limit the number of font sizes on a single page
4. Use font weights to create hierarchy (semibold for headings, regular for body text)
5. Ensure sufficient contrast between text and background colors
6. Use responsive typography for elements that need to adapt to different screen sizes
7. Use truncation for content that might overflow its container
8. Consider text alignment based on the context (left-aligned for most content, centered for headers) 
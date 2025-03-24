# UI Components Guide

## Overview

This application uses a set of reusable UI components located in `~/components/ui/`. These components are built with React and Tailwind CSS and provide a consistent look and feel across the application.

## Available Components

The following UI components are available:

- `Alert` - Display important messages to users
- `Avatar` - Display user or entity avatars
- `Badge` - Show status or categorization
- `Button` - Interactive buttons with various styles and colors
- `Checkbox` - Form input for boolean values
- `Dialog` - Modal dialogs for focused interactions
- `Divider` - Visual separators between content
- `Dropdown` - Expandable menus
- `Fieldset` - Group related form elements
- `Heading` - Section titles with consistent styling
- `Input` - Text input fields
- `Link` - Navigation links
- `Listbox` - Selectable list items
- `Navbar` - Navigation header
- `Pagination` - For navigating through pages of content
- `Radio` - Radio button input groups
- `Select` - Dropdown selection
- `Sidebar` - Side navigation panel
- `SidebarLayout` - Layout with sidebar navigation
- `StackedLayout` - Vertically stacked layout
- `Switch` - Toggle input
- `Table` - Displaying tabular data
- `Text` - Text display with consistent styling
- `Textarea` - Multi-line text input

## Usage Guidelines

1. **Always import from the UI components directory**:

   ```tsx
   // ✅ Correct way to import
   import { Button } from "~/components/ui/button";
   import { Input } from "~/components/ui/input";

   // ❌ Avoid creating custom components that duplicate functionality
   // Don't create your own button or input components
   ```

2. **Read the component source code documentation**:
   Before using a component, check its source file to understand:

   - Available props
   - Variants and options
   - Usage patterns

3. **Maintain consistent styling**:

   - Use the provided components as-is whenever possible
   - Use Tailwind classes in the same pattern shown in the component examples
   - Follow the color schemes defined in the components

4. **Component composition**:

   - Many components are designed to work together (e.g., `Alert` with `AlertTitle`, `AlertDescription`)
   - Check related component exports in the same file

5. **Custom styling**:
   - When adding custom styles, use the `className` prop which all components accept
   - Prefer using Tailwind utility classes over custom CSS

## Example

```tsx
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

function MyForm() {
  return (
    <div className="space-y-4">
      <Text>Please enter your information:</Text>
      <Input type="email" placeholder="Email address" className="w-full" />
      <Button color="blue">Submit</Button>
    </div>
  );
}
```

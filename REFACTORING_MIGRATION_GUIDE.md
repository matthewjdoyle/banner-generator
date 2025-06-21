# Banner Generator Refactoring Migration Guide

## Overview

This refactoring breaks down the monolithic 2,200+ line `banner.ts` store into smaller, focused modules following best practices for maintainability and readability.

## New Architecture

### 1. **Centralized Types** (`src/types/index.ts`)

- All TypeScript interfaces and types in one place
- Better type safety and consistency
- Easier to maintain and extend

### 2. **Service Layer**

#### **ColorService** (`src/services/colorService.ts`)

- Color manipulation utilities
- Harmonious color generation
- Color conversion functions

#### **CanvasService** (`src/services/canvasService.ts`)

- Canvas rendering logic
- Image processing
- Export functionality

#### **ElementService** (`src/services/elementService.ts`)

- Element creation and management
- Position validation
- Element utilities (cloning, bounds checking)

### 3. **Refactored Store** (`src/stores/useBannerStore.ts`)

- Clean, focused state management
- Uses Pinia composition API
- Delegates complex operations to services

### 4. **Reusable UI Components** (`src/components/ui/`)

#### **BaseCard.vue**

- Consistent card layout across the app
- Multiple variants (primary, secondary, accent, neutral)
- Eliminates code duplication

#### **ColorPicker.vue**

- Reusable color input component
- Support for both color picker and text input
- Consistent styling

### 5. **Composables** (`src/composables/`)

#### **useElementControls.ts**

- Shared logic for element selection and manipulation
- Keyboard shortcuts
- Position controls

#### **useFileUpload.ts**

- File upload handling
- Drag and drop support
- File validation

## Migration Steps

### 1. Update Imports

**Old:**

```typescript
import { useBannerStore } from '@/stores/banner'
```

**New:**

```typescript
import { useBannerStore } from '@/stores/useBannerStore'
```

### 2. Update Type Imports

**Old:**

```typescript
import type { TextElement, BannerImage } from '@/stores/banner'
```

**New:**

```typescript
import type { TextElement, BannerImage } from '@/types'
```

### 3. Use New Components

**Old Pattern:**

```vue
<div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft">
  <div class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50">
    <h4 class="font-bold text-primary-900">Title</h4>
  </div>
  <!-- content -->
</div>
```

**New Pattern:**

```vue
<BaseCard title="Title" icon="🎨" variant="primary">
  <!-- content -->
</BaseCard>
```

### 4. Use Composables for Element Controls

**Old Pattern:**

```typescript
const selectedElementId = ref<string | null>(null)

function selectElement(id: string) {
  selectedElementId.value = id
}

function updateElement(updates: Partial<TextElement>) {
  if (selectedElementId.value) {
    bannerStore.updateTextElement(selectedElementId.value, updates)
  }
}
```

**New Pattern:**

```typescript
const { selectedElementId, selectedElement, selectElement, updateSelectedElement } =
  useElementControls(
    bannerStore.textElements,
    bannerStore.updateTextElement,
    bannerStore.removeTextElement,
    bannerStore.duplicateTextElement,
  )
```

## Benefits

### 📦 **Smaller File Sizes**

- Main store reduced from 2,200+ lines to ~300 lines
- Each service is focused and under 200 lines
- Components are more manageable (150-300 lines)

### 🔧 **Better Maintainability**

- Single responsibility principle applied
- Clear separation of concerns
- Easier to test individual functions

### 🚀 **Improved Performance**

- Services are stateless and can be tree-shaken
- Composables provide optimized reactivity
- Canvas operations are isolated

### 💡 **Enhanced Developer Experience**

- Better TypeScript intellisense
- Easier to find specific functionality
- Consistent patterns across components

### 🎨 **UI Consistency**

- Reusable components ensure visual consistency
- Centralized styling variants
- Less duplicate CSS

## File Structure After Refactoring

```
src/
├── types/
│   └── index.ts (centralized types)
├── services/
│   ├── colorService.ts (color utilities)
│   ├── canvasService.ts (canvas operations)
│   └── elementService.ts (element management)
├── stores/
│   └── useBannerStore.ts (clean state management)
├── composables/
│   ├── useElementControls.ts (element manipulation)
│   └── useFileUpload.ts (file handling)
├── components/
│   ├── ui/
│   │   ├── BaseCard.vue (reusable card)
│   │   └── ColorPicker.vue (reusable color input)
│   └── refactored/
│       └── TextControlsRefactored.vue (example refactored component)
└── ...
```

## Next Steps

1. **Migrate remaining components** to use new architecture
2. **Update existing components** to use BaseCard and ColorPicker
3. **Remove old banner.ts** after full migration
4. **Add unit tests** for services and composables
5. **Update documentation** with new patterns

## Breaking Changes

- Import paths for types have changed
- Store method signatures remain the same (backward compatible)
- Component props may differ for UI components

## Backward Compatibility

The new `useBannerStore` maintains the same public API as the old store, so existing components should continue to work without changes to their logic, only import paths need updating.

# Social Media Banner Generator

## 📖 How to Use

### 1. Choose a Template

- Start by selecting a template from the "Templates" tab
- Each template is optimized for different social media platforms
- Preview templates before selecting

### 2. Add Text Elements

- Switch to the "Text" tab
- Enter your text content
- Customize font, size, color, and weight
- Use the position controls to place text precisely
- Add multiple text elements as needed

### 3. Upload Images

- Go to the "Images" tab
- Upload your own images or use sample profile pictures
- Resize and reposition images using the controls
- Adjust border radius for rounded corners

### 4. Export Your Banner

- Navigate to the "Export" tab
- Choose your preferred format (PNG/JPEG)
- Adjust quality settings if needed
- Click "Download Banner" to save your creation

## Supported Social Media Platforms

- **Twitter/X**: 1500 × 500px header
- **Facebook**: 1640 × 859px cover photo
- **LinkedIn**: 1584 × 396px banner
- **YouTube**: 2560 × 1440px channel art
- **Instagram**: 1080 × 1920px story format
- **Universal**: Custom size for general use

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AppHeader.vue   # Navigation header
│   ├── BannerCanvas.vue # Main canvas component
│   ├── TemplateSelector.vue
│   ├── TextControls.vue
│   ├── ImageControls.vue
│   └── ExportControls.vue
├── views/              # Page components
│   ├── BannerGenerator.vue
│   ├── Templates.vue
│   └── Gallery.vue
├── stores/             # Pinia state management
│   └── banner.ts       # Banner state store
├── router/             # Vue Router configuration
│   └── index.ts
└── assets/             # Static assets
    └── main.css        # Global styles
```

## Support & Bug Reporting

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/matthewjdoyle/banner-generator/issues) page
2. Create a new issue with detailed information
3. Support me on [Ko-Fi](https://ko-fi.com/matthewjdoyle)

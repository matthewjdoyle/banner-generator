# Social Media Banner Generator

A powerful, modern web application for creating custom banners for social media profiles. Built with Vue.js, TypeScript, and Tailwind CSS, this tool provides an intuitive interface for designing professional-looking banners without requiring any design skills.

## ✨ Features

- **🎨 Beautiful Templates**: Choose from a curated collection of professionally designed templates
- **📝 Dynamic Text**: Add multiple text elements with customizable fonts, sizes, colors, and positioning
- **🖼️ Image Support**: Upload your own images or choose from sample profile images
- **🎯 Social Media Optimized**: Pre-configured templates for popular platforms (Twitter, Facebook, LinkedIn, YouTube, etc.)
- **💾 Multiple Export Formats**: Download banners in PNG or JPEG format
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🚀 Real-time Preview**: See your changes instantly in the canvas
- **🎭 No Design Skills Required**: Intuitive drag-and-drop interface

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Components**: Element Plus & Headless UI
- **Utilities**: VueUse
- **Canvas Rendering**: HTML5 Canvas API
- **Export Functionality**: html2canvas
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/banner-generator.git
   cd banner-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

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

## 🎯 Supported Social Media Platforms

- **Twitter/X**: 1500 × 500px header
- **Facebook**: 1640 × 859px cover photo
- **LinkedIn**: 1584 × 396px banner
- **YouTube**: 2560 × 1440px channel art
- **Instagram**: 1080 × 1920px story format
- **Universal**: 1200 × 600px for general use

## 🏗️ Project Structure

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

## 🎨 Customization

### Adding New Templates

1. Open `src/stores/banner.ts`
2. Add your template to the `templates` array:

```typescript
{
  id: 'your-template-id',
  name: 'Your Template Name',
  width: 1200,
  height: 600,
  background: '#your-color', // or 'linear-gradient'
  gradientDirection: '45deg', // if using gradient
  gradientColors: ['#color1', '#color2'] // if using gradient
}
```

### Modifying Styles

The project uses Tailwind CSS with custom utilities defined in `src/assets/main.css`. You can:

- Modify existing component classes
- Add new utility classes
- Customize the color palette in `tailwind.config.js`

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all TypeScript types are properly defined
- Test your changes thoroughly

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

**Note**: The Canvas API with advanced features works best in modern browsers.

## 🐛 Known Issues

- Some browsers may not support the `roundRect` Canvas API method (fallback implemented)
- Large images may affect performance on older devices
- CORS restrictions may prevent loading external images in some cases

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Unsplash for providing sample images
- All contributors who help improve this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/banner-generator/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ by the Banner Generator team**

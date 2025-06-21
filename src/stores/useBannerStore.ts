import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type {
  BannerState,
  BannerSize,
  BackgroundOption,
  TextElement,
  BannerImage,
  BannerIcon,
  AvailableIcon,
  BannerTemplate,
  ExportOptions,
} from '@/types'
import { FONT_FAMILIES, getFontFamilyString } from '@/types'
import { ColorService } from '@/services/colorService'
import { CanvasService } from '@/services/canvasService'
import { ElementService } from '@/services/elementService'
import { bannerSizes } from '@/stores/data/bannerSizes'
import { backgroundOptions } from '@/stores/data/backgrounds'
import { availableIcons } from '@/stores/data/icons'

export const useBannerStore = defineStore('banner', () => {
  // Core State
  const state = ref<BannerState>({
    currentSize: bannerSizes[0],
    customWidth: 1200,
    customHeight: 600,
    currentBackground: backgroundOptions[0],
    textElements: [],
    images: [],
    icons: [],
    canvasRef: null,
  })

  // Computed Properties
  const sizeCategories = computed(() => [...new Set(bannerSizes.map((size) => size.category))])

  const backgroundsByType = computed(() => (type: string) => {
    return backgroundOptions.filter((bg) => bg.type === type)
  })

  const iconCategories = computed(() => [
    'All',
    ...new Set(availableIcons.map((icon) => icon.category)),
  ])

  const filteredIcons = computed(() => (category: string) => {
    if (category === 'All') return availableIcons
    return availableIcons.filter((icon) => icon.category === category)
  })

  // Canvas Management
  function setCanvasRef(canvas: HTMLCanvasElement) {
    state.value.canvasRef = canvas
    CanvasService.setCanvas(canvas)
    CanvasService.setAvailableIcons(availableIcons)
  }

  async function renderCanvas() {
    if (state.value.canvasRef) {
      await CanvasService.renderBanner(state.value)
    }
  }

  // Size Management
  function selectSize(size: BannerSize) {
    const oldSize = state.value.currentSize
    state.value.currentSize = size

    // Adjust existing elements to new size
    if (
      state.value.textElements.length > 0 ||
      state.value.images.length > 0 ||
      state.value.icons.length > 0
    ) {
      ElementService.adjustElementsToNewSize(
        [...state.value.textElements, ...state.value.images, ...state.value.icons],
        oldSize,
        size,
      )
    }

    renderCanvas()
  }

  function setCustomDimensions(width: number, height: number) {
    state.value.customWidth = width
    state.value.customHeight = height

    const customSize: BannerSize = {
      id: 'custom-size',
      name: `Custom (${width}×${height})`,
      width,
      height,
      category: 'Custom',
    }

    selectSize(customSize)
  }

  // Background Management
  function selectBackground(background: BackgroundOption) {
    state.value.currentBackground = background
    renderCanvas()
  }

  function updateFancyBackgroundColors(backgroundId: string, newColors: string[]) {
    if (state.value.currentBackground.id === backgroundId) {
      state.value.currentBackground = {
        ...state.value.currentBackground,
        patternColors: newColors,
      }
      renderCanvas()
    }
  }

  function createImageBackground(
    imageUrl: string,
    name: string = 'Custom Image',
  ): BackgroundOption {
    return {
      id: `img-bg-${Date.now()}`,
      name,
      type: 'image',
      value: imageUrl,
      preview: `url('${imageUrl}')`,
      cropX: 50,
      cropY: 50,
      scale: 1,
    }
  }

  function updateBackgroundCrop(backgroundId: string, cropX: number, cropY: number, scale: number) {
    if (state.value.currentBackground.id === backgroundId) {
      state.value.currentBackground = {
        ...state.value.currentBackground,
        cropX,
        cropY,
        scale,
      }
      renderCanvas()
    }
  }

  // Text Element Management
  function addTextElement(elementData: Partial<TextElement>) {
    const textElement = ElementService.createTextElement(
      elementData.text || 'New Text',
      state.value.currentSize,
    )

    // Apply any custom properties
    Object.assign(textElement, elementData)

    state.value.textElements.push(textElement)
    renderCanvas()
  }

  function updateTextElement(id: string, updates: Partial<TextElement>) {
    const index = state.value.textElements.findIndex((el) => el.id === id)
    if (index !== -1) {
      state.value.textElements[index] = { ...state.value.textElements[index], ...updates }
      ElementService.validateElementBounds(state.value.textElements[index], state.value.currentSize)
      renderCanvas()
    }
  }

  function removeTextElement(id: string) {
    state.value.textElements = state.value.textElements.filter((el) => el.id !== id)
    renderCanvas()
  }

  function duplicateTextElement(id: string) {
    const element = state.value.textElements.find((el) => el.id === id)
    if (element) {
      const duplicated = ElementService.cloneElement(element, { x: 20, y: 20 })
      state.value.textElements.push(duplicated)
      renderCanvas()
    }
  }

  // Image Management
  function addImage(imageData: Partial<BannerImage>) {
    const image = ElementService.createImageElement(imageData.src || '', state.value.currentSize)

    // Apply any custom properties
    Object.assign(image, imageData)

    state.value.images.push(image)
    renderCanvas()
  }

  function updateImage(id: string, updates: Partial<BannerImage>) {
    const index = state.value.images.findIndex((img) => img.id === id)
    if (index !== -1) {
      state.value.images[index] = { ...state.value.images[index], ...updates }
      ElementService.validateElementBounds(state.value.images[index], state.value.currentSize)
      renderCanvas()
    }
  }

  function removeImage(id: string) {
    state.value.images = state.value.images.filter((img) => img.id !== id)
    renderCanvas()
  }

  // Icon Management
  function addIcon(iconType: string) {
    const icon = ElementService.createIconElement(iconType, state.value.currentSize)
    state.value.icons.push(icon)
    renderCanvas()
  }

  function updateIcon(id: string, updates: Partial<BannerIcon>) {
    const index = state.value.icons.findIndex((icon) => icon.id === id)
    if (index !== -1) {
      state.value.icons[index] = { ...state.value.icons[index], ...updates }
      ElementService.validateElementBounds(state.value.icons[index], state.value.currentSize)
      renderCanvas()
    }
  }

  function removeIcon(id: string) {
    state.value.icons = state.value.icons.filter((icon) => icon.id !== id)
    renderCanvas()
  }

  function duplicateIcon(id: string) {
    const element = state.value.icons.find((el) => el.id === id)
    if (element) {
      const duplicated = ElementService.cloneElement(element, { x: 20, y: 20 })
      state.value.icons.push(duplicated)
      renderCanvas()
    }
  }

  // Utility Functions
  function clearBanner() {
    state.value.textElements = []
    state.value.images = []
    state.value.icons = []
    renderCanvas()
  }

  function randomizeBanner() {
    // Detect user modifications to preserve them
    const hasUserText = state.value.textElements.some(
      (el) => el.text !== 'Your text here' && el.text.trim() !== '',
    )
    const hasMultipleTextElements = state.value.textElements.length > 1
    const hasUserImages = state.value.images.some((img) => {
      // Check if image is not from our stock image set
      const stockImageUrls = [
        'https://images.unsplash.com/photo-1549692520-acc6669e2f0c',
        'https://images.unsplash.com/photo-1493612276216-ee3925520721',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        'https://images.unsplash.com/photo-1528543606781-2f6e6857f318',
      ]
      return !stockImageUrls.some((stockUrl) => img.src.includes(stockUrl.split('?')[0]))
    })

    console.log('🔍 User Content Detection (Simple Store):', {
      hasUserText,
      hasMultipleTextElements,
      hasUserImages,
      textCount: state.value.textElements.length,
      imageCount: state.value.images.length,
      iconCount: state.value.icons.length,
    })

    // Store user content to preserve
    const userTextElements =
      hasUserText || hasMultipleTextElements ? [...state.value.textElements] : []
    const userImages = hasUserImages ? [...state.value.images] : []

    // Generate harmonious colors
    const colors = ColorService.generateHarmoniousColors()
    const backgroundColors = colors.slice(0, 2)
    const textColors = ColorService.generateContrastingTextColors(backgroundColors)

    // Select random background
    const randomBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)]
    if (randomBackground.type === 'gradient') {
      randomBackground.gradientColors = backgroundColors
    }
    selectBackground(randomBackground)

    // Clear only non-user content
    if (!hasUserText && !hasMultipleTextElements) {
      state.value.textElements = []
    }
    if (!hasUserImages) {
      state.value.images = []
    }
    // Always clear icons as they're easy to regenerate
    state.value.icons = []

    if (userTextElements.length > 0) {
      // Preserve and restyle user text elements
      console.log('💾 Preserving and restyling user text elements:', userTextElements.length)

      userTextElements.forEach((userText, index) => {
        // Select random font from available fonts
        const randomFont = FONT_FAMILIES[Math.floor(Math.random() * FONT_FAMILIES.length)]
        const selectedFontFamily = getFontFamilyString(randomFont.name)

        // Calculate new position with some variation
        const bannerWidth = state.value.currentSize.width
        const bannerHeight = state.value.currentSize.height

        const baseX = Math.random() * (bannerWidth * 0.6)
        const baseY = Math.random() * (bannerHeight * 0.6) + 50 + index * 80

        updateTextElement(userText.id, {
          // Preserve the text content but update styling
          color: textColors[index % textColors.length] || '#FFFFFF',
          fontSize: ['large', 'xlarge', 'xxlarge', 'huge'][Math.floor(Math.random() * 4)] as any,
          fontFamily: selectedFontFamily,
          fontWeight: ['500', '600', '700', '800'][Math.floor(Math.random() * 4)],
          x: Math.max(40, Math.min(baseX, bannerWidth - 300)),
          y: Math.max(40, Math.min(baseY, bannerHeight - 80)),
        })
      })
    } else {
      // Add new random text elements if no user text exists
      const textCount = 1 + Math.floor(Math.random() * 3)
      for (let i = 0; i < textCount; i++) {
        const sampleTexts = [
          'Your Brand Here',
          'Create Amazing',
          'Get Started Today',
          'Join Us Now',
          'Limited Time',
        ]

        // Select random font from available fonts
        const randomFont = FONT_FAMILIES[Math.floor(Math.random() * FONT_FAMILIES.length)]
        const selectedFontFamily = getFontFamilyString(randomFont.name)

        addTextElement({
          text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
          color: textColors[i % textColors.length] || '#FFFFFF',
          fontSize: ['large', 'xlarge', 'xxlarge', 'huge'][Math.floor(Math.random() * 4)] as any,
          fontFamily: selectedFontFamily,
          fontWeight: ['500', '600', '700', '800'][Math.floor(Math.random() * 4)],
          x: Math.random() * (state.value.currentSize.width * 0.6),
          y: Math.random() * (state.value.currentSize.height * 0.6) + 50 + i * 80,
        })
      }
    }

    // Handle user images - preserve with slight position adjustments
    if (userImages.length > 0) {
      console.log('💾 Preserving user images:', userImages.length)
      userImages.forEach((userImage) => {
        // Keep user images but potentially adjust their positioning slightly
        const adjustmentX = (Math.random() - 0.5) * 40
        const adjustmentY = (Math.random() - 0.5) * 40

        updateImage(userImage.id, {
          x: Math.max(
            0,
            Math.min(userImage.x + adjustmentX, state.value.currentSize.width - userImage.width),
          ),
          y: Math.max(
            0,
            Math.min(userImage.y + adjustmentY, state.value.currentSize.height - userImage.height),
          ),
        })
      })
    }

    // Add random icons (always regenerated for variety)
    const iconCount = Math.floor(Math.random() * 3)
    for (let i = 0; i < iconCount; i++) {
      const randomIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)]
      addIcon(randomIcon.id)
    }

    console.log('✅ Smart Randomizer Complete (Simple Store):', {
      preservedUserText: userTextElements.length,
      preservedUserImages: userImages.length,
      finalTextCount: state.value.textElements.length,
      finalImageCount: state.value.images.length,
      finalIconCount: state.value.icons.length,
    })
  }

  // Export Functions
  async function exportBanner(options: ExportOptions): Promise<Blob> {
    return await CanvasService.exportToBlob(options)
  }

  function loadTemplate(template: BannerTemplate) {
    // Load template data
    state.value.currentSize = template.size
    state.value.currentBackground = template.background
    state.value.textElements = template.textElements.map((el) => ({
      ...el,
      id: ElementService.generateId(),
    }))
    state.value.images = template.images.map((img) => ({ ...img, id: ElementService.generateId() }))
    state.value.icons = template.icons.map((icon) => ({ ...icon, id: ElementService.generateId() }))

    renderCanvas()
  }

  // Watch for changes and re-render
  watch(
    () => state.value,
    () => {
      renderCanvas()
    },
    { deep: true },
  )

  return {
    // State
    state: computed(() => state.value),
    currentSize: computed(() => state.value.currentSize),
    currentBackground: computed(() => state.value.currentBackground),
    textElements: computed(() => state.value.textElements),
    images: computed(() => state.value.images),
    icons: computed(() => state.value.icons),
    canvasRef: computed(() => state.value.canvasRef),
    customWidth: computed(() => state.value.customWidth),
    customHeight: computed(() => state.value.customHeight),

    // Computed
    sizeCategories,
    backgroundsByType,
    iconCategories,
    filteredIcons,

    // Static Data
    bannerSizes,
    backgroundOptions,
    availableIcons,

    // Methods
    setCanvasRef,
    renderCanvas,
    selectSize,
    setCustomDimensions,
    selectBackground,
    updateFancyBackgroundColors,
    createImageBackground,
    updateBackgroundCrop,
    addTextElement,
    updateTextElement,
    removeTextElement,
    duplicateTextElement,
    addImage,
    updateImage,
    removeImage,
    addIcon,
    updateIcon,
    removeIcon,
    duplicateIcon,
    clearBanner,
    randomizeBanner,
    exportBanner,
    loadTemplate,
  }
})

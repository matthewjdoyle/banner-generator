import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBannerStore } from './banner'

describe('Banner Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initialization', () => {
    it('should initialize with default values', () => {
      const store = useBannerStore()
      
      expect(store.currentSize).toEqual({
        id: 'twitter-header',
        name: 'Twitter Header',
        width: 1500,
        height: 500,
        category: 'Social Media'
      })
      
      expect(store.currentBackground.type).toBe('gradient')
      expect(store.textElements).toHaveLength(1)
      expect(store.textElements[0].text).toBe('Your text here')
      expect(store.images).toEqual([])
      expect(store.icons).toEqual([])
    })

    it('should have predefined banner sizes', () => {
      const store = useBannerStore()
      
      expect(store.bannerSizes.length).toBeGreaterThan(0)
      expect(store.bannerSizes[0]).toHaveProperty('id')
      expect(store.bannerSizes[0]).toHaveProperty('name')
      expect(store.bannerSizes[0]).toHaveProperty('width')
      expect(store.bannerSizes[0]).toHaveProperty('height')
      expect(store.bannerSizes[0]).toHaveProperty('category')
    })

    it('should have predefined background options', () => {
      const store = useBannerStore()
      
      expect(store.backgroundOptions.length).toBeGreaterThan(0)
      expect(store.backgroundOptions[0]).toHaveProperty('id')
      expect(store.backgroundOptions[0]).toHaveProperty('name')
      expect(store.backgroundOptions[0]).toHaveProperty('type')
      expect(store.backgroundOptions[0]).toHaveProperty('value')
    })
  })

  describe('size management', () => {
    it('should select a new size', () => {
      const store = useBannerStore()
      const newSize = {
        id: 'custom-test',
        name: 'Test Size',
        width: 800,
        height: 600,
        category: 'Custom'
      }
      
      store.selectSize(newSize)
      
      expect(store.currentSize).toEqual(newSize)
    })

    it('should set custom dimensions', () => {
      const store = useBannerStore()
      
      store.setCustomDimensions(1920, 1080)
      
      expect(store.customWidth).toBe(1920)
      expect(store.customHeight).toBe(1080)
      
      const customSize = store.bannerSizes.find(size => size.id === 'custom-size')
      expect(customSize?.width).toBe(1920)
      expect(customSize?.height).toBe(1080)
    })
  })

  describe('background management', () => {
    it('should select a background', () => {
      const store = useBannerStore()
      const newBackground = store.backgroundOptions.find(bg => bg.type === 'solid')
      
      if (newBackground) {
        store.selectBackground(newBackground)
        expect(store.currentBackground).toEqual(newBackground)
      }
    })

    it('should create image background', () => {
      const store = useBannerStore()
      const imageUrl = 'data:image/png;base64,test'
      const name = 'Test Image'
      
      const imageBg = store.createImageBackground(imageUrl, name)
      
      expect(imageBg.type).toBe('image')
      expect(imageBg.name).toBe(name)
      expect(imageBg.value).toBe(imageUrl)
    })
  })

  describe('text element management', () => {
    it('should add text element', () => {
      const store = useBannerStore()
      const textElement = {
        text: 'Test Text',
        x: 100,
        y: 100,
        fontSize: 'medium' as const,
        color: '#FFFFFF',
        colorType: 'solid' as const,
        gradientColors: ['#3B82F6', '#1E40AF'],
        gradientDirection: 45,
        fontFamily: 'Inter',
        fontWeight: '600',
        textAlign: 'left' as const,
        letterSpacing: 0,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: false,
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 4,
          offsetX: 2,
          offsetY: 2
        },
        stroke: {
          enabled: false,
          color: '#000000',
          width: 2
        }
      }
      
      store.addTextElement(textElement)
      
      expect(store.textElements).toHaveLength(2) // Default text + new text
      expect(store.textElements[1]).toMatchObject(textElement)
      expect(store.textElements[1]).toHaveProperty('id')
    })

    it('should update text element', () => {
      const store = useBannerStore()
      const textElement = {
        text: 'Test Text',
        x: 100,
        y: 100,
        fontSize: 'medium' as const,
        color: '#FFFFFF',
        colorType: 'solid' as const,
        gradientColors: ['#3B82F6', '#1E40AF'],
        gradientDirection: 45,
        fontFamily: 'Inter',
        fontWeight: '600',
        textAlign: 'left' as const,
        letterSpacing: 0,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: false,
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 4,
          offsetX: 2,
          offsetY: 2
        },
        stroke: {
          enabled: false,
          color: '#000000',
          width: 2
        }
      }
      
      store.addTextElement(textElement)
      const id = store.textElements[1].id // Use index 1 since 0 is the default text
      
      store.updateTextElement(id, { text: 'Updated Text', color: '#FF0000' })
      
      expect(store.textElements[1].text).toBe('Updated Text')
      expect(store.textElements[1].color).toBe('#FF0000')
    })

    it('should remove text element', () => {
      const store = useBannerStore()
      const textElement = {
        text: 'Test Text',
        x: 100,
        y: 100,
        fontSize: 'medium' as const,
        color: '#FFFFFF',
        colorType: 'solid' as const,
        gradientColors: ['#3B82F6', '#1E40AF'],
        gradientDirection: 45,
        fontFamily: 'Inter',
        fontWeight: '600',
        textAlign: 'left' as const,
        letterSpacing: 0,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: false,
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 4,
          offsetX: 2,
          offsetY: 2
        },
        stroke: {
          enabled: false,
          color: '#000000',
          width: 2
        }
      }
      
      store.addTextElement(textElement)
      const id = store.textElements[1].id // Use index 1 since 0 is the default text
      
      store.removeTextElement(id)
      
      expect(store.textElements).toHaveLength(1) // Should have 1 left (the default text)
    })
  })

  describe('image management', () => {
    it('should add image', () => {
      const store = useBannerStore()
      const image = {
        src: 'test.jpg',
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        borderRadius: 0
      }
      
      store.addImage(image)
      
      expect(store.images).toHaveLength(1)
      expect(store.images[0]).toMatchObject(image)
    })

    it('should update image', () => {
      const store = useBannerStore()
      const image = {
        src: 'data:image/png;base64,test',
        x: 50,
        y: 50,
        width: 300,
        height: 300,
        borderRadius: 0
      }
      
      store.addImage(image)
      const id = store.images[0].id
      
      store.updateImage(id, { width: 400, height: 400 })
      
      expect(store.images[0].width).toBe(400)
      expect(store.images[0].height).toBe(400)
    })

    it('should remove image', () => {
      const store = useBannerStore()
      const image = {
        src: 'test.jpg',
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        borderRadius: 0
      }
      
      store.addImage(image)
      const id = store.images[0].id
      
      store.removeImage(id)
      
      expect(store.images).toHaveLength(0)
    })
  })

  describe('icon management', () => {
    it('should add icon', () => {
      const store = useBannerStore()
      
      store.addIcon('star')
      
      expect(store.icons).toHaveLength(1)
      expect(store.icons[0].type).toBe('star')
      expect(store.icons[0]).toHaveProperty('id')
    })

    it('should update icon', () => {
      const store = useBannerStore()
      
      store.addIcon('star')
      const id = store.icons[0].id
      
      store.updateIcon(id, { size: 100, color: '#FF0000' })
      
      expect(store.icons[0].size).toBe(100)
      expect(store.icons[0].color).toBe('#FF0000')
    })

    it('should remove icon', () => {
      const store = useBannerStore()
      
      store.addIcon('star')
      const id = store.icons[0].id
      
      store.removeIcon(id)
      
      expect(store.icons).toHaveLength(0)
    })
  })

  describe('clear banner', () => {
    it('should clear all elements', () => {
      const store = useBannerStore()
      
      // Add some elements
      store.addTextElement({
        text: 'Test',
        x: 0,
        y: 0,
        fontSize: 'medium',
        color: '#000',
        colorType: 'solid',
        gradientColors: ['#3B82F6', '#1E40AF'],
        gradientDirection: 45,
        fontFamily: 'Inter',
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 0,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: { enabled: false, color: '#000', blur: 0, offsetX: 0, offsetY: 0 },
        stroke: { enabled: false, color: '#000', width: 1 }
      })
      store.addIcon('star')
      store.addImage({
        src: 'test',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        borderRadius: 0
      })
      
      store.clearBanner()
      
      expect(store.textElements).toHaveLength(0)
      expect(store.icons).toHaveLength(0)
      expect(store.images).toHaveLength(0)
    })
  })
}) 
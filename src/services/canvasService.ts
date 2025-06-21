import type {
  BannerState,
  TextElement,
  BannerImage,
  BannerIcon,
  BackgroundOption,
  AvailableIcon,
  ExportOptions,
} from '@/types'

/**
 * Canvas rendering service for banner generation
 */
export class CanvasService {
  private static canvas: HTMLCanvasElement | null = null
  private static ctx: CanvasRenderingContext2D | null = null
  private static availableIcons: AvailableIcon[] = []

  static setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  static setAvailableIcons(icons: AvailableIcon[]) {
    this.availableIcons = icons
  }

  /**
   * Main render function for the banner
   */
  static async renderBanner(state: BannerState): Promise<void> {
    if (!this.canvas || !this.ctx) return

    const { currentSize, currentBackground, textElements, images, icons } = state

    // Set canvas dimensions
    this.canvas.width = currentSize.width
    this.canvas.height = currentSize.height

    // Clear canvas
    this.ctx.clearRect(0, 0, currentSize.width, currentSize.height)

    // Render background
    await this.renderBackground(currentBackground, currentSize.width, currentSize.height)

    // Render images
    for (const image of images) {
      await this.renderImage(image)
    }

    // Render icons
    for (const icon of icons) {
      this.renderIcon(icon)
    }

    // Render text elements
    for (const textElement of textElements) {
      this.renderText(textElement)
    }
  }

  /**
   * Render background
   */
  private static async renderBackground(
    background: BackgroundOption,
    width: number,
    height: number,
  ): Promise<void> {
    if (!this.ctx) return

    switch (background.type) {
      case 'solid':
        this.ctx.fillStyle = background.value
        this.ctx.fillRect(0, 0, width, height)
        break

      case 'gradient':
        this.renderGradientBackground(background, width, height)
        break

      case 'image':
        await this.renderImageBackground(background, width, height)
        break

      case 'fancy':
        this.renderFancyBackground(background, width, height)
        break
    }
  }

  /**
   * Render gradient background
   */
  private static renderGradientBackground(
    background: BackgroundOption,
    width: number,
    height: number,
  ): void {
    if (!this.ctx || !background.gradientColors) return

    const angle = background.gradientDirection ? parseInt(background.gradientDirection) : 45
    const radians = (angle * Math.PI) / 180

    const x1 = width / 2 - (Math.cos(radians) * width) / 2
    const y1 = height / 2 - (Math.sin(radians) * height) / 2
    const x2 = width / 2 + (Math.cos(radians) * width) / 2
    const y2 = height / 2 + (Math.sin(radians) * height) / 2

    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2)

    background.gradientColors.forEach((color, index) => {
      gradient.addColorStop(index / (background.gradientColors!.length - 1), color)
    })

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, width, height)
  }

  /**
   * Render image background
   */
  private static async renderImageBackground(
    background: BackgroundOption,
    width: number,
    height: number,
  ): Promise<void> {
    if (!this.ctx) return

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = background.value
      })

      // Calculate position based on crop settings
      const cropY = background.cropY || 50
      const scale = background.scale || 1

      // Calculate dimensions to cover the entire canvas
      const aspectRatio = img.width / img.height
      const canvasAspectRatio = width / height

      let drawWidth, drawHeight, offsetX, offsetY

      if (aspectRatio > canvasAspectRatio) {
        // Image is wider than canvas
        drawHeight = height * scale
        drawWidth = drawHeight * aspectRatio
        offsetX = -(drawWidth - width) / 2
        offsetY = -((drawHeight - height) * cropY) / 100
      } else {
        // Image is taller than canvas
        drawWidth = width * scale
        drawHeight = drawWidth / aspectRatio
        offsetX = -(drawWidth - width) / 2
        offsetY = -((drawHeight - height) * cropY) / 100
      }

      this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    } catch (error) {
      console.error('Failed to load background image:', error)
      // Fallback to solid color
      this.ctx.fillStyle = '#f0f0f0'
      this.ctx.fillRect(0, 0, width, height)
    }
  }

  /**
   * Render fancy pattern background
   */
  private static renderFancyBackground(
    background: BackgroundOption,
    width: number,
    height: number,
  ): void {
    if (!this.ctx || !background.patternColors) return

    const colors = background.patternColors

    // Example: geometric pattern
    this.ctx.fillStyle = colors[0] || '#f0f0f0'
    this.ctx.fillRect(0, 0, width, height)

    // Add pattern elements
    const patternSize = 50
    const color2 = colors[1] || '#e0e0e0'

    this.ctx.fillStyle = color2
    for (let x = 0; x < width; x += patternSize * 2) {
      for (let y = 0; y < height; y += patternSize * 2) {
        this.ctx.fillRect(x, y, patternSize, patternSize)
        this.ctx.fillRect(x + patternSize, y + patternSize, patternSize, patternSize)
      }
    }
  }

  /**
   * Render text element
   */
  private static renderText(textElement: TextElement): void {
    if (!this.ctx) return

    this.ctx.save()

    // Set font properties
    const fontSize = this.getFontSizeInPixels(textElement.fontSize)
    this.ctx.font = `${textElement.fontWeight} ${fontSize}px ${textElement.fontFamily}`
    this.ctx.textAlign = textElement.textAlign
    this.ctx.globalAlpha = textElement.opacity

    // Apply rotation
    if (textElement.rotation !== 0) {
      this.ctx.translate(textElement.x, textElement.y)
      this.ctx.rotate((textElement.rotation * Math.PI) / 180)
      this.ctx.translate(-textElement.x, -textElement.y)
    }

    // Apply shadow
    if (textElement.shadow.enabled) {
      this.ctx.shadowColor = textElement.shadow.color
      this.ctx.shadowBlur = textElement.shadow.blur
      this.ctx.shadowOffsetX = textElement.shadow.offsetX
      this.ctx.shadowOffsetY = textElement.shadow.offsetY
    }

    // Set fill style (solid or gradient)
    if (textElement.colorType === 'gradient' && textElement.gradientColors) {
      const gradient = this.createTextGradient(textElement)
      this.ctx.fillStyle = gradient
    } else {
      this.ctx.fillStyle = textElement.color
    }

    // Apply stroke
    if (textElement.stroke.enabled) {
      this.ctx.strokeStyle = textElement.stroke.color
      this.ctx.lineWidth = textElement.stroke.width
      this.ctx.strokeText(textElement.text, textElement.x, textElement.y)
    }

    // Render text
    this.ctx.fillText(textElement.text, textElement.x, textElement.y)

    this.ctx.restore()
  }

  /**
   * Render image element
   */
  private static async renderImage(imageElement: BannerImage): Promise<void> {
    if (!this.ctx) return

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = imageElement.src
      })

      this.ctx.save()

      // Apply border radius if specified
      if (imageElement.borderRadius > 0) {
        const radius =
          ((imageElement.borderRadius / 100) * Math.min(imageElement.width, imageElement.height)) /
          2
        this.ctx.beginPath()
        this.ctx.roundRect(
          imageElement.x,
          imageElement.y,
          imageElement.width,
          imageElement.height,
          radius,
        )
        this.ctx.clip()
      }

      this.ctx.drawImage(
        img,
        imageElement.x,
        imageElement.y,
        imageElement.width,
        imageElement.height,
      )
      this.ctx.restore()
    } catch (error) {
      console.error('Failed to render image:', error)
    }
  }

  /**
   * Render icon element
   */
  private static renderIcon(iconElement: BannerIcon): void {
    if (!this.ctx) return

    const iconData = this.availableIcons.find((icon) => icon.id === iconElement.type)
    if (!iconData) return

    this.ctx.save()

    // Apply transformations
    this.ctx.globalAlpha = iconElement.opacity
    this.ctx.translate(iconElement.x + iconElement.size / 2, iconElement.y + iconElement.size / 2)

    if (iconElement.rotation !== 0) {
      this.ctx.rotate((iconElement.rotation * Math.PI) / 180)
    }

    if (iconElement.flipX) {
      this.ctx.scale(-1, 1)
    }

    if (iconElement.flipY) {
      this.ctx.scale(1, -1)
    }

    // Apply shadow
    if (iconElement.shadow.enabled) {
      this.ctx.shadowColor = iconElement.shadow.color
      this.ctx.shadowBlur = iconElement.shadow.blur
      this.ctx.shadowOffsetX = iconElement.shadow.offsetX
      this.ctx.shadowOffsetY = iconElement.shadow.offsetY
    }

    // Set fill style
    if (iconElement.colorType === 'gradient' && iconElement.gradientColors) {
      const gradient = this.ctx.createLinearGradient(
        -iconElement.size / 2,
        -iconElement.size / 2,
        iconElement.size / 2,
        iconElement.size / 2,
      )
      iconElement.gradientColors.forEach((color, index) => {
        gradient.addColorStop(index / (iconElement.gradientColors!.length - 1), color)
      })
      this.ctx.fillStyle = gradient
    } else {
      this.ctx.fillStyle = iconElement.color
    }

    // Render icon (simplified - in real implementation you'd parse SVG or use emoji)
    this.ctx.font = `${iconElement.size}px Arial`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(iconData.svg, 0, 0)

    this.ctx.restore()
  }

  /**
   * Export banner to blob
   */
  static async exportToBlob(options: ExportOptions): Promise<Blob> {
    if (!this.canvas) throw new Error('Canvas not initialized')

    return new Promise((resolve, reject) => {
      this.canvas!.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob'))),
        `image/${options.format}`,
        options.quality,
      )
    })
  }

  /**
   * Helper methods
   */
  private static getFontSizeInPixels(fontSize: TextElement['fontSize']): number {
    const fontSizes = {
      tiny: 16,
      small: 24,
      medium: 36,
      large: 48,
      xlarge: 60,
      xxlarge: 72,
      huge: 96,
      massive: 120,
      giant: 144,
    }
    return fontSizes[fontSize] || 36
  }

  private static createTextGradient(textElement: TextElement): CanvasGradient {
    if (!this.ctx || !textElement.gradientColors) {
      throw new Error('Context or gradient colors not available')
    }

    const gradient = this.ctx.createLinearGradient(
      textElement.x,
      textElement.y,
      textElement.x + 100,
      textElement.y + 100,
    )

    textElement.gradientColors.forEach((color, index) => {
      gradient.addColorStop(index / (textElement.gradientColors!.length - 1), color)
    })

    return gradient
  }
}

import type { TextElement, BannerImage, BannerIcon, BannerSize } from '@/types'

/**
 * Service for managing banner elements
 */
export class ElementService {
  /**
   * Generate unique ID for elements
   */
  static generateId(): string {
    return `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Create new text element with default values
   */
  static createTextElement(text: string, size: BannerSize): TextElement {
    return {
      id: this.generateId(),
      text,
      x: size.width * 0.1,
      y: size.height * 0.1,
      fontSize: 'medium',
      color: '#FFFFFF',
      colorType: 'solid',
      gradientColors: ['#3B82F6', '#1E40AF'],
      gradientDirection: 45,
      fontFamily: 'Inter',
      fontWeight: '600',
      textAlign: 'left',
      letterSpacing: 0,
      lineHeight: 1.2,
      rotation: 0,
      opacity: 1,
      shadow: {
        enabled: false,
        color: 'rgba(0, 0, 0, 0.3)',
        blur: 4,
        offsetX: 2,
        offsetY: 2,
      },
      stroke: {
        enabled: false,
        color: '#000000',
        width: 2,
      },
    }
  }

  /**
   * Create new image element with default values
   */
  static createImageElement(src: string, size: BannerSize): BannerImage {
    return {
      id: this.generateId(),
      src,
      x: size.width * 0.1,
      y: size.height * 0.1,
      width: 300,
      height: 300,
      borderRadius: 0,
    }
  }

  /**
   * Create new icon element with default values
   */
  static createIconElement(type: string, size: BannerSize): BannerIcon {
    return {
      id: this.generateId(),
      type,
      x: size.width * 0.1,
      y: size.height * 0.1,
      size: 64,
      rotation: 0,
      opacity: 1,
      color: '#FFFFFF',
      colorType: 'solid',
      gradientColors: ['#3B82F6', '#1E40AF'],
      gradientDirection: 45,
      shadow: {
        enabled: false,
        color: 'rgba(0, 0, 0, 0.3)',
        blur: 4,
        offsetX: 2,
        offsetY: 2,
      },
      flipX: false,
      flipY: false,
    }
  }

  /**
   * Adjust element positions when banner size changes
   */
  static adjustElementsToNewSize(
    elements: { x: number; y: number; width?: number; height?: number; size?: number }[],
    oldSize: BannerSize,
    newSize: BannerSize,
  ): void {
    const xRatio = newSize.width / oldSize.width
    const yRatio = newSize.height / oldSize.height

    elements.forEach((element) => {
      element.x = Math.round(element.x * xRatio)
      element.y = Math.round(element.y * yRatio)

      // Adjust width/height for images
      if ('width' in element && 'height' in element) {
        element.width = Math.round(element.width! * xRatio)
        element.height = Math.round(element.height! * yRatio)
      }

      // Adjust size for icons
      if ('size' in element) {
        element.size = Math.round(element.size! * Math.min(xRatio, yRatio))
      }
    })
  }

  /**
   * Validate element position and size bounds
   */
  static validateElementBounds(element: any, canvasSize: BannerSize): void {
    // Ensure element is within canvas bounds
    element.x = Math.max(
      0,
      Math.min(element.x, canvasSize.width - (element.width || element.size || 50)),
    )
    element.y = Math.max(
      0,
      Math.min(element.y, canvasSize.height - (element.height || element.size || 50)),
    )

    // Ensure minimum sizes
    if ('width' in element) {
      element.width = Math.max(10, element.width)
    }
    if ('height' in element) {
      element.height = Math.max(10, element.height)
    }
    if ('size' in element) {
      element.size = Math.max(10, element.size)
    }
  }

  /**
   * Clone element with new position
   */
  static cloneElement<T extends { id: string; x: number; y: number }>(
    element: T,
    offset: { x: number; y: number },
  ): T {
    return {
      ...element,
      id: this.generateId(),
      x: element.x + offset.x,
      y: element.y + offset.y,
    }
  }

  /**
   * Get element bounds
   */
  static getElementBounds(element: any): { x: number; y: number; width: number; height: number } {
    const width = element.width || element.size || 50
    const height = element.height || element.size || 50

    return {
      x: element.x,
      y: element.y,
      width,
      height,
    }
  }

  /**
   * Check if point is within element bounds
   */
  static isPointInElement(point: { x: number; y: number }, element: any): boolean {
    const bounds = this.getElementBounds(element)
    return (
      point.x >= bounds.x &&
      point.x <= bounds.x + bounds.width &&
      point.y >= bounds.y &&
      point.y <= bounds.y + bounds.height
    )
  }

  /**
   * Get elements at point (for click detection)
   */
  static getElementsAtPoint(point: { x: number; y: number }, elements: any[]): any[] {
    return elements.filter((element) => this.isPointInElement(point, element))
  }

  /**
   * Sort elements by z-index (rendering order)
   */
  static sortElementsByZIndex(elements: any[]): any[] {
    return [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
  }

  /**
   * Move element to front
   */
  static moveElementToFront(elementId: string, elements: any[]): void {
    const maxZIndex = Math.max(...elements.map((el) => el.zIndex || 0))
    const element = elements.find((el) => el.id === elementId)
    if (element) {
      element.zIndex = maxZIndex + 1
    }
  }

  /**
   * Move element to back
   */
  static moveElementToBack(elementId: string, elements: any[]): void {
    const minZIndex = Math.min(...elements.map((el) => el.zIndex || 0))
    const element = elements.find((el) => el.id === elementId)
    if (element) {
      element.zIndex = minZIndex - 1
    }
  }
}

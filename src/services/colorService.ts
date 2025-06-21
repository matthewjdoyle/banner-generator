/**
 * Color utility service for banner generation
 */

export class ColorService {
  /**
   * Generate harmonious colors based on color theory
   */
  static generateHarmoniousColors(): string[] {
    const hues = [
      Math.floor(Math.random() * 360), // Primary hue
      (Math.floor(Math.random() * 360) + 30) % 360, // Analogous
      (Math.floor(Math.random() * 360) + 180) % 360, // Complementary
      (Math.floor(Math.random() * 360) + 150) % 360, // Triadic
    ]

    return hues.map((hue) => {
      const saturation = 70 + Math.random() * 20 // 70-90%
      const lightness = 45 + Math.random() * 20 // 45-65%
      return this.hslToHex(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    })
  }

  /**
   * Convert HSL to Hex color
   */
  static hslToHex(hsl: string): string {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (!match) return '#000000'

    const h = parseInt(match[1]) / 360
    const s = parseInt(match[2]) / 100
    const l = parseInt(match[3]) / 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let r, g, b

    if (s === 0) {
      r = g = b = l // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  /**
   * Check if a color is light or dark
   */
  static isLightColor(hex: string): boolean {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return false

    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
    return luminance > 0.5
  }

  /**
   * Get contrasting text color (black or white) for a background
   */
  static getContrastingTextColor(backgroundColor: string): string {
    return this.isLightColor(backgroundColor) ? '#000000' : '#FFFFFF'
  }

  /**
   * Get dominant color from background option
   */
  static getDominantBackgroundColor(background: {
    type: string
    value: string
    gradientColors?: string[]
  }): string {
    if (background.type === 'gradient' && background.gradientColors) {
      return background.gradientColors[0]
    }
    return background.value
  }

  /**
   * Check if two colors are similar within a threshold
   */
  static areColorsSimilar(color1: string, color2: string, threshold: number = 50): boolean {
    const rgb1 = this.hexToRgb(color1)
    const rgb2 = this.hexToRgb(color2)

    if (!rgb1 || !rgb2) return false

    const distance = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2),
    )

    return distance < threshold
  }

  /**
   * Convert hex to RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  /**
   * Generate contrasting text colors for given background colors
   */
  static generateContrastingTextColors(backgroundColors: string[]): string[] {
    const textColors = [
      '#FFFFFF',
      '#000000',
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FECA57',
      '#FF9FF3',
    ]

    return textColors
      .filter((textColor) => {
        return backgroundColors.every(
          (bgColor) =>
            !this.areColorsSimilar(
              textColor,
              this.getDominantBackgroundColor({ type: 'solid', value: bgColor }),
              80,
            ),
        )
      })
      .slice(0, 4)
  }

  /**
   * Generate random color
   */
  static generateRandomColor(): string {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    )
  }

  /**
   * Darken a color by a percentage
   */
  static darkenColor(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return hex

    const factor = (100 - percent) / 100
    return `#${Math.round(rgb.r * factor)
      .toString(16)
      .padStart(2, '0')}${Math.round(rgb.g * factor)
      .toString(16)
      .padStart(2, '0')}${Math.round(rgb.b * factor)
      .toString(16)
      .padStart(2, '0')}`
  }

  /**
   * Lighten a color by a percentage
   */
  static lightenColor(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return hex

    const factor = percent / 100
    const r = Math.round(rgb.r + (255 - rgb.r) * factor)
    const g = Math.round(rgb.g + (255 - rgb.g) * factor)
    const b = Math.round(rgb.b + (255 - rgb.b) * factor)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
}

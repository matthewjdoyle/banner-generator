import type { BackgroundOption } from '../types'

// Color theory helper functions
export function generateHarmoniousColors(): string[] {
  // Generate a truly random base hue (0-360)
  const baseHue = Math.floor(Math.random() * 360)

  const colorSchemes = [
    // Complementary
    () => [baseHue, (baseHue + 180) % 360],
    // Triadic
    () => [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360],
    // Analogous
    () => [baseHue, (baseHue + 30) % 360, (baseHue - 30 + 360) % 360],
    // Split complementary
    () => [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360],
    // Tetradic
    () => [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360],
    // Monochromatic with varied saturation/lightness
    () => [baseHue, baseHue, baseHue, baseHue],
  ]

  const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]()

  // Vary saturation and lightness for more interesting colors
  const colors = scheme.map((hue, index) => {
    const saturation = Math.floor(50 + Math.random() * 40) // 50-90%
    const lightness = Math.floor(30 + Math.random() * 50) // 30-80%
    return `hsl(${Math.floor(hue)}, ${saturation}%, ${lightness}%)`
  })

  // Ensure we have at least 4 colors for variety
  while (colors.length < 4) {
    const randomHue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(50 + Math.random() * 40)
    const lightness = Math.floor(30 + Math.random() * 50)
    colors.push(`hsl(${randomHue}, ${saturation}%, ${lightness}%)`)
  }

  return colors
}

export function hslToHex(hsl: string): string {
  // More robust HSL parsing with better regex
  const match = hsl.match(
    /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)/,
  )
  if (!match) {
    console.warn('Failed to parse HSL color:', hsl)
    // Generate a random color instead of defaulting to blue
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`
  }

  const h = parseFloat(match[1]) / 360
  const s = parseFloat(match[2]) / 100
  const l = parseFloat(match[3]) / 100

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
    r = g = b = l
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

// Helper function to determine if a color is light or dark
export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // Calculate relative luminance using sRGB formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

// Helper function to get contrasting text color
export function getContrastingTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF'
}

// Helper function to get the dominant background color
export function getDominantBackgroundColor(background: BackgroundOption): string {
  if (background.type === 'solid') {
    return background.value
  } else if (background.type === 'gradient' && background.gradientColors) {
    // Use the first color of the gradient as dominant
    return background.gradientColors[0]
  } else if (background.type === 'fancy' && background.patternColors) {
    // Use the first pattern color as dominant
    return background.patternColors[0]
  } else if (background.type === 'image') {
    // For images, assume dark background (most stock images work better with white text)
    return '#333333'
  }
  return '#333333' // Default to dark
}

// Helper function to check if two colors are too similar
export function areColorsSimilar(color1: string, color2: string, threshold: number = 50): boolean {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return false

  // Calculate color distance using Euclidean distance in RGB space
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2),
  )

  return distance < threshold
}

// Helper function to convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Generate text colors that contrast well with background colors
export function generateContrastingTextColors(backgroundColors: string[]): string[] {
  const textColors: string[] = []

  // Generate complementary colors for text that avoid background colors
  for (let i = 0; i < 4; i++) {
    let attempts = 0
    let textColor: string

    do {
      // Generate a color with good contrast
      const baseHue = Math.floor(Math.random() * 360)
      const saturation = Math.floor(60 + Math.random() * 30) // 60-90% for vibrant colors
      const lightness = Math.floor(25 + Math.random() * 50) // 25-75% for variety

      textColor = hslToHex(`hsl(${baseHue}, ${saturation}%, ${lightness}%)`)
      attempts++
    } while (
      attempts < 10 &&
      backgroundColors.some((bgColor) => areColorsSimilar(textColor, bgColor, 80))
    )

    textColors.push(textColor)
  }

  // Ensure we have high contrast options
  textColors.push('#FFFFFF', '#000000') // Always include pure white and black

  return textColors
}

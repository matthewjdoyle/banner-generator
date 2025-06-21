// Types and interfaces

// Core Banner Types
export interface BannerSize {
  id: string
  name: string
  width: number
  height: number
  category: string
}

export interface BackgroundOption {
  id: string
  name: string
  type: 'solid' | 'gradient' | 'pattern' | 'image' | 'fancy'
  value: string
  gradientDirection?: string
  gradientColors?: string[]
  preview: string
  patternType?: string
  patternColors?: string[]
  // Image background properties
  cropX?: number // 0-100 percentage for horizontal positioning
  cropY?: number // 0-100 percentage for vertical positioning
  scale?: number // Scale factor for the image (1 = fit, >1 = zoom in)
}

export interface TextElement {
  id: string
  text: string
  x: number
  y: number
  fontSize:
    | 'tiny'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | 'huge'
    | 'massive'
    | 'giant'
  color: string
  colorType: 'solid' | 'gradient'
  gradientColors?: string[]
  gradientDirection?: number
  fontFamily: string
  fontWeight: string
  textAlign: 'left' | 'center' | 'right'
  letterSpacing: number
  lineHeight: number
  rotation: number
  opacity: number
  shadow: ShadowEffect
  stroke: StrokeEffect
}

export interface BannerImage {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
  borderRadius: number
}

export interface BannerIcon {
  id: string
  type: string
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  color: string
  colorType: 'solid' | 'gradient'
  gradientColors?: string[]
  gradientDirection?: number
  shadow: ShadowEffect
  flipX: boolean
  flipY: boolean
}

export interface ShadowEffect {
  enabled: boolean
  color: string
  blur: number
  offsetX: number
  offsetY: number
}

export interface StrokeEffect {
  enabled: boolean
  color: string
  width: number
}

export interface AvailableIcon {
  id: string
  name: string
  category: string
  svg: string
}

export interface BannerState {
  // Dimensions
  currentSize: BannerSize
  customWidth: number
  customHeight: number

  // Background
  currentBackground: BackgroundOption

  // Elements
  textElements: TextElement[]
  images: BannerImage[]
  icons: BannerIcon[]

  // Canvas reference
  canvasRef: HTMLCanvasElement | null
}

// Template Types
export interface BannerTemplate {
  id: string
  name: string
  category: string
  description: string
  thumbnail: string
  size: BannerSize
  background: BackgroundOption
  textElements: Omit<TextElement, 'id'>[]
  images: Omit<BannerImage, 'id'>[]
  icons: Omit<BannerIcon, 'id'>[]
  tags: string[]
}

// Export/Import Types
export interface ExportOptions {
  format: 'png' | 'jpg'
  quality: number
}

export interface BannerData {
  size: BannerSize
  background: BackgroundOption
  textElements: TextElement[]
  images: BannerImage[]
  icons: BannerIcon[]
}

// Utility Types
export type ElementType = 'text' | 'image' | 'icon'
export type ColorType = 'solid' | 'gradient'
export type FontSize = TextElement['fontSize']
export type TextAlign = TextElement['textAlign']

// Font configuration
export interface FontFamily {
  name: string
  display: string
  category: 'sans-serif' | 'serif' | 'monospace' | 'decorative' | 'handwritten'
  webSafe: boolean
  fallback: string
}

export const FONT_FAMILIES: FontFamily[] = [
  // Modern Sans-Serif
  {
    name: 'Inter',
    display: 'Inter',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'system-ui, sans-serif',
  },
  {
    name: 'Space Grotesk',
    display: 'Space Grotesk',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Poppins',
    display: 'Poppins',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Montserrat',
    display: 'Montserrat',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Nunito',
    display: 'Nunito',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Outfit',
    display: 'Outfit',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'DM Sans',
    display: 'DM Sans',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Plus Jakarta Sans',
    display: 'Plus Jakarta Sans',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },

  // Display & Headers
  {
    name: 'Bebas Neue',
    display: 'Bebas Neue',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Oswald',
    display: 'Oswald',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Anton',
    display: 'Anton',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Righteous',
    display: 'Righteous',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Fredoka One',
    display: 'Fredoka One',
    category: 'decorative',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },
  {
    name: 'Comfortaa',
    display: 'Comfortaa',
    category: 'sans-serif',
    webSafe: false,
    fallback: 'Arial, sans-serif',
  },

  // Classical Gothic Fonts - Tasteful & Elegant
  {
    name: 'Cinzel',
    display: 'Cinzel',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Cinzel Decorative',
    display: 'Cinzel Decorative',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Cormorant Garamond',
    display: 'Cormorant Garamond',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Cormorant SC',
    display: 'Cormorant SC',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Uncial Antiqua',
    display: 'Uncial Antiqua',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Almendra',
    display: 'Almendra',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Almendra SC',
    display: 'Almendra SC',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Caudex',
    display: 'Caudex',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'UnifrakturMaguntia',
    display: 'UnifrakturMaguntia',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Metamorphous',
    display: 'Metamorphous',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Macondo',
    display: 'Macondo',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },

  // Dark Gothic Fonts - Edgy but Readable
  {
    name: 'Creepster',
    display: 'Creepster',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Nosifer',
    display: 'Nosifer',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Butcherman',
    display: 'Butcherman',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Chonburi',
    display: 'Chonburi',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Eater',
    display: 'Eater',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Metal Mania',
    display: 'Metal Mania',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Lacquer',
    display: 'Lacquer',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Pirata One',
    display: 'Pirata One',
    category: 'decorative',
    webSafe: false,
    fallback: 'serif',
  },

  // Elegant Serif
  {
    name: 'Playfair Display',
    display: 'Playfair Display',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Merriweather',
    display: 'Merriweather',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Lora',
    display: 'Lora',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },
  {
    name: 'Source Serif Pro',
    display: 'Source Serif Pro',
    category: 'serif',
    webSafe: false,
    fallback: 'serif',
  },

  // Handwritten & Script
  {
    name: 'Dancing Script',
    display: 'Dancing Script',
    category: 'handwritten',
    webSafe: false,
    fallback: 'cursive',
  },
  {
    name: 'Pacifico',
    display: 'Pacifico',
    category: 'handwritten',
    webSafe: false,
    fallback: 'cursive',
  },
  {
    name: 'Kalam',
    display: 'Kalam',
    category: 'handwritten',
    webSafe: false,
    fallback: 'cursive',
  },
  {
    name: 'Caveat',
    display: 'Caveat',
    category: 'handwritten',
    webSafe: false,
    fallback: 'cursive',
  },

  // Monospace
  {
    name: 'JetBrains Mono',
    display: 'JetBrains Mono',
    category: 'monospace',
    webSafe: false,
    fallback: 'monospace',
  },
  {
    name: 'Fira Code',
    display: 'Fira Code',
    category: 'monospace',
    webSafe: false,
    fallback: 'monospace',
  },
  {
    name: 'Space Mono',
    display: 'Space Mono',
    category: 'monospace',
    webSafe: false,
    fallback: 'monospace',
  },
]

export const FONT_CATEGORIES = [
  { id: 'all', name: 'All Fonts', icon: '��' },
  { id: 'sans-serif', name: 'Sans Serif', icon: '🔤' },
  { id: 'serif', name: 'Serif', icon: '📖' },
  { id: 'decorative', name: 'Display', icon: '✨' },
  { id: 'handwritten', name: 'Handwritten', icon: '✍️' },
  { id: 'monospace', name: 'Monospace', icon: '💻' },
] as const

// Helper functions
export function getFontFamilyString(fontName: string): string {
  const font = FONT_FAMILIES.find((f) => f.name === fontName)
  return font ? `${font.name}, ${font.fallback}` : fontName
}

export function getFontsByCategory(category: string): FontFamily[] {
  if (category === 'all') return FONT_FAMILIES
  return FONT_FAMILIES.filter((font) => font.category === category)
}

export function getPopularFonts(): FontFamily[] {
  return FONT_FAMILIES.filter((font) =>
    [
      'Inter',
      'Poppins',
      'Montserrat',
      'Bebas Neue',
      'Playfair Display',
      'Cinzel',
      'Cormorant Garamond',
      'Almendra',
      'Dancing Script',
      'Creepster',
      'JetBrains Mono',
    ].includes(font.name),
  )
}

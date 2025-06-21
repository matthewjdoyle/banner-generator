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
  shadow: {
    enabled: boolean
    color: string
    blur: number
    offsetX: number
    offsetY: number
  }
  stroke: {
    enabled: boolean
    color: string
    width: number
  }
}

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
  shadow: {
    enabled: boolean
    color: string
    blur: number
    offsetX: number
    offsetY: number
  }
  flipX: boolean
  flipY: boolean
}

export interface BannerTemplate {
  id: string
  name: string
  category: string
  size: BannerSize
  background: BackgroundOption
  textElements: Omit<TextElement, 'id'>[]
  images: Omit<BannerImage, 'id'>[]
  icons: (Omit<BannerIcon, 'id'> & { type: string })[]
}

export interface IconData {
  id: string
  name: string
  svg: string
  category: string
}

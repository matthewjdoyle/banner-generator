import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BannerTemplate } from './templates'

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

export const useBannerStore = defineStore('banner', () => {
  // State
  const currentSize = ref<BannerSize>({
    id: 'twitter-header',
    name: 'Twitter Header',
    width: 1500,
    height: 500,
    category: 'Social Media',
  })

  const currentBackground = ref<BackgroundOption>({
    id: 'gradient-blue',
    name: 'Ocean Blue',
    type: 'gradient',
    value: 'linear-gradient',
    gradientDirection: '45deg',
    gradientColors: ['#3B82F6', '#1E40AF'],
    preview: 'linear-gradient(45deg, #3B82F6, #1E40AF)',
  })

  const textElements = ref<TextElement[]>([])
  const images = ref<BannerImage[]>([])
  const icons = ref<BannerIcon[]>([])
  const canvasRef = ref<HTMLCanvasElement | null>(null)

  // Custom dimensions
  const customWidth = ref(1200)
  const customHeight = ref(600)

  // Banner sizes
  const bannerSizes = ref<BannerSize[]>([
    // Social Media
    {
      id: 'twitter-header',
      name: 'Twitter Header',
      width: 1500,
      height: 500,
      category: 'Social Media',
    },
    {
      id: 'facebook-cover',
      name: 'Facebook Cover',
      width: 1640,
      height: 859,
      category: 'Social Media',
    },
    {
      id: 'linkedin-banner',
      name: 'LinkedIn Banner',
      width: 1584,
      height: 396,
      category: 'Social Media',
    },
    {
      id: 'youtube-channel',
      name: 'YouTube Channel Art',
      width: 2560,
      height: 1440,
      category: 'Social Media',
    },
    {
      id: 'instagram-post',
      name: 'Instagram Post',
      width: 1080,
      height: 1080,
      category: 'Social Media',
    },
    {
      id: 'instagram-story',
      name: 'Instagram Story',
      width: 1080,
      height: 1920,
      category: 'Social Media',
    },

    // Web & Digital
    { id: 'web-banner', name: 'Web Banner', width: 1200, height: 300, category: 'Web & Digital' },
    {
      id: 'email-header',
      name: 'Email Header',
      width: 600,
      height: 200,
      category: 'Web & Digital',
    },
    { id: 'blog-header', name: 'Blog Header', width: 1200, height: 400, category: 'Web & Digital' },

    // Print & Marketing
    {
      id: 'flyer-horizontal',
      name: 'Flyer (Horizontal)',
      width: 1920,
      height: 1080,
      category: 'Print & Marketing',
    },
    {
      id: 'poster-vertical',
      name: 'Poster (Vertical)',
      width: 1080,
      height: 1920,
      category: 'Print & Marketing',
    },

    // Custom
    { id: 'square-large', name: 'Square Large', width: 1200, height: 1200, category: 'Custom' },
    { id: 'wide-banner', name: 'Wide Banner', width: 1920, height: 600, category: 'Custom' },
    { id: 'custom-size', name: 'Custom Size', width: 1200, height: 600, category: 'Custom' },
  ])

  // Background options
  const backgroundOptions = ref<BackgroundOption[]>([
    // Solid Colors
    {
      id: 'solid-white',
      name: 'Pure White',
      type: 'solid',
      value: '#FFFFFF',
      preview: '#FFFFFF',
    },
    {
      id: 'solid-black',
      name: 'Deep Black',
      type: 'solid',
      value: '#000000',
      preview: '#000000',
    },
    {
      id: 'solid-blue',
      name: 'Professional Blue',
      type: 'solid',
      value: '#3B82F6',
      preview: '#3B82F6',
    },
    {
      id: 'solid-purple',
      name: 'Royal Purple',
      type: 'solid',
      value: '#8B5CF6',
      preview: '#8B5CF6',
    },
    {
      id: 'solid-green',
      name: 'Fresh Green',
      type: 'solid',
      value: '#10B981',
      preview: '#10B981',
    },
    {
      id: 'solid-orange',
      name: 'Vibrant Orange',
      type: 'solid',
      value: '#F59E0B',
      preview: '#F59E0B',
    },
    {
      id: 'solid-pink',
      name: 'Modern Pink',
      type: 'solid',
      value: '#EC4899',
      preview: '#EC4899',
    },
    {
      id: 'solid-gray',
      name: 'Elegant Gray',
      type: 'solid',
      value: '#6B7280',
      preview: '#6B7280',
    },

    // Gradients
    {
      id: 'gradient-blue',
      name: 'Ocean Blue',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '45deg',
      gradientColors: ['#3B82F6', '#1E40AF'],
      preview: 'linear-gradient(45deg, #3B82F6, #1E40AF)',
    },
    {
      id: 'gradient-purple',
      name: 'Purple Dream',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '135deg',
      gradientColors: ['#8B5CF6', '#5B21B6'],
      preview: 'linear-gradient(135deg, #8B5CF6, #5B21B6)',
    },
    {
      id: 'gradient-sunset',
      name: 'Sunset Glow',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '90deg',
      gradientColors: ['#F59E0B', '#EF4444', '#EC4899'],
      preview: 'linear-gradient(90deg, #F59E0B, #EF4444, #EC4899)',
    },
    {
      id: 'gradient-green',
      name: 'Forest Fresh',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '180deg',
      gradientColors: ['#10B981', '#059669'],
      preview: 'linear-gradient(180deg, #10B981, #059669)',
    },
    {
      id: 'gradient-cosmic',
      name: 'Cosmic Space',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '45deg',
      gradientColors: ['#1E1B4B', '#7C3AED', '#EC4899'],
      preview: 'linear-gradient(45deg, #1E1B4B, #7C3AED, #EC4899)',
    },
    {
      id: 'gradient-dawn',
      name: 'Early Dawn',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '0deg',
      gradientColors: ['#FEF3C7', '#F59E0B', '#D97706'],
      preview: 'linear-gradient(0deg, #FEF3C7, #F59E0B, #D97706)',
    },
    {
      id: 'gradient-ocean',
      name: 'Deep Ocean',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '135deg',
      gradientColors: ['#0EA5E9', '#0284C7', '#0369A1'],
      preview: 'linear-gradient(135deg, #0EA5E9, #0284C7, #0369A1)',
    },
    {
      id: 'gradient-neon',
      name: 'Neon Lights',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '90deg',
      gradientColors: ['#06B6D4', '#8B5CF6', '#EC4899'],
      preview: 'linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899)',
    },

    // Fancy Patterns
    {
      id: 'fancy-dots',
      name: 'Polka Dots',
      type: 'fancy',
      value: 'dots',
      patternType: 'dots',
      patternColors: ['#3B82F6', '#FFFFFF'],
      preview: 'radial-gradient(circle, #3B82F6 20%, transparent 20%)',
    },
    {
      id: 'fancy-grid',
      name: 'Grid Lines',
      type: 'fancy',
      value: 'grid',
      patternType: 'grid',
      patternColors: ['#F3F4F6', '#6B7280'],
      preview:
        'linear-gradient(90deg, #6B7280 1px, transparent 1px), linear-gradient(#6B7280 1px, transparent 1px)',
    },
    {
      id: 'fancy-diagonal',
      name: 'Diagonal Stripes',
      type: 'fancy',
      value: 'diagonal',
      patternType: 'diagonal',
      patternColors: ['#8B5CF6', '#A78BFA'],
      preview:
        'repeating-linear-gradient(45deg, #8B5CF6, #8B5CF6 10px, #A78BFA 10px, #A78BFA 20px)',
    },
    {
      id: 'fancy-hexagon',
      name: 'Hexagon Pattern',
      type: 'fancy',
      value: 'hexagon',
      patternType: 'hexagon',
      patternColors: ['#10B981', '#34D399'],
      preview: 'conic-gradient(from 0deg, #10B981, #34D399, #10B981)',
    },
    {
      id: 'fancy-waves',
      name: 'Wave Pattern',
      type: 'fancy',
      value: 'waves',
      patternType: 'waves',
      patternColors: ['#0EA5E9', '#38BDF8'],
      preview: 'radial-gradient(ellipse at center, #0EA5E9 0%, #38BDF8 100%)',
    },
    {
      id: 'fancy-triangles',
      name: 'Triangle Mosaic',
      type: 'fancy',
      value: 'triangles',
      patternType: 'triangles',
      patternColors: ['#F59E0B', '#FBBF24', '#FDE047'],
      preview: 'conic-gradient(from 30deg, #F59E0B, #FBBF24, #FDE047, #F59E0B)',
    },
    {
      id: 'fancy-circles',
      name: 'Overlapping Circles',
      type: 'fancy',
      value: 'circles',
      patternType: 'circles',
      patternColors: ['#EC4899', '#F472B6'],
      preview:
        'radial-gradient(circle at 25% 25%, #EC4899 20%, transparent 20%), radial-gradient(circle at 75% 75%, #F472B6 20%, transparent 20%)',
    },
    {
      id: 'fancy-chevron',
      name: 'Chevron Pattern',
      type: 'fancy',
      value: 'chevron',
      patternType: 'chevron',
      patternColors: ['#7C3AED', '#A855F7'],
      preview:
        'repeating-linear-gradient(90deg, #7C3AED 0px, #7C3AED 10px, #A855F7 10px, #A855F7 20px)',
    },
    {
      id: 'fancy-stars',
      name: 'Starfield',
      type: 'fancy',
      value: 'stars',
      patternType: 'stars',
      patternColors: ['#1E1B4B', '#FBBF24'],
      preview:
        'radial-gradient(2px 2px at 20px 30px, #FBBF24, transparent), radial-gradient(2px 2px at 40px 70px, #FBBF24, transparent), radial-gradient(1px 1px at 90px 40px, #FBBF24, transparent)',
    },
    {
      id: 'fancy-noise',
      name: 'Digital Noise',
      type: 'fancy',
      value: 'noise',
      patternType: 'noise',
      patternColors: ['#374151', '#6B7280', '#9CA3AF'],
      preview:
        'repeating-conic-gradient(from 0deg, #374151 0deg 90deg, #6B7280 90deg 180deg, #9CA3AF 180deg 270deg, #374151 270deg 360deg)',
    },
    {
      id: 'fancy-bubbles',
      name: 'Bubble Pattern',
      type: 'fancy',
      value: 'bubbles',
      patternType: 'bubbles',
      patternColors: ['#06B6D4', '#67E8F9', '#CFFAFE'],
      preview:
        'radial-gradient(circle at 20% 80%, #CFFAFE 15%, transparent 15%), radial-gradient(circle at 80% 20%, #67E8F9 15%, transparent 15%), radial-gradient(circle at 40% 40%, #06B6D4 15%, transparent 15%)',
    },
    {
      id: 'fancy-circuit',
      name: 'Circuit Board',
      type: 'fancy',
      value: 'circuit',
      patternType: 'circuit',
      patternColors: ['#065F46', '#10B981'],
      preview:
        'linear-gradient(90deg, #10B981 2px, transparent 2px), linear-gradient(#10B981 2px, transparent 2px)',
    },
  ])

  // Available icons
  const availableIcons = ref([
    // Basic 2D Shapes
    { id: 'circle', name: 'Circle', svg: 'circle', category: 'Basic Shapes' },
    { id: 'square', name: 'Square', svg: 'square', category: 'Basic Shapes' },
    { id: 'triangle', name: 'Triangle', svg: 'triangle', category: 'Basic Shapes' },
    { id: 'diamond', name: 'Diamond', svg: 'diamond', category: 'Basic Shapes' },
    { id: 'hexagon', name: 'Hexagon', svg: 'hexagon', category: 'Basic Shapes' },
    { id: 'pentagon', name: 'Pentagon', svg: 'pentagon', category: 'Basic Shapes' },
    { id: 'star', name: 'Star', svg: 'star', category: 'Basic Shapes' },
    { id: 'heart', name: 'Heart', svg: 'heart', category: 'Basic Shapes' },

    // Arrows & Directions
    { id: 'arrow-right', name: 'Arrow Right', svg: 'arrow-right', category: 'Arrows' },
    { id: 'arrow-left', name: 'Arrow Left', svg: 'arrow-left', category: 'Arrows' },
    { id: 'arrow-up', name: 'Arrow Up', svg: 'arrow-up', category: 'Arrows' },
    { id: 'arrow-down', name: 'Arrow Down', svg: 'arrow-down', category: 'Arrows' },
    { id: 'arrow-up-right', name: 'Arrow Up Right', svg: '↗️', category: 'Arrows' },
    { id: 'arrow-down-right', name: 'Arrow Down Right', svg: '↘️', category: 'Arrows' },
    { id: 'arrow-down-left', name: 'Arrow Down Left', svg: '↙️', category: 'Arrows' },
    { id: 'arrow-up-left', name: 'Arrow Up Left', svg: '↖️', category: 'Arrows' },
    { id: 'arrow-refresh', name: 'Refresh Arrow', svg: '🔄', category: 'Arrows' },

    // Basic Symbols
    { id: 'plus', name: 'Plus', svg: 'plus', category: 'Symbols' },
    { id: 'cross', name: 'Cross', svg: 'cross', category: 'Symbols' },
    { id: 'check', name: 'Check', svg: 'check', category: 'Symbols' },
    { id: 'minus', name: 'Minus', svg: '➖', category: 'Symbols' },
    { id: 'equals', name: 'Equals', svg: '=', category: 'Symbols' },
    { id: 'question', name: 'Question', svg: '❓', category: 'Symbols' },
    { id: 'exclamation', name: 'Exclamation', svg: '❗', category: 'Symbols' },
    { id: 'info', name: 'Info', svg: 'ℹ️', category: 'Symbols' },
    { id: 'warning', name: 'Warning', svg: '⚠️', category: 'Symbols' },
    { id: 'prohibited', name: 'Prohibited', svg: '🚫', category: 'Symbols' },

    // Numbers
    { id: 'number-0', name: 'Number 0', svg: '0️⃣', category: 'Numbers' },
    { id: 'number-1', name: 'Number 1', svg: '1️⃣', category: 'Numbers' },
    { id: 'number-2', name: 'Number 2', svg: '2️⃣', category: 'Numbers' },
    { id: 'number-3', name: 'Number 3', svg: '3️⃣', category: 'Numbers' },
    { id: 'number-4', name: 'Number 4', svg: '4️⃣', category: 'Numbers' },
    { id: 'number-5', name: 'Number 5', svg: '5️⃣', category: 'Numbers' },
    { id: 'number-6', name: 'Number 6', svg: '6️⃣', category: 'Numbers' },
    { id: 'number-7', name: 'Number 7', svg: '7️⃣', category: 'Numbers' },
    { id: 'number-8', name: 'Number 8', svg: '8️⃣', category: 'Numbers' },
    { id: 'number-9', name: 'Number 9', svg: '9️⃣', category: 'Numbers' },
    { id: 'number-10', name: 'Number 10', svg: '🔟', category: 'Numbers' },

    // Letters
    { id: 'letter-a', name: 'Letter A', svg: '🅰️', category: 'Letters' },
    { id: 'letter-b', name: 'Letter B', svg: '🅱️', category: 'Letters' },
    { id: 'letter-o', name: 'Letter O', svg: '🅾️', category: 'Letters' },
    { id: 'letter-p', name: 'Letter P', svg: '🅿️', category: 'Letters' },

    // Social Media Icons
    { id: 'facebook', name: 'Facebook', svg: '📘', category: 'Social Media' },
    { id: 'twitter', name: 'Twitter/X', svg: '🐦', category: 'Social Media' },
    { id: 'instagram', name: 'Instagram', svg: '📷', category: 'Social Media' },
    { id: 'linkedin', name: 'LinkedIn', svg: '💼', category: 'Social Media' },
    { id: 'youtube', name: 'YouTube', svg: '📺', category: 'Social Media' },
    { id: 'tiktok', name: 'TikTok', svg: '🎵', category: 'Social Media' },
    { id: 'snapchat', name: 'Snapchat', svg: '👻', category: 'Social Media' },
    { id: 'pinterest', name: 'Pinterest', svg: '📌', category: 'Social Media' },
    { id: 'reddit', name: 'Reddit', svg: '🤖', category: 'Social Media' },
    { id: 'discord', name: 'Discord', svg: '🎮', category: 'Social Media' },
    { id: 'whatsapp', name: 'WhatsApp', svg: '💬', category: 'Social Media' },
    { id: 'telegram', name: 'Telegram', svg: '✈️', category: 'Social Media' },

    // Technology Icons
    { id: 'computer', name: 'Computer', svg: '💻', category: 'Technology' },
    { id: 'mobile', name: 'Mobile Phone', svg: '📱', category: 'Technology' },
    { id: 'tablet', name: 'Tablet', svg: '📲', category: 'Technology' },
    { id: 'monitor', name: 'Monitor', svg: '🖥️', category: 'Technology' },
    { id: 'keyboard', name: 'Keyboard', svg: '⌨️', category: 'Technology' },
    { id: 'mouse', name: 'Computer Mouse', svg: '🖱️', category: 'Technology' },
    { id: 'printer', name: 'Printer', svg: '🖨️', category: 'Technology' },
    { id: 'camera', name: 'Camera', svg: '📷', category: 'Technology' },
    { id: 'video-camera', name: 'Video Camera', svg: '📹', category: 'Technology' },
    { id: 'headphones', name: 'Headphones', svg: '🎧', category: 'Technology' },
    { id: 'microphone', name: 'Microphone', svg: '🎤', category: 'Technology' },
    { id: 'speaker', name: 'Speaker', svg: '🔊', category: 'Technology' },
    { id: 'battery', name: 'Battery', svg: '🔋', category: 'Technology' },
    { id: 'wifi', name: 'WiFi', svg: '📶', category: 'Technology' },
    { id: 'bluetooth', name: 'Bluetooth', svg: '📡', category: 'Technology' },
    { id: 'usb', name: 'USB', svg: '💾', category: 'Technology' },
    { id: 'cd', name: 'CD/DVD', svg: '💿', category: 'Technology' },
    { id: 'floppy-disk', name: 'Floppy Disk', svg: '💾', category: 'Technology' },

    // Business & Finance
    { id: 'money-bag', name: 'Money Bag', svg: '💰', category: 'Business' },
    { id: 'dollar', name: 'Dollar Sign', svg: '💲', category: 'Business' },
    { id: 'euro', name: 'Euro Sign', svg: '💶', category: 'Business' },
    { id: 'pound', name: 'Pound Sign', svg: '💷', category: 'Business' },
    { id: 'yen', name: 'Yen Sign', svg: '💴', category: 'Business' },
    { id: 'credit-card', name: 'Credit Card', svg: '💳', category: 'Business' },
    { id: 'chart-up', name: 'Chart Increasing', svg: '📈', category: 'Business' },
    { id: 'chart-down', name: 'Chart Decreasing', svg: '📉', category: 'Business' },
    { id: 'briefcase', name: 'Briefcase', svg: '💼', category: 'Business' },
    { id: 'handshake', name: 'Handshake', svg: '🤝', category: 'Business' },
    { id: 'trophy', name: 'Trophy', svg: '🏆', category: 'Business' },
    { id: 'medal', name: 'Medal', svg: '🏅', category: 'Business' },
    { id: 'target', name: 'Target', svg: '🎯', category: 'Business' },
    { id: 'key', name: 'Key', svg: '🔑', category: 'Business' },
    { id: 'lock', name: 'Lock', svg: '🔒', category: 'Business' },
    { id: 'unlock', name: 'Unlock', svg: '🔓', category: 'Business' },

    // Communication
    { id: 'email', name: 'Email', svg: '📧', category: 'Communication' },
    { id: 'envelope', name: 'Envelope', svg: '✉️', category: 'Communication' },
    { id: 'phone', name: 'Phone', svg: '📞', category: 'Communication' },
    { id: 'message', name: 'Message', svg: '💬', category: 'Communication' },
    { id: 'speech-bubble', name: 'Speech Bubble', svg: '💭', category: 'Communication' },
    { id: 'megaphone', name: 'Megaphone', svg: '📢', category: 'Communication' },
    { id: 'loudspeaker', name: 'Loudspeaker', svg: '📣', category: 'Communication' },
    { id: 'bell', name: 'Bell', svg: '🔔', category: 'Communication' },
    { id: 'bell-off', name: 'Bell Off', svg: '🔕', category: 'Communication' },

    // Transportation
    { id: 'car', name: 'Car', svg: '🚗', category: 'Transportation' },
    { id: 'bus', name: 'Bus', svg: '🚌', category: 'Transportation' },
    { id: 'train', name: 'Train', svg: '🚆', category: 'Transportation' },
    { id: 'airplane', name: 'Airplane', svg: '✈️', category: 'Transportation' },
    { id: 'ship', name: 'Ship', svg: '🚢', category: 'Transportation' },
    { id: 'bicycle', name: 'Bicycle', svg: '🚲', category: 'Transportation' },
    { id: 'motorcycle', name: 'Motorcycle', svg: '🏍️', category: 'Transportation' },
    { id: 'truck', name: 'Truck', svg: '🚚', category: 'Transportation' },
    { id: 'taxi', name: 'Taxi', svg: '🚕', category: 'Transportation' },
    { id: 'police-car', name: 'Police Car', svg: '🚔', category: 'Transportation' },
    { id: 'ambulance', name: 'Ambulance', svg: '🚑', category: 'Transportation' },
    { id: 'fire-truck', name: 'Fire Truck', svg: '🚒', category: 'Transportation' },

    // Food & Drink
    { id: 'apple', name: 'Apple', svg: '🍎', category: 'Food & Drink' },
    { id: 'banana', name: 'Banana', svg: '🍌', category: 'Food & Drink' },
    { id: 'orange', name: 'Orange', svg: '🍊', category: 'Food & Drink' },
    { id: 'grapes', name: 'Grapes', svg: '🍇', category: 'Food & Drink' },
    { id: 'strawberry', name: 'Strawberry', svg: '🍓', category: 'Food & Drink' },
    { id: 'pizza', name: 'Pizza', svg: '🍕', category: 'Food & Drink' },
    { id: 'hamburger', name: 'Hamburger', svg: '🍔', category: 'Food & Drink' },
    { id: 'hot-dog', name: 'Hot Dog', svg: '🌭', category: 'Food & Drink' },
    { id: 'taco', name: 'Taco', svg: '🌮', category: 'Food & Drink' },
    { id: 'coffee', name: 'Coffee', svg: '☕', category: 'Food & Drink' },
    { id: 'tea', name: 'Tea', svg: '🍵', category: 'Food & Drink' },
    { id: 'beer', name: 'Beer', svg: '🍺', category: 'Food & Drink' },
    { id: 'wine', name: 'Wine', svg: '🍷', category: 'Food & Drink' },
    { id: 'cocktail', name: 'Cocktail', svg: '🍸', category: 'Food & Drink' },
    { id: 'cake', name: 'Cake', svg: '🎂', category: 'Food & Drink' },
    { id: 'ice-cream', name: 'Ice Cream', svg: '🍦', category: 'Food & Drink' },

    // Nature & Weather
    { id: 'sun', name: 'Sun', svg: '☀️', category: 'Nature & Weather' },
    { id: 'moon', name: 'Moon', svg: '🌙', category: 'Nature & Weather' },
    { id: 'star-emoji', name: 'Star', svg: '⭐', category: 'Nature & Weather' },
    { id: 'cloud', name: 'Cloud', svg: '☁️', category: 'Nature & Weather' },
    { id: 'rain', name: 'Rain', svg: '🌧️', category: 'Nature & Weather' },
    { id: 'snow', name: 'Snow', svg: '❄️', category: 'Nature & Weather' },
    { id: 'lightning', name: 'Lightning', svg: '⚡', category: 'Nature & Weather' },
    { id: 'rainbow', name: 'Rainbow', svg: '🌈', category: 'Nature & Weather' },
    { id: 'tree', name: 'Tree', svg: '🌳', category: 'Nature & Weather' },
    { id: 'flower', name: 'Flower', svg: '🌸', category: 'Nature & Weather' },
    { id: 'rose', name: 'Rose', svg: '🌹', category: 'Nature & Weather' },
    { id: 'sunflower', name: 'Sunflower', svg: '🌻', category: 'Nature & Weather' },
    { id: 'leaf', name: 'Leaf', svg: '🍃', category: 'Nature & Weather' },
    { id: 'earth', name: 'Earth', svg: '🌍', category: 'Nature & Weather' },
    { id: 'fire', name: 'Fire', svg: '🔥', category: 'Nature & Weather' },
    { id: 'water-drop', name: 'Water Drop', svg: '💧', category: 'Nature & Weather' },

    // Animals
    { id: 'dog', name: 'Dog', svg: '🐶', category: 'Animals' },
    { id: 'cat', name: 'Cat', svg: '🐱', category: 'Animals' },
    { id: 'mouse', name: 'Mouse', svg: '🐭', category: 'Animals' },
    { id: 'rabbit', name: 'Rabbit', svg: '🐰', category: 'Animals' },
    { id: 'bear', name: 'Bear', svg: '🐻', category: 'Animals' },
    { id: 'panda', name: 'Panda', svg: '🐼', category: 'Animals' },
    { id: 'lion', name: 'Lion', svg: '🦁', category: 'Animals' },
    { id: 'tiger', name: 'Tiger', svg: '🐯', category: 'Animals' },
    { id: 'elephant', name: 'Elephant', svg: '🐘', category: 'Animals' },
    { id: 'monkey', name: 'Monkey', svg: '🐵', category: 'Animals' },
    { id: 'bird', name: 'Bird', svg: '🐦', category: 'Animals' },
    { id: 'fish', name: 'Fish', svg: '🐟', category: 'Animals' },
    { id: 'butterfly', name: 'Butterfly', svg: '🦋', category: 'Animals' },
    { id: 'bee', name: 'Bee', svg: '🐝', category: 'Animals' },
    { id: 'turtle', name: 'Turtle', svg: '🐢', category: 'Animals' },
    { id: 'penguin', name: 'Penguin', svg: '🐧', category: 'Animals' },

    // Sports & Activities
    { id: 'soccer', name: 'Soccer Ball', svg: '⚽', category: 'Sports' },
    { id: 'basketball', name: 'Basketball', svg: '🏀', category: 'Sports' },
    { id: 'football', name: 'American Football', svg: '🏈', category: 'Sports' },
    { id: 'tennis', name: 'Tennis Ball', svg: '🎾', category: 'Sports' },
    { id: 'baseball', name: 'Baseball', svg: '⚾', category: 'Sports' },
    { id: 'golf', name: 'Golf Ball', svg: '⛳', category: 'Sports' },
    { id: 'swimming', name: 'Swimming', svg: '🏊', category: 'Sports' },
    { id: 'running', name: 'Running', svg: '🏃', category: 'Sports' },
    { id: 'cycling', name: 'Cycling', svg: '🚴', category: 'Sports' },
    { id: 'weightlifting', name: 'Weightlifting', svg: '🏋️', category: 'Sports' },
    { id: 'skiing', name: 'Skiing', svg: '⛷️', category: 'Sports' },
    { id: 'snowboarding', name: 'Snowboarding', svg: '🏂', category: 'Sports' },

    // Entertainment
    { id: 'music-note', name: 'Music Note', svg: '🎵', category: 'Entertainment' },
    { id: 'musical-notes', name: 'Musical Notes', svg: '🎶', category: 'Entertainment' },
    { id: 'guitar', name: 'Guitar', svg: '🎸', category: 'Entertainment' },
    { id: 'piano', name: 'Piano', svg: '🎹', category: 'Entertainment' },
    { id: 'violin', name: 'Violin', svg: '🎻', category: 'Entertainment' },
    { id: 'drums', name: 'Drums', svg: '🥁', category: 'Entertainment' },
    { id: 'trumpet', name: 'Trumpet', svg: '🎺', category: 'Entertainment' },
    { id: 'movie-camera', name: 'Movie Camera', svg: '🎬', category: 'Entertainment' },
    { id: 'film-strip', name: 'Film Strip', svg: '🎞️', category: 'Entertainment' },
    { id: 'tv', name: 'Television', svg: '📺', category: 'Entertainment' },
    { id: 'radio', name: 'Radio', svg: '📻', category: 'Entertainment' },
    { id: 'game-controller', name: 'Game Controller', svg: '🎮', category: 'Entertainment' },
    { id: 'dice', name: 'Dice', svg: '🎲', category: 'Entertainment' },
    { id: 'cards', name: 'Playing Cards', svg: '🃏', category: 'Entertainment' },
    { id: 'theater', name: 'Theater Masks', svg: '🎭', category: 'Entertainment' },
    { id: 'art-palette', name: 'Art Palette', svg: '🎨', category: 'Entertainment' },
    { id: 'book', name: 'Book', svg: '📚', category: 'Entertainment' },
    { id: 'newspaper', name: 'Newspaper', svg: '📰', category: 'Entertainment' },

    // Tools & Objects
    { id: 'hammer', name: 'Hammer', svg: '🔨', category: 'Tools' },
    { id: 'wrench', name: 'Wrench', svg: '🔧', category: 'Tools' },
    { id: 'screwdriver', name: 'Screwdriver', svg: '🪛', category: 'Tools' },
    { id: 'scissors', name: 'Scissors', svg: '✂️', category: 'Tools' },
    { id: 'pencil', name: 'Pencil', svg: '✏️', category: 'Tools' },
    { id: 'pen', name: 'Pen', svg: '🖊️', category: 'Tools' },
    { id: 'paintbrush', name: 'Paintbrush', svg: '🖌️', category: 'Tools' },
    { id: 'ruler', name: 'Ruler', svg: '📏', category: 'Tools' },
    { id: 'compass', name: 'Compass', svg: '🧭', category: 'Tools' },
    { id: 'magnifying-glass', name: 'Magnifying Glass', svg: '🔍', category: 'Tools' },
    { id: 'flashlight', name: 'Flashlight', svg: '🔦', category: 'Tools' },
    { id: 'light-bulb', name: 'Light Bulb', svg: '💡', category: 'Tools' },
    { id: 'gear', name: 'Gear', svg: '⚙️', category: 'Tools' },
    { id: 'toolbox', name: 'Toolbox', svg: '🧰', category: 'Tools' },
    { id: 'clipboard', name: 'Clipboard', svg: '📋', category: 'Tools' },
    { id: 'folder', name: 'Folder', svg: '📁', category: 'Tools' },
    { id: 'file', name: 'File', svg: '📄', category: 'Tools' },
    { id: 'trash', name: 'Trash', svg: '🗑️', category: 'Tools' },
    { id: 'recycle', name: 'Recycle', svg: '♻️', category: 'Tools' },

    // Health & Medical
    { id: 'medical-cross', name: 'Medical Cross', svg: '🏥', category: 'Health' },
    { id: 'pill', name: 'Pill', svg: '💊', category: 'Health' },
    { id: 'syringe', name: 'Syringe', svg: '💉', category: 'Health' },
    { id: 'thermometer', name: 'Thermometer', svg: '🌡️', category: 'Health' },
    { id: 'stethoscope', name: 'Stethoscope', svg: '🩺', category: 'Health' },
    { id: 'bandage', name: 'Bandage', svg: '🩹', category: 'Health' },
    { id: 'mask', name: 'Medical Mask', svg: '😷', category: 'Health' },
    { id: 'tooth', name: 'Tooth', svg: '🦷', category: 'Health' },
    { id: 'bone', name: 'Bone', svg: '🦴', category: 'Health' },
    { id: 'dna', name: 'DNA', svg: '🧬', category: 'Health' },
    { id: 'microbe', name: 'Microbe', svg: '🦠', category: 'Health' },

    // Places & Buildings
    { id: 'house', name: 'House', svg: '🏠', category: 'Places' },
    { id: 'building', name: 'Building', svg: '🏢', category: 'Places' },
    { id: 'school', name: 'School', svg: '🏫', category: 'Places' },
    { id: 'hospital', name: 'Hospital', svg: '🏥', category: 'Places' },
    { id: 'bank', name: 'Bank', svg: '🏦', category: 'Places' },
    { id: 'hotel', name: 'Hotel', svg: '🏨', category: 'Places' },
    { id: 'church', name: 'Church', svg: '⛪', category: 'Places' },
    { id: 'factory', name: 'Factory', svg: '🏭', category: 'Places' },
    { id: 'castle', name: 'Castle', svg: '🏰', category: 'Places' },
    { id: 'statue-liberty', name: 'Statue of Liberty', svg: '🗽', category: 'Places' },
    { id: 'bridge', name: 'Bridge', svg: '🌉', category: 'Places' },
    { id: 'mountain', name: 'Mountain', svg: '⛰️', category: 'Places' },
    { id: 'volcano', name: 'Volcano', svg: '🌋', category: 'Places' },
    { id: 'desert', name: 'Desert', svg: '🏜️', category: 'Places' },
    { id: 'beach', name: 'Beach', svg: '🏖️', category: 'Places' },
    { id: 'island', name: 'Island', svg: '🏝️', category: 'Places' },

    // Time & Calendar
    { id: 'clock', name: 'Clock', svg: '🕐', category: 'Time' },
    { id: 'watch', name: 'Watch', svg: '⌚', category: 'Time' },
    { id: 'calendar', name: 'Calendar', svg: '📅', category: 'Time' },
    { id: 'hourglass', name: 'Hourglass', svg: '⏳', category: 'Time' },
    { id: 'stopwatch', name: 'Stopwatch', svg: '⏱️', category: 'Time' },
    { id: 'timer', name: 'Timer', svg: '⏲️', category: 'Time' },
    { id: 'alarm-clock', name: 'Alarm Clock', svg: '⏰', category: 'Time' },

    // Flags & Countries
    { id: 'flag-us', name: 'US Flag', svg: '🇺🇸', category: 'Flags' },
    { id: 'flag-uk', name: 'UK Flag', svg: '🇬🇧', category: 'Flags' },
    { id: 'flag-canada', name: 'Canada Flag', svg: '🇨🇦', category: 'Flags' },
    { id: 'flag-france', name: 'France Flag', svg: '🇫🇷', category: 'Flags' },
    { id: 'flag-germany', name: 'Germany Flag', svg: '🇩🇪', category: 'Flags' },
    { id: 'flag-japan', name: 'Japan Flag', svg: '🇯🇵', category: 'Flags' },
    { id: 'flag-china', name: 'China Flag', svg: '🇨🇳', category: 'Flags' },
    { id: 'flag-australia', name: 'Australia Flag', svg: '🇦🇺', category: 'Flags' },
    { id: 'flag-brazil', name: 'Brazil Flag', svg: '🇧🇷', category: 'Flags' },
    { id: 'flag-india', name: 'India Flag', svg: '🇮🇳', category: 'Flags' },

    // Celebration & Events
    { id: 'party', name: 'Party Popper', svg: '🎉', category: 'Celebration' },
    { id: 'confetti', name: 'Confetti Ball', svg: '🎊', category: 'Celebration' },
    { id: 'balloon', name: 'Balloon', svg: '🎈', category: 'Celebration' },
    { id: 'gift', name: 'Gift', svg: '🎁', category: 'Celebration' },
    { id: 'birthday-cake', name: 'Birthday Cake', svg: '🎂', category: 'Celebration' },
    { id: 'fireworks', name: 'Fireworks', svg: '🎆', category: 'Celebration' },
    { id: 'sparkler', name: 'Sparkler', svg: '🎇', category: 'Celebration' },
    { id: 'christmas-tree', name: 'Christmas Tree', svg: '🎄', category: 'Celebration' },
    { id: 'santa', name: 'Santa Claus', svg: '🎅', category: 'Celebration' },
    { id: 'snowman', name: 'Snowman', svg: '⛄', category: 'Celebration' },
    { id: 'jack-o-lantern', name: 'Jack-o-lantern', svg: '🎃', category: 'Celebration' },
    { id: 'ghost', name: 'Ghost', svg: '👻', category: 'Celebration' },
    { id: 'heart-red', name: 'Red Heart', svg: '❤️', category: 'Celebration' },
    { id: 'heart-broken', name: 'Broken Heart', svg: '💔', category: 'Celebration' },
    { id: 'kiss', name: 'Kiss Mark', svg: '💋', category: 'Celebration' },
    { id: 'ring', name: 'Ring', svg: '💍', category: 'Celebration' },

    // Emoji Faces
    { id: 'smile', name: 'Smiling Face', svg: '😀', category: 'Emoji Faces' },
    { id: 'grin', name: 'Grinning Face', svg: '😃', category: 'Emoji Faces' },
    { id: 'joy', name: 'Face with Tears of Joy', svg: '😂', category: 'Emoji Faces' },
    { id: 'wink', name: 'Winking Face', svg: '😉', category: 'Emoji Faces' },
    { id: 'heart-eyes', name: 'Heart Eyes', svg: '😍', category: 'Emoji Faces' },
    { id: 'cool', name: 'Cool Face', svg: '😎', category: 'Emoji Faces' },
    { id: 'thinking', name: 'Thinking Face', svg: '🤔', category: 'Emoji Faces' },
    { id: 'angry', name: 'Angry Face', svg: '😠', category: 'Emoji Faces' },
    { id: 'sad', name: 'Sad Face', svg: '😢', category: 'Emoji Faces' },
    { id: 'shocked', name: 'Shocked Face', svg: '😱', category: 'Emoji Faces' },
    { id: 'sleeping', name: 'Sleeping Face', svg: '😴', category: 'Emoji Faces' },
    { id: 'sick', name: 'Sick Face', svg: '🤒', category: 'Emoji Faces' },
    { id: 'crazy', name: 'Crazy Face', svg: '🤪', category: 'Emoji Faces' },
    { id: 'robot-face', name: 'Robot Face', svg: '🤖', category: 'Emoji Faces' },
    { id: 'alien', name: 'Alien', svg: '👽', category: 'Emoji Faces' },
    { id: 'skull', name: 'Skull', svg: '💀', category: 'Emoji Faces' },

    // More Basic Shapes
    { id: 'oval', name: 'Oval', svg: '⭕', category: 'Basic Shapes' },
    { id: 'rectangle', name: 'Rectangle', svg: '▭', category: 'Basic Shapes' },
    { id: 'rhombus', name: 'Rhombus', svg: '◊', category: 'Basic Shapes' },
    { id: 'octagon', name: 'Octagon', svg: '⬟', category: 'Basic Shapes' },

    // More Arrows
    { id: 'double-arrow', name: 'Double Arrow', svg: '⇄', category: 'Arrows' },
    { id: 'curved-arrow', name: 'Curved Arrow', svg: '↪️', category: 'Arrows' },
    { id: 'curved-arrow-left', name: 'Curved Arrow Left', svg: '↩️', category: 'Arrows' },
    { id: 'arrow-loop', name: 'Arrow Loop', svg: '🔁', category: 'Arrows' },
    { id: 'arrow-clockwise', name: 'Clockwise Arrow', svg: '🔃', category: 'Arrows' },
    { id: 'arrow-counterclockwise', name: 'Counterclockwise Arrow', svg: '🔄', category: 'Arrows' },

    // More Symbols
    { id: 'copyright', name: 'Copyright', svg: '©️', category: 'Symbols' },
    { id: 'registered', name: 'Registered', svg: '®️', category: 'Symbols' },
    { id: 'trademark', name: 'Trademark', svg: '™️', category: 'Symbols' },
    { id: 'at-symbol', name: 'At Symbol', svg: '@', category: 'Symbols' },
    { id: 'hashtag', name: 'Hashtag', svg: '#️⃣', category: 'Symbols' },
    { id: 'asterisk', name: 'Asterisk', svg: '*️⃣', category: 'Symbols' },
    { id: 'percent', name: 'Percent', svg: '%', category: 'Symbols' },
    { id: 'ampersand', name: 'Ampersand', svg: '&', category: 'Symbols' },
    { id: 'infinity', name: 'Infinity', svg: '∞', category: 'Symbols' },
    { id: 'degree', name: 'Degree', svg: '°', category: 'Symbols' },
    { id: 'section', name: 'Section', svg: '§', category: 'Symbols' },
    { id: 'paragraph', name: 'Paragraph', svg: '¶', category: 'Symbols' },

    // More Social Media
    { id: 'github', name: 'GitHub', svg: '👨‍💻', category: 'Social Media' },
    { id: 'stackoverflow', name: 'Stack Overflow', svg: '💻', category: 'Social Media' },
    { id: 'slack', name: 'Slack', svg: '💼', category: 'Social Media' },
    { id: 'zoom', name: 'Zoom', svg: '📹', category: 'Social Media' },
    { id: 'skype', name: 'Skype', svg: '📞', category: 'Social Media' },
    { id: 'teams', name: 'Microsoft Teams', svg: '🤝', category: 'Social Media' },
    { id: 'twitch', name: 'Twitch', svg: '🎮', category: 'Social Media' },
    { id: 'spotify', name: 'Spotify', svg: '🎵', category: 'Social Media' },
    { id: 'soundcloud', name: 'SoundCloud', svg: '🔊', category: 'Social Media' },
    { id: 'medium', name: 'Medium', svg: '📝', category: 'Social Media' },
    { id: 'behance', name: 'Behance', svg: '🎨', category: 'Social Media' },
    { id: 'dribbble', name: 'Dribbble', svg: '🏀', category: 'Social Media' },

    // More Technology
    { id: 'server', name: 'Server', svg: '🖥️', category: 'Technology' },
    { id: 'database', name: 'Database', svg: '🗄️', category: 'Technology' },
    { id: 'cloud-tech', name: 'Cloud Computing', svg: '☁️', category: 'Technology' },
    { id: 'code', name: 'Code', svg: '💻', category: 'Technology' },
    { id: 'bug', name: 'Bug', svg: '🐛', category: 'Technology' },
    { id: 'robot-tech', name: 'Robot', svg: '🤖', category: 'Technology' },
    { id: 'satellite', name: 'Satellite', svg: '📡', category: 'Technology' },
    { id: 'antenna', name: 'Antenna', svg: '📶', category: 'Technology' },
    { id: 'chip', name: 'Computer Chip', svg: '💾', category: 'Technology' },
    { id: 'circuit-board', name: 'Circuit Board', svg: '🔌', category: 'Technology' },
    { id: 'power-plug', name: 'Power Plug', svg: '🔌', category: 'Technology' },
    { id: 'electric-plug', name: 'Electric Plug', svg: '⚡', category: 'Technology' },

    // Office & Work
    { id: 'office-building', name: 'Office Building', svg: '🏢', category: 'Office' },
    { id: 'desk', name: 'Desk', svg: '🪑', category: 'Office' },
    { id: 'chair', name: 'Chair', svg: '🪑', category: 'Office' },
    { id: 'filing-cabinet', name: 'Filing Cabinet', svg: '🗃️', category: 'Office' },
    { id: 'stapler', name: 'Stapler', svg: '📎', category: 'Office' },
    { id: 'paperclip', name: 'Paperclip', svg: '📎', category: 'Office' },
    { id: 'pushpin', name: 'Pushpin', svg: '📌', category: 'Office' },
    { id: 'thumbtack', name: 'Thumbtack', svg: '📌', category: 'Office' },
    { id: 'memo', name: 'Memo', svg: '📝', category: 'Office' },
    { id: 'notebook', name: 'Notebook', svg: '📓', category: 'Office' },
    { id: 'ledger', name: 'Ledger', svg: '📒', category: 'Office' },
    { id: 'calculator', name: 'Calculator', svg: '🧮', category: 'Office' },

    // More Transportation
    { id: 'helicopter', name: 'Helicopter', svg: '🚁', category: 'Transportation' },
    { id: 'rocket', name: 'Rocket', svg: '🚀', category: 'Transportation' },
    { id: 'ufo', name: 'UFO', svg: '🛸', category: 'Transportation' },
    { id: 'boat', name: 'Boat', svg: '⛵', category: 'Transportation' },
    { id: 'speedboat', name: 'Speedboat', svg: '🚤', category: 'Transportation' },
    { id: 'ferry', name: 'Ferry', svg: '⛴️', category: 'Transportation' },
    { id: 'subway', name: 'Subway', svg: '🚇', category: 'Transportation' },
    { id: 'tram', name: 'Tram', svg: '🚊', category: 'Transportation' },
    { id: 'monorail', name: 'Monorail', svg: '🚝', category: 'Transportation' },
    { id: 'scooter', name: 'Scooter', svg: '🛴', category: 'Transportation' },
    { id: 'skateboard', name: 'Skateboard', svg: '🛹', category: 'Transportation' },

    // More Food & Drink
    { id: 'bread', name: 'Bread', svg: '🍞', category: 'Food & Drink' },
    { id: 'croissant', name: 'Croissant', svg: '🥐', category: 'Food & Drink' },
    { id: 'bagel', name: 'Bagel', svg: '🥯', category: 'Food & Drink' },
    { id: 'pretzel', name: 'Pretzel', svg: '🥨', category: 'Food & Drink' },
    { id: 'cheese', name: 'Cheese', svg: '🧀', category: 'Food & Drink' },
    { id: 'egg', name: 'Egg', svg: '🥚', category: 'Food & Drink' },
    { id: 'bacon', name: 'Bacon', svg: '🥓', category: 'Food & Drink' },
    { id: 'steak', name: 'Steak', svg: '🥩', category: 'Food & Drink' },
    { id: 'chicken', name: 'Chicken', svg: '🍗', category: 'Food & Drink' },
    { id: 'french-fries', name: 'French Fries', svg: '🍟', category: 'Food & Drink' },
    { id: 'popcorn', name: 'Popcorn', svg: '🍿', category: 'Food & Drink' },
    { id: 'doughnut', name: 'Doughnut', svg: '🍩', category: 'Food & Drink' },
    { id: 'cookie', name: 'Cookie', svg: '🍪', category: 'Food & Drink' },
    { id: 'chocolate', name: 'Chocolate', svg: '🍫', category: 'Food & Drink' },
    { id: 'candy', name: 'Candy', svg: '🍬', category: 'Food & Drink' },
    { id: 'lollipop', name: 'Lollipop', svg: '🍭', category: 'Food & Drink' },
    { id: 'honey', name: 'Honey', svg: '🍯', category: 'Food & Drink' },
    { id: 'milk', name: 'Milk', svg: '🥛', category: 'Food & Drink' },
    { id: 'baby-bottle', name: 'Baby Bottle', svg: '🍼', category: 'Food & Drink' },

    // More Animals
    { id: 'unicorn', name: 'Unicorn', svg: '🦄', category: 'Animals' },
    { id: 'horse', name: 'Horse', svg: '🐴', category: 'Animals' },
    { id: 'cow', name: 'Cow', svg: '🐄', category: 'Animals' },
    { id: 'pig', name: 'Pig', svg: '🐷', category: 'Animals' },
    { id: 'sheep', name: 'Sheep', svg: '🐑', category: 'Animals' },
    { id: 'goat', name: 'Goat', svg: '🐐', category: 'Animals' },
    { id: 'camel', name: 'Camel', svg: '🐪', category: 'Animals' },
    { id: 'llama', name: 'Llama', svg: '🦙', category: 'Animals' },
    { id: 'giraffe', name: 'Giraffe', svg: '🦒', category: 'Animals' },
    { id: 'zebra', name: 'Zebra', svg: '🦓', category: 'Animals' },
    { id: 'deer', name: 'Deer', svg: '🦌', category: 'Animals' },
    { id: 'kangaroo', name: 'Kangaroo', svg: '🦘', category: 'Animals' },
    { id: 'koala', name: 'Koala', svg: '🐨', category: 'Animals' },
    { id: 'sloth', name: 'Sloth', svg: '🦥', category: 'Animals' },
    { id: 'otter', name: 'Otter', svg: '🦦', category: 'Animals' },
    { id: 'skunk', name: 'Skunk', svg: '🦨', category: 'Animals' },
    { id: 'badger', name: 'Badger', svg: '🦡', category: 'Animals' },
    { id: 'wolf', name: 'Wolf', svg: '🐺', category: 'Animals' },
    { id: 'fox', name: 'Fox', svg: '🦊', category: 'Animals' },
    { id: 'raccoon', name: 'Raccoon', svg: '🦝', category: 'Animals' },
    { id: 'hedgehog', name: 'Hedgehog', svg: '🦔', category: 'Animals' },
    { id: 'bat', name: 'Bat', svg: '🦇', category: 'Animals' },
    { id: 'eagle', name: 'Eagle', svg: '🦅', category: 'Animals' },
    { id: 'duck', name: 'Duck', svg: '🦆', category: 'Animals' },
    { id: 'swan', name: 'Swan', svg: '🦢', category: 'Animals' },
    { id: 'owl', name: 'Owl', svg: '🦉', category: 'Animals' },
    { id: 'peacock', name: 'Peacock', svg: '🦚', category: 'Animals' },
    { id: 'parrot', name: 'Parrot', svg: '🦜', category: 'Animals' },
    { id: 'flamingo', name: 'Flamingo', svg: '🦩', category: 'Animals' },
    { id: 'shark', name: 'Shark', svg: '🦈', category: 'Animals' },
    { id: 'whale', name: 'Whale', svg: '🐳', category: 'Animals' },
    { id: 'dolphin', name: 'Dolphin', svg: '🐬', category: 'Animals' },
    { id: 'octopus', name: 'Octopus', svg: '🐙', category: 'Animals' },
    { id: 'crab', name: 'Crab', svg: '🦀', category: 'Animals' },
    { id: 'lobster', name: 'Lobster', svg: '🦞', category: 'Animals' },
    { id: 'shrimp', name: 'Shrimp', svg: '🦐', category: 'Animals' },
    { id: 'squid', name: 'Squid', svg: '🦑', category: 'Animals' },
    { id: 'snake', name: 'Snake', svg: '🐍', category: 'Animals' },
    { id: 'lizard', name: 'Lizard', svg: '🦎', category: 'Animals' },
    { id: 'dinosaur', name: 'Dinosaur', svg: '🦕', category: 'Animals' },
    { id: 't-rex', name: 'T-Rex', svg: '🦖', category: 'Animals' },
    { id: 'spider', name: 'Spider', svg: '🕷️', category: 'Animals' },
    { id: 'scorpion', name: 'Scorpion', svg: '🦂', category: 'Animals' },
    { id: 'mosquito', name: 'Mosquito', svg: '🦟', category: 'Animals' },
    { id: 'fly', name: 'Fly', svg: '🪰', category: 'Animals' },
    { id: 'worm', name: 'Worm', svg: '🪱', category: 'Animals' },

    // More Sports
    { id: 'ping-pong', name: 'Ping Pong', svg: '🏓', category: 'Sports' },
    { id: 'badminton', name: 'Badminton', svg: '🏸', category: 'Sports' },
    { id: 'hockey', name: 'Hockey', svg: '🏒', category: 'Sports' },
    { id: 'field-hockey', name: 'Field Hockey', svg: '🥍', category: 'Sports' },
    { id: 'cricket', name: 'Cricket', svg: '🏏', category: 'Sports' },
    { id: 'volleyball', name: 'Volleyball', svg: '🏐', category: 'Sports' },
    { id: 'rugby', name: 'Rugby', svg: '🏉', category: 'Sports' },
    { id: 'frisbee', name: 'Frisbee', svg: '🥏', category: 'Sports' },
    { id: 'bowling', name: 'Bowling', svg: '🎳', category: 'Sports' },
    { id: 'archery', name: 'Archery', svg: '🏹', category: 'Sports' },
    { id: 'fishing', name: 'Fishing', svg: '🎣', category: 'Sports' },
    { id: 'diving', name: 'Diving', svg: '🤿', category: 'Sports' },
    { id: 'surfing', name: 'Surfing', svg: '🏄', category: 'Sports' },
    { id: 'rowing', name: 'Rowing', svg: '🚣', category: 'Sports' },
    { id: 'climbing', name: 'Rock Climbing', svg: '🧗', category: 'Sports' },
    { id: 'fencing', name: 'Fencing', svg: '🤺', category: 'Sports' },
    { id: 'boxing', name: 'Boxing', svg: '🥊', category: 'Sports' },
    { id: 'martial-arts', name: 'Martial Arts', svg: '🥋', category: 'Sports' },
    { id: 'gymnastics', name: 'Gymnastics', svg: '🤸', category: 'Sports' },
    { id: 'yoga', name: 'Yoga', svg: '🧘', category: 'Sports' },

    // More Entertainment
    { id: 'circus-tent', name: 'Circus Tent', svg: '🎪', category: 'Entertainment' },
    { id: 'ferris-wheel', name: 'Ferris Wheel', svg: '🎡', category: 'Entertainment' },
    { id: 'roller-coaster', name: 'Roller Coaster', svg: '🎢', category: 'Entertainment' },
    { id: 'carousel', name: 'Carousel', svg: '🎠', category: 'Entertainment' },
    { id: 'slot-machine', name: 'Slot Machine', svg: '🎰', category: 'Entertainment' },
    { id: 'jigsaw', name: 'Jigsaw Puzzle', svg: '🧩', category: 'Entertainment' },
    { id: 'chess', name: 'Chess', svg: '♟️', category: 'Entertainment' },
    { id: 'video-game', name: 'Video Game', svg: '🕹️', category: 'Entertainment' },
    { id: 'joystick', name: 'Joystick', svg: '🕹️', category: 'Entertainment' },
    { id: 'magic-wand', name: 'Magic Wand', svg: '🪄', category: 'Entertainment' },
    { id: 'crystal-ball', name: 'Crystal Ball', svg: '🔮', category: 'Entertainment' },
    { id: 'tarot-cards', name: 'Tarot Cards', svg: '🔯', category: 'Entertainment' },

    // More Tools
    { id: 'axe', name: 'Axe', svg: '🪓', category: 'Tools' },
    { id: 'saw', name: 'Saw', svg: '🪚', category: 'Tools' },
    { id: 'drill', name: 'Drill', svg: '🔩', category: 'Tools' },
    { id: 'nut-and-bolt', name: 'Nut and Bolt', svg: '🔩', category: 'Tools' },
    { id: 'chain', name: 'Chain', svg: '⛓️', category: 'Tools' },
    { id: 'pick', name: 'Pick', svg: '⛏️', category: 'Tools' },
    { id: 'shovel', name: 'Shovel', svg: '🪣', category: 'Tools' },
    { id: 'bucket', name: 'Bucket', svg: '🪣', category: 'Tools' },
    { id: 'broom', name: 'Broom', svg: '🧹', category: 'Tools' },
    { id: 'mop', name: 'Mop', svg: '🧽', category: 'Tools' },
    { id: 'sponge', name: 'Sponge', svg: '🧽', category: 'Tools' },
    { id: 'soap', name: 'Soap', svg: '🧼', category: 'Tools' },
    { id: 'toilet-paper', name: 'Toilet Paper', svg: '🧻', category: 'Tools' },
    { id: 'plunger', name: 'Plunger', svg: '🪠', category: 'Tools' },
    { id: 'ladder', name: 'Ladder', svg: '🪜', category: 'Tools' },
    { id: 'window', name: 'Window', svg: '🪟', category: 'Tools' },
    { id: 'mirror', name: 'Mirror', svg: '🪞', category: 'Tools' },

    // More Places
    { id: 'tent', name: 'Tent', svg: '⛺', category: 'Places' },
    { id: 'lighthouse', name: 'Lighthouse', svg: '🗼', category: 'Places' },
    { id: 'windmill', name: 'Windmill', svg: '🏯', category: 'Places' },
    { id: 'pagoda', name: 'Pagoda', svg: '🏯', category: 'Places' },
    { id: 'mosque', name: 'Mosque', svg: '🕌', category: 'Places' },
    { id: 'synagogue', name: 'Synagogue', svg: '🕍', category: 'Places' },
    { id: 'temple', name: 'Temple', svg: '🛕', category: 'Places' },
    { id: 'stadium', name: 'Stadium', svg: '🏟️', category: 'Places' },
    { id: 'amphitheater', name: 'Amphitheater', svg: '🏛️', category: 'Places' },
    { id: 'colosseum', name: 'Colosseum', svg: '🏛️', category: 'Places' },
    { id: 'fountain', name: 'Fountain', svg: '⛲', category: 'Places' },
    { id: 'park', name: 'Park', svg: '🏞️', category: 'Places' },
    { id: 'camping', name: 'Camping', svg: '🏕️', category: 'Places' },
    { id: 'cityscape', name: 'Cityscape', svg: '🏙️', category: 'Places' },
    { id: 'sunset-buildings', name: 'Sunset over Buildings', svg: '🌆', category: 'Places' },
    { id: 'night-bridge', name: 'Night Bridge', svg: '🌉', category: 'Places' },

    // More Health
    { id: 'heart-health', name: 'Heart Health', svg: '❤️‍🩹', category: 'Health' },
    { id: 'lungs', name: 'Lungs', svg: '🫁', category: 'Health' },
    { id: 'brain', name: 'Brain', svg: '🧠', category: 'Health' },
    { id: 'ear', name: 'Ear', svg: '👂', category: 'Health' },
    { id: 'eye', name: 'Eye', svg: '👁️', category: 'Health' },
    { id: 'nose', name: 'Nose', svg: '👃', category: 'Health' },
    { id: 'mouth', name: 'Mouth', svg: '👄', category: 'Health' },
    { id: 'tongue', name: 'Tongue', svg: '👅', category: 'Health' },
    { id: 'leg', name: 'Leg', svg: '🦵', category: 'Health' },
    { id: 'foot', name: 'Foot', svg: '🦶', category: 'Health' },
    { id: 'hand', name: 'Hand', svg: '✋', category: 'Health' },
    { id: 'thumbs-up', name: 'Thumbs Up', svg: '👍', category: 'Health' },
    { id: 'thumbs-down', name: 'Thumbs Down', svg: '👎', category: 'Health' },
    { id: 'peace-sign', name: 'Peace Sign', svg: '✌️', category: 'Health' },
    { id: 'ok-hand', name: 'OK Hand', svg: '👌', category: 'Health' },
    { id: 'pointing-finger', name: 'Pointing Finger', svg: '👉', category: 'Health' },
    { id: 'muscle', name: 'Muscle', svg: '💪', category: 'Health' },

    // More Flags
    { id: 'flag-spain', name: 'Spain Flag', svg: '🇪🇸', category: 'Flags' },
    { id: 'flag-italy', name: 'Italy Flag', svg: '🇮🇹', category: 'Flags' },
    { id: 'flag-russia', name: 'Russia Flag', svg: '🇷🇺', category: 'Flags' },
    { id: 'flag-south-korea', name: 'South Korea Flag', svg: '🇰🇷', category: 'Flags' },
    { id: 'flag-mexico', name: 'Mexico Flag', svg: '🇲🇽', category: 'Flags' },
    { id: 'flag-netherlands', name: 'Netherlands Flag', svg: '🇳🇱', category: 'Flags' },
    { id: 'flag-sweden', name: 'Sweden Flag', svg: '🇸🇪', category: 'Flags' },
    { id: 'flag-norway', name: 'Norway Flag', svg: '🇳🇴', category: 'Flags' },
    { id: 'flag-switzerland', name: 'Switzerland Flag', svg: '🇨🇭', category: 'Flags' },
    { id: 'flag-south-africa', name: 'South Africa Flag', svg: '🇿🇦', category: 'Flags' },
    { id: 'flag-argentina', name: 'Argentina Flag', svg: '🇦🇷', category: 'Flags' },
    { id: 'flag-turkey', name: 'Turkey Flag', svg: '🇹🇷', category: 'Flags' },
    { id: 'flag-israel', name: 'Israel Flag', svg: '🇮🇱', category: 'Flags' },
    { id: 'flag-egypt', name: 'Egypt Flag', svg: '🇪🇬', category: 'Flags' },
    { id: 'flag-saudi-arabia', name: 'Saudi Arabia Flag', svg: '🇸🇦', category: 'Flags' },

    // More Celebration
    { id: 'trophy-2', name: 'Trophy 2', svg: '🏆', category: 'Celebration' },
    { id: 'medal-gold', name: 'Gold Medal', svg: '🥇', category: 'Celebration' },
    { id: 'medal-silver', name: 'Silver Medal', svg: '🥈', category: 'Celebration' },
    { id: 'medal-bronze', name: 'Bronze Medal', svg: '🥉', category: 'Celebration' },
    { id: 'ribbon', name: 'Ribbon', svg: '🎗️', category: 'Celebration' },
    { id: 'rosette', name: 'Rosette', svg: '🏵️', category: 'Celebration' },
    { id: 'ticket', name: 'Ticket', svg: '🎫', category: 'Celebration' },
    { id: 'admission', name: 'Admission Tickets', svg: '🎟️', category: 'Celebration' },
    { id: 'clapper', name: 'Clapper Board', svg: '🎬', category: 'Celebration' },
    { id: 'microphone-2', name: 'Microphone 2', svg: '🎤', category: 'Celebration' },
    { id: 'headphones-2', name: 'Headphones 2', svg: '🎧', category: 'Celebration' },
    { id: 'musical-score', name: 'Musical Score', svg: '🎼', category: 'Celebration' },
    { id: 'level-slider', name: 'Level Slider', svg: '🎚️', category: 'Celebration' },
    { id: 'control-knobs', name: 'Control Knobs', svg: '🎛️', category: 'Celebration' },
    { id: 'studio-microphone', name: 'Studio Microphone', svg: '🎙️', category: 'Celebration' },

    // More Emoji Faces
    { id: 'laughing', name: 'Laughing', svg: '😆', category: 'Emoji Faces' },
    { id: 'sweat-smile', name: 'Sweat Smile', svg: '😅', category: 'Emoji Faces' },
    { id: 'rofl', name: 'Rolling on Floor Laughing', svg: '🤣', category: 'Emoji Faces' },
    { id: 'upside-down', name: 'Upside Down Face', svg: '🙃', category: 'Emoji Faces' },
    { id: 'woozy', name: 'Woozy Face', svg: '🥴', category: 'Emoji Faces' },
    { id: 'dizzy', name: 'Dizzy Face', svg: '😵', category: 'Emoji Faces' },
    { id: 'exploding-head', name: 'Exploding Head', svg: '🤯', category: 'Emoji Faces' },
    { id: 'cowboy', name: 'Cowboy Hat Face', svg: '🤠', category: 'Emoji Faces' },
    { id: 'party-face', name: 'Party Face', svg: '🥳', category: 'Emoji Faces' },
    { id: 'disguised', name: 'Disguised Face', svg: '🥸', category: 'Emoji Faces' },
    { id: 'nerd', name: 'Nerd Face', svg: '🤓', category: 'Emoji Faces' },
    { id: 'monocle', name: 'Face with Monocle', svg: '🧐', category: 'Emoji Faces' },
    { id: 'confused', name: 'Confused Face', svg: '😕', category: 'Emoji Faces' },
    { id: 'worried', name: 'Worried Face', svg: '😟', category: 'Emoji Faces' },
    { id: 'slightly-frowning', name: 'Slightly Frowning', svg: '🙁', category: 'Emoji Faces' },
    { id: 'frowning', name: 'Frowning Face', svg: '☹️', category: 'Emoji Faces' },
    { id: 'persevering', name: 'Persevering Face', svg: '😣', category: 'Emoji Faces' },
    { id: 'confounded', name: 'Confounded Face', svg: '😖', category: 'Emoji Faces' },
    { id: 'tired', name: 'Tired Face', svg: '😫', category: 'Emoji Faces' },
    { id: 'weary', name: 'Weary Face', svg: '😩', category: 'Emoji Faces' },
    { id: 'pleading', name: 'Pleading Face', svg: '🥺', category: 'Emoji Faces' },
    { id: 'crying', name: 'Crying Face', svg: '😭', category: 'Emoji Faces' },
    { id: 'loudly-crying', name: 'Loudly Crying Face', svg: '😭', category: 'Emoji Faces' },
    { id: 'screaming', name: 'Face Screaming in Fear', svg: '😱', category: 'Emoji Faces' },
    { id: 'astonished', name: 'Astonished Face', svg: '😲', category: 'Emoji Faces' },
    { id: 'flushed', name: 'Flushed Face', svg: '😳', category: 'Emoji Faces' },
    { id: 'zany', name: 'Zany Face', svg: '🤪', category: 'Emoji Faces' },
    { id: 'star-struck', name: 'Star Struck', svg: '🤩', category: 'Emoji Faces' },
    { id: 'nauseated', name: 'Nauseated Face', svg: '🤢', category: 'Emoji Faces' },
    { id: 'vomiting', name: 'Face Vomiting', svg: '🤮', category: 'Emoji Faces' },
    { id: 'sneezing', name: 'Sneezing Face', svg: '🤧', category: 'Emoji Faces' },
    { id: 'hot', name: 'Hot Face', svg: '🥵', category: 'Emoji Faces' },
    { id: 'cold', name: 'Cold Face', svg: '🥶', category: 'Emoji Faces' },
    { id: 'winking-tongue', name: 'Winking Face with Tongue', svg: '😜', category: 'Emoji Faces' },
    {
      id: 'squinting-tongue',
      name: 'Squinting Face with Tongue',
      svg: '😝',
      category: 'Emoji Faces',
    },
    { id: 'money-mouth', name: 'Money Mouth Face', svg: '🤑', category: 'Emoji Faces' },
    { id: 'hugging', name: 'Hugging Face', svg: '🤗', category: 'Emoji Faces' },
    {
      id: 'hand-over-mouth',
      name: 'Face with Hand Over Mouth',
      svg: '🤭',
      category: 'Emoji Faces',
    },
    { id: 'shushing', name: 'Shushing Face', svg: '🤫', category: 'Emoji Faces' },
    { id: 'lying', name: 'Lying Face', svg: '🤥', category: 'Emoji Faces' },
    { id: 'relieved', name: 'Relieved Face', svg: '😌', category: 'Emoji Faces' },
    { id: 'pensive', name: 'Pensive Face', svg: '😔', category: 'Emoji Faces' },
    { id: 'sleepy', name: 'Sleepy Face', svg: '😪', category: 'Emoji Faces' },
    { id: 'drooling', name: 'Drooling Face', svg: '🤤', category: 'Emoji Faces' },
    { id: 'face-with-mask', name: 'Face with Medical Mask', svg: '😷', category: 'Emoji Faces' },
    {
      id: 'face-with-thermometer',
      name: 'Face with Thermometer',
      svg: '🤒',
      category: 'Emoji Faces',
    },
    {
      id: 'face-with-head-bandage',
      name: 'Face with Head Bandage',
      svg: '🤕',
      category: 'Emoji Faces',
    },
    { id: 'smiling-devil', name: 'Smiling Face with Horns', svg: '😈', category: 'Emoji Faces' },
    { id: 'angry-devil', name: 'Angry Face with Horns', svg: '👿', category: 'Emoji Faces' },
    { id: 'clown', name: 'Clown Face', svg: '🤡', category: 'Emoji Faces' },
    { id: 'pile-of-poo', name: 'Pile of Poo', svg: '💩', category: 'Emoji Faces' },
    { id: 'ghost-2', name: 'Ghost 2', svg: '👻', category: 'Emoji Faces' },
    { id: 'skull-crossbones', name: 'Skull and Crossbones', svg: '☠️', category: 'Emoji Faces' },
    { id: 'alien-monster', name: 'Alien Monster', svg: '👾', category: 'Emoji Faces' },
    { id: 'japanese-ogre', name: 'Japanese Ogre', svg: '👹', category: 'Emoji Faces' },
    { id: 'japanese-goblin', name: 'Japanese Goblin', svg: '👺', category: 'Emoji Faces' },

    // More Country Flags
    { id: 'flag-australia', name: 'Australia Flag', svg: '🇦🇺', category: 'Flags' },
    { id: 'flag-brazil', name: 'Brazil Flag', svg: '🇧🇷', category: 'Flags' },
    { id: 'flag-canada', name: 'Canada Flag', svg: '🇨🇦', category: 'Flags' },
    { id: 'flag-china', name: 'China Flag', svg: '🇨🇳', category: 'Flags' },
    { id: 'flag-denmark', name: 'Denmark Flag', svg: '🇩🇰', category: 'Flags' },
    { id: 'flag-finland', name: 'Finland Flag', svg: '🇫🇮', category: 'Flags' },
    { id: 'flag-greece', name: 'Greece Flag', svg: '🇬🇷', category: 'Flags' },
    { id: 'flag-iceland', name: 'Iceland Flag', svg: '🇮🇸', category: 'Flags' },
    { id: 'flag-ireland', name: 'Ireland Flag', svg: '🇮🇪', category: 'Flags' },
    { id: 'flag-poland', name: 'Poland Flag', svg: '🇵🇱', category: 'Flags' },
    { id: 'flag-portugal', name: 'Portugal Flag', svg: '🇵🇹', category: 'Flags' },
    { id: 'flag-ukraine', name: 'Ukraine Flag', svg: '🇺🇦', category: 'Flags' },
    { id: 'flag-belgium', name: 'Belgium Flag', svg: '🇧🇪', category: 'Flags' },
    { id: 'flag-austria', name: 'Austria Flag', svg: '🇦🇹', category: 'Flags' },
    { id: 'flag-czech', name: 'Czech Republic Flag', svg: '🇨🇿', category: 'Flags' },
    { id: 'flag-hungary', name: 'Hungary Flag', svg: '🇭🇺', category: 'Flags' },
    { id: 'flag-romania', name: 'Romania Flag', svg: '🇷🇴', category: 'Flags' },
    { id: 'flag-bulgaria', name: 'Bulgaria Flag', svg: '🇧🇬', category: 'Flags' },
    { id: 'flag-croatia', name: 'Croatia Flag', svg: '🇭🇷', category: 'Flags' },
    { id: 'flag-slovenia', name: 'Slovenia Flag', svg: '🇸🇮', category: 'Flags' },
    { id: 'flag-slovakia', name: 'Slovakia Flag', svg: '🇸🇰', category: 'Flags' },
    { id: 'flag-estonia', name: 'Estonia Flag', svg: '🇪🇪', category: 'Flags' },
    { id: 'flag-latvia', name: 'Latvia Flag', svg: '🇱🇻', category: 'Flags' },
    { id: 'flag-lithuania', name: 'Lithuania Flag', svg: '🇱🇹', category: 'Flags' },
    { id: 'flag-luxembourg', name: 'Luxembourg Flag', svg: '🇱🇺', category: 'Flags' },
    { id: 'flag-malta', name: 'Malta Flag', svg: '🇲🇹', category: 'Flags' },
    { id: 'flag-cyprus', name: 'Cyprus Flag', svg: '🇨🇾', category: 'Flags' },
    { id: 'flag-monaco', name: 'Monaco Flag', svg: '🇲🇨', category: 'Flags' },
    { id: 'flag-andorra', name: 'Andorra Flag', svg: '🇦🇩', category: 'Flags' },
    { id: 'flag-liechtenstein', name: 'Liechtenstein Flag', svg: '🇱🇮', category: 'Flags' },
    { id: 'flag-san-marino', name: 'San Marino Flag', svg: '🇸🇲', category: 'Flags' },
    { id: 'flag-vatican', name: 'Vatican Flag', svg: '🇻🇦', category: 'Flags' },
    { id: 'flag-india', name: 'India Flag', svg: '🇮🇳', category: 'Flags' },
    { id: 'flag-japan', name: 'Japan Flag', svg: '🇯🇵', category: 'Flags' },
    { id: 'flag-thailand', name: 'Thailand Flag', svg: '🇹🇭', category: 'Flags' },
    { id: 'flag-vietnam', name: 'Vietnam Flag', svg: '🇻🇳', category: 'Flags' },
    { id: 'flag-singapore', name: 'Singapore Flag', svg: '🇸🇬', category: 'Flags' },
    { id: 'flag-malaysia', name: 'Malaysia Flag', svg: '🇲🇾', category: 'Flags' },
    { id: 'flag-indonesia', name: 'Indonesia Flag', svg: '🇮🇩', category: 'Flags' },
    { id: 'flag-philippines', name: 'Philippines Flag', svg: '🇵🇭', category: 'Flags' },
    { id: 'flag-new-zealand', name: 'New Zealand Flag', svg: '🇳🇿', category: 'Flags' },

    // Mathematical & Scientific Symbols
    { id: 'infinity', name: 'Infinity', svg: '∞', category: 'Math & Science' },
    { id: 'pi', name: 'Pi', svg: 'π', category: 'Math & Science' },
    { id: 'sigma', name: 'Sigma', svg: 'Σ', category: 'Math & Science' },
    { id: 'delta', name: 'Delta', svg: 'Δ', category: 'Math & Science' },
    { id: 'alpha', name: 'Alpha', svg: 'α', category: 'Math & Science' },
    { id: 'beta', name: 'Beta', svg: 'β', category: 'Math & Science' },
    { id: 'gamma', name: 'Gamma', svg: 'γ', category: 'Math & Science' },
    { id: 'omega', name: 'Omega', svg: 'Ω', category: 'Math & Science' },
    { id: 'theta', name: 'Theta', svg: 'θ', category: 'Math & Science' },
    { id: 'lambda', name: 'Lambda', svg: 'λ', category: 'Math & Science' },
    { id: 'mu', name: 'Mu', svg: 'μ', category: 'Math & Science' },
    { id: 'phi', name: 'Phi', svg: 'φ', category: 'Math & Science' },
    { id: 'plus-minus', name: 'Plus Minus', svg: '±', category: 'Math & Science' },
    { id: 'multiply', name: 'Multiply', svg: '×', category: 'Math & Science' },
    { id: 'divide', name: 'Divide', svg: '÷', category: 'Math & Science' },
    { id: 'not-equal', name: 'Not Equal', svg: '≠', category: 'Math & Science' },
    { id: 'less-equal', name: 'Less or Equal', svg: '≤', category: 'Math & Science' },
    { id: 'greater-equal', name: 'Greater or Equal', svg: '≥', category: 'Math & Science' },
    { id: 'approximately', name: 'Approximately', svg: '≈', category: 'Math & Science' },
    { id: 'square-root', name: 'Square Root', svg: '√', category: 'Math & Science' },
    { id: 'degree', name: 'Degree', svg: '°', category: 'Math & Science' },
    { id: 'percent', name: 'Percent', svg: '%', category: 'Math & Science' },
    { id: 'permille', name: 'Per Mille', svg: '‰', category: 'Math & Science' },
    { id: 'microscope', name: 'Microscope', svg: '🔬', category: 'Math & Science' },
    { id: 'telescope', name: 'Telescope', svg: '🔭', category: 'Math & Science' },
    { id: 'test-tube', name: 'Test Tube', svg: '🧪', category: 'Math & Science' },
    { id: 'dna', name: 'DNA', svg: '🧬', category: 'Math & Science' },
    { id: 'atom', name: 'Atom', svg: '⚛️', category: 'Math & Science' },
    { id: 'magnet', name: 'Magnet', svg: '🧲', category: 'Math & Science' },
    { id: 'satellite', name: 'Satellite', svg: '🛰️', category: 'Math & Science' },
    { id: 'rocket', name: 'Rocket', svg: '🚀', category: 'Math & Science' },

    // Industry & Professional Symbols
    { id: 'factory', name: 'Factory', svg: '🏭', category: 'Industry' },
    { id: 'construction', name: 'Construction', svg: '🚧', category: 'Industry' },
    { id: 'gear', name: 'Gear', svg: '⚙️', category: 'Industry' },
    { id: 'wrench', name: 'Wrench', svg: '🔧', category: 'Industry' },
    { id: 'hammer', name: 'Hammer', svg: '🔨', category: 'Industry' },
    { id: 'screwdriver', name: 'Screwdriver', svg: '🪛', category: 'Industry' },
    { id: 'oil-drum', name: 'Oil Drum', svg: '🛢️', category: 'Industry' },
    { id: 'crane', name: 'Construction Crane', svg: '🏗️', category: 'Industry' },
    { id: 'building', name: 'Office Building', svg: '🏢', category: 'Industry' },
    { id: 'bank', name: 'Bank', svg: '🏦', category: 'Industry' },
    { id: 'hospital', name: 'Hospital', svg: '🏥', category: 'Industry' },
    { id: 'school', name: 'School', svg: '🏫', category: 'Industry' },
    { id: 'hotel', name: 'Hotel', svg: '🏨', category: 'Industry' },
    { id: 'store', name: 'Store', svg: '🏪', category: 'Industry' },
    { id: 'gas-station', name: 'Gas Station', svg: '⛽', category: 'Industry' },
    { id: 'pharmacy', name: 'Pharmacy', svg: '💊', category: 'Industry' },
    { id: 'stethoscope', name: 'Stethoscope', svg: '🩺', category: 'Industry' },
    { id: 'syringe', name: 'Syringe', svg: '💉', category: 'Industry' },
    { id: 'pill', name: 'Pill', svg: '💊', category: 'Industry' },
    { id: 'bandage', name: 'Bandage', svg: '🩹', category: 'Industry' },
    { id: 'x-ray', name: 'X-Ray', svg: '🩻', category: 'Industry' },
    { id: 'crutch', name: 'Crutch', svg: '🩼', category: 'Industry' },

    // Technology & Computing
    { id: 'robot', name: 'Robot', svg: '🤖', category: 'Technology' },
    { id: 'desktop', name: 'Desktop Computer', svg: '🖥️', category: 'Technology' },
    { id: 'server', name: 'Server', svg: '🖲️', category: 'Technology' },
    { id: 'database', name: 'Database', svg: '🗄️', category: 'Technology' },
    { id: 'hard-drive', name: 'Hard Drive', svg: '💽', category: 'Technology' },
    { id: 'optical-disk', name: 'Optical Disk', svg: '💿', category: 'Technology' },
    { id: 'minidisc', name: 'MiniDisc', svg: '💽', category: 'Technology' },
    { id: 'joystick-2', name: 'Joystick', svg: '🕹️', category: 'Technology' },
    { id: 'gamepad', name: 'Game Controller', svg: '🎮', category: 'Technology' },
    { id: 'vr-headset', name: 'VR Headset', svg: '🥽', category: 'Technology' },
    { id: 'smartwatch', name: 'Smartwatch', svg: '⌚', category: 'Technology' },
    { id: 'calculator', name: 'Calculator', svg: '🧮', category: 'Technology' },
    { id: 'trackball', name: 'Trackball', svg: '🖲️', category: 'Technology' },
    { id: 'pager', name: 'Pager', svg: '📟', category: 'Technology' },
    { id: 'radio', name: 'Radio', svg: '📻', category: 'Technology' },
    { id: 'television', name: 'Television', svg: '📺', category: 'Technology' },
    { id: 'projector', name: 'Film Projector', svg: '📽️', category: 'Technology' },
    { id: 'film-strip', name: 'Film Strip', svg: '🎞️', category: 'Technology' },
    { id: 'antenna', name: 'Antenna', svg: '📡', category: 'Technology' },

    // Business & Office
    { id: 'office-chair', name: 'Office Chair', svg: '🪑', category: 'Business' },
    { id: 'desk', name: 'Desk', svg: '🪑', category: 'Business' },
    { id: 'filing-cabinet', name: 'Filing Cabinet', svg: '🗃️', category: 'Business' },
    { id: 'clipboard', name: 'Clipboard', svg: '📋', category: 'Business' },
    { id: 'calendar', name: 'Calendar', svg: '📅', category: 'Business' },
    { id: 'spiral-calendar', name: 'Spiral Calendar', svg: '🗓️', category: 'Business' },
    { id: 'bookmark', name: 'Bookmark', svg: '🔖', category: 'Business' },
    { id: 'label', name: 'Label', svg: '🏷️', category: 'Business' },
    { id: 'pushpin', name: 'Pushpin', svg: '📌', category: 'Business' },
    { id: 'round-pushpin', name: 'Round Pushpin', svg: '📍', category: 'Business' },
    { id: 'paperclip', name: 'Paperclip', svg: '📎', category: 'Business' },
    { id: 'linked-paperclips', name: 'Linked Paperclips', svg: '🖇️', category: 'Business' },
    { id: 'scissors', name: 'Scissors', svg: '✂️', category: 'Business' },
    { id: 'pen', name: 'Pen', svg: '🖊️', category: 'Business' },
    { id: 'fountain-pen', name: 'Fountain Pen', svg: '🖋️', category: 'Business' },
    { id: 'pencil', name: 'Pencil', svg: '✏️', category: 'Business' },
    { id: 'crayon', name: 'Crayon', svg: '🖍️', category: 'Business' },
    { id: 'paintbrush', name: 'Paintbrush', svg: '🖌️', category: 'Business' },
    { id: 'magnifying-glass', name: 'Magnifying Glass', svg: '🔍', category: 'Business' },
    {
      id: 'magnifying-glass-right',
      name: 'Magnifying Glass Right',
      svg: '🔎',
      category: 'Business',
    },

    // Music & Entertainment
    { id: 'musical-note', name: 'Musical Note', svg: '🎵', category: 'Music' },
    { id: 'musical-notes', name: 'Musical Notes', svg: '🎶', category: 'Music' },
    { id: 'treble-clef', name: 'Treble Clef', svg: '🎼', category: 'Music' },
    { id: 'guitar', name: 'Guitar', svg: '🎸', category: 'Music' },
    { id: 'violin', name: 'Violin', svg: '🎻', category: 'Music' },
    { id: 'piano', name: 'Piano', svg: '🎹', category: 'Music' },
    { id: 'trumpet', name: 'Trumpet', svg: '🎺', category: 'Music' },
    { id: 'saxophone', name: 'Saxophone', svg: '🎷', category: 'Music' },
    { id: 'drum', name: 'Drum', svg: '🥁', category: 'Music' },
    { id: 'maracas', name: 'Maracas', svg: '🪇', category: 'Music' },
    { id: 'flute', name: 'Flute', svg: '🪈', category: 'Music' },
    { id: 'harp', name: 'Harp', svg: '🪕', category: 'Music' },
    { id: 'banjo', name: 'Banjo', svg: '🪕', category: 'Music' },
    { id: 'accordion', name: 'Accordion', svg: '🪗', category: 'Music' },
    { id: 'harmonica', name: 'Harmonica', svg: '🎵', category: 'Music' },
    { id: 'radio-2', name: 'Radio', svg: '📻', category: 'Music' },
    { id: 'cd-player', name: 'CD Player', svg: '💿', category: 'Music' },
    { id: 'cassette', name: 'Cassette Tape', svg: '📼', category: 'Music' },

    // Sports & Fitness
    { id: 'medal-sports', name: 'Sports Medal', svg: '🏅', category: 'Sports' },
    { id: 'trophy-sports', name: 'Sports Trophy', svg: '🏆', category: 'Sports' },
    { id: 'first-place', name: 'First Place Medal', svg: '🥇', category: 'Sports' },
    { id: 'second-place', name: 'Second Place Medal', svg: '🥈', category: 'Sports' },
    { id: 'third-place', name: 'Third Place Medal', svg: '🥉', category: 'Sports' },
    { id: 'volleyball', name: 'Volleyball', svg: '🏐', category: 'Sports' },
    { id: 'rugby', name: 'Rugby Ball', svg: '🏉', category: 'Sports' },
    { id: 'cricket', name: 'Cricket Game', svg: '🏏', category: 'Sports' },
    { id: 'field-hockey', name: 'Field Hockey', svg: '🏑', category: 'Sports' },
    { id: 'ice-hockey', name: 'Ice Hockey', svg: '🏒', category: 'Sports' },
    { id: 'lacrosse', name: 'Lacrosse', svg: '🥍', category: 'Sports' },
    { id: 'ping-pong', name: 'Ping Pong', svg: '🏓', category: 'Sports' },
    { id: 'badminton', name: 'Badminton', svg: '🏸', category: 'Sports' },
    { id: 'boxing-glove', name: 'Boxing Glove', svg: '🥊', category: 'Sports' },
    { id: 'martial-arts', name: 'Martial Arts Uniform', svg: '🥋', category: 'Sports' },
    { id: 'goal-net', name: 'Goal Net', svg: '🥅', category: 'Sports' },
    { id: 'archery', name: 'Bow and Arrow', svg: '🏹', category: 'Sports' },
    { id: 'fishing', name: 'Fishing Pole', svg: '🎣', category: 'Sports' },
    { id: 'diving-mask', name: 'Diving Mask', svg: '🤿', category: 'Sports' },
    { id: 'sled', name: 'Sled', svg: '🛷', category: 'Sports' },
    { id: 'curling-stone', name: 'Curling Stone', svg: '🥌', category: 'Sports' },
    { id: 'skateboard', name: 'Skateboard', svg: '🛹', category: 'Sports' },
    { id: 'roller-skate', name: 'Roller Skate', svg: '🛼', category: 'Sports' },
    { id: 'parachute', name: 'Parachute', svg: '🪂', category: 'Sports' },
    { id: 'kite', name: 'Kite', svg: '🪁', category: 'Sports' },
    { id: 'yo-yo', name: 'Yo-Yo', svg: '🪀', category: 'Sports' },

    // Food & Cooking
    { id: 'chef-hat', name: 'Chef Hat', svg: '👨‍🍳', category: 'Food & Cooking' },
    { id: 'pot', name: 'Cooking Pot', svg: '🍲', category: 'Food & Cooking' },
    { id: 'frying-pan', name: 'Frying Pan', svg: '🍳', category: 'Food & Cooking' },
    { id: 'knife', name: 'Kitchen Knife', svg: '🔪', category: 'Food & Cooking' },
    { id: 'fork', name: 'Fork and Knife', svg: '🍴', category: 'Food & Cooking' },
    { id: 'spoon', name: 'Spoon', svg: '🥄', category: 'Food & Cooking' },
    { id: 'chopsticks', name: 'Chopsticks', svg: '🥢', category: 'Food & Cooking' },
    { id: 'plate', name: 'Plate', svg: '🍽️', category: 'Food & Cooking' },
    { id: 'bowl', name: 'Bowl', svg: '🥣', category: 'Food & Cooking' },
    { id: 'cup', name: 'Cup', svg: '🥤', category: 'Food & Cooking' },
    { id: 'wine-glass', name: 'Wine Glass', svg: '🍷', category: 'Food & Cooking' },
    { id: 'champagne', name: 'Champagne Glass', svg: '🥂', category: 'Food & Cooking' },
    { id: 'bottle', name: 'Bottle', svg: '🍾', category: 'Food & Cooking' },
    { id: 'salt', name: 'Salt Shaker', svg: '🧂', category: 'Food & Cooking' },

    // Travel & Transportation
    { id: 'luggage', name: 'Luggage', svg: '🧳', category: 'Travel' },
    { id: 'passport', name: 'Passport', svg: '📔', category: 'Travel' },
    { id: 'ticket-travel', name: 'Travel Ticket', svg: '🎫', category: 'Travel' },
    { id: 'compass', name: 'Compass', svg: '🧭', category: 'Travel' },
    { id: 'map', name: 'World Map', svg: '🗺️', category: 'Travel' },
    { id: 'mountain', name: 'Mountain', svg: '⛰️', category: 'Travel' },
    { id: 'volcano', name: 'Volcano', svg: '🌋', category: 'Travel' },
    { id: 'desert', name: 'Desert', svg: '🏜️', category: 'Travel' },
    { id: 'beach', name: 'Beach', svg: '🏖️', category: 'Travel' },
    { id: 'island', name: 'Desert Island', svg: '🏝️', category: 'Travel' },
    { id: 'national-park', name: 'National Park', svg: '🏞️', category: 'Travel' },
    { id: 'stadium-travel', name: 'Stadium', svg: '🏟️', category: 'Travel' },
    { id: 'classical-building', name: 'Classical Building', svg: '🏛️', category: 'Travel' },
    { id: 'cityscape-travel', name: 'Cityscape', svg: '🏙️', category: 'Travel' },
    { id: 'sunset-city', name: 'Sunset over City', svg: '🌆', category: 'Travel' },
    { id: 'bridge-night', name: 'Bridge at Night', svg: '🌉', category: 'Travel' },
    { id: 'ferris-wheel', name: 'Ferris Wheel', svg: '🎡', category: 'Travel' },
    { id: 'roller-coaster', name: 'Roller Coaster', svg: '🎢', category: 'Travel' },
    { id: 'carousel', name: 'Carousel Horse', svg: '🎠', category: 'Travel' },
    { id: 'circus-tent', name: 'Circus Tent', svg: '🎪', category: 'Travel' },
    { id: 'performing-arts', name: 'Performing Arts', svg: '🎭', category: 'Travel' },
    { id: 'art-palette', name: 'Artist Palette', svg: '🎨', category: 'Travel' },

    // Zodiac & Astrology
    { id: 'aries', name: 'Aries', svg: '♈', category: 'Zodiac' },
    { id: 'taurus', name: 'Taurus', svg: '♉', category: 'Zodiac' },
    { id: 'gemini', name: 'Gemini', svg: '♊', category: 'Zodiac' },
    { id: 'cancer', name: 'Cancer', svg: '♋', category: 'Zodiac' },
    { id: 'leo', name: 'Leo', svg: '♌', category: 'Zodiac' },
    { id: 'virgo', name: 'Virgo', svg: '♍', category: 'Zodiac' },
    { id: 'libra', name: 'Libra', svg: '♎', category: 'Zodiac' },
    { id: 'scorpio', name: 'Scorpio', svg: '♏', category: 'Zodiac' },
    { id: 'sagittarius', name: 'Sagittarius', svg: '♐', category: 'Zodiac' },
    { id: 'capricorn', name: 'Capricorn', svg: '♑', category: 'Zodiac' },
    { id: 'aquarius', name: 'Aquarius', svg: '♒', category: 'Zodiac' },
    { id: 'pisces', name: 'Pisces', svg: '♓', category: 'Zodiac' },
    { id: 'ophiuchus', name: 'Ophiuchus', svg: '⛎', category: 'Zodiac' },

    // Additional Symbols & Icons
    { id: 'recycle', name: 'Recycle Symbol', svg: '♻️', category: 'Symbols' },
    { id: 'peace', name: 'Peace Symbol', svg: '☮️', category: 'Symbols' },
    { id: 'yin-yang', name: 'Yin Yang', svg: '☯️', category: 'Symbols' },
    { id: 'cross-symbol', name: 'Cross', svg: '✝️', category: 'Symbols' },
    { id: 'orthodox-cross', name: 'Orthodox Cross', svg: '☦️', category: 'Symbols' },
    { id: 'star-crescent', name: 'Star and Crescent', svg: '☪️', category: 'Symbols' },
    { id: 'om', name: 'Om Symbol', svg: '🕉️', category: 'Symbols' },
    { id: 'wheel-dharma', name: 'Wheel of Dharma', svg: '☸️', category: 'Symbols' },
    { id: 'star-david', name: 'Star of David', svg: '✡️', category: 'Symbols' },
    { id: 'six-pointed-star', name: 'Six Pointed Star', svg: '🔯', category: 'Symbols' },
    { id: 'menorah', name: 'Menorah', svg: '🕎', category: 'Symbols' },
    { id: 'khanda', name: 'Khanda', svg: '🪯', category: 'Symbols' },
    { id: 'fleur-de-lis', name: 'Fleur-de-lis', svg: '⚜️', category: 'Symbols' },
    { id: 'trident', name: 'Trident Emblem', svg: '🔱', category: 'Symbols' },
    { id: 'atom-symbol', name: 'Atom Symbol', svg: '⚛️', category: 'Symbols' },
    { id: 'radioactive', name: 'Radioactive', svg: '☢️', category: 'Symbols' },
    { id: 'biohazard', name: 'Biohazard', svg: '☣️', category: 'Symbols' },
    { id: 'medical-symbol', name: 'Medical Symbol', svg: '⚕️', category: 'Symbols' },
    { id: 'scales', name: 'Balance Scale', svg: '⚖️', category: 'Symbols' },
    { id: 'anchor', name: 'Anchor', svg: '⚓', category: 'Symbols' },
    { id: 'crown', name: 'Crown', svg: '👑', category: 'Symbols' },
    { id: 'gem', name: 'Gem Stone', svg: '💎', category: 'Symbols' },
    { id: 'ring', name: 'Ring', svg: '💍', category: 'Symbols' },
    { id: 'lipstick', name: 'Lipstick', svg: '💄', category: 'Symbols' },
    { id: 'high-heel', name: 'High-Heeled Shoe', svg: '👠', category: 'Symbols' },
    { id: 'handbag', name: 'Handbag', svg: '👜', category: 'Symbols' },
    { id: 'purse', name: 'Purse', svg: '👛', category: 'Symbols' },
    { id: 'shopping-bags', name: 'Shopping Bags', svg: '🛍️', category: 'Symbols' },
    { id: 'graduation-cap', name: 'Graduation Cap', svg: '🎓', category: 'Symbols' },
    { id: 'top-hat', name: 'Top Hat', svg: '🎩', category: 'Symbols' },
    { id: 'womans-hat', name: "Woman's Hat", svg: '👒', category: 'Symbols' },
    { id: 'helmet', name: "Rescue Worker's Helmet", svg: '⛑️', category: 'Symbols' },
    { id: 'prayer-beads', name: 'Prayer Beads', svg: '📿', category: 'Symbols' },
    { id: 'lipstick-mark', name: 'Kiss Mark', svg: '💋', category: 'Symbols' },
    { id: 'footprints', name: 'Footprints', svg: '👣', category: 'Symbols' },
    { id: 'eye-speech-bubble', name: 'Eye in Speech Bubble', svg: '👁️‍🗨️', category: 'Symbols' },
  ])

  // Computed
  const canvasStyle = computed(() => {
    const bg = currentBackground.value
    if (bg.type === 'gradient' && bg.gradientColors) {
      return {
        background: `linear-gradient(${bg.gradientDirection}, ${bg.gradientColors.join(', ')})`,
      }
    }
    return {
      backgroundColor: bg.value,
    }
  })

  const sizeCategories = computed(() => {
    const categories = [...new Set(bannerSizes.value.map((size) => size.category))]
    return categories
  })

  // Actions
  function selectSize(size: BannerSize) {
    currentSize.value = size
    // Adjust existing elements to fit new canvas size if needed
    adjustElementsToNewSize()
  }

  function selectBackground(background: BackgroundOption) {
    currentBackground.value = background
  }

  function updateFancyBackgroundColors(backgroundId: string, newColors: string[]) {
    const background = backgroundOptions.value.find((bg) => bg.id === backgroundId)
    if (background && background.type === 'fancy') {
      background.patternColors = [...newColors]
      // If this is the current background, trigger a reactive update
      if (currentBackground.value.id === backgroundId) {
        currentBackground.value = { ...background }
      }
    }
  }

  function adjustElementsToNewSize() {
    const newSize = currentSize.value

    // Adjust text elements positions if they're outside the new canvas
    textElements.value.forEach((element) => {
      if (element.x > newSize.width - 100) {
        element.x = Math.max(0, newSize.width - 100)
      }
      if (element.y > newSize.height - 50) {
        element.y = Math.max(0, newSize.height - 50)
      }
    })

    // Adjust image positions
    images.value.forEach((image) => {
      if (image.x + image.width > newSize.width) {
        image.x = Math.max(0, newSize.width - image.width)
      }
      if (image.y + image.height > newSize.height) {
        image.y = Math.max(0, newSize.height - image.height)
      }
    })
  }

  function addTextElement(element: Omit<TextElement, 'id'>) {
    const newElement: TextElement = {
      ...element,
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    textElements.value.push(newElement)
  }

  function updateTextElement(id: string, updates: Partial<TextElement>) {
    const index = textElements.value.findIndex((el) => el.id === id)
    if (index !== -1) {
      textElements.value[index] = { ...textElements.value[index], ...updates }
    }
  }

  function removeTextElement(id: string) {
    textElements.value = textElements.value.filter((el) => el.id !== id)
  }

  function addImage(image: Omit<BannerImage, 'id'>) {
    const newImage: BannerImage = {
      ...image,
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    images.value.push(newImage)
  }

  function updateImage(id: string, updates: Partial<BannerImage>) {
    const index = images.value.findIndex((img) => img.id === id)
    if (index !== -1) {
      images.value[index] = { ...images.value[index], ...updates }
    }
  }

  function removeImage(id: string) {
    images.value = images.value.filter((img) => img.id !== id)
  }

  function addIcon(iconType: string) {
    const newIcon: BannerIcon = {
      id: `icon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: iconType,
      x: currentSize.value.width / 2 - 50,
      y: currentSize.value.height / 2 - 50,
      size: 100,
      rotation: 0,
      opacity: 1,
      color: '#3B82F6',
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
    icons.value.push(newIcon)
  }

  function updateIcon(id: string, updates: Partial<BannerIcon>) {
    const index = icons.value.findIndex((icon) => icon.id === id)
    if (index !== -1) {
      icons.value[index] = { ...icons.value[index], ...updates }
    }
  }

  function removeIcon(id: string) {
    icons.value = icons.value.filter((icon) => icon.id !== id)
  }

  function clearBanner() {
    textElements.value = []
    images.value = []
    icons.value = []
  }

  function setCanvasRef(canvas: HTMLCanvasElement) {
    canvasRef.value = canvas
  }

  function setCustomDimensions(width: number, height: number) {
    customWidth.value = width
    customHeight.value = height

    // Update custom size in bannerSizes array
    const customSizeIndex = bannerSizes.value.findIndex((size) => size.id === 'custom-size')
    if (customSizeIndex !== -1) {
      bannerSizes.value[customSizeIndex].width = width
      bannerSizes.value[customSizeIndex].height = height
      bannerSizes.value[customSizeIndex].name = `Custom (${width}×${height})`
    }

    // If currently using custom size, update currentSize
    if (currentSize.value.id === 'custom-size') {
      currentSize.value = {
        ...currentSize.value,
        width,
        height,
        name: `Custom (${width}×${height})`,
      }
      adjustElementsToNewSize()
    }
  }

  function createImageBackground(imageUrl: string, name: string = 'Custom Image') {
    const customBg: BackgroundOption = {
      id: `image-${Date.now()}`,
      name,
      type: 'image',
      value: imageUrl,
      preview: `url(${imageUrl})`,
      cropX: 50, // Center horizontally
      cropY: 50, // Center vertically
      scale: 1, // Fit to cover
    }
    return customBg
  }

  function updateBackgroundCrop(backgroundId: string, cropX: number, cropY: number, scale: number) {
    const background = backgroundOptions.value.find((bg) => bg.id === backgroundId)
    if (background && background.type === 'image') {
      // Update the background properties
      background.cropX = cropX
      background.cropY = cropY
      background.scale = scale

      // If this is the current background, update it to trigger reactivity
      if (currentBackground.value.id === backgroundId) {
        currentBackground.value = {
          ...background,
          cropX,
          cropY,
          scale,
        }
      }
    }
  }

  // Initialize with default text element
  function initializeDefaultContent() {
    if (textElements.value.length === 0) {
      addTextElement({
        text: 'Your text here',
        x: currentSize.value.width / 2 - 100, // Center approximately
        y: currentSize.value.height / 2 - 25, // Center vertically
        fontSize: 'large',
        color: '#FFFFFF',
        colorType: 'solid',
        gradientColors: ['#FFFFFF', '#F3F4F6'],
        gradientDirection: 45,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.5)',
          blur: 4,
          offsetX: 2,
          offsetY: 2,
        },
        stroke: {
          enabled: false,
          color: '#000000',
          width: 2,
        },
      })
    }
  }

  // Color theory helper functions
  function generateHarmoniousColors(): string[] {
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

  function hslToHex(hsl: string): string {
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
  function isLightColor(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    // Calculate relative luminance using sRGB formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5
  }

  // Helper function to get contrasting text color
  function getContrastingTextColor(backgroundColor: string): string {
    return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF'
  }

  // Helper function to get the dominant background color
  function getDominantBackgroundColor(background: BackgroundOption): string {
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
  function areColorsSimilar(color1: string, color2: string, threshold: number = 50): boolean {
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
  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
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
  function generateContrastingTextColors(backgroundColors: string[]): string[] {
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

  function randomizeBanner() {
    // Clear existing content
    clearBanner()

    // Generate harmonious color palette for backgrounds
    const colors = generateHarmoniousColors()
    const hexColors = colors.map(hslToHex)

    // Generate contrasting text colors that won't clash with backgrounds
    const textColors = generateContrastingTextColors(hexColors)

    console.log('🎨 Randomizer Debug:', {
      hslColors: colors,
      backgroundColors: hexColors,
      textColors: textColors,
      timestamp: Date.now(),
    })

    // Choose layout template
    const layoutTemplates = ['minimal', 'balanced', 'dynamic', 'centered', 'corner-focused']
    const template = layoutTemplates[Math.floor(Math.random() * layoutTemplates.length)]

    // 1. TRULY RANDOM background selection - choose TYPE first, then specific background
    const backgroundTypes = ['solid', 'gradient', 'fancy', 'image'] as const
    const selectedType = backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)]

    console.log('🎯 Background Type Selected:', selectedType)

    let selectedBackground: BackgroundOption

    if (selectedType === 'solid') {
      // Create random solid color backgrounds
      selectedBackground = {
        id: `random-solid-${Date.now()}`,
        name: 'Random Solid Color',
        type: 'solid',
        value: hexColors[0],
        preview: hexColors[0],
      }
      console.log('🟡 Solid Background Created:', selectedBackground.value)
    } else if (selectedType === 'gradient') {
      // Create random gradient backgrounds
      const gradientColors = hexColors.slice(0, 2 + Math.floor(Math.random() * 2)) // 2-3 colors
      const directions = [
        '0deg',
        '45deg',
        '90deg',
        '135deg',
        '180deg',
        '225deg',
        '270deg',
        '315deg',
      ]
      const randomDirection = directions[Math.floor(Math.random() * directions.length)]

      selectedBackground = {
        id: `random-gradient-${Date.now()}`,
        name: 'Random Gradient',
        type: 'gradient',
        value: 'linear-gradient',
        gradientDirection: randomDirection,
        gradientColors,
        preview: `linear-gradient(${randomDirection}, ${gradientColors.join(', ')})`,
      }
      console.log('🌈 Gradient Background Created:', {
        colors: gradientColors,
        direction: randomDirection,
      })
    } else if (selectedType === 'fancy') {
      // Select from fancy patterns and randomize colors
      const fancyBackgrounds = backgroundOptions.value.filter((bg) => bg.type === 'fancy')
      if (fancyBackgrounds.length === 0) {
        console.warn('No fancy backgrounds available, falling back to gradient')
        // Fallback to gradient
        const gradientColors = hexColors.slice(0, 2)
        selectedBackground = {
          id: `fallback-gradient-${Date.now()}`,
          name: 'Fallback Gradient',
          type: 'gradient',
          value: 'linear-gradient',
          gradientDirection: '45deg',
          gradientColors,
          preview: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
        }
      } else {
        const baseFancy = fancyBackgrounds[Math.floor(Math.random() * fancyBackgrounds.length)]

        selectedBackground = {
          ...baseFancy,
          id: `random-fancy-${Date.now()}`,
          patternColors: hexColors.slice(0, baseFancy.patternColors?.length || 2),
        }
        console.log('🎨 Fancy Background Created:', {
          pattern: baseFancy.name,
          colors: selectedBackground.patternColors,
        })
      }
    } else {
      // Create random image background from stock photos
      const stockImages = [
        // Professional/Business
        'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',

        // Creative/Colorful
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop',

        // Lifestyle
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop',

        // Nature/Travel
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1200&h=800&fit=crop',
      ]

      const randomImage = stockImages[Math.floor(Math.random() * stockImages.length)]
      selectedBackground = {
        id: `random-image-${Date.now()}`,
        name: 'Random Stock Image',
        type: 'image',
        value: randomImage,
        preview: `url('${randomImage}')`,
        cropY: 20 + Math.random() * 60, // Random vertical position
      }
      console.log('🖼️ Image Background Created:', randomImage)
    }

    console.log('✅ Final Background Selected:', selectedBackground)
    selectBackground(selectedBackground)

    // Get contrasting text color based on background
    const dominantBgColor = getDominantBackgroundColor(selectedBackground)
    const textColor = getContrastingTextColor(dominantBgColor)

    // 2. Add text with MINIMUM 72px size (large and above only)
    const bannerWidth = currentSize.value.width
    const bannerHeight = currentSize.value.height

    // Calculate scale factor for responsive sizing
    const scaleFactor = Math.min(bannerWidth / 800, bannerHeight / 400)

    // ONLY use font sizes 72px and above (large, xlarge, xxlarge, huge, massive, giant)
    const minFontSizes: Array<TextElement['fontSize']> =
      scaleFactor > 2
        ? ['huge', 'massive', 'giant', 'giant', 'massive', 'huge'] // For very large banners
        : scaleFactor > 1.5
          ? ['xlarge', 'xxlarge', 'huge', 'massive', 'huge', 'xxlarge'] // Large banners
          : scaleFactor > 1
            ? ['large', 'xlarge', 'xxlarge', 'xlarge', 'large'] // Medium banners
            : ['large', 'large', 'xlarge', 'large'] // Smaller banners still get minimum 72px

    const fontFamilies = ['Inter, sans-serif', 'Space Grotesk, sans-serif', 'system-ui, sans-serif']
    const fontWeights = ['500', '600', '700', '800'] // medium to extra-bold

    // Position based on template
    let textX, textY, textAlign: 'left' | 'center' | 'right'

    switch (template) {
      case 'centered':
        textX = bannerWidth / 2
        textY = bannerHeight / 2 - 30
        textAlign = 'center'
        break
      case 'corner-focused':
        textX = 60
        textY = 60
        textAlign = 'left'
        break
      case 'minimal':
        textX = bannerWidth * 0.1
        textY = bannerHeight * 0.3
        textAlign = 'left'
        break
      case 'dynamic':
        textX = bannerWidth * 0.2
        textY = bannerHeight * 0.4 + (Math.random() - 0.5) * 100
        textAlign = Math.random() > 0.5 ? 'left' : 'center'
        break
      default: // balanced
        textX = bannerWidth * 0.15
        textY = bannerHeight * 0.35
        textAlign = 'left'
    }

    // Higher chance for gradient text (70% chance)
    const useGradientText = Math.random() > 0.3
    const fontSize = minFontSizes[Math.floor(Math.random() * minFontSizes.length)]

    // Select text colors that contrast with background
    const primaryTextColor = textColors[Math.floor(Math.random() * textColors.length)]
    const secondaryTextColor = textColors[Math.floor(Math.random() * textColors.length)]

    // Ensure gradient colors are different from each other
    const gradientColor1 = primaryTextColor
    let gradientColor2 = secondaryTextColor
    if (areColorsSimilar(gradientColor1, gradientColor2, 30)) {
      gradientColor2 =
        textColors.find((color) => !areColorsSimilar(color, gradientColor1, 30)) || textColor
    }

    addTextElement({
      text: 'Your text here',
      x: Math.max(40, Math.min(textX, bannerWidth - 300)),
      y: Math.max(40, Math.min(textY, bannerHeight - 80)),
      fontSize,
      color: useGradientText ? gradientColor1 : primaryTextColor,
      colorType: useGradientText ? 'gradient' : 'solid',
      gradientColors: useGradientText ? [gradientColor1, gradientColor2] : undefined,
      gradientDirection: Math.random() * 360,
      fontFamily: fontFamilies[Math.floor(Math.random() * fontFamilies.length)],
      fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
      textAlign,
      letterSpacing: Math.random() > 0.7 ? Math.random() * 2 : 0,
      lineHeight: 1.1 + Math.random() * 0.3,
      rotation: template === 'dynamic' && Math.random() > 0.8 ? (Math.random() - 0.5) * 15 : 0,
      opacity: 0.95 + Math.random() * 0.05,
      shadow: {
        enabled: selectedBackground.type === 'image' || Math.random() > 0.6,
        color: primaryTextColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
        blur: 3 + Math.random() * 4,
        offsetX: Math.random() * 3 - 1.5,
        offsetY: Math.random() * 3 - 1.5,
      },
      stroke: {
        enabled: Math.random() > 0.85,
        color: primaryTextColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
        width: 1 + Math.random() * 1.5,
      },
    })

    // 3. Smart icon placement based on template (40-80% chance)
    if (Math.random() > 0.2) {
      const iconCount =
        template === 'minimal'
          ? Math.floor(Math.random() * 2) // 0-1 icons for minimal
          : Math.floor(Math.random() * 3) // 0-2 icons for others

      if (iconCount > 0) {
        const iconTypes = availableIcons.value.map((icon) => icon.id)
        const usedPositions: number[] = []

        // Scale icon sizes based on banner dimensions (minimum 60px)
        const iconScale = Math.min(scaleFactor, 2)
        const baseIconSize = Math.max(60, 80 * iconScale)
        const iconSizeVariation = 50 * iconScale

        for (let i = 0; i < iconCount; i++) {
          const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)]
          const useGradientIcon = Math.random() > 0.4 // 60% chance for gradient icons

          // Template-based positioning
          let positions: Array<{ x: number; y: number }>

          switch (template) {
            case 'corner-focused':
              positions = [
                { x: bannerWidth - 120, y: 50 },
                { x: bannerWidth - 120, y: bannerHeight - 120 },
                { x: 50, y: bannerHeight - 120 },
              ]
              break
            case 'centered':
              positions = [
                { x: bannerWidth * 0.15, y: bannerHeight * 0.15 },
                { x: bannerWidth * 0.75, y: bannerHeight * 0.15 },
                { x: bannerWidth * 0.75, y: bannerHeight * 0.75 },
              ]
              break
            case 'minimal':
              positions = [{ x: bannerWidth * 0.8, y: bannerHeight * 0.2 }]
              break
            default:
              positions = [
                { x: 50, y: 50 },
                { x: bannerWidth - 120, y: 50 },
                { x: bannerWidth - 120, y: bannerHeight - 120 },
                { x: bannerWidth / 2 - 50, y: bannerHeight * 0.8 },
              ]
          }

          // Avoid overlapping positions
          let positionIndex
          do {
            positionIndex = Math.floor(Math.random() * positions.length)
          } while (usedPositions.includes(positionIndex) && usedPositions.length < positions.length)

          usedPositions.push(positionIndex)
          const position = positions[positionIndex]

          addIcon(iconType)

          // Update the icon that was just added
          const newIcon = icons.value[icons.value.length - 1]

          // Select icon colors from text color palette to avoid background conflicts
          const iconColor1 = textColors[Math.floor(Math.random() * textColors.length)]
          const iconColor2 = textColors[Math.floor(Math.random() * textColors.length)]

          updateIcon(newIcon.id, {
            x: position.x,
            y: position.y,
            size: Math.max(60, baseIconSize + Math.random() * iconSizeVariation),
            rotation: template === 'dynamic' && Math.random() > 0.7 ? Math.random() * 360 : 0,
            opacity: 0.8 + Math.random() * 0.2,
            color: useGradientIcon ? iconColor1 : iconColor1,
            colorType: useGradientIcon ? 'gradient' : 'solid',
            gradientColors: useGradientIcon ? [iconColor1, iconColor2] : undefined,
            gradientDirection: Math.random() * 360,
            shadow: {
              enabled: Math.random() > 0.5,
              color: 'rgba(0, 0, 0, 0.2)',
              blur: 3 + Math.random() * 5,
              offsetX: Math.random() * 3 - 1.5,
              offsetY: Math.random() * 3 - 1.5,
            },
            flipX: Math.random() > 0.92,
            flipY: Math.random() > 0.92,
          })
        }
      }
    }

    // 4. Decorative elements based on template (reduced probability for cleaner look)
    if (template === 'dynamic' && Math.random() > 0.7) {
      const decorativeImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&h=150&fit=crop',
      ]

      const decorativeImage = decorativeImages[Math.floor(Math.random() * decorativeImages.length)]
      const size = (60 + Math.random() * 80) * scaleFactor

      addImage({
        src: decorativeImage,
        x: Math.random() * (bannerWidth - size),
        y: Math.random() * (bannerHeight - size),
        width: size,
        height: size,
        borderRadius: Math.random() > 0.4 ? Math.random() * 50 : 0,
      })
    }
  }

  // Initialize default content when store is created
  initializeDefaultContent()

  function loadTemplate(template: BannerTemplate) {
    // Clear current banner
    clearBanner()

    // Set size
    selectSize(template.size)

    // Set background
    selectBackground(template.background)

    // Add text elements
    template.textElements.forEach((textElement) => {
      addTextElement(textElement)
    })

    // Add images
    template.images.forEach((image) => {
      addImage(image)
    })

    // Add icons
    template.icons.forEach((icon) => {
      addIcon(icon.type)
      // Find the newly added icon and update its properties
      const newIcon = icons.value[icons.value.length - 1]
      if (newIcon) {
        const { type, ...iconProps } = icon
        updateIcon(newIcon.id, iconProps)
      }
    })
  }

  return {
    // State
    currentSize,
    currentBackground,
    textElements,
    images,
    icons,
    bannerSizes,
    backgroundOptions,
    availableIcons,
    canvasRef,
    customWidth,
    customHeight,

    // Computed
    canvasStyle,
    sizeCategories,

    // Actions
    selectSize,
    selectBackground,
    updateFancyBackgroundColors,
    updateBackgroundCrop,
    addTextElement,
    updateTextElement,
    removeTextElement,
    addImage,
    updateImage,
    removeImage,
    addIcon,
    updateIcon,
    removeIcon,
    clearBanner,
    setCanvasRef,
    setCustomDimensions,
    createImageBackground,
    randomizeBanner,
    loadTemplate,
  }
})

import { ref } from 'vue'
import type { BackgroundOption, TextElement, BannerImage, BannerIcon, BannerSize } from './banner'

export interface BannerTemplate {
  id: string
  name: string
  description: string
  category: string
  previewImage: string
  size: BannerSize
  background: BackgroundOption
  textElements: Omit<TextElement, 'id'>[]
  images: Omit<BannerImage, 'id'>[]
  icons: Omit<BannerIcon, 'id'>[]
  tags: string[]
}

export const bannerTemplates = ref<BannerTemplate[]>([
  // 1. Tech Startup - Modern gradient with bold text
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    description: 'Modern gradient design perfect for technology companies and startups',
    category: 'Business',
    previewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
    size: { id: 'linkedin-banner', name: 'LinkedIn Banner', width: 1584, height: 396, category: 'Social Media' },
    background: {
      id: 'gradient-tech',
      name: 'Tech Gradient',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '135deg',
      gradientColors: ['#667eea', '#764ba2'],
      preview: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    textElements: [
      {
        text: 'Innovate. Create. Succeed.',
        x: 120,
        y: 140,
        fontSize: 'huge',
        color: '#FFFFFF',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 8,
          offsetX: 2,
          offsetY: 4
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Building the future of technology',
        x: 120,
        y: 220,
        fontSize: 'large',
        color: '#E5E7EB',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 0.9,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'star',
        x: 1400,
        y: 80,
        size: 60,
        rotation: 15,
        opacity: 0.8,
        color: '#FBBF24',
        colorType: 'solid',
        shadow: { enabled: true, color: 'rgba(0, 0, 0, 0.2)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['modern', 'gradient', 'tech', 'startup', 'professional']
  },

  // 2. Creative Agency - Bold colors with artistic elements
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    description: 'Bold and artistic design perfect for creative professionals and agencies',
    category: 'Creative',
    previewImage: 'https://images.unsplash.com/photo-1558655146-9f40138edf05?w=400&h=200&fit=crop',
    size: { id: 'facebook-cover', name: 'Facebook Cover', width: 1640, height: 859, category: 'Social Media' },
    background: {
      id: 'gradient-creative',
      name: 'Creative Burst',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '45deg',
      gradientColors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'],
      preview: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)'
    },
    textElements: [
      {
        text: 'CREATIVE',
        x: 200,
        y: 300,
        fontSize: 'giant',
        color: '#FFFFFF',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 4,
        lineHeight: 1.1,
        rotation: -5,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.4)',
          blur: 12,
          offsetX: 4,
          offsetY: 6
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'STUDIO',
        x: 200,
        y: 420,
        fontSize: 'giant',
        color: '#1A1A1A',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 4,
        lineHeight: 1.1,
        rotation: -5,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(255, 255, 255, 0.3)',
          blur: 8,
          offsetX: -2,
          offsetY: -3
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Where imagination meets reality',
        x: 200,
        y: 550,
        fontSize: 'xlarge',
        color: '#2D3748',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.3,
        rotation: 0,
        opacity: 0.95,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'circle',
        x: 1200,
        y: 150,
        size: 120,
        rotation: 0,
        opacity: 0.6,
        color: '#FFFFFF',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'triangle',
        x: 1350,
        y: 400,
        size: 80,
        rotation: 45,
        opacity: 0.7,
        color: '#F59E0B',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['creative', 'artistic', 'colorful', 'bold', 'agency']
  },

  // 3. Personal Brand - Clean and professional
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    description: 'Clean and professional design perfect for personal branding and portfolios',
    category: 'Personal',
    previewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    size: { id: 'twitter-header', name: 'Twitter Header', width: 1500, height: 500, category: 'Social Media' },
    background: {
      id: 'gradient-minimal',
      name: 'Minimal Elegance',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '90deg',
      gradientColors: ['#f8fafc', '#e2e8f0'],
      preview: 'linear-gradient(90deg, #f8fafc, #e2e8f0)'
    },
    textElements: [
      {
        text: 'John Smith',
        x: 150,
        y: 150,
        fontSize: 'massive',
        color: '#1A202C',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 0,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Product Designer & Creative Director',
        x: 150,
        y: 280,
        fontSize: 'medium',
        color: '#4A5568',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Creating beautiful digital experiences',
        x: 150,
        y: 340,
        fontSize: 'large',
        color: '#718096',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'circle',
        x: 1200,
        y: 200,
        size: 200,
        rotation: 0,
        opacity: 0.1,
        color: '#3B82F6',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['personal', 'professional', 'clean', 'minimal', 'portfolio']
  },

  // 4. E-commerce Store - Vibrant and sales-focused
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Vibrant design perfect for online stores and product launches',
    category: 'E-commerce',
    previewImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
    size: { id: 'web-banner', name: 'Web Banner', width: 1200, height: 300, category: 'Web' },
    background: {
      id: 'gradient-commerce',
      name: 'Commerce Energy',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '135deg',
      gradientColors: ['#ff9a9e', '#fecfef', '#fecfef'],
      preview: 'linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)'
    },
    textElements: [
      {
        text: 'SUMMER SALE',
        x: 100,
        y: 120,
        fontSize: 'huge',
        color: '#FFFFFF',
        colorType: 'gradient',
        gradientColors: ['#ff6b6b', '#ee5a24'],
        gradientDirection: 45,
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 2,
        lineHeight: 1.1,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 8,
          offsetX: 3,
          offsetY: 5
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Up to 70% OFF',
        x: 100,
        y: 200,
        fontSize: 'xlarge',
        color: '#2D3748',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.3,
        rotation: 0,
        opacity: 1,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'star',
        x: 900,
        y: 50,
        size: 40,
        rotation: 0,
        opacity: 0.8,
        color: '#F59E0B',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'star',
        x: 980,
        y: 80,
        size: 30,
        rotation: 45,
        opacity: 0.7,
        color: '#EF4444',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'star',
        x: 1050,
        y: 120,
        size: 35,
        rotation: 90,
        opacity: 0.9,
        color: '#8B5CF6',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['ecommerce', 'sale', 'vibrant', 'promotional', 'retail']
  },

  // 5. Fitness Coach - Energetic and motivational
  {
    id: 'fitness-coach',
    name: 'Fitness Coach',
    description: 'Energetic design perfect for fitness trainers and wellness brands',
    category: 'Health',
    previewImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
    size: { id: 'twitter-header', name: 'Twitter Header', width: 1500, height: 500, category: 'Social Media' },
    background: {
      id: 'gradient-fitness',
      name: 'Fitness Energy', 
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '135deg',
      gradientColors: ['#11998e', '#38ef7d', '#38ef7d'],
      preview: 'linear-gradient(135deg, #11998e, #38ef7d, #38ef7d)'
    },
    textElements: [
      {
        text: 'TRANSFORM YOUR LIFE',
        x: 150,
        y: 180,
        fontSize: 'xlarge',
        color: '#FFFFFF',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 3,
        lineHeight: 1.1,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.4)',
          blur: 10,
          offsetX: 4,
          offsetY: 6
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'FITNESS • NUTRITION • MINDSET',
        x: 150,
        y: 320,
        fontSize: 'large',
        color: '#1A202C',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 2,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 0.95,
        shadow: {
          enabled: true,
          color: 'rgba(255, 255, 255, 0.4)',
          blur: 8,
          offsetX: -2,
          offsetY: -2
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'circle',
        x: 1200,
        y: 250,
        size: 300,
        rotation: 0,
        opacity: 0.15,
        color: '#FFFFFF',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'diamond',
        x: 1350,
        y: 250,
        size: 100,
        rotation: 45,
        opacity: 0.2,
        color: '#1A202C',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['fitness', 'health', 'energetic', 'motivational', 'wellness']
  },

  // 6. Food Blog - Warm and inviting
  {
    id: 'food-blog',
    name: 'Food Blog',
    description: 'Warm and inviting design perfect for food bloggers and restaurants',
    category: 'Food',
    previewImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop',
    size: { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', width: 1280, height: 720, category: 'Video' },
    background: {
      id: 'gradient-food',
      name: 'Warm Spices',
      type: 'gradient',
      value: 'linear-gradient',
      gradientDirection: '135deg',
      gradientColors: ['#ffecd2', '#fcb69f'],
      preview: 'linear-gradient(135deg, #ffecd2, #fcb69f)'
    },
    textElements: [
      {
        text: 'Delicious',
        x: 150,
        y: 250,
        fontSize: 'massive',
        color: '#7C2D12',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.2)',
          blur: 6,
          offsetX: 2,
          offsetY: 4
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Recipes',
        x: 150,
        y: 350,
        fontSize: 'massive',
        color: '#DC2626',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.2)',
          blur: 6,
          offsetX: 2,
          offsetY: 4
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'From our kitchen to yours',
        x: 150,
        y: 480,
        fontSize: 'xlarge',
        color: '#92400E',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'heart',
        x: 1000,
        y: 150,
        size: 80,
        rotation: 0,
        opacity: 0.6,
        color: '#DC2626',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'star',
        x: 1100,
        y: 400,
        size: 50,
        rotation: 15,
        opacity: 0.7,
        color: '#F59E0B',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['food', 'warm', 'inviting', 'culinary', 'recipe']
  },

  // 7. Quantum Physics - Circuit board pattern with scientific elements
  {
    id: 'quantum-physics',
    name: 'Quantum Physics',
    description: 'Scientific design perfect for physics research, tech presentations, and academic content',
    category: 'Science',
    previewImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop',
    size: { id: 'presentation-wide', name: 'Presentation (16:9)', width: 1920, height: 1080, category: 'Presentation' },
    background: {
      id: 'fancy-circuit-physics',
      name: 'Circuit Board',
      type: 'fancy',
      value: 'circuit',
      patternType: 'circuit',
      patternColors: ['#0F172A', '#00D4AA'],
      preview: 'linear-gradient(90deg, #00D4AA 2px, transparent 2px), linear-gradient(#00D4AA 2px, transparent 2px)'
    },
    textElements: [
      {
        text: 'QUANTUM',
        x: 200,
        y: 320,
        fontSize: 'massive',
        color: '#00D4AA',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 4,
        lineHeight: 1.1,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 212, 170, 0.4)',
          blur: 15,
          offsetX: 0,
          offsetY: 0
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'MECHANICS',
        x: 200,
        y: 450,
        fontSize: 'massive',
        color: '#FFFFFF',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 4,
        lineHeight: 1.1,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.5)',
          blur: 10,
          offsetX: 3,
          offsetY: 3
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'The fundamental nature of reality',
        x: 200,
        y: 580,
        fontSize: 'large',
        color: '#94A3B8',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 0.9,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [],
    tags: ['physics', 'science', 'quantum', 'research', 'academic', 'technology']
  },

  // 8. Abstract Art - Triangle mosaic pattern with artistic elements
  {
    id: 'abstract-art',
    name: 'Abstract Art',
    description: 'Bold geometric design perfect for artists, galleries, and creative portfolios',
    category: 'Art',
    previewImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop',
    size: { id: 'instagram-post', name: 'Instagram Post', width: 1080, height: 1080, category: 'Social Media' },
    background: {
      id: 'fancy-triangles-art',
      name: 'Triangle Mosaic',
      type: 'fancy',
      value: 'triangles',
      patternType: 'triangles',
      patternColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA726'],
      preview: 'conic-gradient(from 30deg, #FF6B6B, #4ECDC4, #45B7D1, #FFA726)'
    },
    textElements: [
      {
        text: 'ART',
        x: 540,
        y: 400,
        fontSize: 'massive',
        color: '#FFFFFF',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 8,
        lineHeight: 1.0,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.6)',
          blur: 20,
          offsetX: 5,
          offsetY: 5
        },
        stroke: {
          enabled: true,
          color: '#1A1A1A',
          width: 4
        }
      },
      {
        text: 'IS',
        x: 540,
        y: 540,
        fontSize: 'huge',
        color: '#1A1A1A',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 6,
        lineHeight: 1.0,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(255, 255, 255, 0.8)',
          blur: 15,
          offsetX: -3,
          offsetY: -3
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'EXPRESSION',
        x: 540,
        y: 680,
        fontSize: 'large',
        color: '#2D3748',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 3,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 0.9,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'star',
        x: 200,
        y: 200,
        size: 80,
        rotation: 0,
        opacity: 0.8,
        color: '#FFFFFF',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'triangle',
        x: 880,
        y: 200,
        size: 100,
        rotation: 30,
        opacity: 0.6,
        color: '#1A1A1A',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'circle',
        x: 150,
        y: 850,
        size: 120,
        rotation: 0,
        opacity: 0.4,
        color: '#FFFFFF',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'diamond',
        x: 900,
        y: 900,
        size: 90,
        rotation: 45,
        opacity: 0.7,
        color: '#1A1A1A',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['art', 'abstract', 'geometric', 'creative', 'gallery', 'portfolio']
  },

  // 9. Music Producer - Wave pattern with audio elements
  {
    id: 'music-producer',
    name: 'Music Producer',
    description: 'Dynamic wave design perfect for musicians, producers, and audio professionals',
    category: 'Music',
    previewImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
    size: { id: 'soundcloud-banner', name: 'SoundCloud Banner', width: 2480, height: 520, category: 'Social Media' },
    background: {
      id: 'fancy-waves-music',
      name: 'Wave Pattern',
      type: 'fancy',
      value: 'waves',
      patternType: 'waves',
      patternColors: ['#667EEA', '#764BA2'],
      preview: 'radial-gradient(ellipse at center, #667EEA 0%, #764BA2 100%)'
    },
    textElements: [
      {
        text: 'SOUND',
        x: 300,
        y: 170,
        fontSize: 'massive',
        color: '#FFFFFF',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 6,
        lineHeight: 1.1,
        rotation: 0,
        opacity: 1,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.4)',
          blur: 12,
          offsetX: 4,
          offsetY: 4
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'WAVES',
        x: 300,
        y: 290,
        fontSize: 'massive',
        color: '#F7FAFC',
        colorType: 'solid',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '800',
        textAlign: 'left',
        letterSpacing: 6,
        lineHeight: 1.1,
        rotation: 0,
        opacity: 0.9,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.3)',
          blur: 8,
          offsetX: 2,
          offsetY: 3
        },
        stroke: { enabled: false, color: '#000000', width: 2 }
      },
      {
        text: 'Professional Audio Production • Mixing • Mastering',
        x: 300,
        y: 420,
        fontSize: 'large',
        color: '#E2E8F0',
        colorType: 'solid',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 0.95,
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        stroke: { enabled: false, color: '#000000', width: 2 }
      }
    ],
    images: [],
    icons: [
      {
        type: 'circle',
        x: 2100,
        y: 150,
        size: 80,
        rotation: 0,
        opacity: 0.6,
        color: '#FFFFFF',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'circle',
        x: 2200,
        y: 250,
        size: 60,
        rotation: 0,
        opacity: 0.4,
        color: '#F7FAFC',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'circle',
        x: 2300,
        y: 350,
        size: 100,
        rotation: 0,
        opacity: 0.3,
        color: '#FFFFFF',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      },
      {
        type: 'diamond',
        x: 2000,
        y: 400,
        size: 70,
        rotation: 45,
        opacity: 0.5,
        color: '#E2E8F0',
        colorType: 'solid',
        shadow: { enabled: false, color: 'rgba(0, 0, 0, 0.3)', blur: 4, offsetX: 2, offsetY: 2 },
        flipX: false,
        flipY: false
      }
    ],
    tags: ['music', 'audio', 'producer', 'sound', 'waves', 'professional']
  }
])

export const templateCategories = ['All', 'Business', 'Creative', 'Personal', 'E-commerce', 'Health', 'Food', 'Science', 'Art', 'Music'] 
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useBannerStore } from '@/stores/banner'
import { useUndoRedoStore, UpdateTextCommand, UpdateIconCommand, UpdateImageCommand } from '@/stores/undoRedo'

const bannerStore = useBannerStore()
const undoRedoStore = useUndoRedoStore()
const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()

// Drag and drop state
const isDragging = ref(false)
const dragTarget = ref<{ type: 'text' | 'icon' | 'image', id: string } | null>(null)
const dragOffset = ref({ x: 0, y: 0 })
const canvasScale = ref(1)
const dragStartPosition = ref({ x: 0, y: 0 })

// Font size mapping
const fontSizeMap = {
  tiny: 50,
  small: 56,
  medium: 64,
  large: 72,
  xlarge: 80,
  xxlarge: 96,
  huge: 120,
  massive: 150,
  giant: 192
}

// SVG Shape definitions
function drawSVGShape(ctx: CanvasRenderingContext2D, shape: string, size: number) {
  const halfSize = size / 2
  
  ctx.beginPath()
  
  switch (shape) {
    case 'circle':
      ctx.arc(0, 0, halfSize, 0, 2 * Math.PI)
      break
      
    case 'square':
      ctx.rect(-halfSize, -halfSize, size, size)
      break
      
    case 'triangle':
      ctx.moveTo(0, -halfSize)
      ctx.lineTo(-halfSize, halfSize)
      ctx.lineTo(halfSize, halfSize)
      ctx.closePath()
      break
      
    case 'diamond':
      ctx.moveTo(0, -halfSize)
      ctx.lineTo(halfSize, 0)
      ctx.lineTo(0, halfSize)
      ctx.lineTo(-halfSize, 0)
      ctx.closePath()
      break
      
    case 'hexagon':
      const hexRadius = halfSize
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const x = hexRadius * Math.cos(angle)
        const y = hexRadius * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      break
      
    case 'pentagon':
      const pentRadius = halfSize
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
        const x = pentRadius * Math.cos(angle)
        const y = pentRadius * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      break
      
    case 'star':
      const starRadius = halfSize
      const innerRadius = starRadius * 0.4
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2
        const radius = i % 2 === 0 ? starRadius : innerRadius
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      break
      
    case 'heart':
      const heartSize = halfSize * 0.8
      ctx.moveTo(0, heartSize * 0.3)
      ctx.bezierCurveTo(-heartSize, -heartSize * 0.5, -heartSize * 0.5, -heartSize, 0, -heartSize * 0.3)
      ctx.bezierCurveTo(heartSize * 0.5, -heartSize, heartSize, -heartSize * 0.5, 0, heartSize * 0.3)
      break
      
    case 'arrow-right':
      const arrowSize = halfSize * 0.8
      ctx.moveTo(-arrowSize, -arrowSize * 0.5)
      ctx.lineTo(arrowSize * 0.3, -arrowSize * 0.5)
      ctx.lineTo(arrowSize * 0.3, -arrowSize)
      ctx.lineTo(arrowSize, 0)
      ctx.lineTo(arrowSize * 0.3, arrowSize)
      ctx.lineTo(arrowSize * 0.3, arrowSize * 0.5)
      ctx.lineTo(-arrowSize, arrowSize * 0.5)
      ctx.closePath()
      break
      
    case 'arrow-left':
      const leftArrowSize = halfSize * 0.8
      ctx.moveTo(leftArrowSize, -leftArrowSize * 0.5)
      ctx.lineTo(-leftArrowSize * 0.3, -leftArrowSize * 0.5)
      ctx.lineTo(-leftArrowSize * 0.3, -leftArrowSize)
      ctx.lineTo(-leftArrowSize, 0)
      ctx.lineTo(-leftArrowSize * 0.3, leftArrowSize)
      ctx.lineTo(-leftArrowSize * 0.3, leftArrowSize * 0.5)
      ctx.lineTo(leftArrowSize, leftArrowSize * 0.5)
      ctx.closePath()
      break
      
    case 'arrow-up':
      const upArrowSize = halfSize * 0.8
      ctx.moveTo(-upArrowSize * 0.5, upArrowSize)
      ctx.lineTo(-upArrowSize * 0.5, -upArrowSize * 0.3)
      ctx.lineTo(-upArrowSize, -upArrowSize * 0.3)
      ctx.lineTo(0, -upArrowSize)
      ctx.lineTo(upArrowSize, -upArrowSize * 0.3)
      ctx.lineTo(upArrowSize * 0.5, -upArrowSize * 0.3)
      ctx.lineTo(upArrowSize * 0.5, upArrowSize)
      ctx.closePath()
      break
      
    case 'arrow-down':
      const downArrowSize = halfSize * 0.8
      ctx.moveTo(-downArrowSize * 0.5, -downArrowSize)
      ctx.lineTo(-downArrowSize * 0.5, downArrowSize * 0.3)
      ctx.lineTo(-downArrowSize, downArrowSize * 0.3)
      ctx.lineTo(0, downArrowSize)
      ctx.lineTo(downArrowSize, downArrowSize * 0.3)
      ctx.lineTo(downArrowSize * 0.5, downArrowSize * 0.3)
      ctx.lineTo(downArrowSize * 0.5, -downArrowSize)
      ctx.closePath()
      break
      
    case 'plus':
      const plusSize = halfSize * 0.8
      const plusWidth = plusSize * 0.3
      ctx.rect(-plusWidth, -plusSize, plusWidth * 2, plusSize * 2)
      ctx.rect(-plusSize, -plusWidth, plusSize * 2, plusWidth * 2)
      break
      
    case 'cross':
      const crossSize = halfSize * 0.8
      const crossWidth = crossSize * 0.2
      ctx.save()
      ctx.rotate(Math.PI / 4)
      ctx.rect(-crossWidth, -crossSize, crossWidth * 2, crossSize * 2)
      ctx.rect(-crossSize, -crossWidth, crossSize * 2, crossWidth * 2)
      ctx.restore()
      break
      
    case 'check':
      const checkSize = halfSize * 0.8
      ctx.moveTo(-checkSize * 0.5, 0)
      ctx.lineTo(-checkSize * 0.2, checkSize * 0.4)
      ctx.lineTo(checkSize * 0.6, -checkSize * 0.6)
      ctx.lineWidth = checkSize * 0.2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      break
  }
  
  return shape === 'check' // Return true if it's a stroke-only shape
}

// Fancy pattern generator
function drawFancyPattern(ctx: CanvasRenderingContext2D, pattern: string, colors: string[], width: number, height: number) {
  switch (pattern) {
    case 'dots':
      drawDotsPattern(ctx, colors, width, height)
      break
    case 'grid':
      drawGridPattern(ctx, colors, width, height)
      break
    case 'diagonal':
      drawDiagonalPattern(ctx, colors, width, height)
      break
    case 'hexagon':
      drawHexagonPattern(ctx, colors, width, height)
      break
    case 'waves':
      drawWavesPattern(ctx, colors, width, height)
      break
    case 'triangles':
      drawTrianglesPattern(ctx, colors, width, height)
      break
    case 'circles':
      drawCirclesPattern(ctx, colors, width, height)
      break
    case 'chevron':
      drawChevronPattern(ctx, colors, width, height)
      break
    case 'stars':
      drawStarsPattern(ctx, colors, width, height)
      break
    case 'noise':
      drawNoisePattern(ctx, colors, width, height)
      break
    case 'bubbles':
      drawBubblesPattern(ctx, colors, width, height)
      break
    case 'circuit':
      drawCircuitPattern(ctx, colors, width, height)
      break
  }
}

function drawDotsPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const spacing = 40
  const radius = 8
  
  // Background
  ctx.fillStyle = colors[1] || '#FFFFFF'
  ctx.fillRect(0, 0, width, height)
  
  // Dots
  ctx.fillStyle = colors[0] || '#3B82F6'
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
}

function drawGridPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const spacing = 30
  const lineWidth = 2
  
  // Background
  ctx.fillStyle = colors[0] || '#F3F4F6'
  ctx.fillRect(0, 0, width, height)
  
  // Grid lines
  ctx.strokeStyle = colors[1] || '#6B7280'
  ctx.lineWidth = lineWidth
  
  // Vertical lines
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  // Horizontal lines
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
}

function drawDiagonalPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const stripeWidth = 20
  
  // Create pattern
  for (let x = -height; x < width + height; x += stripeWidth * 2) {
    ctx.fillStyle = colors[0] || '#8B5CF6'
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x + stripeWidth, 0)
    ctx.lineTo(x + stripeWidth + height, height)
    ctx.lineTo(x + height, height)
    ctx.closePath()
    ctx.fill()
    
    ctx.fillStyle = colors[1] || '#A78BFA'
    ctx.beginPath()
    ctx.moveTo(x + stripeWidth, 0)
    ctx.lineTo(x + stripeWidth * 2, 0)
    ctx.lineTo(x + stripeWidth * 2 + height, height)
    ctx.lineTo(x + stripeWidth + height, height)
    ctx.closePath()
    ctx.fill()
  }
}

function drawHexagonPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const hexRadius = 30
  const hexWidth = hexRadius * 2
  const hexHeight = hexRadius * Math.sqrt(3)
  
  // Background
  ctx.fillStyle = colors[1] || '#34D399'
  ctx.fillRect(0, 0, width, height)
  
  ctx.fillStyle = colors[0] || '#10B981'
  
  // Calculate proper hexagon grid
  const cols = Math.ceil(width / (hexWidth * 0.75)) + 1
  const rows = Math.ceil(height / hexHeight) + 1
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Offset every other row for proper hexagon tessellation
      const xOffset = (row % 2) * (hexWidth * 0.375)
      const x = col * (hexWidth * 0.75) + xOffset
      const y = row * hexHeight
      
      // Only draw hexagons that are visible
      if (x + hexRadius >= 0 && x - hexRadius <= width && 
          y + hexRadius >= 0 && y - hexRadius <= height) {
        drawHexagon(ctx, x, y, hexRadius)
      }
    }
  }
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const px = x + radius * Math.cos(angle)
    const py = y + radius * Math.sin(angle)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
}

function drawWavesPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const waveHeight = 40
  const frequency = 0.01
  
  // Background
  ctx.fillStyle = colors[1] || '#38BDF8'
  ctx.fillRect(0, 0, width, height)
  
  // Waves
  ctx.fillStyle = colors[0] || '#0EA5E9'
  
  for (let y = 0; y < height; y += waveHeight) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    
    for (let x = 0; x <= width; x++) {
      const waveY = y + Math.sin(x * frequency) * (waveHeight / 2)
      ctx.lineTo(x, waveY)
    }
    
    ctx.lineTo(width, y + waveHeight)
    ctx.lineTo(0, y + waveHeight)
    ctx.closePath()
    ctx.fill()
  }
}

function drawTrianglesPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const size = 40
  const colorCount = colors.length
  
  // Create seeded random for consistency
  let seed = 54321
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      const colorIndex = Math.floor(seededRandom() * colorCount)
      ctx.fillStyle = colors[colorIndex] || '#F59E0B'
      
      // Random triangle orientation
      const orientation = Math.floor(seededRandom() * 4)
      drawTriangle(ctx, x, y, size, orientation)
    }
  }
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, orientation: number) {
  ctx.beginPath()
  
  switch (orientation) {
    case 0: // Up
      ctx.moveTo(x + size / 2, y)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x + size, y + size)
      break
    case 1: // Right
      ctx.moveTo(x, y)
      ctx.lineTo(x + size, y + size / 2)
      ctx.lineTo(x, y + size)
      break
    case 2: // Down
      ctx.moveTo(x, y)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x + size / 2, y + size)
      break
    case 3: // Left
      ctx.moveTo(x + size, y)
      ctx.lineTo(x, y + size / 2)
      ctx.lineTo(x + size, y + size)
      break
  }
  
  ctx.closePath()
  ctx.fill()
}

function drawCirclesPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const spacing = 60
  const radius = 20
  
  // Background
  ctx.fillStyle = colors[1] || '#F472B6'
  ctx.fillRect(0, 0, width, height)
  
  // Overlapping circles
  ctx.globalAlpha = 0.7
  ctx.fillStyle = colors[0] || '#EC4899'
  
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fill()
      
      // Offset circles
      ctx.beginPath()
      ctx.arc(x + spacing / 2, y + spacing / 2, radius, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  
  ctx.globalAlpha = 1
}

function drawChevronPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const chevronHeight = 40
  const chevronWidth = 20
  
  for (let y = 0; y < height; y += chevronHeight) {
    for (let x = 0; x < width; x += chevronWidth * 2) {
      // First chevron
      ctx.fillStyle = colors[0] || '#7C3AED'
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + chevronWidth, y + chevronHeight / 2)
      ctx.lineTo(x, y + chevronHeight)
      ctx.lineTo(x + chevronWidth, y + chevronHeight)
      ctx.lineTo(x + chevronWidth * 2, y + chevronHeight / 2)
      ctx.lineTo(x + chevronWidth, y)
      ctx.closePath()
      ctx.fill()
      
      // Second chevron
      ctx.fillStyle = colors[1] || '#A855F7'
      ctx.beginPath()
      ctx.moveTo(x + chevronWidth, y)
      ctx.lineTo(x + chevronWidth * 2, y + chevronHeight / 2)
      ctx.lineTo(x + chevronWidth, y + chevronHeight)
      ctx.lineTo(x + chevronWidth * 2, y + chevronHeight)
      ctx.lineTo(x + chevronWidth * 3, y + chevronHeight / 2)
      ctx.lineTo(x + chevronWidth * 2, y)
      ctx.closePath()
      ctx.fill()
    }
  }
}

function drawStarsPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  // Background
  ctx.fillStyle = colors[0] || '#1E1B4B'
  ctx.fillRect(0, 0, width, height)
  
  // Create seeded random for consistency
  let seed = 98765
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  
  // Random stars
  ctx.fillStyle = colors[1] || '#FBBF24'
  
  for (let i = 0; i < 100; i++) {
    const x = seededRandom() * width
    const y = seededRandom() * height
    const size = seededRandom() * 3 + 1
    
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.fill()
  }
}

function drawNoisePattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const pixelSize = 4
  const colorCount = colors.length
  
  // Create seeded random for consistency
  let seed = 13579
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      const colorIndex = Math.floor(seededRandom() * colorCount)
      ctx.fillStyle = colors[colorIndex] || '#374151'
      ctx.fillRect(x, y, pixelSize, pixelSize)
    }
  }
}

function drawBubblesPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  // Background
  ctx.fillStyle = colors[0] || '#06B6D4'
  ctx.fillRect(0, 0, width, height)
  
  // Create seeded random for consistency
  let seed = 24680
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  
  // Bubbles
  for (let i = 0; i < 50; i++) {
    const x = seededRandom() * width
    const y = seededRandom() * height
    const radius = seededRandom() * 30 + 10
    const colorIndex = Math.floor(seededRandom() * (colors.length - 1)) + 1
    
    ctx.fillStyle = colors[colorIndex] || '#67E8F9'
    ctx.globalAlpha = 0.6
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }
  
  ctx.globalAlpha = 1
}

function drawCircuitPattern(ctx: CanvasRenderingContext2D, colors: string[], width: number, height: number) {
  const spacing = 50
  const lineWidth = 3
  
  // Background
  ctx.fillStyle = colors[0] || '#065F46'
  ctx.fillRect(0, 0, width, height)
  
  // Circuit lines
  ctx.strokeStyle = colors[1] || '#10B981'
  ctx.lineWidth = lineWidth
  
  // Horizontal lines
  for (let y = spacing; y < height; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  // Vertical lines
  for (let x = spacing; x < width; x += spacing) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  // Circuit nodes
  ctx.fillStyle = colors[1] || '#10B981'
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
}

function drawImageBackground(
  ctx: CanvasRenderingContext2D, 
  img: HTMLImageElement, 
  canvasWidth: number, 
  canvasHeight: number, 
  background: any
) {
  // Scale image to banner width while preserving aspect ratio
  const drawWidth = canvasWidth
  const drawHeight = (img.height / img.width) * canvasWidth
  
  // Get vertical position (0-100 percentage, default to center)
  const cropY = (background.cropY ?? 50) / 100
  
  // Calculate vertical position based on how much extra height we have
  let drawY = 0
  if (drawHeight > canvasHeight) {
    // Image is taller than canvas - allow vertical positioning
    const maxOffset = drawHeight - canvasHeight
    drawY = -maxOffset * cropY
  } else {
    // Image is shorter than canvas - center it vertically
    drawY = (canvasHeight - drawHeight) / 2
  }
  
  // Always center horizontally
  const drawX = 0
  
  // Clear and draw the image
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
}

function drawBanner() {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const size = bannerStore.currentSize
  const background = bannerStore.currentBackground
  
  // Set canvas actual size
  canvas.width = size.width
  canvas.height = size.height

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Apply background
  if (background.type === 'solid') {
    ctx.fillStyle = background.value
    ctx.fillRect(0, 0, size.width, size.height)
  } else if (background.type === 'gradient') {
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, size.width, size.height)
    if (background.gradientColors) {
      background.gradientColors.forEach((color, index) => {
        gradient.addColorStop(index / (background.gradientColors!.length - 1), color)
      })
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size.width, size.height)
  } else if (background.type === 'image' && background.value) {
    // Handle image background with aspect ratio preservation and cropping
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      drawImageBackground(ctx, img, size.width, size.height, background)
      drawElements(ctx)
    }
    img.src = background.value
  } else if (background.type === 'fancy') {
    // Handle fancy patterns
    if (background.patternType && background.patternColors) {
      drawFancyPattern(ctx, background.patternType, background.patternColors, size.width, size.height)
    }
  }

  drawElements(ctx)
}

function drawElements(ctx: CanvasRenderingContext2D) {
  // Draw images
  bannerStore.images.forEach((image) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.save()
      if (image.borderRadius > 0) {
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(image.x, image.y, image.width, image.height, image.borderRadius)
        } else {
          ctx.rect(image.x, image.y, image.width, image.height)
        }
        ctx.clip()
      }
      ctx.drawImage(img, image.x, image.y, image.width, image.height)
      ctx.restore()
    }
    img.src = image.src
  })

  // Draw icons
  bannerStore.icons.forEach((icon) => {
    const iconData = bannerStore.availableIcons.find(i => i.id === icon.type)
    if (!iconData) return

    ctx.save()
    
    // Set opacity
    ctx.globalAlpha = icon.opacity
    
    // Apply transformations
    ctx.translate(icon.x + icon.size / 2, icon.y + icon.size / 2)
    ctx.rotate((icon.rotation * Math.PI) / 180)
    ctx.scale(icon.flipX ? -1 : 1, icon.flipY ? -1 : 1)
    
    // Apply shadow if enabled
    if (icon.shadow.enabled) {
      ctx.shadowColor = icon.shadow.color
      ctx.shadowBlur = icon.shadow.blur
      ctx.shadowOffsetX = icon.shadow.offsetX
      ctx.shadowOffsetY = icon.shadow.offsetY
    }
    
    // Check if it's an SVG shape or emoji
    if (iconData.svg.startsWith('svg-') || ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'pentagon', 'star', 'heart', 'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'plus', 'cross', 'check'].includes(iconData.svg)) {
      // Apply color/gradient for SVG shapes
      if (icon.colorType === 'gradient' && icon.gradientColors) {
        const gradient = ctx.createLinearGradient(-icon.size/2, -icon.size/2, icon.size/2, icon.size/2)
        icon.gradientColors.forEach((color, index) => {
          gradient.addColorStop(index / (icon.gradientColors!.length - 1), color)
        })
        ctx.fillStyle = gradient
        ctx.strokeStyle = gradient
      } else {
        ctx.fillStyle = icon.color
        ctx.strokeStyle = icon.color
      }
      
      // Draw SVG shape
      const isStrokeOnly = drawSVGShape(ctx, iconData.svg, icon.size)
      if (isStrokeOnly) {
        ctx.stroke()
      } else {
        ctx.fill()
      }
    } else {
      // Draw emoji/unicode character first
      ctx.font = `${icon.size}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Normal emoji rendering - use black as default for visibility
      ctx.fillStyle = 'black'
      ctx.fillText(iconData.svg, 0, 0)
    }
    
    ctx.restore()
  })

  // Draw text elements with enhanced properties
  bannerStore.textElements.forEach((textElement) => {
    ctx.save()
    
    // Set opacity
    ctx.globalAlpha = textElement.opacity || 1
    
    // Apply rotation
    if (textElement.rotation) {
      ctx.translate(textElement.x, textElement.y)
      ctx.rotate((textElement.rotation * Math.PI) / 180)
      ctx.translate(-textElement.x, -textElement.y)
    }
    
    // Set font properties
    const fontSize = fontSizeMap[textElement.fontSize] || 36
    ctx.font = `${textElement.fontWeight} ${fontSize}px ${textElement.fontFamily}`
    ctx.textAlign = textElement.textAlign || 'left'
    ctx.textBaseline = 'top'
    
    // Apply letter spacing (approximate)
    if (textElement.letterSpacing) {
      ctx.letterSpacing = `${textElement.letterSpacing}px`
    }
    
    // Apply shadow if enabled
    if (textElement.shadow?.enabled) {
      ctx.shadowColor = textElement.shadow.color
      ctx.shadowBlur = textElement.shadow.blur
      ctx.shadowOffsetX = textElement.shadow.offsetX
      ctx.shadowOffsetY = textElement.shadow.offsetY
    }
    
    // Apply stroke if enabled
    if (textElement.stroke?.enabled) {
      // Set stroke color (solid or gradient)
      if (textElement.colorType === 'gradient' && textElement.gradientColors && textElement.gradientColors.length >= 2) {
        const textWidth = ctx.measureText(textElement.text).width
        const gradient = ctx.createLinearGradient(
          textElement.x, 
          textElement.y, 
          textElement.x + textWidth * Math.cos((textElement.gradientDirection || 0) * Math.PI / 180),
          textElement.y + fontSize * Math.sin((textElement.gradientDirection || 0) * Math.PI / 180)
        )
        textElement.gradientColors.forEach((color, index) => {
          gradient.addColorStop(index / (textElement.gradientColors!.length - 1), color)
        })
        ctx.strokeStyle = gradient
      } else {
        ctx.strokeStyle = textElement.stroke.color
      }
      
      ctx.lineWidth = textElement.stroke.width
      ctx.strokeText(textElement.text, textElement.x, textElement.y)
    }
    
    // Fill text with color or gradient
    if (textElement.colorType === 'gradient' && textElement.gradientColors && textElement.gradientColors.length >= 2) {
      const textWidth = ctx.measureText(textElement.text).width
      const gradient = ctx.createLinearGradient(
        textElement.x, 
        textElement.y, 
        textElement.x + textWidth * Math.cos((textElement.gradientDirection || 0) * Math.PI / 180),
        textElement.y + fontSize * Math.sin((textElement.gradientDirection || 0) * Math.PI / 180)
      )
      textElement.gradientColors.forEach((color, index) => {
        gradient.addColorStop(index / (textElement.gradientColors!.length - 1), color)
      })
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = textElement.color
    }
    
    ctx.fillText(textElement.text, textElement.x, textElement.y)
    
    ctx.restore()
  })
}

function updateCanvasSize() {
  if (!canvasRef.value || !containerRef.value) return

  const canvas = canvasRef.value
  const container = containerRef.value
  
  // Get container dimensions
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  
  // Get banner dimensions
  const bannerWidth = bannerStore.currentSize.width
  const bannerHeight = bannerStore.currentSize.height
  
  // Calculate scale to fit container while maintaining aspect ratio
  const scaleX = (containerWidth - 40) / bannerWidth // 40px for padding
  const scaleY = (containerHeight - 40) / bannerHeight // 40px for padding
  const scale = Math.min(scaleX, scaleY, 3) // Max 3x scale
  
  // Store scale for coordinate conversion
  canvasScale.value = scale
  
  // Apply scale via CSS
  const scaledWidth = bannerWidth * scale
  const scaledHeight = bannerHeight * scale
  
  canvas.style.width = `${scaledWidth}px`
  canvas.style.height = `${scaledHeight}px`
  canvas.style.maxWidth = '100%'
  canvas.style.maxHeight = '100%'
}

// Mouse event handlers for drag and drop
function getCanvasCoordinates(event: MouseEvent): { x: number, y: number } {
  if (!canvasRef.value) return { x: 0, y: 0 }
  
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  
  // Convert screen coordinates to canvas coordinates
  const x = (event.clientX - rect.left) / canvasScale.value
  const y = (event.clientY - rect.top) / canvasScale.value
  
  return { x, y }
}

function measureTextWidth(text: string, fontSize: number, fontFamily: string, fontWeight: string): number {
  if (!canvasRef.value) return 200 // fallback
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return 200
  
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  return ctx.measureText(text).width
}

function findElementAtPosition(x: number, y: number): { type: 'text' | 'icon' | 'image', id: string } | null {
  // Check text elements (in reverse order to match rendering order)
  for (let i = bannerStore.textElements.length - 1; i >= 0; i--) {
    const element = bannerStore.textElements[i]
    const fontSize = fontSizeMap[element.fontSize] || 36
    const textWidth = measureTextWidth(element.text, fontSize, element.fontFamily, element.fontWeight)
    
    // Bounding box check for text
    if (x >= element.x && x <= element.x + textWidth &&
        y >= element.y && y <= element.y + fontSize) {
      return { type: 'text', id: element.id }
    }
  }
  
  // Check icons (in reverse order to match rendering order)
  for (let i = bannerStore.icons.length - 1; i >= 0; i--) {
    const icon = bannerStore.icons[i]
    
    // Check if point is within icon bounds
    if (x >= icon.x && x <= icon.x + icon.size &&
        y >= icon.y && y <= icon.y + icon.size) {
      return { type: 'icon', id: icon.id }
    }
  }
  
  // Check images (in reverse order to match rendering order)
  for (let i = bannerStore.images.length - 1; i >= 0; i--) {
    const image = bannerStore.images[i]
    
    // Check if point is within image bounds
    if (x >= image.x && x <= image.x + image.width &&
        y >= image.y && y <= image.y + image.height) {
      return { type: 'image', id: image.id }
    }
  }
  
  return null
}

function handleMouseDown(event: MouseEvent) {
  const coords = getCanvasCoordinates(event)
  const element = findElementAtPosition(coords.x, coords.y)
  
  if (element) {
    isDragging.value = true
    dragTarget.value = element
    
    // Calculate offset from element origin and store start position
    if (element.type === 'text') {
      const textElement = bannerStore.textElements.find(t => t.id === element.id)
      if (textElement) {
        dragOffset.value = {
          x: coords.x - textElement.x,
          y: coords.y - textElement.y
        }
        dragStartPosition.value = { x: textElement.x, y: textElement.y }
      }
    } else if (element.type === 'icon') {
      const icon = bannerStore.icons.find(i => i.id === element.id)
      if (icon) {
        dragOffset.value = {
          x: coords.x - icon.x,
          y: coords.y - icon.y
        }
        dragStartPosition.value = { x: icon.x, y: icon.y }
      }
    } else if (element.type === 'image') {
      const image = bannerStore.images.find(i => i.id === element.id)
      if (image) {
        dragOffset.value = {
          x: coords.x - image.x,
          y: coords.y - image.y
        }
        dragStartPosition.value = { x: image.x, y: image.y }
      }
    }
    
    // Change cursor to indicate dragging
    if (canvasRef.value) {
      canvasRef.value.style.cursor = 'grabbing'
    }
    
    // Prevent default to avoid text selection
    event.preventDefault()
  }
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value || !dragTarget.value) {
    // Update cursor based on what's under the mouse
    const coords = getCanvasCoordinates(event)
    const element = findElementAtPosition(coords.x, coords.y)
    
    if (canvasRef.value) {
      canvasRef.value.style.cursor = element ? 'grab' : 'default'
    }
    return
  }
  
  const coords = getCanvasCoordinates(event)
  const newX = coords.x - dragOffset.value.x
  const newY = coords.y - dragOffset.value.y
  
  // Update element position
  if (dragTarget.value.type === 'text') {
    bannerStore.updateTextElement(dragTarget.value.id, {
      x: Math.max(0, Math.min(newX, bannerStore.currentSize.width - 50)),
      y: Math.max(0, Math.min(newY, bannerStore.currentSize.height - 50))
    })
  } else if (dragTarget.value.type === 'icon') {
    const icon = bannerStore.icons.find(i => i.id === dragTarget.value!.id)
    if (icon) {
      bannerStore.updateIcon(dragTarget.value.id, {
        x: Math.max(0, Math.min(newX, bannerStore.currentSize.width - icon.size)),
        y: Math.max(0, Math.min(newY, bannerStore.currentSize.height - icon.size))
      })
    }
  } else if (dragTarget.value.type === 'image') {
    const image = bannerStore.images.find(i => i.id === dragTarget.value!.id)
    if (image) {
      bannerStore.updateImage(dragTarget.value.id, {
        x: Math.max(0, Math.min(newX, bannerStore.currentSize.width - image.width)),
        y: Math.max(0, Math.min(newY, bannerStore.currentSize.height - image.height))
      })
    }
  }
}

function handleMouseUp() {
  if (isDragging.value && dragTarget.value) {
    // Create undo command for the move operation
    const target = dragTarget.value
    const startPos = dragStartPosition.value
    
    if (target.type === 'text') {
      const textElement = bannerStore.textElements.find(t => t.id === target.id)
      if (textElement && (textElement.x !== startPos.x || textElement.y !== startPos.y)) {
        const command = new UpdateTextCommand(target.id, { x: textElement.x, y: textElement.y })
        // Set the old position for undo
        command['oldProperties'] = { x: startPos.x, y: startPos.y }
        undoRedoStore.executeCommand(command)
      }
    } else if (target.type === 'icon') {
      const icon = bannerStore.icons.find(i => i.id === target.id)
      if (icon && (icon.x !== startPos.x || icon.y !== startPos.y)) {
        const command = new UpdateIconCommand(target.id, { x: icon.x, y: icon.y })
        // Set the old position for undo
        command['oldProperties'] = { x: startPos.x, y: startPos.y }
        undoRedoStore.executeCommand(command)
      }
    } else if (target.type === 'image') {
      const image = bannerStore.images.find(i => i.id === target.id)
      if (image && (image.x !== startPos.x || image.y !== startPos.y)) {
        const command = new UpdateImageCommand(target.id, { x: image.x, y: image.y })
        // Set the old position for undo
        command['oldProperties'] = { x: startPos.x, y: startPos.y }
        undoRedoStore.executeCommand(command)
      }
    }
    
    isDragging.value = false
    dragTarget.value = null
    dragOffset.value = { x: 0, y: 0 }
    dragStartPosition.value = { x: 0, y: 0 }
    
    // Reset cursor
    if (canvasRef.value) {
      canvasRef.value.style.cursor = 'default'
    }
  }
}

// Watch for changes
watch([
  () => bannerStore.currentSize,
  () => bannerStore.currentBackground,
  () => bannerStore.textElements.length,
  () => bannerStore.images.length,
  () => bannerStore.icons.length
], () => {
  nextTick(() => {
    drawBanner()
    updateCanvasSize()
  })
})

// Watch for deep changes in elements (less frequently)
watch(() => bannerStore.textElements, () => {
  nextTick(() => {
    drawBanner()
  })
}, { deep: true })

watch(() => bannerStore.images, () => {
  nextTick(() => {
    drawBanner()
  })
}, { deep: true })

watch(() => bannerStore.icons, () => {
  nextTick(() => {
    drawBanner()
  })
}, { deep: true })

onMounted(() => {
  if (canvasRef.value) {
    bannerStore.setCanvasRef(canvasRef.value)
    
    // Add mouse event listeners for drag and drop
    canvasRef.value.addEventListener('mousedown', handleMouseDown)
    canvasRef.value.addEventListener('mousemove', handleMouseMove)
    canvasRef.value.addEventListener('mouseup', handleMouseUp)
    canvasRef.value.addEventListener('mouseleave', handleMouseUp) // Stop dragging when mouse leaves canvas
  }
  
  // Initial setup
  nextTick(() => {
    drawBanner()
    updateCanvasSize()
  })
  
  // Handle window resize
  window.addEventListener('resize', updateCanvasSize)
  
  // Cleanup
  return () => {
    window.removeEventListener('resize', updateCanvasSize)
    if (canvasRef.value) {
      canvasRef.value.removeEventListener('mousedown', handleMouseDown)
      canvasRef.value.removeEventListener('mousemove', handleMouseMove)
      canvasRef.value.removeEventListener('mouseup', handleMouseUp)
      canvasRef.value.removeEventListener('mouseleave', handleMouseUp)
    }
  }
})
</script>

<template>
    <div 
    ref="containerRef" 
    class="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl"
  >
    <div class="relative">
      <canvas
        ref="canvasRef"
        :class="[
          'shadow-strong rounded-2xl border border-neutral-200 bg-white transition-all duration-200',
          isDragging ? 'cursor-grabbing' : 'cursor-default'
        ]"
        style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; user-select: none;"
      />
      

    </div>
  </div>
</template>

<style scoped>
canvas {
  display: block;
}
</style> 
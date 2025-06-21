import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
})) as any

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
})) as any

// Mock HTMLCanvasElement methods
HTMLCanvasElement.prototype.getContext = vi.fn((contextId) => {
  if (contextId === '2d') {
    return {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(),
      putImageData: vi.fn(),
      createImageData: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      transform: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
      canvas: {} as HTMLCanvasElement,
      fillStyle: '#000000',
      strokeStyle: '#000000',
      lineWidth: 1,
      font: '10px sans-serif',
      textAlign: 'start' as CanvasTextAlign,
      textBaseline: 'alphabetic' as CanvasTextBaseline,
      globalAlpha: 1,
      globalCompositeOperation: 'source-over' as GlobalCompositeOperation,
      lineCap: 'butt' as CanvasLineCap,
      lineJoin: 'miter' as CanvasLineJoin,
      miterLimit: 10,
      lineDashOffset: 0,
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 0, 0)',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      isPointInPath: vi.fn(),
      isPointInStroke: vi.fn(),
      createLinearGradient: vi.fn(),
      createRadialGradient: vi.fn(),
      createPattern: vi.fn(),
      strokeText: vi.fn(),
      strokeRect: vi.fn(),
      getLineDash: vi.fn(() => []),
      setLineDash: vi.fn(),
      quadraticCurveTo: vi.fn(),
      bezierCurveTo: vi.fn(),
      arcTo: vi.fn(),
      ellipse: vi.fn(),
      resetTransform: vi.fn(),
      getTransform: vi.fn()
    } as unknown as CanvasRenderingContext2D
  }
  return null
}) as any

HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,test')
HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
  callback(new Blob(['test'], { type: 'image/png' }))
})

// Mock URL methods
global.URL.createObjectURL = vi.fn(() => 'mock-url')
global.URL.revokeObjectURL = vi.fn()

// Mock FileReader
global.FileReader = vi.fn(() => ({
  readAsDataURL: vi.fn(),
  onload: vi.fn(),
  result: 'data:image/png;base64,test'
})) as any

// Configure Vue Test Utils globally
config.global.stubs = {
  RouterLink: true,
  RouterView: true,
}

// Mock router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useRoute: () => ({
    path: '/',
    params: {},
    query: {},
  }),
})) 
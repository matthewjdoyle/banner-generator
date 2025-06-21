<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
  componentCount: number
  lastUpdate: number
}

const isVisible = ref(false)
const metrics = ref<PerformanceMetrics>({
  fps: 0,
  memoryUsage: 0,
  renderTime: 0,
  componentCount: 0,
  lastUpdate: 0
})

const fpsHistory = ref<number[]>([])
const memoryHistory = ref<number[]>([])

let frameCount = 0
let lastTime = performance.now()
let animationId: number
let performanceObserver: PerformanceObserver | null = null

// FPS and performance tracking
function updatePerformanceMetrics() {
  const now = performance.now()
  frameCount++
  
  if (now >= lastTime + 1000) {
    // Calculate FPS
    metrics.value.fps = Math.round((frameCount * 1000) / (now - lastTime))
    frameCount = 0
    lastTime = now
    
    // Update FPS history
    fpsHistory.value.push(metrics.value.fps)
    if (fpsHistory.value.length > 60) {
      fpsHistory.value.shift()
    }
    
    // Memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory as { 
        usedJSHeapSize: number
        totalJSHeapSize: number 
      }
      metrics.value.memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024)
      
      // Update memory history
      memoryHistory.value.push(metrics.value.memoryUsage)
      if (memoryHistory.value.length > 60) {
        memoryHistory.value.shift()
      }
    }
    
    // Component count (rough estimate based on DOM nodes)
    metrics.value.componentCount = document.querySelectorAll('[data-v-]').length
    
    metrics.value.lastUpdate = now
  }
  
  animationId = requestAnimationFrame(updatePerformanceMetrics)
}

// Performance Observer for detailed metrics
function setupPerformanceObserver() {
  if ('PerformanceObserver' in window) {
    performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      
      // Look for paint timing
      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            console.log(`First Contentful Paint: ${entry.startTime.toFixed(2)}ms`)
          }
        } else if (entry.entryType === 'measure') {
          metrics.value.renderTime = entry.duration
        }
      })
    })
    
    try {
      performanceObserver.observe({ entryTypes: ['paint', 'measure'] })
    } catch (e) {
      console.warn('Performance Observer not fully supported:', e)
    }
  }
}

// Get performance grade based on metrics
function getPerformanceGrade(): { grade: string; color: string; description: string } {
  const avgFps = fpsHistory.value.length > 0 
    ? fpsHistory.value.reduce((a, b) => a + b, 0) / fpsHistory.value.length 
    : 0
  
  if (avgFps >= 55) {
    return { grade: 'A', color: 'text-green-600', description: 'Excellent' }
  } else if (avgFps >= 45) {
    return { grade: 'B', color: 'text-blue-600', description: 'Good' }
  } else if (avgFps >= 30) {
    return { grade: 'C', color: 'text-yellow-600', description: 'Fair' }
  } else {
    return { grade: 'D', color: 'text-red-600', description: 'Poor' }
  }
}

// Toggle visibility
function toggleVisibility() {
  isVisible.value = !isVisible.value
}

// Lifecycle
onMounted(() => {
  // Only show in development mode by default
  const isDev = import.meta.env.DEV
  if (isDev) {
    isVisible.value = true
  }
  
  updatePerformanceMetrics()
  setupPerformanceObserver()
  
  // Add keyboard shortcut (Ctrl+Shift+P)
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault()
      toggleVisibility()
    }
  }
  
  window.addEventListener('keydown', handleKeydown)
  
  return () => {
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (performanceObserver) {
    performanceObserver.disconnect()
  }
})

// Manual garbage collection (if available)
function forceGC() {
  if ('gc' in window && typeof (window as any).gc === 'function') {
    (window as any).gc()
  } else {
    alert('Manual garbage collection not available in this browser')
  }
}

// Export performance data
function exportMetrics() {
  const data = {
    timestamp: new Date().toISOString(),
    currentMetrics: metrics.value,
    fpsHistory: [...fpsHistory.value],
    memoryHistory: [...memoryHistory.value],
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `performance-metrics-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div v-if="isVisible" class="fixed top-4 right-4 z-50">
    <!-- Toggle Button (when collapsed) -->
    <button
      v-if="!isVisible"
      @click="toggleVisibility"
      class="bg-gray-900 text-white p-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
      title="Show Performance Monitor (Ctrl+Shift+P)"
    >
      📊
    </button>
    
    <!-- Performance Panel -->
    <div class="bg-gray-900 text-white p-4 rounded-lg shadow-xl min-w-[280px] font-mono text-sm">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-green-400">Performance Monitor</h3>
        <button
          @click="toggleVisibility"
          class="text-gray-400 hover:text-white transition-colors"
          title="Hide (Ctrl+Shift+P)"
        >
          ✕
        </button>
      </div>
      
      <!-- Performance Grade -->
      <div class="mb-3 p-2 bg-gray-800 rounded">
        <div class="flex items-center justify-between">
          <span>Performance Grade:</span>
          <span :class="[getPerformanceGrade().color, 'font-bold']">
            {{ getPerformanceGrade().grade }} - {{ getPerformanceGrade().description }}
          </span>
        </div>
      </div>
      
      <!-- Real-time Metrics -->
      <div class="space-y-2 mb-3">
        <div class="flex justify-between">
          <span class="text-gray-300">FPS:</span>
          <span :class="metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'">
            {{ metrics.fps }}
          </span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-300">Memory:</span>
          <span :class="metrics.memoryUsage < 100 ? 'text-green-400' : metrics.memoryUsage < 200 ? 'text-yellow-400' : 'text-red-400'">
            {{ metrics.memoryUsage }}MB
          </span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-300">Components:</span>
          <span class="text-blue-400">{{ metrics.componentCount }}</span>
        </div>
        
        <div v-if="metrics.renderTime > 0" class="flex justify-between">
          <span class="text-gray-300">Render Time:</span>
          <span :class="metrics.renderTime < 16 ? 'text-green-400' : metrics.renderTime < 33 ? 'text-yellow-400' : 'text-red-400'">
            {{ metrics.renderTime.toFixed(2) }}ms
          </span>
        </div>
      </div>
      
      <!-- FPS Graph (simplified) -->
      <div class="mb-3">
        <div class="text-gray-300 text-xs mb-1">FPS History (60s)</div>
        <div class="h-8 bg-gray-800 rounded flex items-end space-x-0.5 overflow-hidden">
          <div
            v-for="(fps, index) in fpsHistory.slice(-30)"
            :key="index"
            :style="{ height: `${Math.min(fps / 60 * 100, 100)}%` }"
            :class="[
              'flex-1 rounded-t-sm',
              fps >= 50 ? 'bg-green-400' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'
            ]"
            :title="`${fps} FPS`"
          />
        </div>
      </div>
      
      <!-- Memory Graph (simplified) -->
      <div class="mb-3" v-if="memoryHistory.length > 0">
        <div class="text-gray-300 text-xs mb-1">Memory Usage (60s)</div>
        <div class="h-6 bg-gray-800 rounded flex items-end space-x-0.5 overflow-hidden">
          <div
            v-for="(memory, index) in memoryHistory.slice(-30)"
            :key="index"
            :style="{ height: `${Math.min(memory / 500 * 100, 100)}%` }"
            :class="[
              'flex-1 rounded-t-sm',
              memory < 100 ? 'bg-green-400' : memory < 200 ? 'bg-yellow-400' : 'bg-red-400'
            ]"
            :title="`${memory}MB`"
          />
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-2">
        <button
          @click="forceGC"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
          title="Force Garbage Collection"
        >
          GC
        </button>
        
        <button
          @click="exportMetrics"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
          title="Export Performance Data"
        >
          Export
        </button>
      </div>
      
      <!-- Instructions -->
      <div class="mt-3 text-xs text-gray-400 text-center">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the monitor stays on top */
.z-50 {
  z-index: 9999;
}
</style> 
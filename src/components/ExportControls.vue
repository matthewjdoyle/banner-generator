<script setup lang="ts">
import { ref, inject } from 'vue'
import { useBannerStore } from '@/stores/banner'

const bannerStore = useBannerStore()
const isExporting = ref(false)
const exportFormat = ref<'png' | 'jpg'>('png')
const exportQuality = ref(0.9)

// Inject the sharing popup trigger function
const triggerSharingPopup = inject<() => void>('triggerSharingPopup')

async function exportBanner() {
  if (!bannerStore.canvasRef || isExporting.value) return

  isExporting.value = true

  try {
    // Create a temporary canvas with the exact banner dimensions
    const originalCanvas = bannerStore.canvasRef
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')

    if (!tempCtx) throw new Error('Could not create canvas context')

    const size = bannerStore.currentSize
    tempCanvas.width = size.width
    tempCanvas.height = size.height

    // Copy the banner content to temp canvas
    tempCtx.drawImage(originalCanvas, 0, 0)

    // Convert to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      tempCanvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob'))),
        `image/${exportFormat.value}`,
        exportQuality.value,
      )
    })

    // Download the file
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `banner-${Date.now()}.${exportFormat.value}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Trigger sharing popup after successful export
    if (triggerSharingPopup) {
      setTimeout(() => {
        triggerSharingPopup()
      }, 1000) // Small delay to let the download complete
    }
  } catch (error) {
    console.error('Export failed:', error)
    alert('Failed to export banner. Please try again.')
  } finally {
    isExporting.value = false
  }
}

function clearBanner() {
  if (confirm('Are you sure you want to clear all elements from the banner?')) {
    bannerStore.clearBanner()
  }
}

function copyBannerData() {
  const bannerData = {
    size: bannerStore.currentSize,
    background: bannerStore.currentBackground,
    textElements: bannerStore.textElements,
    images: bannerStore.images,
  }

  navigator.clipboard
    .writeText(JSON.stringify(bannerData, null, 2))
    .then(() => {
      alert('Banner data copied to clipboard!')
    })
    .catch(() => {
      alert('Failed to copy banner data')
    })
}

const socialPlatforms = [
  { name: 'Twitter Header', width: 1500, height: 500 },
  { name: 'Facebook Cover', width: 1640, height: 859 },
  { name: 'LinkedIn Banner', width: 1584, height: 396 },
  { name: 'YouTube Channel Art', width: 2560, height: 1440 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-center">
      <div
        class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium"
      >
        <span class="text-white text-xl">💾</span>
      </div>
      <h3 class="text-xl font-bold text-neutral-900 font-display">Export & Download</h3>
      <p class="text-sm text-neutral-600 mt-1">Save your banner in high quality</p>
    </div>

    <!-- Export Settings -->
    <div
      class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-secondary-100 to-secondary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-secondary-300/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-medium"
          >
            <span class="text-white text-lg">⚙️</span>
          </div>
          <div>
            <h4 class="font-bold text-secondary-900">Export Settings</h4>
            <p class="text-sm text-secondary-700">Choose format and quality</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-secondary-800 mb-2">File Format</label>
            <select
              v-model="exportFormat"
              class="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent bg-white font-medium"
            >
              <option value="png">PNG (Best Quality)</option>
              <option value="jpg">JPEG (Smaller Size)</option>
            </select>
          </div>

          <div v-if="exportFormat === 'jpg'">
            <label class="block text-sm font-semibold text-secondary-800 mb-2">
              Quality: {{ Math.round(exportQuality * 100) }}%
            </label>
            <input
              v-model="exportQuality"
              type="range"
              min="0.5"
              max="1"
              step="0.1"
              class="w-full mt-3"
            />
          </div>
        </div>

        <!-- Export Button -->
        <button
          @click="exportBanner"
          :disabled="isExporting"
          :class="[
            'w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-medium hover:shadow-strong',
            isExporting
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              : 'bg-gradient-secondary text-white hover:scale-105 active:scale-95',
          ]"
        >
          <span v-if="!isExporting" class="text-2xl">📥</span>
          <div
            v-else
            class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></div>
          <span>{{ isExporting ? 'Exporting Banner...' : 'Download Banner' }}</span>
        </button>
      </div>
    </div>

    <!-- Current Banner Info -->
    <div
      class="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-neutral-100 to-neutral-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-neutral-300/50"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-neutral-600 rounded-xl flex items-center justify-center">
            <span class="text-white text-lg">📊</span>
          </div>
          <div>
            <h4 class="font-bold text-neutral-900">Banner Summary</h4>
            <p class="text-sm text-neutral-600">Current banner details</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <span class="text-primary-500">📐</span>
            <div>
              <p class="text-sm font-medium text-neutral-900">{{ bannerStore.currentSize.name }}</p>
              <p class="text-xs text-neutral-600">
                {{ bannerStore.currentSize.width }} × {{ bannerStore.currentSize.height }}px
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-accent-500">🎨</span>
            <div>
              <p class="text-sm font-medium text-neutral-900">
                {{ bannerStore.currentBackground.name }}
              </p>
              <p class="text-xs text-neutral-600">Background</p>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <span class="text-secondary-500">📝</span>
            <div>
              <p class="text-sm font-medium text-neutral-900">
                {{ bannerStore.textElements.length }} Text Elements
              </p>
              <p class="text-xs text-neutral-600">{{ bannerStore.icons.length }} Icons</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-primary-500">🖼️</span>
            <div>
              <p class="text-sm font-medium text-neutral-900">
                {{ bannerStore.images.length }} Images
              </p>
              <p class="text-xs text-neutral-600">Media elements</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Media Presets -->
    <div
      class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-accent-300/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium"
          >
            <span class="text-white text-lg">📱</span>
          </div>
          <div>
            <h4 class="font-bold text-accent-900">Quick Resize</h4>
            <p class="text-sm text-accent-700">Switch to popular social media sizes</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <button
          v-for="platform in socialPlatforms"
          :key="platform.name"
          @click="
            bannerStore.selectSize({
              id: platform.name.toLowerCase().replace(/\s+/g, '-'),
              name: platform.name,
              width: platform.width,
              height: platform.height,
              category: 'Social Media',
            })
          "
          class="group text-left p-4 bg-white border-2 border-accent-200 rounded-xl hover:border-accent-400 hover:bg-accent-50 transition-all duration-300 hover:shadow-medium"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold text-accent-900 group-hover:text-accent-700">
                {{ platform.name }}
              </div>
              <div class="text-sm text-accent-600 font-mono">
                {{ platform.width }} × {{ platform.height }}px
              </div>
            </div>
            <div
              class="w-8 h-8 bg-accent-100 group-hover:bg-accent-200 rounded-lg flex items-center justify-center transition-colors duration-300"
            >
              <span class="text-accent-600 text-sm">→</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Advanced Options -->
    <div
      class="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-neutral-100 to-neutral-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-neutral-300/50"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-neutral-600 rounded-xl flex items-center justify-center">
            <span class="text-white text-lg">🔧</span>
          </div>
          <div>
            <h4 class="font-bold text-neutral-900">Advanced Tools</h4>
            <p class="text-sm text-neutral-600">Additional options and utilities</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <button
          @click="copyBannerData"
          class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 font-medium text-neutral-700"
        >
          <span class="text-lg">📋</span>
          <span>Copy Banner Data</span>
        </button>

        <button
          @click="clearBanner"
          class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-error-50 border-2 border-error-200 rounded-xl hover:border-error-300 hover:bg-error-100 transition-all duration-200 font-medium text-error-700"
        >
          <span class="text-lg">🗑️</span>
          <span>Clear All Elements</span>
        </button>
      </div>
    </div>

    <!-- Pro Tips -->
    <div
      class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium"
          >
            <span class="text-white text-lg">💡</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Export Tips</h4>
            <p class="text-sm text-primary-700">Get the best results</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex items-start space-x-3">
          <div
            class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <span class="text-primary-700 text-xs font-bold">1</span>
          </div>
          <div>
            <p class="text-sm font-medium text-primary-900">Use PNG for best quality</p>
            <p class="text-xs text-primary-700">Supports transparency and lossless compression</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <div
            class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <span class="text-primary-700 text-xs font-bold">2</span>
          </div>
          <div>
            <p class="text-sm font-medium text-primary-900">Choose JPEG for smaller files</p>
            <p class="text-xs text-primary-700">Better for web use and faster loading</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <div
            class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <span class="text-primary-700 text-xs font-bold">3</span>
          </div>
          <div>
            <p class="text-sm font-medium text-primary-900">Check platform requirements</p>
            <p class="text-xs text-primary-700">
              Each social media platform has optimal dimensions
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

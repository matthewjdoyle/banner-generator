<script setup lang="ts">
import { ref } from 'vue'
import { useBannerStore, type BannerImage } from '@/stores/banner'

const bannerStore = useBannerStore()
const fileInput = ref<HTMLInputElement>()
const imageUrl = ref('')
// Remove unused variable
// const draggedImageId = ref<string | null>(null)

function triggerFileUpload() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const src = e.target?.result as string
    addImageToBanner(src)
  }
  reader.readAsDataURL(file)
}

function addImageFromUrl() {
  if (!imageUrl.value.trim()) return

  // Basic URL validation
  try {
    new URL(imageUrl.value)
    addImageToBanner(imageUrl.value)
    imageUrl.value = ''
  } catch {
    alert('Please enter a valid image URL')
  }
}

function addImageToBanner(src: string) {
  const size = bannerStore.currentSize

  bannerStore.addImage({
    src,
    x: size.width * 0.1, // 10% from left
    y: size.height * 0.1, // 10% from top
    width: 300,
    height: 300,
    borderRadius: 0,
  })
}

function removeImage(id: string) {
  bannerStore.removeImage(id)
}

function updateImagePosition(id: string, direction: 'up' | 'down' | 'left' | 'right') {
  const image = bannerStore.images.find((img) => img.id === id)
  if (!image) return

  const step = 10
  const updates: Partial<BannerImage> = {}

  switch (direction) {
    case 'up':
      updates.y = Math.max(0, image.y - step)
      break
    case 'down':
      updates.y = Math.min(bannerStore.currentSize.height - image.height, image.y + step)
      break
    case 'left':
      updates.x = Math.max(0, image.x - step)
      break
    case 'right':
      updates.x = Math.min(bannerStore.currentSize.width - image.width, image.x + step)
      break
  }

  bannerStore.updateImage(id, updates)
}

function updateImageSize(id: string, dimension: 'width' | 'height', value: number) {
  const updates: Partial<BannerImage> = {}
  updates[dimension] = Math.max(50, Math.min(2000, value))
  bannerStore.updateImage(id, updates)
}

function updateImageBorderRadius(id: string, radius: number) {
  bannerStore.updateImage(id, { borderRadius: Math.max(0, Math.min(100, radius)) })
}

// Sample images for quick access - diverse high-quality images from Unsplash
const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop', // Mountain landscape
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop', // Food styling
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&h=150&fit=crop', // Abstract colorful
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&h=150&fit=crop', // Tropical nature
  'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=150&h=150&fit=crop', // Coffee shop aesthetic
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop', // Business team
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop', // Fitness lifestyle
  'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=150&h=150&fit=crop', // Minimalist workspace
]
</script>

<template>
  <div class="space-y-6">
    <!-- Upload Options -->
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
            <span class="text-white text-lg">📤</span>
          </div>
          <div>
            <h4 class="font-bold text-secondary-900">Add Images</h4>
            <p class="text-sm text-secondary-700">Upload or select images for your banner</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <!-- File Upload -->
        <div>
          <label class="block text-sm font-semibold text-secondary-800 mb-2"
            >Upload from Device</label
          >
          <button
            @click="triggerFileUpload"
            class="w-full px-6 py-4 border-2 border-dashed border-secondary-300 rounded-xl text-secondary-700 hover:border-secondary-400 hover:bg-secondary-50 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <span class="text-xl">📁</span>
            <span>Choose Image File</span>
          </button>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
          />
        </div>

        <!-- URL Input -->
        <div>
          <label class="block text-sm font-semibold text-secondary-800 mb-2">From URL</label>
          <div class="space-y-3">
            <input
              v-model="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent bg-white font-medium"
              @keyup.enter="addImageFromUrl"
            />
            <button
              @click="addImageFromUrl"
              :disabled="!imageUrl.trim()"
              class="w-full px-6 py-3 bg-gradient-secondary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-medium transition-all duration-200"
            >
              Add Image from URL
            </button>
          </div>
        </div>

        <!-- Sample Images -->
        <div>
          <label class="block text-sm font-semibold text-secondary-800 mb-3">Quick Select</label>
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="(src, index) in sampleImages"
              :key="index"
              @click="addImageToBanner(src)"
              class="group relative aspect-square rounded-xl overflow-hidden border-2 border-secondary-200 hover:border-secondary-400 cursor-pointer transition-all duration-300 hover:shadow-medium"
            >
              <img
                :src="src"
                :alt="`Sample ${index + 1}`"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2"
              >
                <span class="text-white text-xs font-medium">Add</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-secondary-600 mt-2 text-center">
            High-quality images from Unsplash - perfect for banners
          </p>
        </div>
      </div>
    </div>

    <!-- Existing Images -->
    <div v-if="bannerStore.images.length > 0">
      <div class="space-y-4">
        <div
          v-for="image in bannerStore.images"
          :key="image.id"
          class="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-4 border border-neutral-200 hover:shadow-medium transition-all duration-300"
        >
          <div class="flex items-start space-x-4 mb-4">
            <div class="relative">
              <img
                :src="image.src"
                :alt="'Image ' + image.id"
                class="w-16 h-16 object-cover rounded-xl shadow-soft"
              />
              <div class="absolute -top-2 -right-2">
                <button
                  @click="removeImage(image.id)"
                  class="w-6 h-6 bg-error-500 hover:bg-error-600 text-white rounded-full flex items-center justify-center text-xs transition-colors duration-200 shadow-medium"
                >
                  ×
                </button>
              </div>
            </div>
            <div class="flex-1">
              <p class="font-medium text-neutral-900">{{ image.width }} × {{ image.height }}px</p>
              <div class="flex items-center space-x-4 mt-1 text-xs text-neutral-500">
                <span>X: {{ image.x }}px</span>
                <span>Y: {{ image.y }}px</span>
                <span v-if="image.borderRadius > 0">Radius: {{ image.borderRadius }}%</span>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="space-y-4">
            <!-- Position Controls -->
            <div>
              <div class="flex items-center justify-center space-x-2">
                <button
                  @click="updateImagePosition(image.id, 'up')"
                  class="p-2 bg-white border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-soft transition-all duration-200"
                  title="Move Up"
                >
                  ⬆️
                </button>
                <div class="flex space-x-1">
                  <button
                    @click="updateImagePosition(image.id, 'left')"
                    class="p-2 bg-white border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-soft transition-all duration-200"
                    title="Move Left"
                  >
                    ⬅️
                  </button>
                  <button
                    @click="updateImagePosition(image.id, 'right')"
                    class="p-2 bg-white border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-soft transition-all duration-200"
                    title="Move Right"
                  >
                    ➡️
                  </button>
                </div>
                <button
                  @click="updateImagePosition(image.id, 'down')"
                  class="p-2 bg-white border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-soft transition-all duration-200"
                  title="Move Down"
                >
                  ⬇️
                </button>
              </div>
            </div>

            <!-- Size Controls -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="range"
                  :value="image.width"
                  @input="
                    updateImageSize(
                      image.id,
                      'width',
                      parseInt(($event.target as HTMLInputElement).value),
                    )
                  "
                  min="50"
                  max="2000"
                  class="w-full"
                />
                <div class="text-center text-xs text-neutral-600 mt-1">
                  Width: {{ image.width }}px
                </div>
              </div>
              <div>
                <input
                  type="range"
                  :value="image.height"
                  @input="
                    updateImageSize(
                      image.id,
                      'height',
                      parseInt(($event.target as HTMLInputElement).value),
                    )
                  "
                  min="50"
                  max="2000"
                  class="w-full"
                />
                <div class="text-center text-xs text-neutral-600 mt-1">
                  Height: {{ image.height }}px
                </div>
              </div>
            </div>

            <!-- Border Radius -->
            <div>
              <input
                type="range"
                :value="image.borderRadius"
                @input="
                  updateImageBorderRadius(
                    image.id,
                    parseInt(($event.target as HTMLInputElement).value),
                  )
                "
                min="0"
                max="50"
                class="w-full"
              />
              <div class="text-center text-xs text-neutral-600 mt-1">
                Corner Radius: {{ image.borderRadius }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="bannerStore.images.length === 0" class="text-center py-8 text-neutral-500">
      <div
        class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <span class="text-2xl text-neutral-400">🖼️</span>
      </div>
      <p class="font-medium">No images added yet</p>
      <p class="text-sm">Upload or select images above to get started!</p>
    </div>

    <!-- AI Image Generation Tools -->
    <div
      class="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-6 border border-purple-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-purple-100 to-indigo-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-purple-300/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-medium"
          >
            <span class="text-white text-lg">🤖</span>
          </div>
          <div>
            <h4 class="font-bold text-purple-900">Want AI assets?</h4>
            <p class="text-sm text-purple-700">These are some free-use tools</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <!-- Leonardo AI -->
        <a
          href="https://leonardo.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-center space-x-3 p-4 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-medium transition-all duration-300 hover:bg-purple-50"
        >
          <div class="w-8 h-8 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Leonardo AI inspired logo - purple gradient with "L" -->
              <defs>
                <linearGradient id="leonardoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #8b5cf6" />
                  <stop offset="100%" style="stop-color: #ec4899" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="8" fill="url(#leonardoGrad)" />
              <path d="M8 24V8h4v12h8v4H8z" fill="white" />
            </svg>
          </div>
          <span class="font-semibold text-purple-900 group-hover:text-purple-700">Leonardo AI</span>
          <svg
            class="w-4 h-4 text-purple-500 group-hover:text-purple-700 group-hover:translate-x-1 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        <!-- Playground AI -->
        <a
          href="https://playgroundai.com"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-center space-x-3 p-4 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-medium transition-all duration-300 hover:bg-purple-50"
        >
          <div class="w-8 h-8 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Playground AI inspired logo - colorful gradient with play symbol -->
              <defs>
                <linearGradient id="playgroundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #6366f1" />
                  <stop offset="50%" style="stop-color: #8b5cf6" />
                  <stop offset="100%" style="stop-color: #ec4899" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="8" fill="url(#playgroundGrad)" />
              <path d="M12 8v16l12-8-12-8z" fill="white" />
            </svg>
          </div>
          <span class="font-semibold text-purple-900 group-hover:text-purple-700"
            >Playground AI</span
          >
          <svg
            class="w-4 h-4 text-purple-500 group-hover:text-purple-700 group-hover:translate-x-1 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        <!-- Bing Image Creator (OpenAI/Microsoft) -->
        <a
          href="https://www.bing.com/images/create"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-center space-x-3 p-4 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-medium transition-all duration-300 hover:bg-purple-50"
        >
          <div class="w-8 h-8 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Microsoft/OpenAI inspired logo - blue gradient with abstract shapes -->
              <defs>
                <linearGradient id="bingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #0078d4" />
                  <stop offset="100%" style="stop-color: #00bcf2" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="8" fill="url(#bingGrad)" />
              <!-- Abstract AI-inspired shapes -->
              <circle cx="16" cy="16" r="8" fill="none" stroke="white" stroke-width="2" />
              <circle cx="16" cy="16" r="3" fill="white" />
              <circle cx="16" cy="8" r="2" fill="white" opacity="0.7" />
              <circle cx="24" cy="16" r="2" fill="white" opacity="0.7" />
              <circle cx="16" cy="24" r="2" fill="white" opacity="0.7" />
              <circle cx="8" cy="16" r="2" fill="white" opacity="0.7" />
            </svg>
          </div>
          <span class="font-semibold text-purple-900 group-hover:text-purple-700"
            >Bing Image Creator</span
          >
          <svg
            class="w-4 h-4 text-purple-500 group-hover:text-purple-700 group-hover:translate-x-1 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

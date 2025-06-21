<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBannerStore } from '@/stores/banner'

const bannerStore = useBannerStore()
const selectedType = ref<'solid' | 'gradient' | 'fancy' | 'image'>('gradient')
const customColor = ref('#3B82F6')
const imageFileInput = ref<HTMLInputElement>()

// Remove unused categories variable
// const categories = [
//   { id: 'all', name: 'All Backgrounds' },
//   { id: 'solid', name: 'Solid Colors' },
//   { id: 'gradient', name: 'Gradients' },
//   { id: 'fancy', name: 'Fancy Patterns' },
//   { id: 'image', name: 'Custom Images' }
// ]

const backgroundsByType = computed(() => {
  return bannerStore.backgroundOptions.filter(bg => bg.type === selectedType.value)
})

const currentFancyBackground = computed(() => {
  if (selectedType.value !== 'fancy' || bannerStore.currentBackground.type !== 'fancy') return null
  return bannerStore.currentBackground
})

function createCustomBackground() {
  const customBg = {
    id: `custom-${Date.now()}`,
    name: 'Custom Color',
    type: 'solid' as const,
    value: customColor.value,
    preview: customColor.value
  }
  bannerStore.selectBackground(customBg)
}

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      const imageBg = bannerStore.createImageBackground(imageUrl, file.name.replace(/\.[^/.]+$/, ''))
      bannerStore.selectBackground(imageBg)
    }
    reader.readAsDataURL(file)
  }
}

function triggerImageUpload() {
  imageFileInput.value?.click()
}

function updateFancyBackgroundColor(colorIndex: number, newColor: string) {
  if (currentFancyBackground.value && currentFancyBackground.value.patternColors) {
    const updatedColors = [...currentFancyBackground.value.patternColors]
    updatedColors[colorIndex] = newColor
    bannerStore.updateFancyBackgroundColors(currentFancyBackground.value.id, updatedColors)
  }
}

function selectStockImage(imageUrl: string, name: string) {
  const imageBg = bannerStore.createImageBackground(imageUrl, name)
  bannerStore.selectBackground(imageBg)
}

function updateCrop(cropX: number, cropY: number, scale: number) {
  if (bannerStore.currentBackground.type === 'image') {
    bannerStore.updateBackgroundCrop(bannerStore.currentBackground.id, cropX, cropY, scale)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-center">
      <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
        <span class="text-white text-xl">🎨</span>
      </div>
      <h3 class="text-xl font-bold text-neutral-900 font-display">Background Style</h3>
      <p class="text-sm text-neutral-600 mt-1">Choose the perfect backdrop for your banner</p>
    </div>
    
    <!-- Background Type Selection -->
    <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft">
      <div class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎯</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Style Type</h4>
            <p class="text-sm text-primary-700">Choose your background style</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="selectedType = 'solid'"
          :class="[
            'p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-medium',
            selectedType === 'solid'
              ? 'border-primary-500 bg-gradient-primary text-white shadow-medium'
              : 'border-primary-200 bg-white text-primary-700 hover:border-primary-300'
          ]"
        >
          <div class="text-center">
            <div class="text-2xl mb-2">⚪</div>
            <div class="text-sm font-semibold">Solid Colors</div>
          </div>
        </button>
        <button
          @click="selectedType = 'gradient'"
          :class="[
            'p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-medium',
            selectedType === 'gradient'
              ? 'border-primary-500 bg-gradient-primary text-white shadow-medium'
              : 'border-primary-200 bg-white text-primary-700 hover:border-primary-300'
          ]"
        >
          <div class="text-center">
            <div class="text-2xl mb-2">🌈</div>
            <div class="text-sm font-semibold">Gradients</div>
          </div>
        </button>
        <button
          @click="selectedType = 'fancy'"
          :class="[
            'p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-medium',
            selectedType === 'fancy'
              ? 'border-primary-500 bg-gradient-primary text-white shadow-medium'
              : 'border-primary-200 bg-white text-primary-700 hover:border-primary-300'
          ]"
        >
          <div class="text-center">
            <div class="text-2xl mb-2">🎨</div>
            <div class="text-sm font-semibold">Fancy Patterns</div>
          </div>
        </button>
        <button
          @click="selectedType = 'image'"
          :class="[
            'p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-medium',
            selectedType === 'image'
              ? 'border-primary-500 bg-gradient-primary text-white shadow-medium'
              : 'border-primary-200 bg-white text-primary-700 hover:border-primary-300'
          ]"
        >
          <div class="text-center">
            <div class="text-2xl mb-2">🖼️</div>
            <div class="text-sm font-semibold">Images</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Image Section -->
    <div v-if="selectedType === 'image'" class="space-y-6">
      <!-- Quick Select Stock Images -->
      <div class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 shadow-soft">
        <div class="bg-gradient-to-r from-secondary-100 to-secondary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-secondary-300/50">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-medium">
              <span class="text-white text-lg">🖼️</span>
            </div>
            <div>
              <h4 class="font-bold text-secondary-900">Quick Select Images</h4>
              <p class="text-sm text-secondary-700">Choose from our curated stock images</p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <!-- Social Media Banner Images -->
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&h=800&fit=crop', 'Aesthetic Coffee Shop')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Coffee Shop</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=800&fit=crop', 'Minimalist Workspace')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Workspace</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=800&fit=crop', 'Colourful')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Colourful</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1200&h=800&fit=crop', 'Travel Adventure')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Travel</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop', 'Fashion Style')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Fashion</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop', 'Food & Lifestyle')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Food</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop', 'Business Team')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Business</h4>
          </div>
          
          <div
            @click="selectStockImage('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop', 'Fitness Lifestyle')"
            class="relative p-2 rounded-xl border-2 border-secondary-200 cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-secondary-300 bg-white group"
          >
            <div class="w-full h-20 rounded-lg bg-cover bg-center shadow-soft" style="background-image: url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop')"></div>
            <h4 class="text-xs font-semibold text-secondary-900 text-center mt-2 group-hover:text-secondary-700">Fitness</h4>
          </div>
        </div>
      </div>
      
      <!-- Custom Upload Section -->
      <div class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft">
        <div class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-accent-300/50">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium">
              <span class="text-white text-lg">📸</span>
            </div>
            <div>
              <h4 class="font-bold text-accent-900">Upload Custom Image</h4>
              <p class="text-sm text-accent-700">Add your own background image</p>
            </div>
          </div>
        </div>
        
        <div class="border-2 border-dashed border-accent-300 rounded-xl p-8 text-center hover:border-accent-400 transition-colors bg-white/50">
          <div class="text-4xl mb-3">📸</div>
          <p class="text-accent-700 font-medium mb-4">Click to upload your background image</p>
          <button @click="triggerImageUpload" class="btn-accent">
          Choose Image
        </button>
        <input
          ref="imageFileInput"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="hidden"
        />
          <p class="text-xs text-accent-600 mt-3">
          Supports JPG, PNG, GIF, WebP (Max 10MB)
        </p>
        </div>
      </div>
    </div>

    <!-- Background Options Grid -->
    <div v-if="selectedType !== 'image'" class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft">
      <div class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-accent-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎨</span>
          </div>
          <div>
            <h4 class="font-bold text-accent-900">
        {{ selectedType === 'solid' ? 'Choose Color' : selectedType === 'gradient' ? 'Choose Gradient' : 'Choose Pattern' }}
            </h4>
            <p class="text-sm text-accent-700">Select from our curated collection</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="background in backgroundsByType"
          :key="background.id"
          @click="bannerStore.selectBackground(background)"
          :class="[
            'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium group',
            bannerStore.currentBackground.id === background.id
              ? 'border-accent-500 ring-2 ring-accent-200 shadow-medium'
              : 'border-accent-200 hover:border-accent-300 bg-white'
          ]"
        >
          <!-- Background Preview -->
          <div
            class="w-full h-16 rounded-lg mb-3 border border-accent-200 shadow-soft"
            :style="{ background: background.preview }"
          >
            <div
              v-if="bannerStore.currentBackground.id === background.id"
              class="w-full h-full flex items-center justify-center"
            >
              <div class="w-8 h-8 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-medium">
                <svg class="w-5 h-5 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Background Name -->
          <h4 class="text-sm font-semibold text-accent-900 text-center group-hover:text-accent-700 transition-colors">
            {{ background.name }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Custom Color Picker (only for solid colors) -->
    <div v-if="selectedType === 'solid'" class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft">
      <div class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎨</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Custom Color</h4>
            <p class="text-sm text-primary-700">Create your own solid color background</p>
            </div>
          </div>
        </div>

      <div class="flex space-x-3">
        <input
          v-model="customColor"
          type="color"
          class="w-16 h-12 border-2 border-primary-200 rounded-xl cursor-pointer shadow-soft"
        />
        <input
          v-model="customColor"
          type="text"
          class="flex-1 px-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-mono"
          placeholder="#3B82F6"
        />
          <button
          @click="createCustomBackground"
          class="btn-primary"
          >
          Apply
          </button>
      </div>
    </div>

    <!-- Show current image backgrounds -->
    <div v-if="selectedType === 'image' && bannerStore.backgroundOptions.filter(bg => bg.type === 'image').length > 0" class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 shadow-soft">
      <div class="bg-gradient-to-r from-secondary-100 to-secondary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-secondary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🖼️</span>
          </div>
          <div>
            <h4 class="font-bold text-secondary-900">Your Images</h4>
            <p class="text-sm text-secondary-700">Previously uploaded background images</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="background in bannerStore.backgroundOptions.filter(bg => bg.type === 'image')"
          :key="background.id"
          @click="bannerStore.selectBackground(background)"
          :class="[
            'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium group',
            bannerStore.currentBackground.id === background.id
              ? 'border-secondary-500 ring-2 ring-secondary-200 shadow-medium'
              : 'border-secondary-200 hover:border-secondary-300 bg-white'
          ]"
        >
          <!-- Image Preview -->
          <div
            class="w-full h-16 rounded-lg mb-3 border border-secondary-200 bg-cover bg-center shadow-soft"
            :style="{ backgroundImage: background.preview }"
          >
            <div
              v-if="bannerStore.currentBackground.id === background.id"
              class="w-full h-full flex items-center justify-center bg-black bg-opacity-20 rounded-lg"
            >
              <div class="w-8 h-8 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-medium">
                <svg class="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Background Name -->
          <h4 class="text-sm font-semibold text-secondary-900 text-center group-hover:text-secondary-700 transition-colors truncate">
            {{ background.name }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Fancy Background Color Customization -->
    <div v-if="currentFancyBackground && selectedType === 'fancy'" class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft">
      <div class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-accent-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎨</span>
          </div>
          <div>
            <h4 class="font-bold text-accent-900">Customize Pattern Colors</h4>
            <p class="text-sm text-accent-700">{{ currentFancyBackground.name }}</p>
          </div>
        </div>
      </div>
      
      <!-- Color Controls -->
      <div class="space-y-4">
        <div 
          v-for="(color, index) in currentFancyBackground.patternColors" 
          :key="index" 
          class="flex items-center space-x-3"
        >
          <label class="text-sm font-semibold text-accent-800 w-20">
            Color {{ index + 1 }}:
          </label>
          <div class="flex-1 flex items-center space-x-3">
        <input
          type="color"
              :value="color"
              @input="updateFancyBackgroundColor(index, ($event.target as HTMLInputElement).value)"
              class="w-12 h-10 border-2 border-accent-200 rounded-xl cursor-pointer shadow-soft"
        />
        <input
          type="text"
              :value="color"
              @input="updateFancyBackgroundColor(index, ($event.target as HTMLInputElement).value)"
              class="flex-1 px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-mono"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      <!-- Apply to Banner Button -->
      <div class="mt-6 pt-4 border-t border-accent-200">
        <button
          @click="bannerStore.selectBackground(currentFancyBackground)"
          class="btn-accent w-full"
        >
          Apply This Pattern
        </button>
      </div>
    </div>

    <!-- Image Position Controls -->
    <div v-if="bannerStore.currentBackground.type === 'image'" class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 shadow-soft">
      <div class="bg-gradient-to-r from-secondary-100 to-secondary-200/80 -m-6 mb-6 p-6 rounded-t-2xl border-b border-secondary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">📐</span>
          </div>
          <div>
            <h4 class="font-bold text-secondary-900">Image Position</h4>
            <p class="text-sm text-secondary-700">Adjust vertical positioning of your background image</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Visual Preview -->
        <div class="relative bg-white rounded-xl border-2 border-secondary-200 overflow-hidden shadow-soft">
          <div class="aspect-video relative bg-neutral-100">
            <div 
              class="absolute inset-0 bg-cover bg-center"
              :style="{ 
                backgroundImage: `url('${bannerStore.currentBackground.value}')`,
                backgroundSize: 'cover',
                backgroundPosition: `center ${bannerStore.currentBackground.cropY || 50}%`
              }"
            ></div>
            <div class="absolute inset-0 border-4 border-secondary-400 border-dashed opacity-50"></div>
            <div class="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
              Preview
            </div>
          </div>
        </div>

        <!-- Vertical Position Control -->
        <div>
          <label class="block text-sm font-semibold text-secondary-800 mb-3">
            Vertical Position: {{ Math.round(bannerStore.currentBackground.cropY || 50) }}%
          </label>
          <input
            type="range"
            :value="bannerStore.currentBackground.cropY || 50"
            @input="updateCrop(50, parseInt(($event.target as HTMLInputElement).value), 1)"
            min="0"
            max="100"
            class="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div class="flex justify-between text-xs text-secondary-600 mt-2">
            <span>⬆️ Top</span>
            <span>🎯 Center</span>
            <span>⬇️ Bottom</span>
          </div>
        </div>

        <!-- Quick Position Presets -->
        <div>
          <label class="block text-sm font-semibold text-secondary-800 mb-3">Quick Positions</label>
          <div class="grid grid-cols-3 gap-3">
            <button
              @click="updateCrop(50, 0, 1)"
              class="p-3 rounded-xl border-2 border-secondary-200 hover:border-secondary-400 hover:bg-secondary-50 transition-all duration-200 text-center text-sm font-medium text-secondary-700 hover:text-secondary-900"
            >
              ⬆️ Top
            </button>
            <button
              @click="updateCrop(50, 50, 1)"
              :class="[
                'p-3 rounded-xl border-2 text-center text-sm font-medium transition-all duration-200',
                (bannerStore.currentBackground.cropY || 50) === 50
                  ? 'border-secondary-400 bg-secondary-100 text-secondary-900 shadow-soft'
                  : 'border-secondary-200 hover:border-secondary-400 hover:bg-secondary-50 text-secondary-700 hover:text-secondary-900'
              ]"
            >
              🎯 Center
            </button>
            <button
              @click="updateCrop(50, 100, 1)"
              class="p-3 rounded-xl border-2 border-secondary-200 hover:border-secondary-400 hover:bg-secondary-50 transition-all duration-200 text-center text-sm font-medium text-secondary-700 hover:text-secondary-900"
            >
              ⬇️ Bottom
            </button>
          </div>
        </div>

        <!-- Reset Button -->
        <div class="pt-4 border-t border-secondary-200">
          <button
            @click="updateCrop(50, 50, 1)"
            class="w-full btn-secondary"
          >
            🔄 Reset to Center
          </button>
        </div>
      </div>
    </div>

    <!-- Current Background Info -->
    <div class="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200 shadow-soft">
      <div class="bg-gradient-to-r from-neutral-100 to-neutral-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-neutral-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-neutral-600 rounded-xl flex items-center justify-center">
            <span class="text-white text-lg">📊</span>
          </div>
          <div>
            <h4 class="font-bold text-neutral-900">Current Background</h4>
            <p class="text-sm text-neutral-600">Active background settings</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-neutral-700">Name:</span>
          <span class="text-sm text-neutral-900 font-medium">{{ bannerStore.currentBackground.name }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-neutral-700">Type:</span>
          <span class="text-sm text-neutral-900 font-medium capitalize">{{ bannerStore.currentBackground.type === 'gradient' ? 'Gradient' : bannerStore.currentBackground.type === 'image' ? 'Image' : bannerStore.currentBackground.type === 'fancy' ? 'Pattern' : 'Solid Color' }}</span>
        </div>
        <div
          v-if="bannerStore.currentBackground.type === 'gradient'"
          class="flex items-center justify-between"
        >
          <span class="text-sm font-semibold text-neutral-700">Colors:</span>
          <div class="flex space-x-1">
            <div
              v-for="color in bannerStore.currentBackground.gradientColors"
              :key="color"
              class="w-6 h-6 rounded-full border-2 border-neutral-300 shadow-soft"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </div>
        <div v-else-if="bannerStore.currentBackground.type === 'solid'" class="flex items-center justify-between">
          <span class="text-sm font-semibold text-neutral-700">Color:</span>
          <div class="flex items-center space-x-2">
            <div
              class="w-6 h-6 rounded-full border-2 border-neutral-300 shadow-soft"
              :style="{ backgroundColor: bannerStore.currentBackground.value }"
            ></div>
            <span class="font-mono text-xs text-neutral-600">{{ bannerStore.currentBackground.value }}</span>
          </div>
        </div>
        <div v-else-if="bannerStore.currentBackground.type === 'image'" class="flex items-center justify-between">
          <span class="text-sm font-semibold text-neutral-700">Source:</span>
          <span class="text-sm text-neutral-900 font-medium">Custom uploaded image</span>
        </div>
      </div>
    </div>

    <!-- Pro Tips -->
    <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft">
      <div class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">💡</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Design Tips</h4>
            <p class="text-sm text-primary-700">Best practices for backgrounds</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-primary-700 text-xs font-bold">1</span>
          </div>
          <div>
            <p class="text-sm font-medium text-primary-900">Use gradients for modern, vibrant designs</p>
            <p class="text-xs text-primary-700">Perfect for tech and creative brands</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-primary-700 text-xs font-bold">2</span>
          </div>
          <div>
            <p class="text-sm font-medium text-primary-900">Solid colors work well for minimalist looks</p>
            <p class="text-xs text-primary-700">Clean and professional appearance</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-primary-700 text-xs font-bold">3</span>
          </div>
          <div>
            <p class="text-sm font-medium text-primary-900">Ensure good contrast with your text</p>
            <p class="text-xs text-primary-700">Dark backgrounds make bright text pop</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<style scoped>
/* Custom slider styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fd7f28, #f97316);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fd7f28, #f97316);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
}

.slider::-moz-range-track {
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
  border: none;
}

.slider:focus {
  outline: none;
  ring: 2px;
  ring-color: #fd7f28;
}
</style> 
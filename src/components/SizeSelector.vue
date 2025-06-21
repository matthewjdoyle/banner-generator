<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBannerStore } from '@/stores/banner'

const bannerStore = useBannerStore()
const selectedCategory = ref('Social Media')
const customWidth = ref(bannerStore.customWidth)
const customHeight = ref(bannerStore.customHeight)
const showCustomInput = ref(false)

const sizesInCategory = computed(() => {
  return bannerStore.bannerSizes.filter(size => size.category === selectedCategory.value)
})

function applyCustomSize() {
  if (customWidth.value > 0 && customHeight.value > 0) {
    bannerStore.setCustomDimensions(customWidth.value, customHeight.value)
    // Select the custom size
    const customSize = bannerStore.bannerSizes.find(size => size.id === 'custom-size')
    if (customSize) {
      bannerStore.selectSize(customSize)
    }
    showCustomInput.value = false
  }
}

function selectSizeHandler(size: { id: string; name: string; width: number; height: number; category: string }) {
  if (size.id === 'custom-size') {
    showCustomInput.value = true
  } else {
    showCustomInput.value = false
  }
  bannerStore.selectSize(size)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-center">
      <div class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
        <span class="text-white text-xl">📐</span>
      </div>
      <h3 class="text-xl font-bold text-neutral-900 font-display">Banner Size</h3>
      <p class="text-sm text-neutral-600 mt-1">Choose the perfect dimensions for your banner</p>
    </div>
    
    <!-- Category Selection -->
    <div>
      <label class="block text-sm font-semibold text-neutral-700 mb-3">Platform Category</label>
      <div class="grid grid-cols-1 gap-2">
        <button
          v-for="category in bannerStore.sizeCategories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'p-3 rounded-xl text-left font-medium transition-all duration-200 border-2',
            selectedCategory === category
              ? 'bg-gradient-accent text-white shadow-medium border-transparent'
              : 'bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Size Selection -->
    <div>
      <label class="block text-sm font-semibold text-neutral-700 mb-3">Available Sizes</label>
      <div class="space-y-3">
        <div
          v-for="size in sizesInCategory"
          :key="size.id"
          @click="selectSizeHandler(size)"
          :class="[
            'group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium relative overflow-hidden',
            bannerStore.currentSize.id === size.id
              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-medium'
              : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
          ]"
        >
          <div class="flex items-center justify-between relative z-10">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <div 
                  :class="[
                    'w-8 h-6 rounded border-2 flex-shrink-0',
                    bannerStore.currentSize.id === size.id
                      ? 'border-primary-400 bg-primary-200'
                      : 'border-neutral-300 bg-neutral-100'
                  ]"
                  :style="{ 
                    aspectRatio: size.width / size.height,
                    maxWidth: '32px'
                  }"
                ></div>
                <div>
                  <h4 class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {{ size.name }}
                  </h4>
                  <p class="text-sm text-neutral-600 font-mono">
                    {{ size.width }} × {{ size.height }}px
                  </p>
                  <p v-if="size.id === 'custom-size'" class="text-xs text-accent-600 font-medium mt-1">
                    ✨ Click to customize
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="bannerStore.currentSize.id === size.id"
              class="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium"
            >
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          
          <!-- Active indicator background -->
          <div 
            v-if="bannerStore.currentSize.id === size.id" 
            class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-50"
          ></div>
        </div>
      </div>
    </div>

    <!-- Custom Dimensions Input -->
    <div v-if="showCustomInput || bannerStore.currentSize.id === 'custom-size'" class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft">
      <div class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-accent-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎯</span>
          </div>
          <div>
            <h4 class="font-bold text-accent-900">Custom Dimensions</h4>
            <p class="text-sm text-accent-700">Set your exact banner size</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-2">Width (px)</label>
          <input
            v-model.number="customWidth"
            type="number"
            min="100"
            max="5000"
            class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white"
            placeholder="1200"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-2">Height (px)</label>
          <input
            v-model.number="customHeight"
            type="number"
            min="100"
            max="5000"
            class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white"
            placeholder="600"
          />
        </div>
      </div>
      
      <div class="flex space-x-3 mb-3">
        <button @click="applyCustomSize" class="btn-accent flex-1">
          ✨ Apply Custom Size
        </button>
        <button 
          v-if="showCustomInput"
          @click="showCustomInput = false" 
          class="btn-secondary"
        >
          Cancel
        </button>
      </div>
      
      <div class="bg-white/50 rounded-xl p-3 border border-accent-200">
        <p class="text-xs text-accent-700 font-medium">
          💡 <strong>Pro Tip:</strong> Common aspect ratios work best - 16:9 (1920×1080), 4:3 (1200×900), 1:1 (1080×1080)
        </p>
      </div>
    </div>

    <!-- Current Selection Info -->
    <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft">
      <div class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">📏</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Current Selection</h4>
            <p class="text-sm text-primary-700">Your active banner dimensions</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/70 rounded-xl p-3 border border-primary-200">
          <p class="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-1">Name</p>
          <p class="font-bold text-primary-900">{{ bannerStore.currentSize.name }}</p>
        </div>
        <div class="bg-white/70 rounded-xl p-3 border border-primary-200">
          <p class="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-1">Dimensions</p>
          <p class="font-bold text-primary-900 font-mono">{{ bannerStore.currentSize.width }} × {{ bannerStore.currentSize.height }}px</p>
        </div>
        <div class="bg-white/70 rounded-xl p-3 border border-primary-200">
          <p class="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-1">Category</p>
          <p class="font-bold text-primary-900">{{ bannerStore.currentSize.category }}</p>
        </div>
        <div class="bg-white/70 rounded-xl p-3 border border-primary-200">
          <p class="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-1">Aspect Ratio</p>
          <p class="font-bold text-primary-900">{{ (bannerStore.currentSize.width / bannerStore.currentSize.height).toFixed(2) }}:1</p>
        </div>
      </div>
    </div>
  </div>
</template> 
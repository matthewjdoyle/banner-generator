<script setup lang="ts">
import { ref } from 'vue'
import { useBannerStore } from '@/stores/banner'

const bannerStore = useBannerStore()
const isGenerating = ref(false)

async function handleRandomize() {
  if (isGenerating.value) return

  isGenerating.value = true

  // Add a small delay for visual feedback
  await new Promise((resolve) => setTimeout(resolve, 300))

  bannerStore.randomizeBanner()

  // Reset the generating state
  setTimeout(() => {
    isGenerating.value = false
  }, 500)
}
</script>

<template>
  <div class="relative">
    <button
      @click="handleRandomize"
      :disabled="isGenerating"
      :class="[
        'group relative w-full text-white font-bold py-4 px-6 rounded-2xl shadow-strong hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden',
        isGenerating
          ? 'bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 cursor-not-allowed opacity-80'
          : 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600',
      ]"
      title="Generate a beautiful random banner with harmonious colors and professional layout"
    >
      <!-- Animated background -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <!-- Content -->
      <div class="relative flex items-center justify-center space-x-3">
        <div
          :class="[
            'text-2xl transition-transform duration-300',
            isGenerating ? 'animate-spin' : 'group-hover:animate-spin',
          ]"
        >
          {{ isGenerating ? '⚡' : '🎲' }}
        </div>
        <div class="text-center">
          <div class="text-lg font-bold">
            {{ isGenerating ? 'Generating...' : 'Randomize Banner' }}
          </div>
          <div class="text-xs opacity-90 font-medium">
            {{ isGenerating ? 'Creating magic ✨' : 'Smart layouts & colors ✨' }}
          </div>
        </div>
      </div>

      <!-- Sparkle effects -->
      <div
        :class="[
          'absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping transition-opacity duration-300',
          isGenerating || 'opacity-0 group-hover:opacity-100',
        ]"
      ></div>
      <div
        :class="[
          'absolute bottom-1 left-1 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping transition-opacity duration-300',
          isGenerating || 'opacity-0 group-hover:opacity-100',
        ]"
        style="animation-delay: 0.5s"
      ></div>
      <div
        :class="[
          'absolute top-3 left-3 w-1 h-1 bg-white rounded-full animate-ping transition-opacity duration-300',
          isGenerating || 'opacity-0 group-hover:opacity-100',
        ]"
        style="animation-delay: 1s"
      ></div>
      <div
        :class="[
          'absolute bottom-3 right-3 w-1 h-1 bg-yellow-400 rounded-full animate-ping transition-opacity duration-300',
          isGenerating || 'opacity-0 group-hover:opacity-100',
        ]"
        style="animation-delay: 1.5s"
      ></div>
    </button>

    <!-- Tooltip -->
    <div
      class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
    >
      <div
        class="bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
      >
        <div class="font-medium">Smart Banner Generator</div>
        <div class="text-neutral-300">Uses color theory for beautiful results</div>
        <div
          class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.group:hover .animate-spin {
  animation: spin 1s linear infinite;
}
</style>

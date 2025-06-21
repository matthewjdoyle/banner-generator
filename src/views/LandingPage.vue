<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBannerStore } from '@/stores/banner'

const router = useRouter()
const bannerStore = useBannerStore()
const currentSlide = ref(0)

// Sample templates for the carousel (we'll expand this)
const featuredTemplates = [
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    description: 'Modern gradient design perfect for technology companies',
    thumbnail: './banner-tech-startup.png',
    category: 'Business',
  },
  {
    id: 'food-lifestyle',
    name: 'Food & Lifestyle',
    description: 'Vibrant food photography background',
    thumbnail: './banner-food.png',
    category: 'Lifestyle',
  },
  {
    id: 'creative-art',
    name: 'Creative Art',
    description: 'Artistic colorful design for creative professionals',
    thumbnail: './banner-art.png',
    category: 'Creative',
  },
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    description: 'Professional personal branding template',
    thumbnail: './banner-personal-brand.png',
    category: 'Personal',
  },
  {
    id: 'nutrition',
    name: 'Health & Nutrition',
    description: 'Clean health-focused design',
    thumbnail: './banner-nutrition.png',
    category: 'Health',
  },
  {
    id: 'quantum',
    name: 'Quantum Tech',
    description: 'Futuristic technology design',
    thumbnail: './banner-quantum.png',
    category: 'Technology',
  },
]

const maxSlides = computed(() => Math.max(0, featuredTemplates.length - 3))

function nextSlide() {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function startFromScratch() {
  // Clear any existing banner data
  bannerStore.clearBanner()
  router.push('/generator')
}

function selectTemplate() {
  // Load the template (we'll implement this when we have actual template data)
  // For now, just navigate to generator
  router.push('/generator')
}

function goToGallery() {
  router.push('/gallery')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/30">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 pt-20 pb-16">
      <!-- Main Heading -->
      <div class="text-center mb-16">
        <h1 class="text-4xl lg:text-6xl font-bold text-gradient mb-6 font-display leading-tight">
          Create Stunning Banners
          <br />
          <span class="text-neutral-800">In Minutes</span>
        </h1>
        <p class="text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Design professional banners for social media, websites, and marketing campaigns with our
          intuitive drag-and-drop editor.
        </p>
      </div>

      <!-- Main Options -->
      <div class="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <!-- Option 1: Start from Scratch -->
        <div
          class="bg-white rounded-xl lg:rounded-2xl shadow-strong border border-neutral-200 overflow-hidden hover:shadow-massive transition-all duration-500 group"
        >
          <div
            class="bg-gradient-to-br from-primary-50 to-primary-100 p-6 lg:p-8 border-b border-primary-200"
          >
            <div
              class="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium"
            >
              <span class="text-white text-2xl lg:text-3xl">✨</span>
            </div>
            <h2 class="text-xl lg:text-2xl font-bold text-primary-900 mb-3 font-display">
              Start from Scratch
            </h2>
            <p class="text-primary-700 text-base leading-relaxed">
              Begin with a blank canvas and let your creativity flow.
            </p>
          </div>

          <div class="p-6 lg:p-8">
            <div class="space-y-3 mb-6">
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Complete creative freedom</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Drag & drop editor</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Professional tools</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Custom sizes & formats</span>
              </div>
            </div>

            <button
              @click="startFromScratch"
              class="w-full btn-primary text-base py-3 group-hover:shadow-strong transition-all duration-300"
            >
              <span class="flex items-center justify-center space-x-2">
                <span>Start Creating</span>
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- Option 2: Choose Template -->
        <div
          class="bg-white rounded-xl lg:rounded-2xl shadow-strong border border-neutral-200 overflow-hidden hover:shadow-massive transition-all duration-500 group"
        >
          <div
            class="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 lg:p-8 border-b border-secondary-200"
          >
            <div
              class="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium"
            >
              <span class="text-white text-2xl lg:text-3xl">🎨</span>
            </div>
            <h2 class="text-xl lg:text-2xl font-bold text-secondary-900 mb-3 font-display">
              Choose a Template
            </h2>
            <p class="text-secondary-700 text-base leading-relaxed">
              Get started quickly with pre-made templates. Customize colours, text, and images to
              match your brand.
            </p>
          </div>

          <div class="p-6 lg:p-8">
            <div class="space-y-3 mb-6">
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-secondary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Professional designs</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-secondary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Quick customization</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-secondary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Industry-specific options</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-secondary-500 rounded-full"></div>
                <span class="text-neutral-700 text-sm">Ready-to-use layouts</span>
              </div>
            </div>

            <button
              @click="goToGallery"
              class="w-full btn-secondary text-base py-3 group-hover:shadow-strong transition-all duration-300"
            >
              <span class="flex items-center justify-center space-x-2">
                <span>Browse Templates</span>
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Templates Carousel -->
    <div class="bg-white/50 backdrop-blur-sm border-y border-neutral-200 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 font-display">
            Featured Templates
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Use as a starting point for your own design.
          </p>
        </div>

        <!-- Carousel Container -->
        <div class="relative max-w-6xl mx-auto">
          <!-- Previous Button -->
          <button
            @click="prevSlide"
            :disabled="currentSlide === 0"
            :class="[
              'absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-medium transition-all duration-200',
              currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110',
            ]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Next Button -->
          <button
            @click="nextSlide"
            :disabled="currentSlide >= maxSlides"
            :class="[
              'absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-medium transition-all duration-200',
              currentSlide >= maxSlides ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110',
            ]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <!-- Carousel Content -->
          <div class="overflow-hidden mx-8 sm:mx-16">
            <div
              class="flex transition-transform duration-500 ease-out"
              :style="{ transform: `translateX(-${currentSlide * 33.333}%)` }"
            >
              <div
                v-for="template in featuredTemplates"
                :key="template.id"
                class="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
              >
                <div
                  @click="selectTemplate()"
                  class="group bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden hover:shadow-medium transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <!-- Template Preview -->
                  <div class="aspect-[3/1] bg-neutral-100 overflow-hidden rounded-t-xl">
                    <img
                      :src="template.thumbnail"
                      :alt="template.name"
                      class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <!-- Template Info -->
                  <div class="p-4">
                    <div class="mt-3 flex items-center justify-between">
                      <span class="text-xs text-neutral-500">Click to customize</span>
                      <svg
                        class="w-4 h-4 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Indicators -->
          <div class="flex items-center justify-center space-x-2 mt-8">
            <div
              v-for="i in maxSlides + 1"
              :key="i"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-200',
                currentSlide === i - 1
                  ? 'bg-primary-500 w-8'
                  : 'bg-neutral-300 hover:bg-neutral-400',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Features Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 font-display">
          Everything You Need
        </h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
          Powerful tools and features to create professional banners without design experience
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium"
          >
            <span class="text-white text-2xl">🎨</span>
          </div>
          <h3 class="font-bold text-neutral-900 mb-2">Drag & Drop</h3>
          <p class="text-neutral-600 text-sm">Intuitive interface for easy design</p>
        </div>

        <div class="text-center group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium"
          >
            <span class="text-white text-2xl">📐</span>
          </div>
          <h3 class="font-bold text-neutral-900 mb-2">All Sizes</h3>
          <p class="text-neutral-600 text-sm">Social media, web, print formats</p>
        </div>

        <div class="text-center group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium"
          >
            <span class="text-white text-2xl">🎲</span>
          </div>
          <h3 class="font-bold text-neutral-900 mb-2">Randomize!</h3>
          <p class="text-neutral-600 text-sm">
            Randomize the colours, fonts, and images to create a unique design.
          </p>
        </div>

        <div class="text-center group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium"
          >
            <span class="text-white text-2xl">💾</span>
          </div>
          <h3 class="font-bold text-neutral-900 mb-2">Export Ready</h3>
          <p class="text-neutral-600 text-sm">High-quality PNG and JPG files</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4 font-display">
          Ready to Create Amazing Banners?
        </h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Give it a go, it's free!</p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button
            @click="startFromScratch"
            class="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-neutral-50 hover:shadow-medium transition-all duration-300 hover:scale-105"
          >
            Start Creating Now
          </button>
          <button
            @click="goToGallery"
            class="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105"
          >
            Browse Templates
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

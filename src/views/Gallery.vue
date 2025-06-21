<script lang="ts" name="BannerGallery">
export default {
  name: 'BannerGallery',
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { bannerTemplates, type BannerTemplate } from '@/stores/templates'
import { useBannerStore } from '@/stores/banner'

const router = useRouter()
const bannerStore = useBannerStore()

function useTemplate(template: BannerTemplate) {
  // Load the template into the banner store
  bannerStore.loadTemplate(template)

  // Navigate to the banner generator
  router.push('/')
}

// Get preview image URL for template
function getPreviewImage(template: BannerTemplate) {
  const imageMap: { [key: string]: string } = {
    'tech-startup': 'banner-tech-startup.png',
    'creative-agency': 'banner-creative.png',
    'personal-brand': 'banner-personal-brand.png',
    'ecommerce-store': 'banner-sale.png',
    'fitness-coach': 'banner-nutrition.png',
    'food-blog': 'banner-food.png',
    'quantum-physics': 'banner-quantum.png',
    'abstract-art': 'banner-art.png',
    'music-producer': 'banner-producer.png',
  }

  const imageName = imageMap[template.id] || 'banner-tech-startup.png'
  return import.meta.env.BASE_URL + imageName
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Templates Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="template in bannerTemplates" :key="template.id" class="group">
        <div
          @click="useTemplate(template)"
          class="bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col cursor-pointer"
        >
          <!-- Template Preview -->
          <div class="relative overflow-hidden">
            <div class="w-full relative bg-gray-100 h-40 flex items-center justify-center">
              <!-- PNG Preview Image with fixed container height -->
              <img
                :src="getPreviewImage(template)"
                :alt="`${template.name} template preview`"
                class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <!-- Template Info -->
          <div class="p-4 flex-1 flex flex-col">
            <div class="mb-3 flex-1">
              <h3
                class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors text-center"
              >
                {{ template.name }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <div class="border-t border-gray-200 my-8"></div>
    </div>

    <!-- Features Section -->
    <div class="mt-12 grid md:grid-cols-3 gap-6">
      <div class="text-center p-4">
        <div
          class="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-medium"
        >
          <span class="text-white text-xl">⚡</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Instant Customisation</h3>
        <p class="text-gray-600 text-sm">
          Every template is fully customisable. Change colours, fonts, text, and layout with just a
          few clicks.
        </p>
      </div>
      <div class="text-center p-4">
        <div
          class="w-12 h-12 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-medium"
        >
          <span class="text-white text-xl">🎯</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Perfect Sizing</h3>
        <p class="text-gray-600 text-sm">
          Templates optimized for all major platforms including social media, web, and print
          formats.
        </p>
      </div>
      <div class="text-center p-4">
        <div
          class="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-medium"
        >
          <span class="text-white text-xl">💎</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-3">FREE</h3>
        <a
          href="https://ko-fi.com/matthewjdoyle"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block hover:scale-105 transition-transform duration-200"
        >
          <img
            src="/support-me-on-ko-fi.png"
            alt="Support me on Ko-fi"
            class="h-10 mx-auto rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-200"
          />
        </a>
      </div>
    </div>
  </div>
</template>

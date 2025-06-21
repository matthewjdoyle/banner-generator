<script setup lang="ts">
import { ref } from 'vue'
import { useBannerStore } from '@/stores/banner'
import BannerCanvas from '@/components/BannerCanvas.vue'
import SizeSelector from '@/components/SizeSelector.vue'
import BackgroundSelector from '@/components/BackgroundSelector.vue'
import TextControls from '@/components/TextControls.vue'
import ImageControls from '@/components/ImageControls.vue'
import IconControls from '@/components/IconControls.vue'
import ExportControls from '@/components/ExportControls.vue'
import UndoRedoControls from '@/components/UndoRedoControls.vue'
import RandomizerButton from '@/components/RandomizerButton.vue'

const bannerStore = useBannerStore()
const activeTab = ref('size')

const tabs = [
  { id: 'size', name: 'Size & Layout', icon: '📐' },
  { id: 'background', name: 'Background', icon: '🎨' },
  { id: 'text', name: 'Text', icon: '📝' },
  { id: 'icons', name: 'Icons', icon: '⭐' },
  { id: 'images', name: 'Images', icon: '🖼️' },
  { id: 'export', name: 'Export', icon: '💾' },
]
</script>

<template>
  <div class="h-full bg-gradient-to-br from-neutral-50 to-primary-50/30">
    <!-- Main Content -->
    <div class="h-full px-2 sm:px-4">
      <!-- Mobile: Canvas first, then controls -->
      <!-- Desktop: Side-by-side layout -->
      <div class="h-full flex flex-col lg:grid lg:grid-cols-4 gap-3 sm:gap-6 py-2 sm:py-4">
        <!-- Canvas Area - Sticky positioning for both mobile and desktop -->
        <div class="order-1 lg:order-2 lg:col-span-3 flex-1 lg:h-full">
          <!-- Sticky Container -->
          <div class="sticky top-2 lg:top-4 z-10">
            <div
              class="bg-white rounded-xl lg:rounded-2xl shadow-strong border border-neutral-200 overflow-hidden"
              style="height: calc(100vh - 6rem); max-height: 800px; min-height: 400px"
            >
              <!-- Canvas Header -->
              <div
                class="bg-gradient-to-r from-neutral-50 to-neutral-100/50 border-b border-neutral-200 p-3 sm:p-6 flex-shrink-0"
              >
                <div
                  class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0"
                >
                  <div class="flex items-center space-x-3 sm:space-x-4">
                    <div
                      class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-medium bg-white border border-primary-200"
                    >
                      <svg
                        class="w-6 h-6 sm:w-8 sm:h-8"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <path
                            id="ellipsePath2"
                            d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z"
                          />
                        </defs>
                        <g transform="rotate(45 50 50)">
                          <ellipse
                            cx="50"
                            cy="50"
                            rx="40"
                            ry="25"
                            stroke="#9B5DE5"
                            stroke-width="6"
                          />
                          <!-- Central Diamond Dots -->
                          <circle cx="43" cy="50" r="7" fill="#9B5DE5" />
                          <circle cx="50" cy="43" r="7" fill="#05e68c" />
                          <circle cx="57" cy="50" r="7" fill="#9B5DE5" />
                          <circle cx="50" cy="57" r="7" fill="#05e68c" />

                          <!-- Outer Extrema Dots with Animation along path -->
                          <circle r="5" fill="#fde725">
                            <animateMotion
                              dur="20.4s"
                              repeatCount="indefinite"
                              keyPoints="0;0;0.5;0.5;0;0"
                              keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                            >
                              <mpath href="#ellipsePath2" />
                            </animateMotion>
                          </circle>
                          <circle r="5" fill="#fde725">
                            <animateMotion
                              dur="20.4s"
                              repeatCount="indefinite"
                              keyPoints="0.5;0.5;1;1;0.5;0.5"
                              keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                            >
                              <mpath href="#ellipsePath2" />
                            </animateMotion>
                          </circle>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <h2 class="text-lg sm:text-xl font-bold text-neutral-900 font-display">
                        Canvas Preview
                      </h2>
                      <p class="text-xs sm:text-sm text-neutral-600">Design your banner below</p>
                    </div>
                  </div>
                  <div
                    class="flex items-center space-x-3 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-end"
                  >
                    <UndoRedoControls />
                    <div
                      class="bg-white rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-soft border border-neutral-200"
                    >
                      <div class="text-xs sm:text-sm font-semibold text-neutral-900">
                        {{ bannerStore.currentSize.name }}
                      </div>
                      <div class="text-xs text-neutral-500 font-mono">
                        {{ bannerStore.currentSize.width }} × {{ bannerStore.currentSize.height }}px
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Canvas Container -->
              <div
                class="bg-gradient-to-br from-neutral-50 to-neutral-100"
                style="height: calc(100% - 120px)"
              >
                <BannerCanvas />
              </div>
            </div>
          </div>
        </div>

        <!-- Controls Panel - Scrollable content area -->
        <div class="order-2 lg:order-1 lg:col-span-1 flex flex-col">
          <!-- Randomizer Button - Also sticky on mobile -->
          <div class="sticky top-2 lg:relative lg:top-auto z-20 mb-3 sm:mb-6 flex-shrink-0">
            <RandomizerButton />
          </div>

          <!-- Controls Panel - Scrollable -->
          <div
            class="bg-white rounded-xl lg:rounded-2xl shadow-strong border border-neutral-200 flex-1 overflow-hidden flex flex-col"
            style="min-height: calc(100vh - 10rem)"
          >
            <!-- Tab Navigation - Sticky within controls -->
            <div
              class="bg-gradient-to-br from-primary-100 to-accent-100 border-b border-primary-200 p-2 sm:p-3 shadow-soft flex-shrink-0 sticky top-0 z-10"
            >
              <!-- Horizontal Icon Buttons -->
              <div class="flex justify-center space-x-1 mb-3">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 relative overflow-hidden',
                    activeTab === tab.id
                      ? 'bg-gradient-primary text-white shadow-medium scale-105'
                      : 'text-primary-800 hover:text-primary-900 hover:bg-white/80 hover:shadow-medium bg-white/60 border border-white/50 hover:scale-105',
                  ]"
                >
                  <span
                    :class="[
                      'transition-all duration-300',
                      activeTab === tab.id ? 'scale-110' : 'hover:scale-110',
                    ]"
                    >{{ tab.icon }}</span
                  >

                  <!-- Active indicator -->
                  <div
                    v-if="activeTab === tab.id"
                    class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50 rounded-lg"
                  ></div>
                </button>
              </div>

              <!-- Active Tab Name -->
              <div class="text-center">
                <h3 class="text-lg font-bold text-primary-900 font-display">
                  {{ tabs.find((tab) => tab.id === activeTab)?.name || 'Controls' }}
                </h3>
              </div>
            </div>

            <!-- Tab Content - Scrollable -->
            <div class="overflow-y-auto bg-white flex-1 min-h-0">
              <div class="p-4 sm:p-6 pb-20">
                <SizeSelector v-if="activeTab === 'size'" />
                <BackgroundSelector v-if="activeTab === 'background'" />
                <TextControls v-if="activeTab === 'text'" />
                <ImageControls v-if="activeTab === 'images'" />
                <IconControls v-if="activeTab === 'icons'" />
                <ExportControls v-if="activeTab === 'export'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for mobile tab navigation */
.scrollbar-hide {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

/* Improve touch targets on mobile */
@media (max-width: 1024px) {
  button {
    min-height: 44px; /* iOS/Android recommended minimum touch target */
  }
}

/* Better spacing for very small screens */
@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>

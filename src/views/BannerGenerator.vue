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
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 pt-16">
    <!-- Main Content -->
    <div class="container mx-auto px-2 sm:px-4 pb-4 sm:pb-8">
      <!-- Mobile: Canvas first, then controls -->
      <!-- Desktop: Side-by-side layout -->
      <div class="flex flex-col lg:grid lg:grid-cols-4 gap-3 sm:gap-6">
        <!-- Canvas Area - Appears first on mobile, third column on desktop -->
        <div class="order-1 lg:order-2 lg:col-span-3">
          <div
            class="bg-white rounded-xl lg:rounded-2xl shadow-strong border border-neutral-200 overflow-hidden"
          >
            <!-- Canvas Header -->
            <div
              class="bg-gradient-to-r from-neutral-50 to-neutral-100/50 border-b border-neutral-200 p-3 sm:p-6"
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
              :style="{
                height: 'calc(50vh - 100px)',
                minHeight: '300px',
              }"
              class="sm:h-[calc(60vh-200px)] lg:h-[calc(100vh-300px)] sm:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-neutral-50 to-neutral-100"
            >
              <BannerCanvas />
            </div>
          </div>
        </div>

        <!-- Controls Panel - Appears second on mobile, first column on desktop -->
        <div class="order-2 lg:order-1 lg:col-span-1">
          <!-- Randomizer Button -->
          <div class="mb-3 sm:mb-6">
            <RandomizerButton />
          </div>

          <div
            class="bg-white rounded-xl lg:rounded-2xl shadow-strong border border-neutral-200 lg:sticky lg:top-20 max-h-none lg:max-h-[calc(100vh-100px)] overflow-hidden"
          >
            <!-- Tab Navigation -->
            <div
              class="bg-gradient-to-br from-primary-100 to-accent-100 border-b border-primary-200 p-3 sm:p-4 shadow-soft"
            >
              <!-- Mobile: Horizontal scrolling tabs -->
              <div class="lg:hidden">
                <div class="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap min-w-fit',
                      activeTab === tab.id
                        ? 'bg-gradient-primary text-white shadow-medium'
                        : 'text-primary-800 hover:text-primary-900 hover:bg-white/80 hover:shadow-medium bg-white/60 border border-white/50',
                    ]"
                  >
                    <span class="text-lg">{{ tab.icon }}</span>
                    <span class="text-xs">{{ tab.name.split(' ')[0] }}</span>
                  </button>
                </div>
              </div>

              <!-- Desktop: Grid layout -->
              <div class="hidden lg:grid lg:grid-cols-1 gap-2">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'flex items-center justify-start space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden',
                    activeTab === tab.id
                      ? 'bg-gradient-primary text-white shadow-medium'
                      : 'text-primary-800 hover:text-primary-900 hover:bg-white/80 hover:shadow-medium bg-white/60 border border-white/50',
                  ]"
                >
                  <span
                    :class="[
                      'text-xl transition-all duration-300',
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110',
                    ]"
                    >{{ tab.icon }}</span
                  >
                  <span>{{ tab.name }}</span>

                  <!-- Active indicator -->
                  <div
                    v-if="activeTab === tab.id"
                    class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50"
                  ></div>
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div
              class="overflow-y-auto bg-white max-h-[50vh] lg:max-h-none lg:h-[calc(100vh-280px)] lg:min-h-[400px]"
            >
              <div class="p-4 sm:p-6">
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

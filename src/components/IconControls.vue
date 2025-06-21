<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBannerStore } from '@/stores/banner'
import type { BannerIcon } from '@/stores/banner'

const bannerStore = useBannerStore()
const selectedIconId = ref<string | null>(null)
const selectedCategory = ref('All')

const iconCategories = computed(() => {
  const categories = ['All', ...new Set(bannerStore.availableIcons.map(icon => icon.category))]
  return categories
})

const filteredIcons = computed(() => {
  if (selectedCategory.value === 'All') {
    return bannerStore.availableIcons
  }
  return bannerStore.availableIcons.filter(icon => icon.category === selectedCategory.value)
})

const selectedIcon = computed(() => {
  if (!selectedIconId.value) return null
  return bannerStore.icons.find(icon => icon.id === selectedIconId.value) || null
})

function addIcon(iconType: string) {
  bannerStore.addIcon(iconType)
}

function updateIcon(updates: Partial<BannerIcon>) {
  if (selectedIconId.value) {
    bannerStore.updateIcon(selectedIconId.value, updates)
  }
}

function removeSelectedIcon() {
  if (selectedIconId.value) {
    bannerStore.removeIcon(selectedIconId.value)
    selectedIconId.value = null
  }
}

function selectIcon(iconId: string) {
  selectedIconId.value = iconId
}

function duplicateIcon() {
  if (selectedIcon.value) {
    const newIcon = {
      ...selectedIcon.value,
      x: selectedIcon.value.x + 20,
      y: selectedIcon.value.y + 20
    }
    bannerStore.addIcon(newIcon.type)
    // Update the newly created icon with the duplicated properties
    const newestIcon = bannerStore.icons[bannerStore.icons.length - 1]
    bannerStore.updateIcon(newestIcon.id, newIcon)
  }
}

// Gradient presets
const gradientPresets = [
  { name: 'Blue Ocean', colors: ['#3B82F6', '#1E40AF'], direction: 45 },
  { name: 'Purple Dream', colors: ['#8B5CF6', '#5B21B6'], direction: 135 },
  { name: 'Sunset', colors: ['#F59E0B', '#EF4444'], direction: 90 },
  { name: 'Forest', colors: ['#10B981', '#059669'], direction: 180 },
  { name: 'Fire', colors: ['#EF4444', '#DC2626'], direction: 45 },
  { name: 'Ocean', colors: ['#0EA5E9', '#0284C7'], direction: 135 }
]

function applyGradientPreset(preset: { name: string; colors: string[]; direction: number }) {
  updateIcon({
    colorType: 'gradient',
    gradientColors: preset.colors,
    gradientDirection: preset.direction
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-center">
      <div class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-3 shadow-medium">
        <span class="text-white text-xl">⭐</span>
      </div>
      <h3 class="text-xl font-bold text-neutral-900 font-display">Icons & Shapes</h3>
      <p class="text-sm text-neutral-600 mt-1">Add visual elements to enhance your banner</p>
    </div>
    
    <!-- Category Filter -->
    <div class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft">
      <div class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-accent-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎯</span>
          </div>
          <div>
            <h4 class="font-bold text-accent-900">Browse Icons</h4>
            <p class="text-sm text-accent-700">Choose from various categories</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-2">Category</label>
          <select v-model="selectedCategory" class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-medium">
            <option v-for="category in iconCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Icon Grid -->
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-3">Available Icons ({{ filteredIcons.length }})</label>
          <div class="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto bg-white rounded-xl p-3 border border-accent-200">
            <button
              v-for="icon in filteredIcons"
              :key="icon.id"
              @click="addIcon(icon.id)"
              class="group aspect-square p-2 border-2 border-neutral-200 rounded-xl hover:border-accent-400 hover:bg-accent-50 transition-all duration-300 flex items-center justify-center hover:shadow-medium"
              :title="icon.name"
            >
              <!-- SVG Shape Preview -->
              <svg 
                v-if="icon.svg.startsWith('svg-') || ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'pentagon', 'star', 'heart', 'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'plus', 'cross', 'check'].includes(icon.svg)"
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                class="text-neutral-600 group-hover:text-accent-600 transition-colors duration-300"
              >
                <!-- Circle -->
                <circle v-if="icon.svg === 'circle'" cx="12" cy="12" r="8"/>
                
                <!-- Square -->
                <rect v-else-if="icon.svg === 'square'" x="4" y="4" width="16" height="16"/>
                
                <!-- Triangle -->
                <polygon v-else-if="icon.svg === 'triangle'" points="12,4 20,20 4,20"/>
                
                <!-- Diamond -->
                <polygon v-else-if="icon.svg === 'diamond'" points="12,2 22,12 12,22 2,12"/>
                
                <!-- Hexagon -->
                <polygon v-else-if="icon.svg === 'hexagon'" points="17.5,5.5 17.5,18.5 12,22 6.5,18.5 6.5,5.5 12,2"/>
                
                <!-- Pentagon -->
                <polygon v-else-if="icon.svg === 'pentagon'" points="12,2 22,9 18,20 6,20 2,9"/>
                
                <!-- Star -->
                <polygon v-else-if="icon.svg === 'star'" points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9"/>
                
                <!-- Heart -->
                <path v-else-if="icon.svg === 'heart'" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
                
                <!-- Arrow Right -->
                <path v-else-if="icon.svg === 'arrow-right'" d="M8,5v3h8l-3-3 1.5-1.5L20,9l-5.5,5.5L13,13l3-3H8v3l-3-3L8,5z"/>
                
                <!-- Arrow Left -->
                <path v-else-if="icon.svg === 'arrow-left'" d="M16,19v-3H8l3,3-1.5,1.5L4,15l5.5-5.5L11,11l-3,3h8v-3l3,3L16,19z"/>
                
                <!-- Arrow Up -->
                <path v-else-if="icon.svg === 'arrow-up'" d="M19,16h-3v-8l3,3 1.5-1.5L15,4 9.5,9.5 11,11l3-3v8H11l3,3L19,16z"/>
                
                <!-- Arrow Down -->
                <path v-else-if="icon.svg === 'arrow-down'" d="M5,8h3v8l-3-3-1.5,1.5L9,20l5.5-5.5L13,13l-3,3V8h3l-3-3L5,8z"/>
                
                <!-- Plus -->
                <path v-else-if="icon.svg === 'plus'" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
                
                <!-- Cross -->
                <path v-else-if="icon.svg === 'cross'" d="M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12 19,6.41z"/>
                
                <!-- Check -->
                <path v-else-if="icon.svg === 'check'" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"/>
              </svg>
              
              <!-- Emoji/Unicode Character -->
              <span v-else class="text-lg group-hover:scale-110 transition-transform duration-300">{{ icon.svg }}</span>
            </button>
          </div>
          <p class="text-xs text-accent-700 mt-2 text-center">Click any icon to add it to your banner</p>
        </div>
      </div>
    </div>

    <!-- Current Icons List -->
    <div v-if="bannerStore.icons.length > 0">
      <label class="block text-sm font-semibold text-neutral-700 mb-3">Icons on Banner</label>
      <div class="space-y-3 max-h-48 overflow-y-auto">
        <div
          v-for="icon in bannerStore.icons"
          :key="icon.id"
          @click="selectIcon(icon.id)"
          :class="[
            'group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium relative overflow-hidden',
            selectedIconId === icon.id
              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-medium'
              : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
          ]"
        >
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center">
                <!-- SVG Shape Preview for current icons -->
                <svg 
                  v-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg?.startsWith('svg-') || ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'pentagon', 'star', 'heart', 'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'plus', 'cross', 'check'].includes(bannerStore.availableIcons.find(i => i.id === icon.type)?.svg || '')"
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  class="text-neutral-600"
                >
                  <!-- Circle -->
                  <circle v-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'circle'" cx="12" cy="12" r="8"/>
                  
                  <!-- Square -->
                  <rect v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'square'" x="4" y="4" width="16" height="16"/>
                  
                  <!-- Triangle -->
                  <polygon v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'triangle'" points="12,4 20,20 4,20"/>
                  
                  <!-- Diamond -->
                  <polygon v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'diamond'" points="12,2 22,12 12,22 2,12"/>
                  
                  <!-- Hexagon -->
                  <polygon v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'hexagon'" points="17.5,5.5 17.5,18.5 12,22 6.5,18.5 6.5,5.5 12,2"/>
                  
                  <!-- Pentagon -->
                  <polygon v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'pentagon'" points="12,2 22,9 18,20 6,20 2,9"/>
                  
                  <!-- Star -->
                  <polygon v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'star'" points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9"/>
                  
                  <!-- Heart -->
                  <path v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'heart'" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
                  
                  <!-- Plus -->
                  <path v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'plus'" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
                  
                  <!-- Cross -->
                  <path v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'cross'" d="M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12 19,6.41z"/>
                  
                  <!-- Check -->
                  <path v-else-if="bannerStore.availableIcons.find(i => i.id === icon.type)?.svg === 'check'" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"/>
                </svg>
                
                <!-- Emoji/Unicode Character -->
                <span v-else class="text-lg">{{ bannerStore.availableIcons.find(i => i.id === icon.type)?.svg }}</span>
              </div>
              <div>
                <p class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {{ bannerStore.availableIcons.find(i => i.id === icon.type)?.name || 'Icon' }}
                </p>
                <div class="flex items-center space-x-2 text-sm text-neutral-600 mt-1">
                  <span>{{ icon.size }}px</span>
                  <span>•</span>
                  <span v-if="icon.colorType === 'gradient'" class="text-accent-600 font-medium">Gradient</span>
                  <span v-else class="font-mono text-xs">{{ icon.color }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="selectedIconId === icon.id"
              class="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium"
            >
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          
          <!-- Active indicator background -->
          <div 
            v-if="selectedIconId === icon.id" 
            class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-50"
          ></div>
        </div>
      </div>
    </div>

    <!-- Icon Customization -->
    <div v-if="selectedIcon" class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft">
      <div class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-6 p-6 rounded-t-2xl border-b border-primary-300/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
            <span class="text-white text-lg">🎨</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Customize Icon</h4>
            <p class="text-sm text-primary-700">Edit the selected icon properties</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Color Type -->
        <div>
          <label class="block text-sm font-semibold text-primary-800 mb-3">Color Type</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="updateIcon({ colorType: 'solid' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                (selectedIcon.colorType || 'solid') === 'solid'
                  ? 'bg-gradient-primary text-white shadow-medium'
                  : 'bg-white text-primary-700 border-2 border-primary-200 hover:border-primary-300'
              ]"
            >
              <span>⚪</span>
              <span>Solid</span>
            </button>
            <button
              @click="updateIcon({ colorType: 'gradient' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                selectedIcon.colorType === 'gradient'
                  ? 'bg-gradient-primary text-white shadow-medium'
                  : 'bg-white text-primary-700 border-2 border-primary-200 hover:border-primary-300'
              ]"
            >
              <span>🌈</span>
              <span>Gradient</span>
            </button>
          </div>
        </div>

        <!-- Solid Color -->
        <div v-if="(selectedIcon.colorType || 'solid') === 'solid'">
          <label class="block text-sm font-semibold text-primary-800 mb-2">Icon Color</label>
          <div class="flex space-x-3">
            <input
              type="color"
              :value="selectedIcon.color"
              @input="updateIcon({ color: ($event.target as HTMLInputElement).value })"
              class="w-16 h-12 border-2 border-primary-200 rounded-xl cursor-pointer shadow-soft"
            />
            <input
              type="text"
              :value="selectedIcon.color"
              @input="updateIcon({ color: ($event.target as HTMLInputElement).value })"
              class="flex-1 px-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-mono"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <!-- Gradient Colors -->
        <div v-if="selectedIcon.colorType === 'gradient'">
          <label class="block text-sm font-semibold text-primary-800 mb-3">Gradient Colors</label>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-primary-700 mb-2">Start Color</label>
                <input
                  type="color"
                  :value="selectedIcon.gradientColors?.[0] || '#3B82F6'"
                  @input="updateIcon({ gradientColors: [($event.target as HTMLInputElement).value, selectedIcon.gradientColors?.[1] || '#1E40AF'] })"
                  class="w-full h-12 border-2 border-primary-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-primary-700 mb-2">End Color</label>
                <input
                  type="color"
                  :value="selectedIcon.gradientColors?.[1] || '#1E40AF'"
                  @input="updateIcon({ gradientColors: [selectedIcon.gradientColors?.[0] || '#3B82F6', ($event.target as HTMLInputElement).value] })"
                  class="w-full h-12 border-2 border-primary-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-xs font-medium text-primary-700 mb-2">Direction: {{ selectedIcon.gradientDirection || 45 }}°</label>
              <input
                type="range"
                :value="selectedIcon.gradientDirection || 45"
                @input="updateIcon({ gradientDirection: parseInt(($event.target as HTMLInputElement).value) })"
                min="0"
                max="360"
                class="w-full"
              />
            </div>

            <!-- Gradient Presets -->
            <div>
              <label class="block text-xs font-medium text-primary-700 mb-2">Quick Presets</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="preset in gradientPresets"
                  :key="preset.name"
                  @click="applyGradientPreset(preset)"
                  class="p-3 rounded-xl text-xs font-medium text-white shadow-soft hover:shadow-medium transition-all duration-200 border-2 border-white/20"
                  :style="`background: linear-gradient(${preset.direction}deg, ${preset.colors[0]}, ${preset.colors[1]})`"
                >
                  {{ preset.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Size -->
        <div>
          <label class="block text-sm font-semibold text-primary-800 mb-2">Size: {{ selectedIcon.size }}px</label>
          <input
            type="range"
            :value="selectedIcon.size"
            @input="updateIcon({ size: parseInt(($event.target as HTMLInputElement).value) })"
            min="16"
            max="1000"
            class="w-full"
          />
        </div>

        <!-- Position Controls -->
        <div>
          <label class="block text-sm font-semibold text-primary-800 mb-2">Position</label>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-primary-700 mb-1">X: {{ selectedIcon.x }}px</label>
              <input
                type="range"
                :value="selectedIcon.x"
                @input="updateIcon({ x: parseInt(($event.target as HTMLInputElement).value) })"
                min="0"
                :max="bannerStore.currentSize.width - selectedIcon.size"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-primary-700 mb-1">Y: {{ selectedIcon.y }}px</label>
              <input
                type="range"
                :value="selectedIcon.y"
                @input="updateIcon({ y: parseInt(($event.target as HTMLInputElement).value) })"
                min="0"
                :max="bannerStore.currentSize.height - selectedIcon.size"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <!-- Rotation and Opacity -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-primary-700 mb-1">Rotation: {{ selectedIcon.rotation || 0 }}°</label>
            <input
              type="range"
              :value="selectedIcon.rotation || 0"
              @input="updateIcon({ rotation: parseInt(($event.target as HTMLInputElement).value) })"
              min="0"
              max="360"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-primary-700 mb-1">Opacity: {{ Math.round((selectedIcon.opacity || 1) * 100) }}%</label>
            <input
              type="range"
              :value="selectedIcon.opacity || 1"
              @input="updateIcon({ opacity: parseFloat(($event.target as HTMLInputElement).value) })"
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
          </div>
        </div>

        <!-- Flip Controls -->
        <div>
          <label class="block text-sm font-semibold text-primary-800 mb-3">Flip</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="updateIcon({ flipX: !selectedIcon.flipX })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                selectedIcon.flipX
                  ? 'bg-gradient-primary text-white shadow-medium'
                  : 'bg-white text-primary-700 border-2 border-primary-200 hover:border-primary-300'
              ]"
            >
              <span>↔️</span>
              <span>Flip X</span>
            </button>
            <button
              @click="updateIcon({ flipY: !selectedIcon.flipY })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                selectedIcon.flipY
                  ? 'bg-gradient-primary text-white shadow-medium'
                  : 'bg-white text-primary-700 border-2 border-primary-200 hover:border-primary-300'
              ]"
            >
              <span>↕️</span>
              <span>Flip Y</span>
            </button>
          </div>
        </div>

        <!-- Shadow Effects -->
        <div>
          <label class="block text-sm font-semibold text-primary-800 mb-3">Shadow Effects</label>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-primary-700">Enable Shadow</span>
              <button
                @click="updateIcon({ shadow: { ...selectedIcon.shadow, enabled: !selectedIcon.shadow.enabled } })"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  selectedIcon.shadow.enabled ? 'bg-gradient-primary' : 'bg-neutral-300'
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                    selectedIcon.shadow.enabled ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
            </div>
            
            <div v-if="selectedIcon.shadow.enabled" class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-primary-700 mb-1">Shadow Color</label>
                <input
                  type="color"
                  :value="selectedIcon.shadow.color"
                  @input="updateIcon({ shadow: { ...selectedIcon.shadow, color: ($event.target as HTMLInputElement).value } })"
                  class="w-full h-10 border-2 border-primary-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>
              
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-medium text-primary-700 mb-1">Blur: {{ selectedIcon.shadow.blur }}px</label>
                  <input
                    type="range"
                    :value="selectedIcon.shadow.blur"
                    @input="updateIcon({ shadow: { ...selectedIcon.shadow, blur: parseInt(($event.target as HTMLInputElement).value) } })"
                    min="0"
                    max="20"
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-primary-700 mb-1">X: {{ selectedIcon.shadow.offsetX }}px</label>
                  <input
                    type="range"
                    :value="selectedIcon.shadow.offsetX"
                    @input="updateIcon({ shadow: { ...selectedIcon.shadow, offsetX: parseInt(($event.target as HTMLInputElement).value) } })"
                    min="-20"
                    max="20"
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-primary-700 mb-1">Y: {{ selectedIcon.shadow.offsetY }}px</label>
                  <input
                    type="range"
                    :value="selectedIcon.shadow.offsetY"
                    @input="updateIcon({ shadow: { ...selectedIcon.shadow, offsetY: parseInt(($event.target as HTMLInputElement).value) } })"
                    min="-20"
                    max="20"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3 pt-4 border-t border-primary-200">
          <button @click="duplicateIcon" class="btn-secondary flex-1">
            📋 Duplicate
          </button>
          <button @click="removeSelectedIcon" class="btn-danger flex-1">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="bannerStore.icons.length === 0" class="text-center py-8 text-neutral-500">
      <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl text-neutral-400">⭐</span>
      </div>
      <p class="font-medium">No icons added yet</p>
      <p class="text-sm">Browse and add icons above to get started!</p>
    </div>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style> 
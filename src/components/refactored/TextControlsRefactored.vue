<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBannerStore } from '@/stores/useBannerStore'
import { useElementControls } from '@/composables/useElementControls'
import BaseCard from '@/components/ui/BaseCard.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { FONT_FAMILIES, getFontFamilyString, type FontSize } from '@/types'

const bannerStore = useBannerStore()

// Element controls composable
const {
  selectedElementId,
  selectedElement: selectedText,
  selectElement,
  updateSelectedElement,
  removeSelectedElement,
  duplicateSelectedElement,
  handleKeyboard,
} = useElementControls(
  bannerStore.textElements,
  bannerStore.updateTextElement,
  bannerStore.removeTextElement,
  bannerStore.duplicateTextElement,
)

// Form state for new text
const newText = ref('')
const textColor = ref('#FFFFFF')
const fontSize = ref<FontSize>('medium')
const fontFamily = ref('Inter')
const fontWeight = ref('600')

// Show all fonts instead of filtering by category
const allFonts = computed(() => FONT_FAMILIES)

const fontWeights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
]

const fontSizeOptions = [
  { value: 'tiny', label: 'Tiny (50px)' },
  { value: 'small', label: 'Small (56px)' },
  { value: 'medium', label: 'Medium (64px)' },
  { value: 'large', label: 'Large (72px)' },
  { value: 'xlarge', label: 'X-Large (80px)' },
  { value: 'xxlarge', label: 'XX-Large (96px)' },
  { value: 'huge', label: 'Huge (120px)' },
  { value: 'massive', label: 'Massive (150px)' },
  { value: 'giant', label: 'Giant (192px)' },
]

const gradientPresets = [
  { name: 'Blue Ocean', colors: ['#3B82F6', '#1E40AF'], direction: 45 },
  { name: 'Purple Dream', colors: ['#8B5CF6', '#5B21B6'], direction: 135 },
  { name: 'Sunset', colors: ['#F59E0B', '#EF4444'], direction: 90 },
  { name: 'Forest', colors: ['#10B981', '#059669'], direction: 180 },
]

// Computed properties
const hasTextElements = computed(() => bannerStore.textElements.length > 0)

// Methods
function addText() {
  if (!newText.value.trim()) return

  bannerStore.addTextElement({
    text: newText.value,
    fontSize: fontSize.value,
    color: textColor.value,
    fontFamily: getFontFamilyString(fontFamily.value),
    fontWeight: fontWeight.value,
  })

  newText.value = ''
}

function applyGradientPreset(preset: { colors: string[]; direction: number }) {
  updateSelectedElement({
    colorType: 'gradient',
    gradientColors: preset.colors,
    gradientDirection: preset.direction,
  })
}

// Handle element selection
function handleElementClick(elementId: string) {
  selectElement(elementId)
}

// Get the display name of the current font family
function getFontDisplayName(fontFamilyString: string): string {
  const fontName = fontFamilyString.split(',')[0].trim().replace(/['"]/g, '')
  const font = FONT_FAMILIES.find((f) => f.name === fontName)
  return font ? font.display : fontName
}

// Update font family with proper string conversion
function updateFontFamily(fontName: string) {
  updateSelectedElement({
    fontFamily: getFontFamilyString(fontName),
  })
}
</script>

<template>
  <div class="space-y-6" @keydown="handleKeyboard">
    <!-- Add New Text -->
    <BaseCard title="Add New Text" icon="✏️" variant="primary">
      <div class="space-y-4">
        <!-- Text Input -->
        <div>
          <div class="relative">
            <input
              v-model="newText"
              type="text"
              placeholder="Enter your text here..."
              class="w-full px-4 py-3 pr-12 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-medium"
              @keyup.enter="addText"
            />
            <button
              @click="addText"
              :disabled="!newText.trim()"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-strong transition-all duration-200"
            >
              <span class="text-white text-sm">+</span>
            </button>
          </div>
        </div>

        <!-- Font Selection -->
        <div>
          <label class="block text-sm font-medium text-primary-700 mb-2">Choose Font</label>
          <select
            v-model="fontFamily"
            class="w-full px-3 py-2 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option
              v-for="font in allFonts"
              :key="font.name"
              :value="font.name"
              :style="{ fontFamily: font.name }"
            >
              {{ font.display }}
            </option>
          </select>
        </div>

        <!-- Quick Settings -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-primary-700 mb-2">Size</label>
            <select
              v-model="fontSize"
              class="w-full px-3 py-2 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option v-for="option in fontSizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <ColorPicker v-model="textColor" label="Color" variant="primary" />
          </div>
        </div>

        <!-- Font Weight -->
        <div>
          <label class="block text-sm font-medium text-primary-700 mb-2">Font Weight</label>
          <select
            v-model="fontWeight"
            class="w-full px-3 py-2 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option v-for="weight in fontWeights" :key="weight.value" :value="weight.value">
              {{ weight.label }}
            </option>
          </select>
        </div>
      </div>
    </BaseCard>

    <!-- Text Elements List -->
    <BaseCard
      v-if="hasTextElements"
      title="Text Elements"
      subtitle="Click to select and edit"
      icon="📝"
      variant="neutral"
    >
      <div class="space-y-3 max-h-48 overflow-y-auto">
        <div
          v-for="textElement in bannerStore.textElements"
          :key="textElement.id"
          @click="handleElementClick(textElement.id)"
          :class="[
            'group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium relative overflow-hidden',
            selectedElementId === textElement.id
              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-medium'
              : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50',
          ]"
        >
          <div class="flex items-center justify-between relative z-10">
            <div class="flex-1">
              <p
                class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors truncate"
                :style="{ fontFamily: textElement.fontFamily }"
              >
                "{{ textElement.text }}"
              </p>
              <div class="flex items-center space-x-2 text-sm text-neutral-600 mt-1">
                <span class="font-mono">{{ textElement.fontSize }}</span>
                <span>•</span>
                <span>{{ getFontDisplayName(textElement.fontFamily) }}</span>
                <span
                  v-if="textElement.colorType === 'gradient'"
                  class="text-accent-600 font-medium"
                >
                  • Gradient
                </span>
              </div>
            </div>
            <div
              v-if="selectedElementId === textElement.id"
              class="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium"
            >
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- Active indicator background -->
          <div
            v-if="selectedElementId === textElement.id"
            class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-50"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Text Customization -->
    <BaseCard v-if="selectedText" title="Customize Text" icon="🎨" variant="accent">
      <div class="space-y-6">
        <!-- Text Content -->
        <div>
          <label class="block text-sm font-medium text-accent-700 mb-2">Text Content</label>
          <input
            :value="selectedText.text"
            @input="updateSelectedElement({ text: ($event.target as HTMLInputElement).value })"
            type="text"
            class="w-full px-3 py-2 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
            placeholder="Enter your text..."
          />
        </div>

        <!-- Font Family Selection -->
        <div>
          <label class="block text-sm font-medium text-accent-700 mb-2">Font Family</label>
          <select
            :value="getFontDisplayName(selectedText.fontFamily)"
            @change="updateFontFamily(($event.target as HTMLSelectElement).value)"
            class="w-full px-3 py-2 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
          >
            <option
              v-for="font in FONT_FAMILIES"
              :key="font.name"
              :value="font.name"
              :style="{ fontFamily: font.name }"
            >
              {{ font.display }}
            </option>
          </select>
        </div>

        <!-- Color Controls -->
        <div>
          <label class="block text-sm font-medium text-accent-700 mb-3">Color Style</label>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <button
              @click="updateSelectedElement({ colorType: 'solid' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                (selectedText.colorType || 'solid') === 'solid'
                  ? 'bg-gradient-accent text-white shadow-medium'
                  : 'bg-white text-accent-700 border-2 border-accent-200 hover:border-accent-300',
              ]"
            >
              <span>⚪</span>
              <span>Solid</span>
            </button>
            <button
              @click="updateSelectedElement({ colorType: 'gradient' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                selectedText.colorType === 'gradient'
                  ? 'bg-gradient-accent text-white shadow-medium'
                  : 'bg-white text-accent-700 border-2 border-accent-200 hover:border-accent-300',
              ]"
            >
              <span>🌈</span>
              <span>Gradient</span>
            </button>
          </div>

          <!-- Solid Color -->
          <div v-if="(selectedText.colorType || 'solid') === 'solid'">
            <ColorPicker
              :model-value="selectedText.color"
              @update:model-value="updateSelectedElement({ color: $event })"
              label="Text Color"
              variant="accent"
            />
          </div>

          <!-- Gradient Colors -->
          <div v-if="selectedText.colorType === 'gradient'" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <ColorPicker
                :model-value="selectedText.gradientColors?.[0] || '#3B82F6'"
                @update:model-value="
                  updateSelectedElement({
                    gradientColors: [$event, selectedText.gradientColors?.[1] || '#1E40AF'],
                  })
                "
                label="Start Color"
                variant="accent"
              />
              <ColorPicker
                :model-value="selectedText.gradientColors?.[1] || '#1E40AF'"
                @update:model-value="
                  updateSelectedElement({
                    gradientColors: [selectedText.gradientColors?.[0] || '#3B82F6', $event],
                  })
                "
                label="End Color"
                variant="accent"
              />
            </div>

            <!-- Gradient Direction -->
            <div>
              <label class="block text-sm font-medium text-accent-700 mb-2">
                Direction: {{ selectedText.gradientDirection || 45 }}°
              </label>
              <input
                type="range"
                :value="selectedText.gradientDirection || 45"
                @input="
                  updateSelectedElement({
                    gradientDirection: parseInt(($event.target as HTMLInputElement).value),
                  })
                "
                min="0"
                max="360"
                class="w-full"
              />
            </div>

            <!-- Gradient Presets -->
            <div>
              <label class="block text-sm font-medium text-accent-700 mb-2">Quick Presets</label>
              <div class="grid grid-cols-2 gap-2">
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

        <!-- Actions -->
        <div class="flex space-x-3 pt-4 border-t border-accent-200">
          <button @click="duplicateSelectedElement" class="btn-secondary flex-1">
            📋 Duplicate
          </button>
          <button @click="removeSelectedElement" class="btn-danger flex-1">🗑️ Delete</button>
        </div>
      </div>
    </BaseCard>

    <!-- Empty State -->
    <div v-if="!hasTextElements" class="text-center py-8 text-neutral-500">
      <div
        class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <span class="text-2xl text-neutral-400">📝</span>
      </div>
      <p class="font-medium">No text elements yet</p>
      <p class="text-sm">Add some text above to get started!</p>
    </div>
  </div>
</template>

<style scoped>
/* Font preview styles */
option {
  font-family: inherit !important;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBannerStore, type TextElement } from '@/stores/banner'
import { FONT_FAMILIES, getFontFamilyString } from '@/types'

const bannerStore = useBannerStore()
const selectedTextId = ref<string | null>(null)

// Form state for new text
const newText = ref('')
const textColor = ref('#FFFFFF')
const fontSize = ref<
  'tiny' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'huge' | 'massive' | 'giant'
>('medium')
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

const selectedText = computed(() => {
  if (!selectedTextId.value) return null
  return bannerStore.textElements.find((el) => el.id === selectedTextId.value) || null
})

function addText() {
  if (!newText.value.trim()) return

  const size = bannerStore.currentSize

  bannerStore.addTextElement({
    text: newText.value,
    x: size.width * 0.1,
    y: size.height * 0.1,
    fontSize: fontSize.value,
    color: textColor.value,
    colorType: 'solid',
    gradientColors: ['#3B82F6', '#1E40AF'],
    gradientDirection: 45,
    fontFamily: getFontFamilyString(fontFamily.value),
    fontWeight: fontWeight.value,
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 1.2,
    rotation: 0,
    opacity: 1,
    shadow: {
      enabled: false,
      color: 'rgba(0, 0, 0, 0.3)',
      blur: 4,
      offsetX: 2,
      offsetY: 2,
    },
    stroke: {
      enabled: false,
      color: '#000000',
      width: 2,
    },
  })

  newText.value = ''
}

function selectText(textId: string) {
  selectedTextId.value = textId
}

function updateText(updates: Partial<TextElement>) {
  if (selectedTextId.value) {
    // Convert font name to full font family string if updating fontFamily
    if (updates.fontFamily) {
      updates.fontFamily = getFontFamilyString(updates.fontFamily)
    }
    bannerStore.updateTextElement(selectedTextId.value, updates)
  }
}

function removeSelectedText() {
  if (selectedTextId.value) {
    bannerStore.removeTextElement(selectedTextId.value)
    selectedTextId.value = null
  }
}

function duplicateText() {
  if (selectedText.value) {
    const newTextElement = {
      ...selectedText.value,
      x: selectedText.value.x + 20,
      y: selectedText.value.y + 20,
    }
    // Remove id property for new text element and add to store
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...textWithoutId } = newTextElement
    bannerStore.addTextElement(textWithoutId)
  }
}

// Get the display name of the current font family
function getFontDisplayName(fontFamilyString: string): string {
  const fontName = fontFamilyString.split(',')[0].trim().replace(/['"]/g, '')
  const font = FONT_FAMILIES.find((f) => f.name === fontName)
  return font ? font.display : fontName
}
</script>

<template>
  <div class="space-y-6">
    <!-- Add New Text -->
    <div
      class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-primary-100 to-primary-200/80 -m-6 mb-4 p-6 rounded-t-2xl border-b border-primary-300/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium"
          >
            <span class="text-white text-lg">✏️</span>
          </div>
          <div>
            <h4 class="font-bold text-primary-900">Add New Text</h4>
            <p class="text-sm text-primary-700">Create text with amazing fonts</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
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
          <label class="block text-sm font-semibold text-primary-800 mb-2">Choose Font</label>
          <select
            v-model="fontFamily"
            class="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-medium"
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

        <div class="grid grid-cols-1 gap-2">
          <div>
            <select
              v-model="fontSize"
              class="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-medium"
            >
              <option v-for="option in fontSizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <div class="grid grid-cols-2 gap-2">
              <input
                v-model="textColor"
                type="color"
                class="w-12 h-12 border-0 border-primary-200 rounded-xl cursor-pointer shadow-soft"
              />
              <input
                v-model="textColor"
                type="text"
                class="flex-1 px-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-mono"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div>
          <select
            v-model="fontWeight"
            class="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-medium"
          >
            <option v-for="weight in fontWeights" :key="weight.value" :value="weight.value">
              {{ weight.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Existing Text Elements -->
    <div v-if="bannerStore.textElements.length > 0">
      <label class="block text-sm font-semibold text-neutral-700 mb-3"
        >Text Elements on Banner</label
      >
      <div class="space-y-3 max-h-48 overflow-y-auto">
        <div
          v-for="textElement in bannerStore.textElements"
          :key="textElement.id"
          @click="selectText(textElement.id)"
          :class="[
            'group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium relative overflow-hidden',
            selectedTextId === textElement.id
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
                  >• Gradient</span
                >
              </div>
            </div>
            <div
              v-if="selectedTextId === textElement.id"
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
            v-if="selectedTextId === textElement.id"
            class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-50"
          ></div>
        </div>
      </div>
    </div>

    <!-- Text Customization -->
    <div
      v-if="selectedText"
      class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-soft"
    >
      <div
        class="bg-gradient-to-r from-accent-100 to-accent-200/80 -m-6 mb-6 p-6 rounded-t-2xl border-b border-accent-300/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-medium"
          >
            <span class="text-white text-lg">🎨</span>
          </div>
          <div>
            <h4 class="font-bold text-accent-900">Customize Text</h4>
            <p class="text-sm text-accent-700">Fine-tune your text appearance</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Text Content -->
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-2">Text Content</label>
          <input
            type="text"
            :value="selectedText.text"
            @input="updateText({ text: ($event.target as HTMLInputElement).value })"
            class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-medium"
            placeholder="Enter text content..."
          />
        </div>

        <!-- Font Family -->
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-2">Font Family</label>
          <select
            :value="getFontDisplayName(selectedText.fontFamily)"
            @change="updateText({ fontFamily: ($event.target as HTMLSelectElement).value })"
            class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-medium"
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

        <!-- Color Type -->
        <div>
          <label class="block text-sm font-semibold text-accent-800 mb-2">Color Style</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="updateText({ colorType: 'solid' })"
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
              @click="updateText({ colorType: 'gradient' })"
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
        </div>

        <!-- Solid Color -->
        <div v-if="(selectedText.colorType || 'solid') === 'solid'">
          <div class="flex space-x-3">
            <input
              type="color"
              :value="selectedText.color"
              @input="updateText({ color: ($event.target as HTMLInputElement).value })"
              class="w-16 h-12 border-2 border-accent-200 rounded-xl cursor-pointer shadow-soft"
            />
            <input
              type="text"
              :value="selectedText.color"
              @input="updateText({ color: ($event.target as HTMLInputElement).value })"
              class="flex-1 px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-mono"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <!-- Gradient Colors -->
        <div v-if="selectedText.colorType === 'gradient'">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="color"
                  :value="selectedText.gradientColors?.[0] || '#3B82F6'"
                  @input="
                    updateText({
                      gradientColors: [
                        ($event.target as HTMLInputElement).value,
                        selectedText.gradientColors?.[1] || '#1E40AF',
                      ],
                    })
                  "
                  class="w-full h-12 border-2 border-accent-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>
              <div>
                <input
                  type="color"
                  :value="selectedText.gradientColors?.[1] || '#1E40AF'"
                  @input="
                    updateText({
                      gradientColors: [
                        selectedText.gradientColors?.[0] || '#3B82F6',
                        ($event.target as HTMLInputElement).value,
                      ],
                    })
                  "
                  class="w-full h-12 border-2 border-accent-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>
            </div>

            <div>
              <input
                type="range"
                :value="selectedText.gradientDirection || 45"
                @input="
                  updateText({
                    gradientDirection: parseInt(($event.target as HTMLInputElement).value),
                  })
                "
                min="0"
                max="360"
                class="w-full"
              />
              <div class="text-center text-xs text-accent-600 mt-1">
                {{ selectedText.gradientDirection || 45 }}°
              </div>
            </div>
          </div>
        </div>

        <!-- Font Properties -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <select
              :value="selectedText.fontSize"
              @change="updateText({ fontSize: ($event.target as HTMLSelectElement).value as any })"
              class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-medium"
            >
              <option v-for="option in fontSizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div>
            <select
              :value="selectedText.fontWeight"
              @change="updateText({ fontWeight: ($event.target as HTMLSelectElement).value })"
              class="w-full px-4 py-3 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white font-medium"
            >
              <option v-for="weight in fontWeights" :key="weight.value" :value="weight.value">
                {{ weight.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Position Controls -->
        <div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <input
                type="range"
                :value="selectedText.x"
                @input="updateText({ x: parseInt(($event.target as HTMLInputElement).value) })"
                min="0"
                :max="bannerStore.currentSize.width - 100"
                class="w-full"
              />
              <div class="text-center text-xs text-accent-600 mt-1">X: {{ selectedText.x }}px</div>
            </div>
            <div>
              <input
                type="range"
                :value="selectedText.y"
                @input="updateText({ y: parseInt(($event.target as HTMLInputElement).value) })"
                min="0"
                :max="bannerStore.currentSize.height - 50"
                class="w-full"
              />
              <div class="text-center text-xs text-accent-600 mt-1">Y: {{ selectedText.y }}px</div>
            </div>
          </div>
        </div>

        <!-- Opacity and Rotation -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <input
              type="range"
              :value="selectedText.opacity || 1"
              @input="
                updateText({ opacity: parseFloat(($event.target as HTMLInputElement).value) })
              "
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
            <div class="text-center text-xs text-accent-600 mt-1">
              Opacity: {{ Math.round((selectedText.opacity || 1) * 100) }}%
            </div>
          </div>
          <div>
            <input
              type="range"
              :value="selectedText.rotation || 0"
              @input="updateText({ rotation: parseInt(($event.target as HTMLInputElement).value) })"
              min="-180"
              max="180"
              class="w-full"
            />
            <div class="text-center text-xs text-accent-600 mt-1">
              Rotation: {{ selectedText.rotation || 0 }}°
            </div>
          </div>
        </div>

        <!-- Text Alignment -->
        <div>
          <div class="grid grid-cols-3 gap-3">
            <button
              @click="updateText({ textAlign: 'left' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                (selectedText.textAlign || 'left') === 'left'
                  ? 'bg-gradient-accent text-white shadow-medium'
                  : 'bg-white text-accent-700 border-2 border-accent-200 hover:border-accent-300',
              ]"
            >
              <span>⬅️</span>
              <span>Left</span>
            </button>
            <button
              @click="updateText({ textAlign: 'center' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                selectedText.textAlign === 'center'
                  ? 'bg-gradient-accent text-white shadow-medium'
                  : 'bg-white text-accent-700 border-2 border-accent-200 hover:border-accent-300',
              ]"
            >
              <span>↔️</span>
              <span>Center</span>
            </button>
            <button
              @click="updateText({ textAlign: 'right' })"
              :class="[
                'flex items-center justify-center space-x-2 p-3 rounded-xl font-medium transition-all duration-200',
                selectedText.textAlign === 'right'
                  ? 'bg-gradient-accent text-white shadow-medium'
                  : 'bg-white text-accent-700 border-2 border-accent-200 hover:border-accent-300',
              ]"
            >
              <span>➡️</span>
              <span>Right</span>
            </button>
          </div>
        </div>

        <!-- Letter Spacing and Line Height -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <input
              type="range"
              :value="selectedText.letterSpacing || 0"
              @input="
                updateText({ letterSpacing: parseInt(($event.target as HTMLInputElement).value) })
              "
              min="-5"
              max="20"
              class="w-full"
            />
            <div class="text-center text-xs text-accent-600 mt-1">
              Letter Spacing: {{ selectedText.letterSpacing || 0 }}px
            </div>
          </div>
          <div>
            <input
              type="range"
              :value="selectedText.lineHeight || 1.2"
              @input="
                updateText({ lineHeight: parseFloat(($event.target as HTMLInputElement).value) })
              "
              min="0.8"
              max="3"
              step="0.1"
              class="w-full"
            />
            <div class="text-center text-xs text-accent-600 mt-1">
              Line Height: {{ (selectedText.lineHeight || 1.2).toFixed(1) }}
            </div>
          </div>
        </div>

        <!-- Shadow Effects -->
        <div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-accent-700">Shadow</span>
              <button
                @click="
                  updateText({
                    shadow: { ...selectedText.shadow, enabled: !selectedText.shadow.enabled },
                  })
                "
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  selectedText.shadow.enabled ? 'bg-gradient-accent' : 'bg-neutral-300',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                    selectedText.shadow.enabled ? 'translate-x-6' : 'translate-x-1',
                  ]"
                />
              </button>
            </div>

            <div v-if="selectedText.shadow.enabled" class="space-y-3">
              <div>
                <input
                  type="color"
                  :value="selectedText.shadow.color"
                  @input="
                    updateText({
                      shadow: {
                        ...selectedText.shadow,
                        color: ($event.target as HTMLInputElement).value,
                      },
                    })
                  "
                  class="w-full h-10 border-2 border-accent-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="range"
                    :value="selectedText.shadow.blur"
                    @input="
                      updateText({
                        shadow: {
                          ...selectedText.shadow,
                          blur: parseInt(($event.target as HTMLInputElement).value),
                        },
                      })
                    "
                    min="0"
                    max="20"
                    class="w-full"
                  />
                  <div class="text-center text-xs text-accent-600 mt-1">
                    Blur: {{ selectedText.shadow.blur }}px
                  </div>
                </div>
                <div>
                  <input
                    type="range"
                    :value="selectedText.shadow.offsetX"
                    @input="
                      updateText({
                        shadow: {
                          ...selectedText.shadow,
                          offsetX: parseInt(($event.target as HTMLInputElement).value),
                        },
                      })
                    "
                    min="-20"
                    max="20"
                    class="w-full"
                  />
                  <div class="text-center text-xs text-accent-600 mt-1">
                    X: {{ selectedText.shadow.offsetX }}px
                  </div>
                </div>
                <div>
                  <input
                    type="range"
                    :value="selectedText.shadow.offsetY"
                    @input="
                      updateText({
                        shadow: {
                          ...selectedText.shadow,
                          offsetY: parseInt(($event.target as HTMLInputElement).value),
                        },
                      })
                    "
                    min="-20"
                    max="20"
                    class="w-full"
                  />
                  <div class="text-center text-xs text-accent-600 mt-1">
                    Y: {{ selectedText.shadow.offsetY }}px
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stroke/Outline Effects -->
        <div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-accent-700">Stroke</span>
              <button
                @click="
                  updateText({
                    stroke: { ...selectedText.stroke, enabled: !selectedText.stroke.enabled },
                  })
                "
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  selectedText.stroke.enabled ? 'bg-gradient-accent' : 'bg-neutral-300',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                    selectedText.stroke.enabled ? 'translate-x-6' : 'translate-x-1',
                  ]"
                />
              </button>
            </div>

            <div v-if="selectedText.stroke.enabled" class="space-y-3">
              <div>
                <input
                  type="color"
                  :value="selectedText.stroke.color"
                  @input="
                    updateText({
                      stroke: {
                        ...selectedText.stroke,
                        color: ($event.target as HTMLInputElement).value,
                      },
                    })
                  "
                  class="w-full h-10 border-2 border-accent-200 rounded-xl cursor-pointer shadow-soft"
                />
              </div>

              <div>
                <input
                  type="range"
                  :value="selectedText.stroke.width"
                  @input="
                    updateText({
                      stroke: {
                        ...selectedText.stroke,
                        width: parseInt(($event.target as HTMLInputElement).value),
                      },
                    })
                  "
                  min="1"
                  max="10"
                  class="w-full"
                />
                <div class="text-center text-xs text-accent-600 mt-1">
                  Width: {{ selectedText.stroke.width }}px
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3 pt-4 border-t border-accent-200">
          <button @click="duplicateText" class="btn-secondary flex-1">📋 Duplicate</button>
          <button @click="removeSelectedText" class="btn-danger flex-1">🗑️ Delete</button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="bannerStore.textElements.length === 0" class="text-center py-8 text-neutral-500">
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
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>

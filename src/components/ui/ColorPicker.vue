<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  showInput?: boolean
  variant?: 'primary' | 'secondary' | 'accent'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '#000000',
  showInput: true,
  variant: 'primary',
})

const emit = defineEmits<Emits>()

const updateColor = (value: string) => {
  emit('update:modelValue', value)
}

const inputClasses = computed(() => {
  const variantClasses = {
    primary: 'border-primary-200 focus:ring-primary-500',
    secondary: 'border-secondary-200 focus:ring-secondary-500',
    accent: 'border-accent-200 focus:ring-accent-500',
  }

  return `flex-1 px-4 py-3 border-2 ${variantClasses[props.variant]} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-white font-mono`
})

const pickerClasses = computed(() => {
  const variantClasses = {
    primary: 'border-primary-200',
    secondary: 'border-secondary-200',
    accent: 'border-accent-200',
  }

  return `w-16 h-12 border-2 ${variantClasses[props.variant]} rounded-xl cursor-pointer shadow-soft`
})
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-semibold text-neutral-700">
      {{ label }}
    </label>

    <div class="flex space-x-3">
      <input
        type="color"
        :value="modelValue"
        @input="updateColor(($event.target as HTMLInputElement).value)"
        :class="pickerClasses"
      />

      <input
        v-if="showInput"
        type="text"
        :value="modelValue"
        @input="updateColor(($event.target as HTMLInputElement).value)"
        :class="inputClasses"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'ColorPicker',
}
</script>

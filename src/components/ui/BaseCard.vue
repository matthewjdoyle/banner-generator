<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  icon?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  elevated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  elevated: false,
})

const cardClasses = computed(() => {
  const baseClasses = 'rounded-2xl p-6 border shadow-soft'

  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200',
    secondary: 'bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200',
    accent: 'bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200',
    neutral: 'bg-gradient-to-r from-neutral-50 to-neutral-100 border-neutral-200',
  }

  const elevatedClass = props.elevated
    ? 'shadow-medium hover:shadow-strong transition-shadow duration-300'
    : ''

  return `${baseClasses} ${variantClasses[props.variant]} ${elevatedClass}`
})

const headerClasses = computed(() => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-100 to-primary-200/80 border-primary-300/50',
    secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200/80 border-secondary-300/50',
    accent: 'bg-gradient-to-r from-accent-100 to-accent-200/80 border-accent-300/50',
    neutral: 'bg-gradient-to-r from-neutral-100 to-neutral-200/80 border-neutral-300/50',
  }

  return `${variantClasses[props.variant]} -m-6 mb-4 p-6 rounded-t-2xl border-b`
})

const iconClasses = computed(() => {
  const variantClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary',
    accent: 'bg-gradient-accent',
    neutral: 'bg-neutral-600',
  }

  return `w-10 h-10 ${variantClasses[props.variant]} rounded-xl flex items-center justify-center shadow-medium`
})

const titleClasses = computed(() => {
  const variantClasses = {
    primary: 'text-primary-900',
    secondary: 'text-secondary-900',
    accent: 'text-accent-900',
    neutral: 'text-neutral-900',
  }

  return `font-bold ${variantClasses[props.variant]}`
})

const subtitleClasses = computed(() => {
  const variantClasses = {
    primary: 'text-primary-700',
    secondary: 'text-secondary-700',
    accent: 'text-accent-700',
    neutral: 'text-neutral-600',
  }

  return `text-sm ${variantClasses[props.variant]}`
})
</script>

<template>
  <div :class="cardClasses">
    <!-- Header -->
    <div :class="headerClasses">
      <div class="flex items-center space-x-3">
        <div v-if="icon" :class="iconClasses">
          <span class="text-white text-lg">{{ icon }}</span>
        </div>
        <div>
          <h4 :class="titleClasses">{{ title }}</h4>
          <p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'BaseCard',
}
</script>

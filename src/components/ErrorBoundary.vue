<script setup lang="ts">
import { ref, onErrorCaptured, provide } from 'vue'

interface Props {
  fallback?: string
  onError?: (error: Error, instance: string, info: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Something went wrong. Please try again.'
})

// Environment check
const isDevelopment = ref(import.meta.env.DEV)

const hasError = ref(false)
const error = ref<Error | null>(null)
const errorInfo = ref('')

// Capture errors from child components
onErrorCaptured((err: Error, instance: any, info: string) => {
  console.error('Error caught by boundary:', err)
  console.error('Component info:', info)
  
  hasError.value = true
  error.value = err
  errorInfo.value = info
  
  // Call custom error handler if provided
  if (props.onError) {
    props.onError(err, instance?.type?.name || 'Unknown', info)
  }
  
  // Report to error tracking service
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'exception', {
      description: err.message,
      fatal: false
    })
  }
  
  // Prevent the error from propagating
  return false
})

// Provide error reset function to children
provide('resetError', () => {
  hasError.value = false
  error.value = null
  errorInfo.value = ''
})

function retry() {
  hasError.value = false
  error.value = null
  errorInfo.value = ''
}

function reportError() {
  if (error.value) {
    // Create a detailed error report
    const report = {
      message: error.value.message,
      stack: error.value.stack,
      componentInfo: errorInfo.value,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(report, null, 2))
      .then(() => alert('Error report copied to clipboard'))
      .catch(() => alert('Failed to copy error report'))
  }
}

function reloadPage() {
  window.location.reload()
}
</script>

<template>
  <div>
    <!-- Error UI -->
    <div v-if="hasError" class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="max-w-md w-full">
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <!-- Error Icon -->
          <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <!-- Error Message -->
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          
          <p class="text-gray-600 mb-6">
            {{ props.fallback }}
          </p>
          
          <!-- Error Details (Development) -->
          <div v-if="isDevelopment && error" class="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <details>
              <summary class="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                Technical Details
              </summary>
              <div class="text-xs text-gray-600 font-mono">
                <div class="mb-2">
                  <strong>Error:</strong> {{ error.message }}
                </div>
                <div v-if="error.stack" class="mb-2">
                  <strong>Stack:</strong>
                  <pre class="whitespace-pre-wrap mt-1">{{ error.stack }}</pre>
                </div>
                <div v-if="errorInfo">
                  <strong>Component:</strong> {{ errorInfo }}
                </div>
              </div>
            </details>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="retry"
              class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
            
            <button
              @click="reloadPage"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
          
          <!-- Report Button (Development) -->
          <button
            v-if="isDevelopment"
            @click="reportError"
            class="mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Copy Error Report
          </button>
        </div>
      </div>
    </div>
    
    <!-- Normal Content -->
    <slot v-else />
  </div>
</template>

<style scoped>
pre {
  max-height: 200px;
  overflow-y: auto;
}
</style> 
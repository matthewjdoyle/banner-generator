<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import PerformanceMonitor from '@/components/PerformanceMonitor.vue'
import { useAccessibility } from '@/composables/useAccessibility'

// Environment check
const isDevelopment = ref(import.meta.env.DEV)

// Ko-fi popup state
const showKofiPopup = ref(false)
const kofiTimer = ref<number | null>(null)

// Initialize accessibility features
const { announce } = useAccessibility({
  enableKeyboardNavigation: true,
  enableScreenReaderSupport: true,
  enableFocusManagement: true,
  skipLinksEnabled: true
})

// Error handler for the error boundary
function handleAppError(error: Error, instance: string, info: string) {
  console.error('Application error:', { error, instance, info })
  
  // Announce error to screen readers
  announce('An error occurred. Please try refreshing the page.', 'assertive')
  
  // Could integrate with error reporting service here
  // Example: Sentry, LogRocket, etc.
}

// Ko-fi popup functions
function showKofiPopupAfterDelay() {
  // Show popup after 2 minutes 30 seconds (150,000 milliseconds)
  kofiTimer.value = window.setTimeout(() => {
    showKofiPopup.value = true
    announce('Support popup opened', 'polite')
  }, 150000)
}

function closeKofiPopup() {
  showKofiPopup.value = false
  announce('Support popup closed', 'polite')
}

// Handle escape key to close popup
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && showKofiPopup.value) {
    closeKofiPopup()
  }
}

onMounted(() => {
  showKofiPopupAfterDelay()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (kofiTimer.value) {
    clearTimeout(kofiTimer.value)
  }
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <ErrorBoundary
    fallback="We're sorry, but something went wrong with the banner generator. Please refresh the page to continue."
    @error="handleAppError"
  >
    <div id="app" class="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 flex flex-col">
      <!-- Skip Links for Accessibility -->
      <div id="skip-links" class="sr-only focus:not-sr-only">
        <a 
          href="#main-content" 
          class="absolute top-0 left-0 bg-primary-600 text-white p-2 rounded-br-lg z-50 focus:relative"
        >
          Skip to main content
        </a>
      </div>

      <!-- Header -->
      <AppHeader />
      
      <!-- Main Content -->
      <main 
        id="main-content" 
        class="pt-16 flex-1"
        role="main"
        aria-label="Banner generator application"
      >
        <RouterView />
      </main>

      <!-- Footer -->
      <AppFooter />
      
      <!-- Performance Monitor (Development) -->
      <PerformanceMonitor v-if="isDevelopment" />
      
      <!-- Screen Reader Status Updates -->
      <div
        id="sr-status"
        aria-live="polite"
        aria-atomic="true"
        class="sr-only"
      />

      <!-- Ko-fi Support Popup -->
      <Transition
        name="kofi-popup"
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform translate-x-full opacity-0"
      >
        <div
          v-if="showKofiPopup"
          class="fixed top-20 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          role="dialog"
          aria-labelledby="kofi-popup-title"
          aria-describedby="kofi-popup-description"
        >
          <!-- Popup Header -->
          <div class="bg-gradient-to-r from-orange-400 to-red-500 p-4 text-white relative">
            <button
              @click="closeKofiPopup"
              class="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Close support popup"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="pr-8">
              <h3 id="kofi-popup-title" class="text-lg font-bold mb-1">
                ☕ Enjoying the Banner Generator?
              </h3>
              <p id="kofi-popup-description" class="text-sm text-white/90">
                Support the development with a coffee!
              </p>
            </div>
          </div>

          <!-- Ko-fi Iframe Container -->
          <div class="p-4 bg-gray-50">
            <div class="bg-white rounded-xl overflow-hidden shadow-soft">
              <iframe 
                id="kofiframe" 
                src="https://ko-fi.com/matthewjdoyle/?hidefeed=true&widget=true&embed=true&preview=true" 
                style="border:none;width:100%;padding:4px;background:#f9f9f9;" 
                height="400" 
                title="Support matthewjdoyle on Ko-fi"
                loading="lazy"
              ></iframe>
            </div>
            
            <!-- Close Button -->
            <div class="mt-4 text-center">
              <button
                @click="closeKofiPopup"
                class="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Popup Backdrop -->
      <Transition
        name="kofi-backdrop"
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showKofiPopup"
          @click="closeKofiPopup"
          class="fixed inset-0 bg-black/20 z-40"
          aria-hidden="true"
        ></div>
      </Transition>
    </div>
  </ErrorBoundary>
</template>

<style scoped>
#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Screen reader only class */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.sr-only.focus:not-sr-only:focus {
  position: static !important;
  width: auto !important;
  height: auto !important;
  overflow: visible !important;
  clip: auto !important;
  white-space: normal !important;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  #app {
    border: 1px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>

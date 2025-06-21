<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import PerformanceMonitor from '@/components/PerformanceMonitor.vue'
import { useAccessibility } from '@/composables/useAccessibility'

// Get current route
const route = useRoute()

// Environment check
const isDevelopment = ref(import.meta.env.DEV)

// Ko-fi popup state
const showKofiPopup = ref(false)
const kofiTimer = ref<number | null>(null)

// Sharing popup state
const showSharingPopup = ref(false)
const sharingTimer = ref<number | null>(null)

// Initialize accessibility features
const { announce } = useAccessibility({
  enableKeyboardNavigation: true,
  enableScreenReaderSupport: true,
  enableFocusManagement: true,
  skipLinksEnabled: true,
})

// Error handler for the error boundary
function handleAppError(error: Error, instance: string, info: string) {
  console.error('Application error:', { error, instance, info })

  // Announce error to screen readers
  announce('An error occurred. Please try refreshing the page to continue.', 'assertive')

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

// Sharing popup functions
function triggerSharingPopup() {
  showSharingPopup.value = true
  announce('Sharing popup opened', 'polite')
}

function closeSharingPopup() {
  showSharingPopup.value = false
  announce('Sharing popup closed', 'polite')

  if (sharingTimer.value) {
    clearTimeout(sharingTimer.value)
    sharingTimer.value = null
  }
}

function shareOnPlatform(platform: string) {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(
    'Check out this amazing banner I just created with this free Banner Generator! 🎨✨',
  )

  let shareUrl = ''

  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
      break
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      break
    case 'reddit':
      shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`
      break
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  closeSharingPopup()
}

// Expose sharing popup function globally
// ;(window as Window & { triggerSharingPopup: () => void }).triggerSharingPopup = triggerSharingPopup

// Provide the function to child components
provide('triggerSharingPopup', triggerSharingPopup)

// Handle escape key to close popups
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    if (showKofiPopup.value) {
      closeKofiPopup()
    }
    if (showSharingPopup.value) {
      closeSharingPopup()
    }
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
  if (sharingTimer.value) {
    clearTimeout(sharingTimer.value)
  }
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <ErrorBoundary
    fallback="We're sorry, but something went wrong with the banner generator. Please refresh the page to continue."
    @error="handleAppError"
  >
    <div id="app" class="h-full bg-gradient-to-br from-neutral-50 to-primary-50/30 flex flex-col">
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
        :class="['flex-1', route.name === 'generator' ? 'pt-16 h-screen' : 'pt-16']"
        role="main"
        aria-label="Banner generator application"
      >
        <RouterView />
      </main>

      <!-- Footer - Hidden on banner generator page -->
      <AppFooter v-if="route.name !== 'generator'" />

      <!-- Performance Monitor (Development) -->
      <PerformanceMonitor v-if="isDevelopment" />

      <!-- Screen Reader Status Updates -->
      <div id="sr-status" aria-live="polite" aria-atomic="true" class="sr-only" />

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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
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
                style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
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

      <!-- Sharing Popup -->
      <Transition
        name="sharing-popup"
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform translate-x-full opacity-0"
      >
        <div
          v-if="showSharingPopup"
          class="fixed top-20 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          role="dialog"
          aria-labelledby="sharing-popup-title"
          aria-describedby="sharing-popup-description"
        >
          <!-- Popup Header -->
          <div class="bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white relative">
            <button
              @click="closeSharingPopup"
              class="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Close sharing popup"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div class="pr-8">
              <h3 id="sharing-popup-title" class="text-lg font-bold mb-1">
                🎉 Awesome Banner Created!
              </h3>
              <p id="sharing-popup-description" class="text-sm text-white/90">
                Share your creation and help others discover this tool!
              </p>
            </div>
          </div>

          <!-- Social Media Buttons -->
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 mb-4">
              <button
                @click="shareOnPlatform('twitter')"
                class="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
                <span class="text-sm">Twitter</span>
              </button>

              <button
                @click="shareOnPlatform('facebook')"
                class="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                <span class="text-sm">Facebook</span>
              </button>

              <button
                @click="shareOnPlatform('linkedin')"
                class="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
                <span class="text-sm">LinkedIn</span>
              </button>

              <button
                @click="shareOnPlatform('reddit')"
                class="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
                  />
                </svg>
                <span class="text-sm">Reddit</span>
              </button>
            </div>

            <!-- Alternative Actions -->
            <div class="space-y-3 pt-3 border-t border-gray-200">
              <button
                @click="shareOnPlatform('pinterest')"
                class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.093.112.105.21.077.322-.085.409-.402 1.661-.402 1.661-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
                  />
                </svg>
                <span class="text-sm">Pinterest</span>
              </button>

              <button
                @click="closeSharingPopup"
                class="w-full text-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Sharing Popup Backdrop -->
      <Transition
        name="sharing-backdrop"
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showSharingPopup"
          class="fixed inset-0 bg-black/20 z-40"
          aria-hidden="true"
        ></div>
      </Transition>
    </div>
  </ErrorBoundary>
</template>

<style scoped>
#app {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
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

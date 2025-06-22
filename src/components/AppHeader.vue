<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// Mobile menu state
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Close menu when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as Element
  const mobileMenu = document.getElementById('mobile-menu')
  const mobileMenuButton = document.getElementById('mobile-menu-button')

  if (
    isMobileMenuOpen.value &&
    mobileMenu &&
    mobileMenuButton &&
    !mobileMenu.contains(target) &&
    !mobileMenuButton.contains(target)
  ) {
    closeMobileMenu()
  }
}

// Close menu on escape key
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/50 z-50 shadow-soft"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/generator" class="flex items-center space-x-3 group">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 group-hover:scale-110 bg-white border border-primary-200"
          >
            <svg
              class="w-8 h-8"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path id="ellipsePath" d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z" />
              </defs>
              <g transform="rotate(45 50 50)">
                <ellipse cx="50" cy="50" rx="40" ry="25" stroke="#9B5DE5" stroke-width="6" />
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
                    <mpath href="#ellipsePath" />
                  </animateMotion>
                </circle>
                <circle r="5" fill="#fde725">
                  <animateMotion
                    dur="20.4s"
                    repeatCount="indefinite"
                    keyPoints="0.5;0.5;1;1;0.5;0.5"
                    keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                  >
                    <mpath href="#ellipsePath" />
                  </animateMotion>
                </circle>
              </g>
            </svg>
          </div>
          <span
            class="font-display font-bold text-xl text-neutral-900 group-hover:text-gradient transition-all duration-300"
            >Banner Generator</span
          >
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink
            to="/"
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/generator"
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            Generator
          </RouterLink>
          <RouterLink
            to="/gallery"
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            Gallery
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            About
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          id="mobile-menu-button"
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :aria-expanded="isMobileMenuOpen"
          aria-haspopup="true"
          aria-label="Toggle navigation menu"
        >
          <!-- Hamburger Icon -->
          <div class="w-6 h-6 relative">
            <!-- Top line -->
            <span
              :class="[
                'absolute left-0 top-1 w-6 h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center',
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : '',
              ]"
            ></span>
            <!-- Middle line -->
            <span
              :class="[
                'absolute left-0 top-3 w-6 h-0.5 bg-current rounded-full transition-all duration-300',
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
              ]"
            ></span>
            <!-- Bottom line -->
            <span
              :class="[
                'absolute left-0 top-5 w-6 h-0.5 bg-current rounded-full transition-all duration-300 transform origin-center',
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : '',
              ]"
            ></span>
          </div>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        name="mobile-menu"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <nav
          v-if="isMobileMenuOpen"
          id="mobile-menu"
          class="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-strong"
          role="menu"
          aria-orientation="vertical"
        >
          <div class="container mx-auto px-4 py-4 space-y-2">
            <RouterLink
              to="/"
              @click="closeMobileMenu"
              class="block text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
              active-class="text-primary-600 bg-primary-50 border-primary-200"
              role="menuitem"
            >
              <div class="flex items-center space-x-3">
                <span class="text-lg">🏠</span>
                <span>Home</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/generator"
              @click="closeMobileMenu"
              class="block text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
              active-class="text-primary-600 bg-primary-50 border-primary-200"
              role="menuitem"
            >
              <div class="flex items-center space-x-3">
                <span class="text-lg">🎨</span>
                <span>Banner Generator</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/gallery"
              @click="closeMobileMenu"
              class="block text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
              active-class="text-primary-600 bg-primary-50 border-primary-200"
              role="menuitem"
            >
              <div class="flex items-center space-x-3">
                <span class="text-lg">🖼️</span>
                <span>Gallery</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/about"
              @click="closeMobileMenu"
              class="block text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
              active-class="text-primary-600 bg-primary-50 border-primary-200"
              role="menuitem"
            >
              <div class="flex items-center space-x-3">
                <span class="text-lg">ℹ️</span>
                <span>About</span>
              </div>
            </RouterLink>
          </div>
        </nav>
      </Transition>
    </div>

    <!-- Mobile Menu Backdrop (for closing when clicking outside) -->
    <Transition
      name="backdrop"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-0 bg-black/10 -z-10"
        @click="closeMobileMenu"
        aria-hidden="true"
      ></div>
    </Transition>
  </header>
</template>

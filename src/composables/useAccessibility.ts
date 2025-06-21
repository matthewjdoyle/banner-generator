import { ref, onMounted, onUnmounted } from 'vue'

export interface AccessibilityOptions {
  enableKeyboardNavigation?: boolean
  enableScreenReaderSupport?: boolean
  enableFocusManagement?: boolean
  skipLinksEnabled?: boolean
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    enableKeyboardNavigation = true,
    enableScreenReaderSupport = true,
    enableFocusManagement = true,
    skipLinksEnabled = true
  } = options

  const announcements = ref<string[]>([])
  const currentFocus = ref<HTMLElement | null>(null)
  const focusableElements = ref<HTMLElement[]>([])

  // Screen reader announcements
  function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    announcements.value.push(message)
    
    // Create or update ARIA live region
    let liveRegion = document.getElementById('sr-live-region')
    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'sr-live-region'
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      liveRegion.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `
      document.body.appendChild(liveRegion)
    }
    
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.textContent = message
    
    // Clear after a delay to avoid accumulation
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = ''
      }
    }, 1000)
  }

  // Focus management
  function findFocusableElements(container: HTMLElement = document.body): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ')

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
  }

  function trapFocus(container: HTMLElement) {
    const focusable = findFocusableElements(container)
    const firstFocusable = focusable[0]
    const lastFocusable = focusable[focusable.length - 1]

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    
    // Focus first element
    firstFocusable?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }

  function restoreFocus(element: HTMLElement | null = currentFocus.value) {
    if (element && document.body.contains(element)) {
      element.focus()
    }
  }

  function saveFocus() {
    currentFocus.value = document.activeElement as HTMLElement
  }

  // Keyboard navigation helpers
  function handleArrowNavigation(
    elements: HTMLElement[],
    currentIndex: number,
    direction: 'up' | 'down' | 'left' | 'right'
  ): number {
    let newIndex = currentIndex

    switch (direction) {
      case 'up':
      case 'left':
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
        break
      case 'down':
      case 'right':
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
        break
    }

    elements[newIndex]?.focus()
    return newIndex
  }

  // High contrast mode detection
  function detectHighContrastMode(): boolean {
    const testElement = document.createElement('div')
    testElement.style.cssText = `
      border: 1px solid red;
      border-color: red green blue;
      position: absolute;
      height: 5px;
      top: -999px;
    `
    document.body.appendChild(testElement)

    const computedStyle = window.getComputedStyle(testElement)
    const isHighContrast = computedStyle.borderTopColor === computedStyle.borderRightColor

    document.body.removeChild(testElement)
    return isHighContrast
  }

  // Reduced motion detection
  function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Skip links functionality
  function createSkipLinks() {
    if (!skipLinksEnabled) return

    const skipLinks = document.createElement('div')
    skipLinks.id = 'skip-links'
    skipLinks.className = 'skip-links'
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#search" class="skip-link">Skip to search</a>
    `

    const style = document.createElement('style')
    style.textContent = `
      .skip-links {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
      }
      .skip-link {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
        background: #000;
        color: #fff;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 0 0 4px 4px;
        font-weight: bold;
      }
      .skip-link:focus {
        position: static;
        left: auto;
        width: auto;
        height: auto;
        overflow: visible;
      }
    `

    document.head.appendChild(style)
    document.body.insertBefore(skipLinks, document.body.firstChild)
  }

  // Global keyboard shortcuts
  function setupKeyboardShortcuts() {
    if (!enableKeyboardNavigation) return

    function handleGlobalKeydown(e: KeyboardEvent) {
      // Alt + M: Go to main content
      if (e.altKey && e.key === 'm') {
        e.preventDefault()
        const main = document.getElementById('main-content') || document.querySelector('main')
        if (main) {
          main.focus()
          announce('Navigated to main content')
        }
      }

      // Alt + N: Go to navigation
      if (e.altKey && e.key === 'n') {
        e.preventDefault()
        const nav = document.getElementById('navigation') || document.querySelector('nav')
        if (nav) {
          nav.focus()
          announce('Navigated to navigation')
        }
      }

      // Alt + S: Go to search
      if (e.altKey && e.key === 's') {
        e.preventDefault()
        const search = document.getElementById('search') || document.querySelector('[type="search"]')
        if (search) {
          (search as HTMLElement).focus()
          announce('Navigated to search')
        }
      }

      // Escape: Close modals/dropdowns
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"][aria-modal="true"]')
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close" i], [aria-label*="dismiss" i]')
          if (closeButton) {
            (closeButton as HTMLElement).click()
            announce('Modal closed')
          }
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeydown)

    return () => {
      document.removeEventListener('keydown', handleGlobalKeydown)
    }
  }

  // Focus indicators
  function enhanceFocusIndicators() {
    const style = document.createElement('style')
    style.textContent = `
      /* Enhanced focus indicators */
      *:focus {
        outline: 2px solid #3B82F6 !important;
        outline-offset: 2px !important;
      }
      
      /* Skip focus for mouse users */
      .js-focus-visible *:focus:not(.focus-visible) {
        outline: none !important;
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        *:focus {
          outline: 3px solid !important;
        }
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Initialize
  onMounted(() => {
    if (enableScreenReaderSupport) {
      announce('Banner generator loaded and ready', 'polite')
    }

    if (skipLinksEnabled) {
      createSkipLinks()
    }

    if (enableFocusManagement) {
      enhanceFocusIndicators()
    }

    const cleanup = setupKeyboardShortcuts()

    // Update focusable elements
    focusableElements.value = findFocusableElements()

    return cleanup
  })

  onUnmounted(() => {
    // Cleanup live regions
    const liveRegion = document.getElementById('sr-live-region')
    if (liveRegion) {
      liveRegion.remove()
    }
  })

  return {
    // Methods
    announce,
    findFocusableElements,
    trapFocus,
    restoreFocus,
    saveFocus,
    handleArrowNavigation,
    detectHighContrastMode,
    prefersReducedMotion,
    
    // State
    announcements,
    currentFocus,
    focusableElements
  }
} 
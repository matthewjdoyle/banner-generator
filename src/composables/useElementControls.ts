import { ref, computed } from 'vue'
import type { TextElement, BannerImage, BannerIcon } from '@/types'

type AnyElement = TextElement | BannerImage | BannerIcon

export function useElementControls<T extends AnyElement>(
  elements: Ref<T[]>,
  updateElement: (id: string, updates: Partial<T>) => void,
  removeElement: (id: string) => void,
  duplicateElement: (id: string) => void,
) {
  const selectedElementId = ref<string | null>(null)

  const selectedElement = computed(() => {
    if (!selectedElementId.value) return null
    return elements.value.find((el) => el.id === selectedElementId.value) || null
  })

  const hasSelection = computed(() => selectedElement.value !== null)

  function selectElement(id: string) {
    selectedElementId.value = id
  }

  function clearSelection() {
    selectedElementId.value = null
  }

  function updateSelectedElement(updates: Partial<T>) {
    if (selectedElementId.value) {
      updateElement(selectedElementId.value, updates)
    }
  }

  function removeSelectedElement() {
    if (selectedElementId.value) {
      removeElement(selectedElementId.value)
      clearSelection()
    }
  }

  function duplicateSelectedElement() {
    if (selectedElementId.value) {
      duplicateElement(selectedElementId.value)
    }
  }

  // Position controls
  function moveElement(direction: 'up' | 'down' | 'left' | 'right', step: number = 10) {
    if (!selectedElement.value) return

    const updates: Partial<T> = {}
    const element = selectedElement.value

    switch (direction) {
      case 'up':
        updates.y = Math.max(0, element.y - step)
        break
      case 'down':
        updates.y = element.y + step
        break
      case 'left':
        updates.x = Math.max(0, element.x - step)
        break
      case 'right':
        updates.x = element.x + step
        break
    }

    updateSelectedElement(updates)
  }

  // Keyboard shortcuts
  function handleKeyboard(event: KeyboardEvent) {
    if (!selectedElement.value) return

    const step = event.shiftKey ? 1 : 10

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        moveElement('up', step)
        break
      case 'ArrowDown':
        event.preventDefault()
        moveElement('down', step)
        break
      case 'ArrowLeft':
        event.preventDefault()
        moveElement('left', step)
        break
      case 'ArrowRight':
        event.preventDefault()
        moveElement('right', step)
        break
      case 'Delete':
      case 'Backspace':
        event.preventDefault()
        removeSelectedElement()
        break
      case 'd':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          duplicateSelectedElement()
        }
        break
    }
  }

  return {
    selectedElementId,
    selectedElement,
    hasSelection,
    selectElement,
    clearSelection,
    updateSelectedElement,
    removeSelectedElement,
    duplicateSelectedElement,
    moveElement,
    handleKeyboard,
  }
}

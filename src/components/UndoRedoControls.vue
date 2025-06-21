<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUndoRedoStore } from '@/stores/undoRedo'
import { useAccessibility } from '@/composables/useAccessibility'

const undoRedoStore = useUndoRedoStore()
const { announce } = useAccessibility()

function handleUndo() {
  const command = undoRedoStore.undo()
  if (command) {
    announce(`Undid: ${command.description}`, 'polite')
  } else {
    announce('Nothing to undo', 'polite')
  }
}

function handleRedo() {
  const command = undoRedoStore.redo()
  if (command) {
    announce(`Redid: ${command.description}`, 'polite')
  } else {
    announce('Nothing to redo', 'polite')
  }
}

// Keyboard shortcuts
function handleKeydown(e: KeyboardEvent) {
  // Ctrl+Z for undo
  if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
    e.preventDefault()
    handleUndo()
  }
  
  // Ctrl+Shift+Z or Ctrl+Y for redo
  if ((e.ctrlKey && e.shiftKey && e.key === 'Z') || (e.ctrlKey && e.key === 'y')) {
    e.preventDefault()
    handleRedo()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex items-center space-x-3">
    <!-- Undo Button -->
    <div class="relative group">
      <button
        @click="handleUndo"
        :disabled="!undoRedoStore.canUndo()"
        :aria-label="`Undo ${undoRedoStore.getUndoDescription()}`"
        :class="[
          'flex items-center space-x-2 px-4 py-2 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          undoRedoStore.canUndo()
            ? 'border-accent-300 bg-white hover:bg-accent-50 hover:border-accent-400 text-accent-700 hover:shadow-medium'
            : 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
        ]"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        <span class="text-sm">Undo</span>
      </button>
      
      <!-- Tooltip -->
      <div 
        v-if="undoRedoStore.canUndo()"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
      >
        Undo: {{ undoRedoStore.getUndoDescription() }}
        <div class="text-xs text-neutral-400 mt-1">Ctrl+Z</div>
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
      </div>
    </div>

    <!-- Redo Button -->
    <div class="relative group">
      <button
        @click="handleRedo"
        :disabled="!undoRedoStore.canRedo()"
        :aria-label="`Redo ${undoRedoStore.getRedoDescription()}`"
        :class="[
          'flex items-center space-x-2 px-4 py-2 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          undoRedoStore.canRedo()
            ? 'border-accent-300 bg-white hover:bg-accent-50 hover:border-accent-400 text-accent-700 hover:shadow-medium'
            : 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
        ]"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10H11a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
        </svg>
        <span class="text-sm">Redo</span>
      </button>
      
      <!-- Tooltip -->
      <div 
        v-if="undoRedoStore.canRedo()"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
      >
        Redo: {{ undoRedoStore.getRedoDescription() }}
        <div class="text-xs text-neutral-400 mt-1">Ctrl+Shift+Z</div>
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
      </div>
    </div>

    <!-- History Info Badge -->
    <div class="bg-neutral-100 rounded-xl px-3 py-2 border border-neutral-200">
      <div class="flex items-center space-x-2 text-xs font-medium text-neutral-600">
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-accent-400 rounded-full"></div>
          <span>{{ undoRedoStore.getHistorySize().undo }}</span>
        </div>
        <div class="w-px h-3 bg-neutral-300"></div>
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-primary-400 rounded-full"></div>
          <span>{{ undoRedoStore.getHistorySize().redo }}</span>
        </div>
      </div>
    </div>
  </div>
</template> 
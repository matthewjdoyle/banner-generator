import { ref } from 'vue'

interface UseFileUploadOptions {
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { accept = 'image/*', maxSize = 10, multiple = false } = options

  const fileInput = ref<HTMLInputElement>()
  const isUploading = ref(false)
  const error = ref<string | null>(null)

  function triggerFileSelect() {
    fileInput.value?.click()
  }

  function validateFile(file: File): boolean {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      error.value = `File size must be less than ${maxSize}MB`
      return false
    }

    // Check file type if accept is specified
    if (accept && accept !== '*') {
      const acceptTypes = accept.split(',').map((type) => type.trim())
      const fileType = file.type
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`

      const isValidType = acceptTypes.some((acceptType) => {
        if (acceptType.startsWith('.')) {
          return acceptType === fileExtension
        }
        if (acceptType.includes('/*')) {
          return fileType.startsWith(acceptType.replace('/*', ''))
        }
        return fileType === acceptType
      })

      if (!isValidType) {
        error.value = `File type not supported. Accepted types: ${accept}`
        return false
      }
    }

    return true
  }

  async function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  async function handleFileSelect(event: Event, onFileLoad: (src: string, file: File) => void) {
    const input = event.target as HTMLInputElement
    const files = input.files

    if (!files || files.length === 0) return

    error.value = null
    isUploading.value = true

    try {
      const filesToProcess = multiple ? Array.from(files) : [files[0]]

      for (const file of filesToProcess) {
        if (!validateFile(file)) {
          isUploading.value = false
          return
        }

        const src = await readFileAsDataURL(file)
        onFileLoad(src, file)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to process file'
    } finally {
      isUploading.value = false
      // Reset input value to allow selecting the same file again
      if (input) input.value = ''
    }
  }

  function createFileInput(): HTMLInputElement {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.multiple = multiple
    input.style.display = 'none'

    input.addEventListener('change', (event) => {
      // This will be handled by the component using this composable
      console.log('File input changed', event)
    })

    return input
  }

  // Drag and drop handlers
  function handleDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  function handleDrop(event: DragEvent, onFileLoad: (src: string, file: File) => void) {
    event.preventDefault()
    event.stopPropagation()

    const files = event.dataTransfer?.files
    if (!files || files.length === 0) return

    // Create a mock event for handleFileSelect
    handleFileSelect({ target: { files } } as unknown as Event, onFileLoad)
  }

  return {
    fileInput,
    isUploading,
    error,
    triggerFileSelect,
    validateFile,
    readFileAsDataURL,
    handleFileSelect,
    createFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}

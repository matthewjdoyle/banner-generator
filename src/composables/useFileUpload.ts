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
  const uploadError = ref<string | null>(null)

  function triggerFileSelect() {
    fileInput.value?.click()
  }

  function validateFile(file: File): boolean {
    // Check file type
    if (accept !== '*/*' && !file.type.match(accept.replace('*', '.*'))) {
      uploadError.value = `Invalid file type. Expected: ${accept}`
      return false
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      uploadError.value = `File too large. Maximum size: ${maxSize}MB`
      return false
    }

    uploadError.value = null
    return true
  }

  async function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleFileSelect(event: Event, onFileLoad: (src: string, file: File) => void) {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (!files || files.length === 0) return

    isUploading.value = true
    uploadError.value = null

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (!validateFile(file)) {
          continue
        }

        const src = await readFileAsDataURL(file)
        onFileLoad(src, file)

        if (!multiple) break
      }
    } catch (error) {
      uploadError.value = 'Failed to read file'
      console.error('File upload error:', error)
    } finally {
      isUploading.value = false
      // Reset input value
      if (target) target.value = ''
    }
  }

  function createFileInput(): HTMLInputElement {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.multiple = multiple
    input.style.display = 'none'
    return input
  }

  // Drag and drop functionality
  const isDragOver = ref(false)

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
    isDragOver.value = true
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault()
    isDragOver.value = false
  }

  function handleDrop(event: DragEvent, onFileLoad: (src: string, file: File) => void) {
    event.preventDefault()
    isDragOver.value = false

    const files = event.dataTransfer?.files
    if (!files) return

    // Create a mock event for handleFileSelect
    const mockEvent = {
      target: { files },
    } as Event

    handleFileSelect(mockEvent, onFileLoad)
  }

  return {
    fileInput,
    isUploading,
    uploadError,
    isDragOver,
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

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBannerStore } from './banner'
import type { 
  TextElement, 
  BannerImage, 
  BannerIcon, 
  BackgroundOption, 
  BannerSize 
} from './banner'

// Command interface
export interface Command {
  execute(): void
  undo(): void
  description: string
}

// Command implementations
export class AddTextCommand implements Command {
  private bannerStore = useBannerStore()
  private textElement: Omit<TextElement, 'id'>
  private addedId: string | null = null

  constructor(textElement: Omit<TextElement, 'id'>) {
    this.textElement = textElement
  }

  execute(): void {
    this.bannerStore.addTextElement(this.textElement)
    this.addedId = this.bannerStore.textElements[this.bannerStore.textElements.length - 1].id
  }

  undo(): void {
    if (this.addedId) {
      this.bannerStore.removeTextElement(this.addedId)
    }
  }

  get description(): string {
    return `Add text: "${this.textElement.text}"`
  }
}

export class UpdateTextCommand implements Command {
  private bannerStore = useBannerStore()
  private id: string
  private newProperties: Partial<TextElement>
  private oldProperties: Partial<TextElement> = {}

  constructor(id: string, newProperties: Partial<TextElement>) {
    this.id = id
    this.newProperties = newProperties
  }

  execute(): void {
    const element = this.bannerStore.textElements.find(el => el.id === this.id)
    if (element) {
      // Store old properties for undo
      Object.keys(this.newProperties).forEach(key => {
        const typedKey = key as keyof TextElement
        this.oldProperties[typedKey] = element[typedKey] as any
      })
      this.bannerStore.updateTextElement(this.id, this.newProperties)
    }
  }

  undo(): void {
    this.bannerStore.updateTextElement(this.id, this.oldProperties)
  }

  get description(): string {
    const props = Object.keys(this.newProperties).join(', ')
    return `Update text properties: ${props}`
  }
}

export class RemoveTextCommand implements Command {
  private bannerStore = useBannerStore()
  private id: string
  private removedElement: TextElement | null = null

  constructor(id: string) {
    this.id = id
  }

  execute(): void {
    this.removedElement = this.bannerStore.textElements.find(el => el.id === this.id) || null
    this.bannerStore.removeTextElement(this.id)
  }

  undo(): void {
    if (this.removedElement) {
      this.bannerStore.addTextElement(this.removedElement)
    }
  }

  get description(): string {
    return `Remove text: "${this.removedElement?.text || 'Unknown'}"`
  }
}

export class AddImageCommand implements Command {
  private bannerStore = useBannerStore()
  private image: Omit<BannerImage, 'id'>
  private addedId: string | null = null

  constructor(image: Omit<BannerImage, 'id'>) {
    this.image = image
  }

  execute(): void {
    this.bannerStore.addImage(this.image)
    this.addedId = this.bannerStore.images[this.bannerStore.images.length - 1].id
  }

  undo(): void {
    if (this.addedId) {
      this.bannerStore.removeImage(this.addedId)
    }
  }

  get description(): string {
    return 'Add image'
  }
}

export class UpdateImageCommand implements Command {
  private bannerStore = useBannerStore()
  private id: string
  private newProperties: Partial<BannerImage>
  private oldProperties: Partial<BannerImage> = {}

  constructor(id: string, newProperties: Partial<BannerImage>) {
    this.id = id
    this.newProperties = newProperties
  }

  execute(): void {
    const image = this.bannerStore.images.find(img => img.id === this.id)
    if (image) {
      Object.keys(this.newProperties).forEach(key => {
        const typedKey = key as keyof BannerImage
        this.oldProperties[typedKey] = image[typedKey] as any
      })
      this.bannerStore.updateImage(this.id, this.newProperties)
    }
  }

  undo(): void {
    this.bannerStore.updateImage(this.id, this.oldProperties)
  }

  get description(): string {
    return 'Update image properties'
  }
}

export class RemoveImageCommand implements Command {
  private bannerStore = useBannerStore()
  private id: string
  private removedImage: BannerImage | null = null

  constructor(id: string) {
    this.id = id
  }

  execute(): void {
    this.removedImage = this.bannerStore.images.find(img => img.id === this.id) || null
    this.bannerStore.removeImage(this.id)
  }

  undo(): void {
    if (this.removedImage) {
      this.bannerStore.addImage(this.removedImage)
    }
  }

  get description(): string {
    return 'Remove image'
  }
}

export class AddIconCommand implements Command {
  private bannerStore = useBannerStore()
  private iconType: string
  private addedId: string | null = null

  constructor(iconType: string) {
    this.iconType = iconType
  }

  execute(): void {
    this.bannerStore.addIcon(this.iconType)
    this.addedId = this.bannerStore.icons[this.bannerStore.icons.length - 1].id
  }

  undo(): void {
    if (this.addedId) {
      this.bannerStore.removeIcon(this.addedId)
    }
  }

  get description(): string {
    return `Add icon: ${this.iconType}`
  }
}

export class UpdateIconCommand implements Command {
  private bannerStore = useBannerStore()
  private id: string
  private newProperties: Partial<BannerIcon>
  private oldProperties: Partial<BannerIcon> = {}

  constructor(id: string, newProperties: Partial<BannerIcon>) {
    this.id = id
    this.newProperties = newProperties
  }

  execute(): void {
    const icon = this.bannerStore.icons.find(ic => ic.id === this.id)
    if (icon) {
      Object.keys(this.newProperties).forEach(key => {
        const typedKey = key as keyof BannerIcon
        this.oldProperties[typedKey] = icon[typedKey] as any
      })
      this.bannerStore.updateIcon(this.id, this.newProperties)
    }
  }

  undo(): void {
    this.bannerStore.updateIcon(this.id, this.oldProperties)
  }

  get description(): string {
    return 'Update icon properties'
  }
}

export class RemoveIconCommand implements Command {
  private bannerStore = useBannerStore()
  private id: string
  private removedIcon: BannerIcon | null = null

  constructor(id: string) {
    this.id = id
  }

  execute(): void {
    this.removedIcon = this.bannerStore.icons.find(ic => ic.id === this.id) || null
    this.bannerStore.removeIcon(this.id)
  }

  undo(): void {
    if (this.removedIcon) {
      // Need to reconstruct the icon since addIcon only takes type
      this.bannerStore.addIcon(this.removedIcon.type)
      const newIcon = this.bannerStore.icons[this.bannerStore.icons.length - 1]
      if (newIcon && this.removedIcon) {
        this.bannerStore.updateIcon(newIcon.id, this.removedIcon)
      }
    }
  }

  get description(): string {
    return `Remove icon: ${this.removedIcon?.type || 'Unknown'}`
  }
}

export class ChangeBackgroundCommand implements Command {
  private bannerStore = useBannerStore()
  private newBackground: BackgroundOption
  private oldBackground: BackgroundOption

  constructor(newBackground: BackgroundOption) {
    this.newBackground = newBackground
    this.oldBackground = this.bannerStore.currentBackground
  }

  execute(): void {
    this.bannerStore.selectBackground(this.newBackground)
  }

  undo(): void {
    this.bannerStore.selectBackground(this.oldBackground)
  }

  get description(): string {
    return `Change background to: ${this.newBackground.name}`
  }
}

export class ChangeSizeCommand implements Command {
  private bannerStore = useBannerStore()
  private newSize: BannerSize
  private oldSize: BannerSize

  constructor(newSize: BannerSize) {
    this.newSize = newSize
    this.oldSize = this.bannerStore.currentSize
  }

  execute(): void {
    this.bannerStore.selectSize(this.newSize)
  }

  undo(): void {
    this.bannerStore.selectSize(this.oldSize)
  }

  get description(): string {
    return `Change size to: ${this.newSize.name}`
  }
}

export class ClearBannerCommand implements Command {
  private bannerStore = useBannerStore()
  private savedState: {
    textElements: TextElement[]
    images: BannerImage[]
    icons: BannerIcon[]
  } = {
    textElements: [],
    images: [],
    icons: []
  }

  execute(): void {
    // Save current state
    this.savedState = {
      textElements: [...this.bannerStore.textElements],
      images: [...this.bannerStore.images],
      icons: [...this.bannerStore.icons]
    }
    this.bannerStore.clearBanner()
  }

  undo(): void {
    // Restore saved state
    this.savedState.textElements.forEach(element => {
      this.bannerStore.addTextElement(element)
    })
    this.savedState.images.forEach(image => {
      this.bannerStore.addImage(image)
    })
    this.savedState.icons.forEach(icon => {
      this.bannerStore.addIcon(icon.type)
      const newIcon = this.bannerStore.icons[this.bannerStore.icons.length - 1]
      if (newIcon) {
        this.bannerStore.updateIcon(newIcon.id, icon)
      }
    })
  }

  get description(): string {
    return 'Clear all elements'
  }
}

// Undo/Redo Store
export const useUndoRedoStore = defineStore('undoRedo', () => {
  const undoStack = ref<Command[]>([])
  const redoStack = ref<Command[]>([])
  const maxHistorySize = ref(50)

  function executeCommand(command: Command) {
    command.execute()
    
    // Add to undo stack
    undoStack.value.push(command)
    
    // Clear redo stack since new action invalidates redo history
    redoStack.value = []
    
    // Limit history size
    if (undoStack.value.length > maxHistorySize.value) {
      undoStack.value.shift()
    }
  }

  function undo() {
    const command = undoStack.value.pop()
    if (command) {
      command.undo()
      redoStack.value.push(command)
    }
    return command
  }

  function redo() {
    const command = redoStack.value.pop()
    if (command) {
      command.execute()
      undoStack.value.push(command)
    }
    return command
  }

  function canUndo() {
    return undoStack.value.length > 0
  }

  function canRedo() {
    return redoStack.value.length > 0
  }

  function getUndoDescription() {
    const lastCommand = undoStack.value[undoStack.value.length - 1]
    return lastCommand?.description || ''
  }

  function getRedoDescription() {
    const lastCommand = redoStack.value[redoStack.value.length - 1]
    return lastCommand?.description || ''
  }

  function clearHistory() {
    undoStack.value = []
    redoStack.value = []
  }

  function getHistorySize() {
    return {
      undo: undoStack.value.length,
      redo: redoStack.value.length
    }
  }

  return {
    // State
    undoStack,
    redoStack,
    maxHistorySize,
    
    // Actions
    executeCommand,
    undo,
    redo,
    canUndo,
    canRedo,
    getUndoDescription,
    getRedoDescription,
    clearHistory,
    getHistorySize
  }
}) 
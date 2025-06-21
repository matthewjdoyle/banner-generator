import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import BannerCanvas from '../BannerCanvas.vue'
import { useBannerStore } from '@/stores/banner'

describe('BannerCanvas', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders canvas element', () => {
    const wrapper = mount(BannerCanvas)

    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('displays banner dimensions correctly', () => {
    const wrapper = mount(BannerCanvas)
    const store = useBannerStore()

    // Check if canvas exists and has proper attributes
    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
    expect(store.currentSize.width).toBeGreaterThan(0)
    expect(store.currentSize.height).toBeGreaterThan(0)
  })

  it('has proper canvas styling', () => {
    const wrapper = mount(BannerCanvas)
    const canvas = wrapper.find('canvas')

    expect(canvas.classes()).toContain('shadow-strong')
    expect(canvas.classes()).toContain('rounded-xl')
    expect(canvas.classes()).toContain('border')
    expect(canvas.classes()).toContain('border-neutral-200')
    expect(canvas.classes()).toContain('bg-white')
  })

  it('container has proper styling', () => {
    const wrapper = mount(BannerCanvas)
    const container = wrapper.find('.w-full.h-full')

    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
  })
})

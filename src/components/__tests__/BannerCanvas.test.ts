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

  it('displays banner dimensions in info overlay', () => {
    const wrapper = mount(BannerCanvas)
    const store = useBannerStore()
    
    const overlay = wrapper.find('.absolute.top-2.right-2')
    expect(overlay.text()).toContain(`${store.currentSize.width} × ${store.currentSize.height}px`)
  })

  it('has proper canvas styling', () => {
    const wrapper = mount(BannerCanvas)
    const canvas = wrapper.find('canvas')
    
    expect(canvas.classes()).toContain('shadow-lg')
    expect(canvas.classes()).toContain('rounded-lg')
    expect(canvas.classes()).toContain('border')
    expect(canvas.classes()).toContain('border-gray-300')
    expect(canvas.classes()).toContain('bg-white')
  })

  it('container has proper styling', () => {
    const wrapper = mount(BannerCanvas)
    const container = wrapper.find('.w-full.h-full')
    
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
    expect(container.classes()).toContain('p-4')
    expect(container.classes()).toContain('bg-gray-100')
    expect(container.classes()).toContain('rounded-lg')
  })
}) 
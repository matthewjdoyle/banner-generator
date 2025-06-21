import type { BannerSize } from '../types'

export const bannerSizes: BannerSize[] = [
  // Social Media
  {
    id: 'twitter-header',
    name: 'Twitter Header',
    width: 1500,
    height: 500,
    category: 'Social Media',
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Cover',
    width: 1640,
    height: 859,
    category: 'Social Media',
  },
  {
    id: 'linkedin-banner',
    name: 'LinkedIn Banner',
    width: 1584,
    height: 396,
    category: 'Social Media',
  },
  {
    id: 'youtube-channel',
    name: 'YouTube Channel Art',
    width: 2560,
    height: 1440,
    category: 'Social Media',
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    width: 1080,
    height: 1080,
    category: 'Social Media',
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    width: 1080,
    height: 1920,
    category: 'Social Media',
  },

  // Web & Digital
  { id: 'web-banner', name: 'Web Banner', width: 1200, height: 300, category: 'Web & Digital' },
  {
    id: 'email-header',
    name: 'Email Header',
    width: 600,
    height: 200,
    category: 'Web & Digital',
  },
  { id: 'blog-header', name: 'Blog Header', width: 1200, height: 400, category: 'Web & Digital' },

  // Print & Marketing
  {
    id: 'flyer-horizontal',
    name: 'Flyer (Horizontal)',
    width: 1920,
    height: 1080,
    category: 'Print & Marketing',
  },
  {
    id: 'poster-vertical',
    name: 'Poster (Vertical)',
    width: 1080,
    height: 1920,
    category: 'Print & Marketing',
  },

  // Custom
  { id: 'square-large', name: 'Square Large', width: 1200, height: 1200, category: 'Custom' },
  { id: 'wide-banner', name: 'Wide Banner', width: 1920, height: 600, category: 'Custom' },
  { id: 'custom-size', name: 'Custom Size', width: 1200, height: 600, category: 'Custom' },
]

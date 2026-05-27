import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'Mahmoud & Raghda — Wedding',
    short_name:       'M & R Wedding',
    description:      'Wedding invitation — June 26, 2026',
    start_url:        '/',
    display:          'browser',
    background_color: '#FAF5ED',
    theme_color:      '#B8922C',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}

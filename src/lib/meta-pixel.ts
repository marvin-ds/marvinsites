import type { ConsentState } from './consent'

const META_PIXEL_HOST = 'https://connect.facebook.net'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
    __marvinMetaPixelInitialized?: string
    __marvinMetaPageViewSent?: boolean
  }
}

export function isValidMetaPixelId(id: string | undefined): boolean {
  return typeof id === 'string' && /^\d{8,30}$/.test(id)
}

export function isMetaPixelLoaded(): boolean {
  return typeof window !== 'undefined' &&
    !!document.querySelector('script[data-meta-pixel-loaded]')
}

export function isMetaConsentEligible(state: Pick<ConsentState, 'ad_storage'> | null | undefined): boolean {
  return state?.ad_storage === 'granted'
}

export function loadMetaPixel(pixelId: string): void {
  if (typeof window === 'undefined') return
  if (!isValidMetaPixelId(pixelId)) return

  if (!window.fbq) {
    const fbq = function(...args: unknown[]) {
      ;(fbq as unknown as { callMethod?: (...args: unknown[]) => void; queue: unknown[][] }).callMethod
        ? (fbq as unknown as { callMethod: (...args: unknown[]) => void }).callMethod(...args)
        : (fbq as unknown as { queue: unknown[][] }).queue.push(args)
    } as unknown as ((...args: unknown[]) => void) & {
      queue: unknown[][]
      loaded: boolean
      version: string
    }
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq = fbq
  }

  if (window.__marvinMetaPixelInitialized !== pixelId) {
    window.fbq('init', pixelId)
    window.__marvinMetaPixelInitialized = pixelId
  }

  if (!isMetaPixelLoaded()) {
    const script = document.createElement('script')
    script.setAttribute('data-meta-pixel-loaded', '1')
    script.async = true
    script.src = `${META_PIXEL_HOST}/en_US/fbevents.js`
    document.head.appendChild(script)
  }

  if (!window.__marvinMetaPageViewSent) {
    window.fbq('track', 'PageView')
    window.__marvinMetaPageViewSent = true
  }
}

export function loadMetaPixelIfAllowed(pixelId: string, state: Pick<ConsentState, 'ad_storage'> | null | undefined): void {
  if (!isMetaConsentEligible(state)) return
  loadMetaPixel(pixelId)
}

export function trackMetaLeadSubmitted(eventId: string | undefined): void {
  if (typeof window === 'undefined') return
  if (!window.fbq || !eventId) return
  window.fbq('trackCustom', 'LeadSubmitted', {}, { eventID: eventId })
}

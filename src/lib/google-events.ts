import type { ConsentState } from './consent'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    __marvinGrantedPageViewSent?: boolean
  }
}

export function isValidGa4MeasurementId(id: string | undefined): boolean {
  return typeof id === 'string' && /^G-[A-Z0-9]+$/.test(id)
}

export function trackGrantedGooglePageView(measurementId: string | undefined, state: Pick<ConsentState, 'analytics_storage'>): void {
  if (typeof window === 'undefined') return
  if (state.analytics_storage !== 'granted') return
  if (!isValidGa4MeasurementId(measurementId)) return
  if (window.__marvinGrantedPageViewSent) return

  window.__marvinGrantedPageViewSent = true
  window.setTimeout(() => {
    window.gtag('event', 'page_view', {
      send_to: measurementId,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, 750)
}

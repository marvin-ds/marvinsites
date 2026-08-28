import type { ConsentState } from './consent'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}

export function initDataLayer(): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
}

export function pushDataLayer(event: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  initDataLayer()
  window.dataLayer.push(event)
}

function consentPayload(state: ConsentState) {
  return {
    analytics_storage: state.analytics_storage,
    ad_storage: state.ad_storage,
    ad_user_data: state.ad_user_data,
    ad_personalization: state.ad_personalization,
  }
}

export function pushConsentDefault(state: ConsentState): void {
  pushDataLayer({
    event: 'consent',
    0: 'default',
    1: consentPayload(state),
  })
  // Also emit via gtag-compatible format
  pushDataLayer(['consent', 'default', consentPayload(state)] as unknown as Record<string, unknown>)
}

export function pushConsentUpdate(state: ConsentState): void {
  pushDataLayer(['consent', 'update', consentPayload(state)] as unknown as Record<string, unknown>)
}

export function pushConsentInitialized(state: ConsentState): void {
  pushDataLayer({
    event: 'consent_initialized',
    consent_version: state.version,
    ...consentPayload(state),
  })
}

export function pushConsentUpdated(state: ConsentState): void {
  pushDataLayer({
    event: 'consent_updated',
    consent_version: state.version,
    ...consentPayload(state),
  })
}

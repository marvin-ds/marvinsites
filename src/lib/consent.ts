export const CONSENT_STORAGE_KEY = 'marvin_consent_v2'
export const CONSENT_LEGACY_KEY = 'marvin_cookie_consent'
export const CONSENT_VERSION = 'g2-v1'

export type ConsentValue = 'granted' | 'denied'

export interface ConsentState {
  version: string
  updatedAt: string
  analytics_storage: ConsentValue
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
}

export const DEFAULT_CONSENT: ConsentState = {
  version: CONSENT_VERSION,
  updatedAt: '',
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
}

export function getDefaultConsent(): ConsentState {
  return { ...DEFAULT_CONSENT }
}

export function readStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(state: ConsentState): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // silently ignore storage errors
  }
}

/**
 * Returns true if the legacy key exists but the new v2 key does not.
 * In this case the user MUST see the banner again.
 */
export function hasLegacyConsentOnly(): boolean {
  try {
    const hasLegacy = localStorage.getItem(CONSENT_LEGACY_KEY) !== null
    const hasV2 = localStorage.getItem(CONSENT_STORAGE_KEY) !== null
    return hasLegacy && !hasV2
  } catch {
    return false
  }
}

/**
 * GTM is eligible to load if the user granted at least analytics or ad storage.
 */
export function isGtmEligible(state: ConsentState): boolean {
  return state.analytics_storage === 'granted' || state.ad_storage === 'granted'
}

/**
 * ad_personalization can only be granted if both ad_storage and ad_user_data are granted.
 */
export function applyDependencies(state: ConsentState): ConsentState {
  const result = { ...state }
  if (result.ad_storage === 'denied' || result.ad_user_data === 'denied') {
    result.ad_personalization = 'denied'
  }
  return result
}

export function buildAcceptAll(): ConsentState {
  return applyDependencies({
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
}

export function buildRejectAll(): ConsentState {
  return {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  }
}

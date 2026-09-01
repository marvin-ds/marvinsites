export const ATTRIBUTION_VERSION = 'g3-v1'
export const ATTRIBUTION_STORAGE_KEY = 'marvin_attribution_v1'
export const SESSION_STORAGE_KEY = 'marvin_session_v1'

const ATTRIBUTION_TTL_DAYS = 90
const VALUE_LIMIT = 160
const URL_LIMIT = 512

const ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
] as const

const SEARCH_HOSTS = [
  'google.',
  'bing.com',
  'yahoo.',
  'duckduckgo.com',
  'ecosia.org',
]

type AttributionParam = typeof ATTRIBUTION_PARAMS[number]

export type AttributionSignal = 'explicit' | 'click_id' | 'organic' | 'referral' | 'direct'

export interface AttributionParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_id?: string
  utm_content?: string
  utm_term?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
}

export interface TouchContext extends AttributionParams {
  touchedAt: string
  source: string
  medium: string
  campaign?: string
  campaignId?: string
  content?: string
  term?: string
  landingPage: string
  referrer?: string
  signal: AttributionSignal
}

export interface AttributionState {
  version: string
  createdAt: string
  updatedAt: string
  expiresAt: string
  firstTouch: TouchContext
  lastTouch: TouchContext
}

export interface AttributionSnapshot {
  attribution_version: string
  session_id: string
  first_touch_at: string
  first_source: string
  first_medium: string
  first_campaign?: string
  first_campaign_id?: string
  first_content?: string
  first_term?: string
  first_referrer?: string
  first_landing_page: string
  first_gclid?: string
  first_gbraid?: string
  first_wbraid?: string
  first_fbclid?: string
  last_touch_at: string
  last_source: string
  last_medium: string
  last_campaign?: string
  last_campaign_id?: string
  last_content?: string
  last_term?: string
  last_referrer?: string
  last_landing_page: string
  last_gclid?: string
  last_gbraid?: string
  last_wbraid?: string
  last_fbclid?: string
}

interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

interface BrowserContext {
  href: string
  referrer?: string
  now?: Date
  localStorage?: StorageLike
  sessionStorage?: StorageLike
  sessionId?: string
}

declare global {
  interface Window {
    marvinAttribution?: AttributionSnapshot
  }
}

export function sanitizeValue(value: unknown, limit = VALUE_LIMIT): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .slice(0, limit)
  return normalized || undefined
}

export function parseAttributionParams(search: string): AttributionParams {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  const result: AttributionParams = {}

  for (const key of ATTRIBUTION_PARAMS) {
    const value = sanitizeValue(params.get(key))
    if (value) result[key] = value
  }

  return result
}

export function buildLandingPage(href: string): string {
  try {
    const url = new URL(href)
    const clean = new URLSearchParams()
    for (const key of ATTRIBUTION_PARAMS) {
      const value = sanitizeValue(url.searchParams.get(key))
      if (value) clean.set(key, value)
    }
    const query = clean.toString()
    return sanitizeValue(`${url.pathname}${query ? `?${query}` : ''}`, URL_LIMIT) || '/'
  } catch {
    return '/'
  }
}

export function normalizeReferrer(referrer: string | undefined, currentHref: string): string | undefined {
  const value = sanitizeValue(referrer, URL_LIMIT)
  if (!value) return undefined

  try {
    const ref = new URL(value)
    const current = new URL(currentHref)
    if (ref.hostname === current.hostname) return undefined
    return sanitizeValue(`${ref.protocol}//${ref.hostname}${ref.pathname}`, URL_LIMIT)
  } catch {
    return undefined
  }
}

function inferTouch(params: AttributionParams, landingPage: string, referrer: string | undefined, now: Date): TouchContext | null {
  const hasUtm = Boolean(params.utm_source || params.utm_medium || params.utm_campaign || params.utm_id || params.utm_content || params.utm_term)
  const hasGoogleClick = Boolean(params.gclid || params.gbraid || params.wbraid)
  const hasFacebookClick = Boolean(params.fbclid)

  let source = params.utm_source
  let medium = params.utm_medium
  let signal: AttributionSignal | null = null

  if (hasUtm) {
    signal = 'explicit'
  } else if (hasGoogleClick) {
    source = 'google'
    medium = 'cpc'
    signal = 'click_id'
  } else if (hasFacebookClick) {
    source = 'facebook'
    medium = 'paid_social'
    signal = 'click_id'
  } else if (referrer) {
    try {
      const host = new URL(referrer).hostname
      const isOrganic = SEARCH_HOSTS.some((searchHost) => host.includes(searchHost))
      source = isOrganic && host.includes('google.') ? 'google' : host
      medium = isOrganic ? 'organic' : 'referral'
      signal = isOrganic ? 'organic' : 'referral'
    } catch {
      source = 'unknown'
      medium = 'referral'
      signal = 'referral'
    }
  } else {
    source = 'direct'
    medium = 'none'
    signal = 'direct'
  }

  return {
    touchedAt: now.toISOString(),
    source: source || 'unknown',
    medium: medium || 'unknown',
    campaign: params.utm_campaign,
    campaignId: params.utm_id,
    content: params.utm_content,
    term: params.utm_term,
    landingPage,
    referrer,
    signal,
    ...params,
  }
}

function hasUsefulNewContext(touch: TouchContext): boolean {
  return touch.signal !== 'direct'
}

function expiresAtFrom(now: Date): string {
  const expiresAt = new Date(now)
  expiresAt.setDate(expiresAt.getDate() + ATTRIBUTION_TTL_DAYS)
  return expiresAt.toISOString()
}

export function readStoredAttribution(storage: StorageLike | undefined, now = new Date()): AttributionState | null {
  if (!storage) return null
  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AttributionState
    if (!parsed || parsed.version !== ATTRIBUTION_VERSION) return null
    if (!parsed.firstTouch || !parsed.lastTouch || !parsed.expiresAt) return null
    if (Date.parse(parsed.expiresAt) <= now.getTime()) return null
    return parsed
  } catch {
    try {
      storage.removeItem(ATTRIBUTION_STORAGE_KEY)
    } catch {}
    return null
  }
}

export function updateAttribution(context: BrowserContext): AttributionState {
  const now = context.now ?? new Date()
  const params = parseAttributionParams(new URL(context.href).search)
  const landingPage = buildLandingPage(context.href)
  const referrer = normalizeReferrer(context.referrer, context.href)
  const currentTouch = inferTouch(params, landingPage, referrer, now)
  const stored = readStoredAttribution(context.localStorage, now)

  const state: AttributionState = stored
    ? {
        ...stored,
        updatedAt: now.toISOString(),
        expiresAt: expiresAtFrom(now),
        lastTouch: currentTouch && hasUsefulNewContext(currentTouch)
          ? currentTouch
          : stored.lastTouch,
      }
    : {
        version: ATTRIBUTION_VERSION,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        expiresAt: expiresAtFrom(now),
        firstTouch: currentTouch!,
        lastTouch: currentTouch!,
      }

  try {
    context.localStorage?.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(state))
  } catch {}

  return state
}

export function getOrCreateSessionId(storage: StorageLike | undefined, fallbackId?: string): string {
  const fallback = fallbackId || createSessionId()
  if (!storage) return fallback

  try {
    const stored = sanitizeValue(storage.getItem(SESSION_STORAGE_KEY), 80)
    if (stored) return stored
    storage.setItem(SESSION_STORAGE_KEY, fallback)
    return fallback
  } catch {
    return fallback
  }
}

export function createSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  const bytes = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes)
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

export function buildAttributionSnapshot(state: AttributionState, sessionId: string): AttributionSnapshot {
  return {
    attribution_version: state.version,
    session_id: sessionId,
    first_touch_at: state.firstTouch.touchedAt,
    first_source: state.firstTouch.source,
    first_medium: state.firstTouch.medium,
    first_campaign: state.firstTouch.campaign,
    first_campaign_id: state.firstTouch.campaignId,
    first_content: state.firstTouch.content,
    first_term: state.firstTouch.term,
    first_referrer: state.firstTouch.referrer,
    first_landing_page: state.firstTouch.landingPage,
    first_gclid: state.firstTouch.gclid,
    first_gbraid: state.firstTouch.gbraid,
    first_wbraid: state.firstTouch.wbraid,
    first_fbclid: state.firstTouch.fbclid,
    last_touch_at: state.lastTouch.touchedAt,
    last_source: state.lastTouch.source,
    last_medium: state.lastTouch.medium,
    last_campaign: state.lastTouch.campaign,
    last_campaign_id: state.lastTouch.campaignId,
    last_content: state.lastTouch.content,
    last_term: state.lastTouch.term,
    last_referrer: state.lastTouch.referrer,
    last_landing_page: state.lastTouch.landingPage,
    last_gclid: state.lastTouch.gclid,
    last_gbraid: state.lastTouch.gbraid,
    last_wbraid: state.lastTouch.wbraid,
    last_fbclid: state.lastTouch.fbclid,
  }
}

export function dataLayerAttributionPayload(snapshot: AttributionSnapshot): Record<string, unknown> {
  return {
    attribution_version: snapshot.attribution_version,
    session_id: snapshot.session_id,
    source: snapshot.last_source,
    medium: snapshot.last_medium,
    campaign: snapshot.last_campaign,
    campaign_id: snapshot.last_campaign_id,
    content: snapshot.last_content,
    term: snapshot.last_term,
    has_gclid: Boolean(snapshot.last_gclid || snapshot.first_gclid),
    has_gbraid: Boolean(snapshot.last_gbraid || snapshot.first_gbraid),
    has_wbraid: Boolean(snapshot.last_wbraid || snapshot.first_wbraid),
    has_fbclid: Boolean(snapshot.last_fbclid || snapshot.first_fbclid),
  }
}

export function initAttribution(): AttributionSnapshot | null {
  if (typeof window === 'undefined') return null

  try {
    const previous = readStoredAttribution(window.localStorage)
    const state = updateAttribution({
      href: window.location.href,
      referrer: document.referrer,
      localStorage: window.localStorage,
      sessionStorage: window.sessionStorage,
    })
    const sessionId = getOrCreateSessionId(window.sessionStorage)
    const snapshot = buildAttributionSnapshot(state, sessionId)
    window.marvinAttribution = snapshot
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: previous ? 'attribution_updated' : 'attribution_initialized',
      ...dataLayerAttributionPayload(snapshot),
    })
    document.dispatchEvent(new CustomEvent('marvin:attribution-ready', { detail: snapshot }))
    return snapshot
  } catch {
    return null
  }
}

export function attributionFormFields(snapshot: AttributionSnapshot): Record<string, string> {
  const last = {
    attribution_version: snapshot.attribution_version,
    session_id: snapshot.session_id,
    utm_source: snapshot.last_source,
    utm_medium: snapshot.last_medium,
    utm_campaign: snapshot.last_campaign,
    utm_id: snapshot.last_campaign_id,
    utm_content: snapshot.last_content,
    utm_term: snapshot.last_term,
    gclid: snapshot.last_gclid,
    gbraid: snapshot.last_gbraid,
    wbraid: snapshot.last_wbraid,
    fbclid: snapshot.last_fbclid,
    landing_page: snapshot.last_landing_page,
    referrer: snapshot.last_referrer,
  }

  return Object.fromEntries(
    Object.entries(last).filter(([, value]) => typeof value === 'string' && value.length > 0)
  ) as Record<string, string>
}

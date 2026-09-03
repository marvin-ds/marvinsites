export const VALID_PLACEMENTS = [
  'header',
  'floating',
  'hero',
  'plans',
  'faq',
  'diagnostic',
  'footer',
] as const

export type WppPlacement = typeof VALID_PLACEMENTS[number]

export function isValidPlacement(value: unknown): value is WppPlacement {
  return typeof value === 'string' && (VALID_PLACEMENTS as readonly string[]).includes(value)
}

const REF_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const REF_LENGTH = 4

export function generateRef(): string {
  const bytes = new Uint8Array(REF_LENGTH)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < REF_LENGTH; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  return 'MS-' + Array.from(bytes, (b) => REF_CHARS[b % REF_CHARS.length]).join('')
}

export function isValidRef(ref: string): boolean {
  return /^MS-[A-Z0-9]{4}$/.test(ref)
}

export function sanitizePage(page: unknown): string {
  if (typeof page !== 'string') return '/'
  try {
    const url = new URL(page, 'https://x')
    return url.pathname.slice(0, 256) || '/'
  } catch {
    return '/'
  }
}

export function appendRefToWaUrl(waUrl: string, ref: string): string {
  try {
    const url = new URL(waUrl)
    const text = url.searchParams.get('text') || ''
    url.searchParams.set('text', `${text} [${ref}]`.trimStart())
    return url.toString()
  } catch {
    return waUrl
  }
}

export interface TrackClickPayload {
  ref: string
  placement: WppPlacement
  page: string
  session_id: string
}

export function buildTrackPayload(
  placement: WppPlacement,
  page: string,
  sessionId: string,
): TrackClickPayload {
  return {
    ref: generateRef(),
    placement,
    page: sanitizePage(page),
    session_id: (sessionId || '').slice(0, 128),
  }
}

const GTM_HOST = 'https://www.googletagmanager.com'

export function isValidGtmId(id: string | undefined): boolean {
  return typeof id === 'string' && /^GTM-[A-Z0-9]+$/.test(id)
}

export function isGtmLoaded(): boolean {
  return typeof window !== 'undefined' &&
    !!document.querySelector('script[data-gtm-loaded]')
}

export function loadGtm(gtmId: string): void {
  if (typeof window === 'undefined') return
  if (isGtmLoaded()) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  })

  const script = document.createElement('script')
  script.setAttribute('data-gtm-loaded', '1')
  script.async = true
  script.src = `${GTM_HOST}/gtm.js?id=${gtmId}`
  document.head.appendChild(script)
}

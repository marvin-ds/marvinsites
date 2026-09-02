# G2 — Consentimento, GTM e GA4

## Arquitetura de Consent Mode v2

### Fluxo

1. Script inline no `<head>` (antes de qualquer outro script) emite `gtag('consent', 'default', all_denied)`
2. Lê `marvin_consent_v2` do localStorage
3. Se encontrar estado válido com versão `g2-v1`: emite `consent update` e carrega GTM se elegível
4. Componentes Astro (`ConsentBanner`, `ConsentPreferences`) controlam UI e persistência

### Storage

| Chave | Descrição |
|---|---|
| `marvin_consent_v2` | Estado atual — JSON com version, updatedAt, 4 estados |
| `marvin_cookie_consent` | Legacy (banner antigo) — detectado mas NÃO promovido |

### Versionamento

`CONSENT_VERSION = 'g2-v1'` — ao mudar a versão, todos os usuários verão o banner novamente.

### Módulos

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/consent.ts` | Lógica pura — read/save/build/validate |
| `src/lib/gtm.ts` | Loader GTM — idempotente, valida ID |
| `src/lib/datalayer.ts` | Push ao dataLayer — consent/events |
| `src/components/consent/ConsentBanner.astro` | Banner fixo inferior com 3 ações |
| `src/components/consent/ConsentPreferences.astro` | Modal com toggles por categoria |

---

## Diferença G2A e G2B

| | G2A (este gate) | G2B (próximo gate) |
|---|---|---|
| GTM ID | Vazio (sem requests) | GTM-... real |
| GA4 | Não configurado | G-... real (via GTM) |
| CSP | Inalterada | Adicionar googletagmanager.com |
| GTM Preview | Não | Sim |
| Produção | Não alterada | Preview → merge → deploy |

---

## Próximas ações manuais (G2B)

### GTM
1. Acessar tagmanager.google.com
2. Criar Web Container (ou confirmar existente)
3. Obter ID no formato `GTM-XXXXXXX`
4. Configurar variável de ambiente no Netlify: `PUBLIC_GTM_ID=GTM-XXXXXXX`
5. Dentro do GTM: criar Google Tag / GA4 com Measurement ID

### GA4
1. Acessar analytics.google.com
2. Criar property + Web Data Stream para marvinsites.com.br
3. Obter Measurement ID no formato `G-XXXXXXXXXX`
4. Configurar dentro do GTM (não diretamente no código)

### CSP (netlify.toml)

Estado atual após validação pré-merge do G4:

```
script-src: 'self' 'unsafe-inline' https://analytics.umami.is https://*.googletagmanager.com https://tagmanager.google.com
style-src: 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://tagmanager.google.com
font-src: 'self' https://fonts.gstatic.com data:
img-src: 'self' data: https:
connect-src: 'self' https://analytics.umami.is https://api.resend.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com
```

`unsafe-eval` permanece proibido. O allowlist de Google cobre GA4/GTM e Tag
Assistant sem liberar `*.google.com` de forma genérica.

---

## Basic Consent Mode — noscript iframe

O noscript GTM iframe (`<noscript><iframe src="...">`) foi **omitido intencionalmente** no G2A e G2B.

**Razão:** Em Basic Consent Mode, o iframe noscript não é necessário para conformidade com Consent Mode v2. Usuários sem JS são minoria irrelevante para o funil de conversão deste site.

**Revisitar:** quando GA4/GTM estiverem ativos, avaliar se o noscript iframe agrega valor real.

---

## Nota: app.marvinsites.com.br

Quando o app SaaS existir, avaliar extensão da estratégia de consentimento para o subdomínio Vercel. Os estados de consentimento são domain-scoped (localStorage) — não compartilhados entre domínios por padrão.

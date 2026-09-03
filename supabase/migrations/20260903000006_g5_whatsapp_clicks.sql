-- G5: WhatsApp click attribution
-- Records non-PII click events for WhatsApp CTA attribution.
-- No personal data is stored here: session_id is opaque, placement is an enum,
-- page is pathname only, whatsapp_ref is a random opaque code.

create table if not exists public.whatsapp_clicks (
  id           uuid        primary key default gen_random_uuid(),
  session_id   text        not null,
  whatsapp_ref text        not null,
  placement    text        not null,
  page         text        not null,
  created_at   timestamptz not null default now()
);

create unique index whatsapp_clicks_ref_unique
  on public.whatsapp_clicks (whatsapp_ref);

create index whatsapp_clicks_session_id_idx
  on public.whatsapp_clicks (session_id);

create index whatsapp_clicks_created_at_idx
  on public.whatsapp_clicks (created_at);

-- RLS: deny-by-default. Only the server-side function using service_role may insert.
alter table public.whatsapp_clicks enable row level security;

comment on table public.whatsapp_clicks is
  'G5: non-PII WhatsApp CTA click records for attribution. Inserted by the whatsapp-click server function only.';

-- PostgREST requires explicit table-level grants even for service_role.
-- service_role needs INSERT to write click records via the REST API.
grant insert on public.whatsapp_clicks to service_role;
grant select on public.whatsapp_clicks to service_role;

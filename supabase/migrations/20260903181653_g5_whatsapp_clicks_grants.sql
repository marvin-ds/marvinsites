-- G5 corrective: PostgREST requires explicit table-level grants.
-- service_role needs INSERT/SELECT to write click records via the REST API.
grant insert on public.whatsapp_clicks to service_role;
grant select on public.whatsapp_clicks to service_role;

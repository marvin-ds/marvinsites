begin;

select plan(12);

-- ─── Table exists ────────────────────────────────────────────────────────────

select has_table('public', 'whatsapp_clicks', 'whatsapp_clicks table exists');

-- ─── Columns ─────────────────────────────────────────────────────────────────

select has_column('public', 'whatsapp_clicks', 'id',           'has id');
select has_column('public', 'whatsapp_clicks', 'session_id',   'has session_id');
select has_column('public', 'whatsapp_clicks', 'whatsapp_ref', 'has whatsapp_ref');
select has_column('public', 'whatsapp_clicks', 'placement',    'has placement');
select has_column('public', 'whatsapp_clicks', 'page',         'has page');
select has_column('public', 'whatsapp_clicks', 'created_at',   'has created_at');

-- ─── Unique index on whatsapp_ref ────────────────────────────────────────────

select has_index(
  'public', 'whatsapp_clicks', 'whatsapp_clicks_ref_unique',
  'whatsapp_ref has unique index'
);

-- ─── RLS enabled ─────────────────────────────────────────────────────────────

select ok(
  (select rowsecurity from pg_tables where schemaname = 'public' and tablename = 'whatsapp_clicks'),
  'RLS is enabled on whatsapp_clicks'
);

-- ─── anon cannot insert ──────────────────────────────────────────────────────

set local role anon;

select throws_ok(
  $$insert into public.whatsapp_clicks (session_id, whatsapp_ref, placement, page)
    values ('s1', 'MS-ABCD', 'hero', '/')$$,
  'anon cannot insert into whatsapp_clicks'
);

set local role postgres;

-- ─── service_role can insert ─────────────────────────────────────────────────

set local role service_role;

select lives_ok(
  $$insert into public.whatsapp_clicks (session_id, whatsapp_ref, placement, page)
    values ('test-session', 'MS-TEST', 'hero', '/')$$,
  'service_role can insert into whatsapp_clicks'
);

-- ─── Duplicate ref is rejected ───────────────────────────────────────────────

select throws_ok(
  $$insert into public.whatsapp_clicks (session_id, whatsapp_ref, placement, page)
    values ('test-session-2', 'MS-TEST', 'header', '/outras')$$,
  'duplicate whatsapp_ref is rejected'
);

set local role postgres;

select * from finish();
rollback;

-- Doar pentru un proiect nou. Dacă ai rulat deja acest script, nu îl repeta.
begin;
create table public.trades (
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 id text not null,
 payload jsonb not null check(jsonb_typeof(payload)='object'),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 primary key(user_id,id)
);
alter table public.trades enable row level security;
revoke all on public.trades from anon;
grant select,insert,update,delete on public.trades to authenticated;
create policy "trades_owner_only" on public.trades for all to authenticated
 using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('trade-screenshots','trade-screenshots',false,6291456,array['image/png','image/jpeg','image/webp']);
create policy "trade_screenshots_owner_only" on storage.objects for all to authenticated
 using(bucket_id='trade-screenshots' and (storage.foldername(name))[1]=(select auth.uid()::text))
 with check(bucket_id='trade-screenshots' and (storage.foldername(name))[1]=(select auth.uid()::text));
commit;

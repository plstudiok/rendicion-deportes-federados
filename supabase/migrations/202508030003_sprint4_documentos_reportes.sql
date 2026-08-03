create table if not exists public.comprobantes (
  id uuid primary key default gen_random_uuid(),
  movimiento_id uuid not null references public.movimientos(id) on delete cascade,
  nombre text not null,
  tipo text not null,
  url text not null,
  size bigint not null check (size > 0 and size <= 10485760),
  created_at timestamp with time zone not null default now(),
  constraint comprobantes_nombre_not_blank check (length(btrim(nombre)) > 0)
);

create index if not exists comprobantes_movimiento_id_idx on public.comprobantes (movimiento_id);
alter table public.comprobantes enable row level security;
drop policy if exists comprobantes_public_access on public.comprobantes;
create policy comprobantes_public_access on public.comprobantes for all to anon, authenticated using (true) with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('comprobantes', 'comprobantes', true, 10485760, array['application/pdf', 'image/png', 'image/jpeg']::text[])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists comprobantes_storage_public_access on storage.objects;
create policy comprobantes_storage_public_access on storage.objects for all to anon, authenticated
using (bucket_id = 'comprobantes') with check (bucket_id = 'comprobantes');

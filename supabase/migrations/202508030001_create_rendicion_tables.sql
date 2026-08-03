create extension if not exists "pgcrypto";

create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  deporte text not null,
  nombre text not null,
  estado text not null default 'Planificado',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint eventos_nombre_not_blank check (length(btrim(nombre)) > 0),
  constraint eventos_deporte_check check (deporte in (U&'B\00E1squet', U&'V\00F3ley', U&'Pat\00EDn', 'Hockey')),
  constraint eventos_estado_check check (estado in ('Planificado', U&'En curso', 'Cerrado'))
);

create table if not exists public.movimientos (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid not null,
  fecha date not null,
  tipo text not null,
  categoria text not null,
  concepto text not null,
  importe numeric(12, 2) not null,
  observaciones text,
  usuario text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint movimientos_evento_id_fkey foreign key (evento_id) references public.eventos(id) on delete cascade,
  constraint movimientos_tipo_check check (tipo in ('Ingreso', 'Gasto')),
  constraint movimientos_categoria_check check (
    (tipo = 'Ingreso' and categoria in ('Entradas', 'Otros'))
    or (tipo = 'Gasto' and categoria in (U&'\00C1rbitros', 'Planilleros', 'Boleteros', U&'Param\00E9dicos', 'Seguridad', 'Limpieza', 'Otros'))
  ),
  constraint movimientos_concepto_not_blank check (length(btrim(concepto)) > 0),
  constraint movimientos_usuario_not_blank check (length(btrim(usuario)) > 0),
  constraint movimientos_importe_positive check (importe > 0)
);

create index if not exists eventos_fecha_idx on public.eventos (fecha desc);
create index if not exists eventos_deporte_idx on public.eventos (deporte);
create index if not exists eventos_estado_idx on public.eventos (estado);
create index if not exists movimientos_evento_id_idx on public.movimientos (evento_id);
create index if not exists movimientos_fecha_idx on public.movimientos (fecha desc);
create index if not exists movimientos_tipo_idx on public.movimientos (tipo);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists eventos_set_updated_at on public.eventos;
create trigger eventos_set_updated_at
before update on public.eventos
for each row execute function public.set_updated_at();

drop trigger if exists movimientos_set_updated_at on public.movimientos;
create trigger movimientos_set_updated_at
before update on public.movimientos
for each row execute function public.set_updated_at();

alter table public.eventos enable row level security;
alter table public.movimientos enable row level security;

drop policy if exists eventos_public_access on public.eventos;
create policy eventos_public_access
on public.eventos for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists movimientos_public_access on public.movimientos;
create policy movimientos_public_access
on public.movimientos for all
to anon, authenticated
using (true)
with check (true);

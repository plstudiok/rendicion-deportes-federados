alter table public.eventos add column if not exists observaciones text not null default '';

alter table public.eventos drop constraint if exists eventos_estado_check;
update public.eventos set estado = 'Finalizado' where estado = 'Cerrado';
alter table public.eventos add constraint eventos_estado_check check (estado in ('Planificado', U&'En curso', 'Finalizado', 'Rendido'));

alter table public.movimientos drop constraint if exists movimientos_categoria_check;
update public.movimientos set categoria = 'Otros' where categoria = 'Boleteros';
alter table public.movimientos add constraint movimientos_categoria_check check (
  (tipo = 'Ingreso' and categoria in ('Entradas', 'Buffet', 'Sponsors', 'Publicidad', 'Otros'))
  or (tipo = 'Gasto' and categoria in (U&'\00C1rbitros', 'Planilleros', U&'Param\00E9dicos', 'Seguridad', 'Limpieza', 'Transporte', 'Insumos', 'Otros'))
);

create or replace function public.prevent_movements_for_rendido()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if exists (select 1 from public.eventos where id = new.evento_id and estado = 'Rendido') then
    raise exception 'No se pueden agregar movimientos a un evento rendido';
  end if;
  return new;
end;
$$;

drop trigger if exists movimientos_prevent_rendido on public.movimientos;
create trigger movimientos_prevent_rendido
before insert or update on public.movimientos
for each row execute function public.prevent_movements_for_rendido();

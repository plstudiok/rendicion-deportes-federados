export type Sport = 'Básquet' | 'Vóley' | 'Patín' | 'Hockey';
export type EventStatus = 'Planificado' | 'En curso' | 'Finalizado' | 'Rendido';
export type MovementType = 'Ingreso' | 'Gasto';
export type IconName = 'layout-dashboard' | 'calendar-days' | 'arrow-left-right' | 'chart-no-axes-combined' | 'settings-2';
export interface NavigationItem { label: string; href: string; icon: IconName; }
export interface Event { id: string; fecha: string; deporte: Sport; nombre: string; estado: EventStatus; observaciones: string; created_at: string; updated_at: string; }
export interface Movement { id: string; evento_id: string; fecha: string; tipo: MovementType; categoria: string; concepto: string; importe: number; observaciones: string | null; usuario: string; created_at: string; updated_at: string; }
export interface Receipt { id: string; movimiento_id: string; nombre: string; tipo: string; url: string; size: number; created_at: string; }
export interface JournalMovement extends Movement { evento: Pick<Event, 'nombre' | 'deporte'>; receiptsCount: number; }
export interface EventSummary extends Event { ingresos: number; gastos: number; balance: number; movimientosCount: number; }
export interface Database { public: { Tables: { eventos: { Row: Event; Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<Event, 'id' | 'created_at' | 'updated_at'>>; Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>; Relationships: []; }; movimientos: { Row: Movement; Insert: Omit<Movement, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<Movement, 'id' | 'created_at' | 'updated_at'>>; Update: Partial<Omit<Movement, 'id' | 'created_at' | 'updated_at'>>; Relationships: []; }; }; Views: Record<string, never>; Functions: Record<string, never>; Enums: Record<string, never>; CompositeTypes: Record<string, never>; }; }
export const sports: Sport[] = ['Básquet', 'Vóley', 'Patín', 'Hockey'];
export const eventStatuses: EventStatus[] = ['Planificado', 'En curso', 'Finalizado', 'Rendido'];
export const movementTypes: MovementType[] = ['Ingreso', 'Gasto'];
export const incomeCategories = ['Entradas', 'Buffet', 'Sponsors', 'Publicidad', 'Otros'] as const;
export const expenseCategories = ['Árbitros', 'Planilleros', 'Paramédicos', 'Seguridad', 'Limpieza', 'Transporte', 'Insumos', 'Otros'] as const;

import type { Movement, MovementType } from '@/types';
import { requireSupabase } from '@/services/supabase';
export interface MovementInput { evento_id: string; fecha: string; tipo: MovementType; categoria: string; concepto: string; importe: number; observaciones?: string; usuario: string; }
export async function getMovements(eventId: string): Promise<Movement[]> { const { data, error } = await requireSupabase().from('movimientos').select('*').eq('evento_id', eventId).order('fecha', { ascending: false }); if (error) throw error; return data; }
export async function createMovement(input: MovementInput): Promise<Movement> { const { data, error } = await requireSupabase().from('movimientos').insert(input).select().single(); if (error) throw error; return data; }
export async function updateMovement(id: string, input: Omit<MovementInput, 'evento_id'>): Promise<Movement> { const { data, error } = await requireSupabase().from('movimientos').update(input).eq('id', id).select().single(); if (error) throw error; return data; }
export async function deleteMovement(id: string): Promise<void> { const { error } = await requireSupabase().from('movimientos').delete().eq('id', id); if (error) throw error; }

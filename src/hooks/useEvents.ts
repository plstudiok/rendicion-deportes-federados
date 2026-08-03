import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent, type EventInput } from '@/services/events.service';
export const eventKeys = { all: ['events'] as const, detail: (id: string) => ['events', id] as const };
export function useEvents() { return useQuery({ queryKey: eventKeys.all, queryFn: getEvents }); }
export function useEvent(id: string) { return useQuery({ queryKey: eventKeys.detail(id), queryFn: () => getEvent(id), enabled: Boolean(id) }); }
export function useCreateEvent() { const client = useQueryClient(); return useMutation({ mutationFn: createEvent, onSuccess: () => client.invalidateQueries({ queryKey: eventKeys.all }) }); }
export function useUpdateEvent() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, input }: { id: string; input: EventInput }) => updateEvent(id, input), onSuccess: (event) => { void client.invalidateQueries({ queryKey: eventKeys.all }); void client.invalidateQueries({ queryKey: eventKeys.detail(event.id) }); } }); }
export function useDeleteEvent() { const client = useQueryClient(); return useMutation({ mutationFn: deleteEvent, onSuccess: () => client.invalidateQueries({ queryKey: eventKeys.all }) }); }

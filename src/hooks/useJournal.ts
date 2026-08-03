import { useQuery } from '@tanstack/react-query';
import { getJournalMovements, type JournalFilters } from '@/services/journal.service';
export function useJournal(filters: JournalFilters) { return useQuery({ queryKey: ['journal', filters], queryFn: () => getJournalMovements(filters) }); }

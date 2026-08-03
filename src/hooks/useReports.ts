import { useQuery } from '@tanstack/react-query';
import { getDocumentStats, getReportStats } from '@/services/reports.service';
export function useReportStats() { return useQuery({ queryKey: ['reports'], queryFn: getReportStats }); }
export function useDocumentStats() { return useQuery({ queryKey: ['documents'], queryFn: getDocumentStats }); }

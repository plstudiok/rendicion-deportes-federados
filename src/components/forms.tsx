import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) { return <label className="block space-y-1.5"><span className="text-sm font-semibold text-slate-700">{label}</span>{children}{error && <span className="block text-xs font-medium text-rose-600">{error}</span>}</label>; }
export const controlClass = cn('w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100');

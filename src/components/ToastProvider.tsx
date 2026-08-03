import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Toast } from '@/components/ui';
interface ToastState { message: string; tone: 'success' | 'error'; }
interface ToastContextValue { showToast: (message: string, tone?: ToastState['tone']) => void; }
const ToastContext = createContext<ToastContextValue | null>(null);
export function ToastProvider({ children }: { children: ReactNode }) { const [toast, setToast] = useState<ToastState | null>(null); const showToast = useCallback((message: string, tone: ToastState['tone'] = 'success') => { setToast({ message, tone }); window.setTimeout(() => setToast(null), 3500); }, []); const value = useMemo(() => ({ showToast }), [showToast]); return <ToastContext.Provider value={value}>{children}{toast && <Toast {...toast} onClose={() => setToast(null)} />}</ToastContext.Provider>; }
export function useToast() { const context = useContext(ToastContext); if (!context) throw new Error('useToast debe utilizarse dentro de ToastProvider'); return context; }

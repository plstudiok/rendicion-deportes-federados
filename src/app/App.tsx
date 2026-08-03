import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from '@/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { EventsPage } from '@/pages/EventsPage';
import { EventDetailPage } from '@/pages/EventDetailPage';
import { JournalPage } from '@/pages/JournalPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { ToastProvider } from '@/components/ToastProvider';
const queryClient = new QueryClient();
export function App() { return <QueryClientProvider client={queryClient}><ToastProvider><BrowserRouter><Routes><Route element={<AppLayout />}><Route path="/" element={<DashboardPage />} /><Route path="/eventos" element={<EventsPage />} /><Route path="/eventos/:id" element={<EventDetailPage />} /><Route path="/movimientos" element={<JournalPage />} /><Route path="/reportes" element={<ReportsPage />} /><Route path="/configuracion" element={<PlaceholderPage title="Configuración" description="Administrá las preferencias generales del sistema." />} /></Route></Routes></BrowserRouter></ToastProvider></QueryClientProvider>; }

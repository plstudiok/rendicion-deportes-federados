import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/layout/Sidebar';
import { Topbar } from '@/layout/Topbar';
import { cn } from '@/utils/cn';
export function AppLayout() { const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); return <div className="min-h-screen bg-canvas"><Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onToggle={() => setCollapsed((current) => !current)} /><div className={cn('transition-[padding] duration-300 lg:pl-[264px]', collapsed && 'lg:pl-[84px]')}><Topbar onMenu={() => setMobileOpen(true)} /><main className="min-h-[calc(100vh-128px)] py-8"><Outlet /></main><footer className="border-t border-slate-200/80 px-4 py-5 text-center text-xs text-slate-400 sm:px-6 lg:px-8">Sistema de Rendición · Club Atlético Talleres · Sprint 1</footer></div></div>; }

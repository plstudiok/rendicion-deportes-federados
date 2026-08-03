import { NavLink } from 'react-router-dom';
import { X, PanelLeftClose, PanelLeftOpen, ShieldCheck, type LucideIcon, LayoutDashboard, CalendarDays, ArrowLeftRight, ChartNoAxesCombined, Settings2 } from 'lucide-react';
import { navigationItems } from '@/config/navigation';
import { cn } from '@/utils/cn';
import type { IconName } from '@/types';

const icons: Record<IconName, LucideIcon> = { 'layout-dashboard': LayoutDashboard, 'calendar-days': CalendarDays, 'arrow-left-right': ArrowLeftRight, 'chart-no-axes-combined': ChartNoAxesCombined, 'settings-2': Settings2 };
interface SidebarProps { collapsed: boolean; mobileOpen: boolean; onClose: () => void; onToggle: () => void; }

export function Sidebar({ collapsed, mobileOpen, onClose, onToggle }: SidebarProps) {
  return <>
    {mobileOpen && <button aria-label="Cerrar menú" className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden" onClick={onClose} />}
    <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:translate-x-0', collapsed && 'lg:w-[84px]', mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
      <div className="flex h-20 items-center justify-between px-5"><div className={cn('flex items-center gap-3 overflow-hidden', collapsed && 'lg:mx-auto')}><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/20"><ShieldCheck className="size-5" /></div><div className={cn('whitespace-nowrap transition-opacity', collapsed && 'lg:hidden')}><p className="display-font text-sm font-extrabold text-ink">Talleres</p><p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Deportes Federados</p></div></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden" onClick={onClose}><X className="size-5" /></button></div>
      <nav className="flex-1 space-y-1 px-3 pt-6">{navigationItems.map((item) => { const Icon = icons[item.icon]; return <NavLink key={item.href} to={item.href} onClick={onClose} className={({ isActive }) => cn('group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition', isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800', collapsed && 'lg:justify-center')}><Icon className="size-[18px] shrink-0" /><span className={cn('whitespace-nowrap transition-opacity', collapsed && 'lg:hidden')}>{item.label}</span></NavLink>; })}</nav>
      <div className={cn('m-3 rounded-xl bg-slate-50 p-3', collapsed && 'lg:p-2')}><div className="flex items-center gap-2"><div className="size-2 rounded-full bg-emerald-500" /><span className={cn('text-xs font-medium text-slate-500', collapsed && 'lg:hidden')}>Sistema operativo</span></div></div>
      <button onClick={onToggle} className="hidden border-t border-slate-100 p-4 text-slate-400 hover:bg-slate-50 lg:block">{collapsed ? <PanelLeftOpen className="mx-auto size-5" /> : <PanelLeftClose className="ml-auto size-5" />}</button>
    </aside>
  </>;
}

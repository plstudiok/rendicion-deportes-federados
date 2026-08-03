import type { NavigationItem } from '@/types';
export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/', icon: 'layout-dashboard' },
  { label: 'Eventos Deportivos', href: '/eventos', icon: 'calendar-days' },
  { label: 'Movimientos', href: '/movimientos', icon: 'arrow-left-right' },
  { label: 'Reportes', href: '/reportes', icon: 'chart-no-axes-combined' },
  { label: 'Configuración', href: '/configuracion', icon: 'settings-2' },
];

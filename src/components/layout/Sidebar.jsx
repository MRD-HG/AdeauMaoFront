import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  AlertTriangle,
  Users,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Calendar,
  Wallet,
  FileText,
} from 'lucide-react';

const mainNavigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Équipements', href: '/equipment', icon: Wrench },
];

const maintenanceNavigation = [
  { name: 'Ordres de travail', href: '/work-orders', icon: ClipboardList },
  { name: 'Demandes d\'intervention', href: '/intervention-requests', icon: AlertTriangle },
  { name: 'Calendrier', href: '/planning', icon: Calendar },
];

const managementNavigation = [
  { name: 'Employés', href: '/employees', icon: Users },
  { name: 'Équipes', href: '/teams', icon: UserCheck },
  { name: 'Budgets', href: '/budgets', icon: Wallet },
];

const analysisNavigation = [
    { name: 'Statistiques', href: '/statistics', icon: BarChart3 },
    { name: 'Rapports', href: '/reports', icon: FileText },
];

const NavList = ({ items, isCollapsed, location }) => (
  <div className="space-y-2">
    {items.map((item) => {
      const isActive = location.pathname.startsWith(item.href);
      return (
        <NavLink
          key={item.name}
          to={item.href}
          className={cn(
            'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-gray-700 hover:bg-gray-100',
            isCollapsed ? 'justify-center' : 'justify-start'
          )}
          title={isCollapsed ? item.name : undefined}
        >
          <item.icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
          {!isCollapsed && <span>{item.name}</span>}
        </NavLink>
      );
    })}
  </div>
);

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-gray-900">AdeauMao</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <NavList items={mainNavigation} isCollapsed={isCollapsed} location={location} />
        <div>
          {!isCollapsed && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Maintenance</h3>}
          <NavList items={maintenanceNavigation} isCollapsed={isCollapsed} location={location} />
        </div>
        <div>
          {!isCollapsed && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gestion</h3>}
          <NavList items={managementNavigation} isCollapsed={isCollapsed} location={location} />
        </div>
        <div>
          {!isCollapsed && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Analyse</h3>}
          <NavList items={analysisNavigation} isCollapsed={isCollapsed} location={location} />
        </div>
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">Version 1.0.0</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
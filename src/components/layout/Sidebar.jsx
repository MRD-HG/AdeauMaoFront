import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  LayoutDashboard,
  Wrench,
  ChevronDown,
  ChevronRight,
  Settings,
  Archive,
  Calendar,
  Users,
  ShoppingCart,
  BarChart3,
  Database,
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Maintenance',
    icon: Wrench,
    subItems: [
      { name: 'Preventive', href: '/maintenance-plans' },
      { name: 'Corrective', href: '/work-orders' },
      { name: 'Intervention Requests', href: '/intervention-requests' },
    ],
  },
  {
    name: 'Equipment',
    icon: Archive,
    subItems: [
      { name: 'Equipment List', href: '/equipment' },
      { name: 'Categories', href: '/settings/categories' },
      // Organs and Locations would be added here once their pages are created
    ],
  },
  {
    name: 'Planning',
    icon: Calendar,
    subItems: [
      { name: 'Calendar', href: '/planning' },
      // Schedule page would be added here
    ],
  },
  {
    name: 'Resources',
    icon: Users,
    subItems: [
      { name: 'Teams', href: '/teams' },
      { name: 'Staff', href: '/employees' },
      { name: 'Subcontractors', href: '/settings/subcontractors' },
      { name: 'Workstations', href: '/settings/work-centers' },
    ],
  },
  {
    name: 'Reports',
    icon: BarChart3,
    subItems: [
        { name: 'Interventions', href: '/reports' },
        { name: 'Statistics & KPIs', href: '/statistics' },
    ],
  },
  {
    name: 'Master Data',
    icon: Database,
    subItems: [
        { name: 'Breakdown Causes', href: '/settings/breakdown-causes' },
        { name: 'Triggers', href: '/settings/triggers' },
        { name: 'Workflows', href: '/settings/workflows' },
        { name: 'Budgets', href: '/budgets' },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();

  const isSubItemActive = (subItems) => {
    return subItems.some(item => location.pathname.startsWith(item.href));
  };

  return (
    <div className="bg-white border-r border-gray-200 flex flex-col w-64 h-screen">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <Settings className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg text-gray-900">Maintenance System</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Accordion type="multiple" className="w-full">
          {navigationItems.map((item, index) =>
            item.subItems ? (
              <AccordionItem value={`item-${index}`} key={item.name} className="border-b-0">
                <AccordionTrigger
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:no-underline",
                    isSubItemActive(item.subItems) && "text-primary"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-6 pt-2 pb-0">
                  <div className="flex flex-col space-y-2">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.href}
                        className={({ isActive }) =>
                          cn(
                            "block p-2 rounded-md text-sm hover:bg-gray-100",
                            isActive ? "bg-gray-200 font-semibold" : "text-gray-700"
                          )
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-lg text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            )
          )}
        </Accordion>
      </nav>
    </div>
  );
};

export default Sidebar;
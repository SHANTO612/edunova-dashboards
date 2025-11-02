import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Package,
  BarChart3,
  Sparkles,
  Users,
  ShoppingCart,
} from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['educator', 'marketer', 'student'],
  },
  {
    title: 'Courses',
    href: '/courses',
    icon: BookOpen,
    roles: ['educator', 'marketer', 'student'],
  },
  {
    title: 'Bundles',
    href: '/bundles',
    icon: Package,
    roles: ['marketer', 'student'],
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['educator', 'marketer', 'student'],
  },
  {
    title: 'AI Suggestions',
    href: '/ai-suggestions',
    icon: Sparkles,
    roles: ['educator', 'marketer'],
  },
  {
    title: 'Students',
    href: '/students',
    icon: Users,
    roles: ['educator', 'marketer'],
  },
  {
    title: 'My Purchases',
    href: '/purchases',
    icon: ShoppingCart,
    roles: ['student'],
  },
];

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = navItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  );

  return (
    <aside className="w-64 border-r bg-card h-[calc(100vh-4rem)] sticky top-16">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              to={`${item.href}/${user?.role}`}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

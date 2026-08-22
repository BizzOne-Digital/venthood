import { Navigate, NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Wrench, FolderKanban, Image, CalendarCheck, FileText, Star, HelpCircle, Settings, LogOut,
} from 'lucide-react';
import useAuth from '../hooks/useAuth.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/quotes', label: 'Quotes', icon: FileText },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-warm-white">
      <aside className="hidden w-64 flex-col bg-black text-warm-white lg:flex">
        <div className="flex h-20 items-center border-b border-white/10 px-6 font-heading text-xl font-bold">
          Vent<span className="text-gold">hood</span> Admin
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-gold text-black' : 'text-warm-white/70 hover:bg-white/10 hover:text-warm-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-sm font-medium text-warm-white/70 hover:text-gold"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border-light bg-white px-6 lg:justify-end">
          <span className="font-heading font-semibold text-text-dark lg:hidden">Venthood Admin</span>
          <span className="text-sm text-text-gray">Signed in as {user.name}</span>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

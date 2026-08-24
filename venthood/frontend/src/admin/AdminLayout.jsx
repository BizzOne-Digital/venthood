import { useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Wrench, FolderKanban, Image, CalendarCheck, FileText, Star, HelpCircle, Settings, LogOut, Menu, X,
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
  const [navOpen, setNavOpen] = useState(false);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;

  const sidebarContent = (
    <>
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6 font-heading text-xl font-bold">
        <span>
          Vent<span className="text-gold">hood</span> Admin
        </span>
        <button onClick={() => setNavOpen(false)} className="text-warm-white/70 hover:text-gold lg:hidden">
          <X size={22} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setNavOpen(false)}
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
    </>
  );

  return (
    <div className="flex min-h-screen bg-warm-white">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col bg-black text-warm-white lg:flex">{sidebarContent}</aside>

      {/* Mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setNavOpen(false)} />
          <aside className="relative flex w-64 max-w-[80%] flex-col bg-black text-warm-white">{sidebarContent}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-light bg-white px-4 sm:px-6 lg:justify-end">
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => setNavOpen(true)} className="text-text-dark">
              <Menu size={22} />
            </button>
            <span className="font-heading font-semibold text-text-dark">Venthood Admin</span>
          </div>
          <span className="hidden text-sm text-text-gray sm:inline">Signed in as {user.name}</span>
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

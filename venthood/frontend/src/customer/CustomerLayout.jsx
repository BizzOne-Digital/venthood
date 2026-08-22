import { Navigate, NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, FileText, User, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const links = [
  { to: '/customer', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/customer/bookings', label: 'My Bookings', icon: CalendarCheck },
  { to: '/customer/quotes', label: 'My Quotes', icon: FileText },
  { to: '/customer/profile', label: 'Profile', icon: User },
];

const CustomerLayout = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;
  if (!user) return <Navigate to="/customer/login" replace />;

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-border-light bg-black">
        <div className="container-custom flex h-16 items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-warm-white">
            Vent<span className="text-gold">hood</span>.ca
          </Link>
          <span className="text-sm text-warm-white/70">Hi, {user.name}</span>
        </div>
      </header>

      <div className="container-custom flex flex-col gap-8 py-10 lg:flex-row">
        <aside className="lg:w-56">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-gold text-black' : 'text-text-dark hover:bg-cream'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;

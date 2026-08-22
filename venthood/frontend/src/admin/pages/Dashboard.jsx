import { useEffect, useState } from 'react';
import { Wrench, FolderKanban, CalendarCheck, FileText } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const Dashboard = () => {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [services, projects, bookings, quotes] = await Promise.allSettled([
          api.get('/services', { params: { all: true } }),
          api.get('/projects', { params: { all: true } }),
          api.get('/bookings'),
          api.get('/quotes'),
        ]);
        setCounts({
          services: services.status === 'fulfilled' ? services.value.data.services.length : 0,
          projects: projects.status === 'fulfilled' ? projects.value.data.projects.length : 0,
          bookings: bookings.status === 'fulfilled' ? bookings.value.data.bookings.length : 0,
          quotes: quotes.status === 'fulfilled' ? quotes.value.data.quotes.length : 0,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err.message);
      }
    };
    load();
  }, []);

  if (!counts) return <LoadingSpinner />;

  const stats = [
    { label: 'Services', value: counts.services, icon: Wrench },
    { label: 'Projects', value: counts.projects, icon: FolderKanban },
    { label: 'Bookings', value: counts.bookings, icon: CalendarCheck },
    { label: 'Quote Requests', value: counts.quotes, icon: FileText },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-border-light bg-white p-6">
            <Icon className="text-gold" size={24} />
            <p className="mt-3 text-2xl font-bold text-text-dark">{value}</p>
            <p className="text-sm text-text-gray">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

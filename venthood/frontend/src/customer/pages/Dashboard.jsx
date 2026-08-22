import { useEffect, useState } from 'react';
import { CalendarCheck, FileText } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import useAuth from '../../hooks/useAuth.js';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [bookings, quotes] = await Promise.allSettled([
          api.get('/bookings/mine'),
          api.get('/quotes/mine'),
        ]);
        setCounts({
          bookings: bookings.status === 'fulfilled' ? bookings.value.data.bookings.length : 0,
          quotes: quotes.status === 'fulfilled' ? quotes.value.data.quotes.length : 0,
        });
      } catch (err) {
        console.error('Failed to load customer dashboard:', err.message);
      }
    };
    load();
  }, []);

  if (!counts) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">Welcome, {user.name}</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border-light bg-white p-6">
          <CalendarCheck className="text-gold" size={24} />
          <p className="mt-3 text-2xl font-bold text-text-dark">{counts.bookings}</p>
          <p className="text-sm text-text-gray">My Bookings</p>
        </div>
        <div className="rounded-xl border border-border-light bg-white p-6">
          <FileText className="text-gold" size={24} />
          <p className="mt-3 text-2xl font-bold text-text-dark">{counts.quotes}</p>
          <p className="text-sm text-text-gray">My Quote Requests</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

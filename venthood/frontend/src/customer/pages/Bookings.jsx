import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/bookings/mine')
      .then((res) => setBookings(res.data.bookings || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load bookings.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="mt-6 text-text-gray">
          You have no bookings yet. Visit the Book Appointment page to schedule a service.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="rounded-xl border border-border-light bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="font-heading font-semibold text-text-dark">
                  {b.date} at {b.time}
                </p>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-text-dark">
                  {b.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-gray">{b.address}</p>
              {b.notes && <p className="mt-1 text-sm text-text-gray">Notes: {b.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;

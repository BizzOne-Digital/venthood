import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const STATUSES = ['Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled'];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get('/bookings')
      .then((res) => setBookings(res.data.bookings || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load bookings.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}`, { status });
      toast.success('Booking status updated.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update booking.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success('Booking deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete booking.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">Bookings</h1>

      {bookings.length === 0 ? (
        <p className="mt-6 text-text-gray">No bookings yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border-light bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-text-gray">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Date/Time</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-border-light align-top">
                  <td className="px-4 py-3">{b.name}</td>
                  <td className="px-4 py-3 text-text-gray">
                    {b.email}
                    <br />
                    {b.phone}
                  </td>
                  <td className="px-4 py-3">
                    {b.date} {b.time}
                  </td>
                  <td className="px-4 py-3 text-text-gray">{b.address}</td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                      className="rounded-md border border-border-light px-2 py-1"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(b._id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

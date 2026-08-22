import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Lost'];

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get('/quotes')
      .then((res) => setQuotes(res.data.quotes || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load quote requests.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/quotes/${id}`, { status });
      toast.success('Quote status updated.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update quote.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this quote request?')) return;
    try {
      await api.delete(`/quotes/${id}`);
      toast.success('Quote request deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete quote.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">Quote Requests</h1>

      {quotes.length === 0 ? (
        <p className="mt-6 text-text-gray">No quote requests yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border-light bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-text-gray">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q._id} className="border-t border-border-light align-top">
                  <td className="px-4 py-3">{q.name}</td>
                  <td className="px-4 py-3 text-text-gray">
                    {q.email}
                    <br />
                    {q.phone}
                  </td>
                  <td className="px-4 py-3">{q.service}</td>
                  <td className="max-w-xs px-4 py-3 text-text-gray">{q.details}</td>
                  <td className="px-4 py-3">
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q._id, e.target.value)}
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
                    <button onClick={() => remove(q._id)} className="text-red-500 hover:text-red-700">
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

export default AdminQuotes;

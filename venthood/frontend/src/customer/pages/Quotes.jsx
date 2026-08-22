import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const CustomerQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/quotes/mine')
      .then((res) => setQuotes(res.data.quotes || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load quote requests.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">My Quote Requests</h1>

      {quotes.length === 0 ? (
        <p className="mt-6 text-text-gray">
          You have no quote requests yet. Visit the Request a Quote page to get started.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {quotes.map((q) => (
            <div key={q._id} className="rounded-xl border border-border-light bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="font-heading font-semibold text-text-dark">{q.service}</p>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-text-dark">
                  {q.status}
                </span>
              </div>
              {q.details && <p className="mt-2 text-sm text-text-gray">{q.details}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerQuotes;

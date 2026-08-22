import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Button from '../../components/Button.jsx';

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { question: '', answer: '', order: 0, active: true },
  });

  const load = () => {
    setLoading(true);
    api
      .get('/faqs', { params: { all: true } })
      .then((res) => setFaqs(res.data.faqs || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load FAQs.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/faqs', data);
      toast.success('FAQ added.');
      reset();
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add FAQ.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      toast.success('FAQ deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete FAQ.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-text-dark">FAQs</h1>
        <Button onClick={() => setShowForm(true)} variant="primary">
          <Plus size={18} /> Add FAQ
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <div key={f._id} className="flex items-start justify-between rounded-xl border border-border-light bg-white p-4">
              <div>
                <p className="font-heading font-semibold text-text-dark">{f.question}</p>
                <p className="mt-1 text-sm text-text-gray">{f.answer}</p>
              </div>
              <button onClick={() => remove(f._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-text-dark">Add FAQ</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <input {...register('question', { required: true })} placeholder="Question" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <textarea {...register('answer', { required: true })} placeholder="Answer" rows={4} className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('order', { valueAsNumber: true })} type="number" placeholder="Order" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add FAQ'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;

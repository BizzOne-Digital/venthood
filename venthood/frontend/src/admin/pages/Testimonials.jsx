import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Trash2, X, Check } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Button from '../../components/Button.jsx';

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { name: '', location: 'Calgary, AB', rating: 5, review: '', service: '', approved: true },
  });

  const load = () => {
    setLoading(true);
    api
      .get('/testimonials', { params: { all: true } })
      .then((res) => setItems(res.data.testimonials || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load testimonials.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/testimonials', data);
      toast.success('Testimonial added.');
      reset();
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add testimonial.');
    }
  };

  const toggleApproved = async (t) => {
    try {
      await api.put(`/testimonials/${t._id}`, { approved: !t.approved });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update testimonial.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Testimonial deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete testimonial.');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Testimonials</h1>
        <Button onClick={() => setShowForm(true)} variant="primary">
          <Plus size={18} /> Add Testimonial
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t._id} className="rounded-xl border border-border-light bg-white p-5">
              <p className="text-sm text-text-gray">{t.review}</p>
              <p className="mt-3 font-heading font-semibold text-text-dark">{t.name}</p>
              <p className="text-xs text-text-gray">{t.location} &bull; {t.approved ? 'Approved' : 'Pending'}</p>
              <div className="mt-3 flex gap-3">
                <button onClick={() => toggleApproved(t)} className="text-gold hover:text-gold-hover">
                  <Check size={16} />
                </button>
                <button onClick={() => remove(t._id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="max-h-[90vh] w-full max-w-md space-y-4 overflow-y-auto rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-text-dark">Add Testimonial</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <input {...register('name', { required: true })} placeholder="Customer Name" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('location')} placeholder="Location" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('service')} placeholder="Service" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('rating', { valueAsNumber: true, min: 1, max: 5 })} type="number" min={1} max={5} placeholder="Rating (1-5)" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <textarea {...register('review', { required: true })} placeholder="Review" rows={4} className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Testimonial'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;

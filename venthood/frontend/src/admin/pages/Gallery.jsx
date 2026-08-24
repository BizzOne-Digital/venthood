import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Button from '../../components/Button.jsx';

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { title: '', category: 'General', imageUrl: '' },
  });

  const load = () => {
    setLoading(true);
    api
      .get('/gallery', { params: { all: true } })
      .then((res) => setItems(res.data.gallery || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load gallery.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/gallery', data);
      toast.success('Gallery item added.');
      reset();
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add gallery item.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Image deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete image.');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Gallery</h1>
        <Button onClick={() => setShowForm(true)} variant="primary">
          <Plus size={18} /> Add Image
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="group relative overflow-hidden rounded-lg border border-border-light">
              <img src={item.imageUrl} alt={item.title || 'Gallery image'} className="aspect-square w-full object-cover" />
              <button
                onClick={() => remove(item._id)}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="max-h-[90vh] w-full max-w-md space-y-4 overflow-y-auto rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-text-dark">Add Gallery Image</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <input {...register('title')} placeholder="Title (optional)" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('category')} placeholder="Category" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('imageUrl', { required: true })} placeholder="Image URL" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Image'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;

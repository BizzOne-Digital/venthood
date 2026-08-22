import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, UploadCloud } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Button from '../../components/Button.jsx';

const emptyForm = { name: '', slug: '', shortDescription: '', fullDescription: '', image: '', active: true };

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm({ defaultValues: emptyForm });
  const imageValue = watch('image');

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/services/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setValue('image', res.data.url, { shouldDirty: true });
      toast.success('Image uploaded.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const load = () => {
    setLoading(true);
    api
      .get('/services', { params: { all: true } })
      .then((res) => setServices(res.data.services || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load services.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    reset(emptyForm);
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    reset(service);
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/services/${editing._id}`, data);
        toast.success('Service updated.');
      } else {
        await api.post('/services', data);
        toast.success('Service created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save service.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success('Service deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete service.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Services</h1>
        <Button onClick={openCreate} variant="primary">
          <Plus size={18} /> Add Service
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border-light bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-text-gray">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id} className="border-t border-border-light">
                  <td className="px-4 py-3">
                    {s.image ? (
                      <img src={s.image} alt={s.name} className="h-10 w-14 rounded object-cover" />
                    ) : (
                      <span className="text-text-gray">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3 text-text-gray">{s.slug}</td>
                  <td className="px-4 py-3">{s.active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="text-gold hover:text-gold-hover">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => remove(s._id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-text-dark">
                {editing ? 'Edit Service' : 'Add Service'}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <input
              {...register('name', { required: true })}
              placeholder="Name"
              className="w-full rounded-md border border-border-light px-4 py-2.5"
            />
            <input
              {...register('slug', { required: true })}
              placeholder="Slug (e.g. range-hood-installation)"
              className="w-full rounded-md border border-border-light px-4 py-2.5"
            />
            <input
              {...register('shortDescription', { required: true })}
              placeholder="Short Description"
              className="w-full rounded-md border border-border-light px-4 py-2.5"
            />
            <textarea
              {...register('fullDescription')}
              placeholder="Full Description"
              rows={4}
              className="w-full rounded-md border border-border-light px-4 py-2.5"
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">Service Image</label>
              {imageValue && (
                <img src={imageValue} alt="Preview" className="mb-2 h-32 w-full rounded-md object-cover" />
              )}
              <div className="flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border-light px-4 py-2.5 text-sm text-text-gray hover:border-gold hover:text-gold">
                  <UploadCloud size={16} />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              <input
                {...register('image')}
                placeholder="Or paste an image URL"
                className="mt-2 w-full rounded-md border border-border-light px-4 py-2.5"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('active')} /> Active
            </label>
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Service'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminServices;

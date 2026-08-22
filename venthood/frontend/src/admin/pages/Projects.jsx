import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Button from '../../components/Button.jsx';

const emptyForm = { title: '', description: '', location: '', category: 'General', featuredImage: '', featured: false, visible: true };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({ defaultValues: emptyForm });

  const load = () => {
    setLoading(true);
    api
      .get('/projects', { params: { all: true } })
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load projects.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    reset(emptyForm);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    reset(project);
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/projects/${editing._id}`, data);
        toast.success('Project updated.');
      } else {
        await api.post('/projects', data);
        toast.success('Project created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Projects</h1>
        <Button onClick={openCreate} variant="primary">
          <Plus size={18} /> Add Project
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border-light bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-text-gray">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Visible</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="border-t border-border-light">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3 text-text-gray">{p.location}</td>
                  <td className="px-4 py-3">{p.featured ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">{p.visible ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-gold hover:text-gold-hover">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => remove(p._id)} className="text-red-500 hover:text-red-700">
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-text-dark">
                {editing ? 'Edit Project' : 'Add Project'}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <input {...register('title', { required: true })} placeholder="Title" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <textarea {...register('description')} placeholder="Description" rows={3} className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('location')} placeholder="Location" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('category')} placeholder="Category" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <input {...register('featuredImage')} placeholder="Featured Image URL" className="w-full rounded-md border border-border-light px-4 py-2.5" />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('featured')} /> Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('visible')} /> Visible
              </label>
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Project'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;

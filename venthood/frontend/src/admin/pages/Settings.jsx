import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Button from '../../components/Button.jsx';

const AdminSettings = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting, isLoading } } = useForm();

  useEffect(() => {
    api
      .get('/settings')
      .then((res) => {
        const s = res.data.settings;
        reset({
          ...s,
          phones: (s.phones || []).join(', '),
          serviceAreas: (s.serviceAreas || []).join(', '),
        });
      })
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load settings.'));
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        phones: data.phones ? data.phones.split(',').map((p) => p.trim()).filter(Boolean) : [],
        serviceAreas: data.serviceAreas ? data.serviceAreas.split(',').map((a) => a.trim()).filter(Boolean) : [],
      };
      await api.put('/settings', payload);
      toast.success('Settings updated.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update settings.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">Site Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-2xl space-y-4 rounded-xl border border-border-light bg-white p-6">
        <div>
          <label className="text-sm font-medium text-text-dark">Business Name</label>
          <input {...register('businessName')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Phone Numbers (comma separated)</label>
          <input {...register('phones')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Email</label>
          <input {...register('email')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">WhatsApp Number</label>
          <input {...register('whatsapp')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Facebook URL</label>
          <input {...register('facebook')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Instagram URL</label>
          <input {...register('instagram')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Hero Heading</label>
          <input {...register('heroHeading')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Hero Description</label>
          <textarea {...register('heroDescription')} rows={3} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Hero Image URL</label>
          <input {...register('heroImage')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Service Areas (comma separated)</label>
          <input {...register('serviceAreas')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-dark">Footer Text</label>
          <input {...register('footerText')} className="mt-1 w-full rounded-md border border-border-light px-4 py-2.5" />
        </div>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
};

export default AdminSettings;

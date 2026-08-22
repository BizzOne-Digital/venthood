import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { SERVICE_LIST } from '../utils/constants';

const RequestQuote = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/quotes', data);
      toast.success('Quote request submitted! We will contact you shortly.');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit quote request. Please try again.');
    }
  };

  return (
    <section className="py-20">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          eyebrow="No Fixed Pricing"
          title="Request a Free Quote"
          description="Every kitchen and job site is different - tell us the details and we'll provide an accurate, no-obligation quote."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border-light bg-white p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input
                {...register('name', { required: true })}
                placeholder="Full Name"
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">Name is required.</p>}
            </div>
            <div>
              <input
                {...register('phone', { required: true })}
                placeholder="Phone Number"
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">Phone is required.</p>}
            </div>
          </div>

          <div>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email Address"
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">Email is required.</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              {...register('address')}
              placeholder="Street Address"
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            />
            <input
              {...register('city')}
              placeholder="City"
              defaultValue="Calgary"
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              {...register('propertyType')}
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <div>
              <select
                {...register('service', { required: true })}
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              >
                <option value="">Select a Service</option>
                {SERVICE_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-xs text-red-500">Please select a service.</p>}
            </div>
          </div>

          <textarea
            {...register('details')}
            placeholder="Tell us more about your project (hood type, kitchen layout, duct length, etc.)"
            rows={5}
            className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
          />

          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RequestQuote;

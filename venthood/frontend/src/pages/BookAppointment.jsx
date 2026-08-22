import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

const BookAppointment = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [services, setServices] = useState([]);

  useEffect(() => {
    api
      .get('/services')
      .then((res) => setServices(res.data.services || []))
      .catch((err) => console.error('Failed to load services:', err.message));
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/bookings', data);
      toast.success('Booking request submitted! We will confirm your appointment shortly.');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    }
  };

  return (
    <section className="py-20">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          eyebrow="Schedule Service"
          title="Book an Appointment"
          description="Pick a date and time that works for you and we'll confirm your booking."
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

          <select
            {...register('service')}
            className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
          >
            <option value="">Select a Service (optional)</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input
                {...register('date', { required: true })}
                type="date"
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">Date is required.</p>}
            </div>
            <div>
              <input
                {...register('time', { required: true })}
                type="time"
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              />
              {errors.time && <p className="mt-1 text-xs text-red-500">Time is required.</p>}
            </div>
          </div>

          <div>
            <input
              {...register('address', { required: true })}
              placeholder="Service Address"
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">Address is required.</p>}
          </div>

          <textarea
            {...register('notes')}
            placeholder="Additional notes (optional)"
            rows={4}
            className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
          />

          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Book Appointment'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;

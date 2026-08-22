import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin } from 'lucide-react';
import api from '../services/api';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { PHONES, EMAIL, SERVICE_AREA } from '../utils/constants';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', data);
      toast.success('Message sent! We will get back to you shortly.');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Venthood.ca"
          description="Have a question or need service? Send us a message and we'll respond promptly."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {PHONES.map((phone) => (
              <div key={phone} className="flex items-center gap-3">
                <Phone className="text-gold" size={22} />
                <a href={`tel:${phone}`} className="text-text-dark hover:text-gold">
                  {phone}
                </a>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <Mail className="text-gold" size={22} />
              <a href={`mailto:${EMAIL}`} className="text-text-dark hover:text-gold">
                {EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gold" size={22} />
              <span className="text-text-dark">{SERVICE_AREA}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border-light bg-white p-6">
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
                {...register('email', { required: true })}
                type="email"
                placeholder="Email Address"
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">Email is required.</p>}
            </div>
            <input
              {...register('phone')}
              placeholder="Phone Number (optional)"
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            />
            <input
              {...register('subject')}
              placeholder="Subject"
              className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
            />
            <div>
              <textarea
                {...register('message', { required: true })}
                placeholder="Your Message"
                rows={5}
                className="w-full rounded-md border border-border-light px-4 py-3 focus:border-gold focus:outline-none"
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">Message is required.</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth.js';
import Button from '../../components/Button.jsx';

const CustomerRegisterPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/customer" replace />;

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success('Account created successfully!');
      navigate('/customer');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-white px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-xl border border-border-light bg-white p-8">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Create an Account</h1>
        <p className="mt-2 text-sm text-text-gray">Register to track your bookings and quote requests.</p>

        <div className="mt-6 space-y-4">
          <input {...register('name', { required: true })} placeholder="Full Name" className="w-full rounded-md border border-border-light px-4 py-3" />
          <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full rounded-md border border-border-light px-4 py-3" />
          <input {...register('phone')} placeholder="Phone Number" className="w-full rounded-md border border-border-light px-4 py-3" />
          <input {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Password (min. 6 characters)" className="w-full rounded-md border border-border-light px-4 py-3" />
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Register'}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-text-gray">
          Already have an account?{' '}
          <Link to="/customer/login" className="font-semibold text-gold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CustomerRegisterPage;

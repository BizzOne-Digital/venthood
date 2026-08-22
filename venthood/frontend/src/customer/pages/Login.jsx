import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth.js';
import Button from '../../components/Button.jsx';

const CustomerLoginPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/customer" replace />;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/customer');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-white px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-xl border border-border-light bg-white p-8">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Customer Login</h1>
        <p className="mt-2 text-sm text-text-gray">Sign in to manage your bookings and quotes.</p>

        <div className="mt-6 space-y-4">
          <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full rounded-md border border-border-light px-4 py-3" />
          <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full rounded-md border border-border-light px-4 py-3" />
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-text-gray">
          Don't have an account?{' '}
          <Link to="/customer/register" className="font-semibold text-gold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CustomerLoginPage;

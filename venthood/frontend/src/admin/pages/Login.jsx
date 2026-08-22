import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth.js';
import Button from '../../components/Button.jsx';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user && user.role === 'admin') return <Navigate to="/admin" replace />;

  const onSubmit = async (data) => {
    try {
      const loggedInUser = await login(data.email, data.password);
      if (loggedInUser.role !== 'admin') {
        toast.error('This account does not have admin access.');
        return;
      }
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-charcoal p-8 text-warm-white"
      >
        <h1 className="font-heading text-2xl font-bold">
          Vent<span className="text-gold">hood</span> Admin
        </h1>
        <p className="mt-2 text-sm text-warm-white/60">Sign in to manage the site.</p>

        <div className="mt-6 space-y-4">
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 focus:border-gold focus:outline-none"
          />
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 focus:border-gold focus:outline-none"
          />
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;

import useAuth from '../../hooks/useAuth.js';

const CustomerProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text-dark">My Profile</h1>

      <div className="mt-6 max-w-md space-y-4 rounded-xl border border-border-light bg-white p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-text-gray">Full Name</p>
          <p className="mt-1 text-text-dark">{user.name}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-text-gray">Email</p>
          <p className="mt-1 text-text-dark">{user.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-text-gray">Phone</p>
          <p className="mt-1 text-text-dark">{user.phone || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;

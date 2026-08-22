import Button from '../components/Button.jsx';

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-5xl font-extrabold text-gold">404</h1>
      <p className="mt-4 text-lg text-text-dark">The page you're looking for doesn't exist.</p>
      <Button to="/" variant="primary" className="mt-6">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;

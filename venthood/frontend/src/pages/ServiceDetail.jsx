import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/services/${slug}`)
      .then((res) => setService(res.data.service))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner fullScreen />;

  if (notFound || !service) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-dark">Service not found</h1>
        <p className="mt-2 text-text-gray">This service may have been removed or renamed.</p>
        <Button to="/services" variant="primary" className="mt-6">
          Back to Services
        </Button>
      </div>
    );
  }

  return (
    <article className="py-20">
      <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">Our Services</span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-text-dark sm:text-4xl">{service.name}</h1>
          <p className="mt-4 text-text-gray">{service.fullDescription || service.shortDescription}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/request-quote" variant="primary">
              Request a Quote
            </Button>
            <Button to="/book-appointment" variant="outline">
              Book an Appointment
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl">
          <img
            src={service.image || PLACEHOLDER}
            alt={service.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
};

export default ServiceDetail;

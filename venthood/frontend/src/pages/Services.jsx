import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services')
      .then((res) => setServices(res.data.services || []))
      .catch((err) => console.error('Failed to load services:', err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Services"
          title="Complete Range Hood & Ventilation Solutions"
          description="Explore all the ventilation services we offer across Calgary and surrounding Alberta areas."
        />

        {loading ? (
          <LoadingSpinner />
        ) : services.length === 0 ? (
          <p className="text-center text-text-gray">No services available right now. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;

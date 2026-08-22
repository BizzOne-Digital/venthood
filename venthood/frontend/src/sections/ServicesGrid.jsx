import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

const ServicesGrid = ({ services, loading }) => {
  return (
    <section className="bg-warm-white py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Ventilation Services"
          description="From new installations to repairs, we handle every part of your kitchen ventilation system."
        />

        {loading ? (
          <LoadingSpinner />
        ) : services.length === 0 ? (
          <p className="text-center text-text-gray">Services will be available shortly. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button to="/services" variant="outline">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

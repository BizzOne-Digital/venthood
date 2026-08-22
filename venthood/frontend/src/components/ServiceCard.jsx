import { Link } from 'react-router-dom';
import { Wind, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800';

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border-light bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-40 w-full overflow-hidden bg-cream">
        <img
          src={service.image || FALLBACK_IMAGE}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Wind size={16} className="text-gold" />
          <h3 className="font-heading text-base font-semibold text-text-dark">{service.name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm text-text-gray">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:gap-2 transition-all">
          Learn More <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;

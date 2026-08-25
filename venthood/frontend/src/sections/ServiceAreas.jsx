import { MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';

const DEFAULT_AREAS = ['Calgary', 'Airdrie', 'Cochrane', 'Okotoks', 'Chestermere', 'Surrounding Areas Alberta'];

const ServiceAreas = ({ areas }) => {
  const list = areas && areas.length ? areas : DEFAULT_AREAS;

  return (
    <section className="bg-black py-16 text-warm-white">
      <div className="container-custom">
        <SectionHeading eyebrow="Where We Work" title="Proudly Serving Calgary & Area" theme="dark" />

        <div className="flex flex-wrap justify-center gap-4">
          {list.map((area) => (
            <span
              key={area}
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-warm-white"
            >
              <MapPin size={16} className="text-gold" />
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;

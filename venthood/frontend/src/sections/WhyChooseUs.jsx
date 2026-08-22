import { ShieldCheck, Clock, Wrench, Star } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured',
    description: 'Every installation is performed by fully licensed and insured technicians.',
  },
  {
    icon: Clock,
    title: 'Fast, Reliable Service',
    description: 'We respect your time with prompt quotes, scheduling, and on-time arrivals.',
  },
  {
    icon: Wrench,
    title: 'Expert Craftsmanship',
    description: 'Years of experience installing and repairing every range hood type and duct configuration.',
  },
  {
    icon: Star,
    title: 'Customer Satisfaction',
    description: 'We stand behind our work and aim for a five-star experience on every job.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-black py-20 text-warm-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Why Venthood.ca"
          title="Built on Trust and Quality"
          description="We combine technical expertise with honest service to deliver ventilation systems that last."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <Icon className="text-gold" size={28} />
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-warm-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

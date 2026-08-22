import { ShieldCheck, Users, Wrench, ThumbsUp } from 'lucide-react';

const items = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Users, label: 'Local Calgary Team' },
  { icon: Wrench, label: 'Certified Technicians' },
  { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
];

const TrustBar = () => {
  return (
    <section className="border-b border-border-light bg-cream py-8">
      <div className="container-custom grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-center sm:justify-start">
            <Icon className="text-gold" size={20} />
            <span className="text-sm font-medium text-text-dark">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;

import SectionHeading from '../components/SectionHeading.jsx';

const steps = [
  { step: '01', title: 'Request a Quote', description: 'Tell us about your kitchen and ventilation needs.' },
  { step: '02', title: 'Free Consultation', description: 'We assess your space and recommend the right solution.' },
  { step: '03', title: 'Professional Installation', description: 'Our technicians install your system with precision.' },
  { step: '04', title: 'Final Walkthrough', description: 'We confirm everything works perfectly before we leave.' },
];

const Process = () => {
  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Process"
          title="Simple, Transparent, and Professional"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.step} className="relative rounded-xl border border-border-light bg-white p-6">
              <span className="font-heading text-3xl font-extrabold text-gold/30">{s.step}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-text-dark">{s.title}</h3>
              <p className="mt-2 text-sm text-text-gray">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

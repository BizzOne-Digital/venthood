import Button from '../components/Button.jsx';
import { PHONES } from '../utils/constants';

const FinalCTA = () => {
  return (
    <section className="bg-warm-white py-20">
      <div className="container-custom rounded-2xl bg-charcoal px-8 py-16 text-center text-warm-white">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          Let's Improve Your Kitchen Ventilation Today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-warm-white/70">
          Call us at {PHONES[0]} or request a free quote online and our team will get back to you promptly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/request-quote" variant="primary">
            Request a Quote
          </Button>
          <Button href={`tel:${PHONES[0]}`} variant="outline">
            Call Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

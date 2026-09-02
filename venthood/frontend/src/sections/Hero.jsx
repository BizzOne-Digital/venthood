import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award } from 'lucide-react';
import Button from '../components/Button.jsx';

const PLACEHOLDER = '/hero1.png';
const MOBILE_PLACEHOLDER = '/mobile-hero.png';

const Hero = ({ settings }) => {
  const heading = settings?.heroHeading || "Calgary's Trusted Range Hood & Ventilation Experts";
  const description =
    settings?.heroDescription ||
    'Professional range hood installation, replacement, and kitchen exhaust ventilation services across Calgary and Alberta.';

  return (
    <section className="bg-black">
      {/* Mobile: image height is locked to its own aspect ratio (driven only by
          screen WIDTH, never by viewport height), so the card overlaps the
          exact same spot in the photo - just below the hood - on every phone,
          regardless of screen height or browser chrome. */}
      <div className="relative aspect-[941/1672] w-full overflow-hidden sm:hidden">
        <img
          src={settings?.heroImage || MOBILE_PLACEHOLDER}
          alt="Modern kitchen range hood installation"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-x-2 bottom-2 top-[58%] z-10 flex flex-col justify-center gap-1 overflow-hidden rounded-xl bg-black/90 px-3 py-2">
          <span className="inline-block w-fit rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
            Calgary & Surrounding Areas Alberta
          </span>

          <h1 className="line-clamp-2 font-heading text-base font-extrabold leading-tight text-warm-white">
            {heading}
          </h1>

          <p className="line-clamp-1 text-[10px] text-warm-white/80">{description}</p>

          <div className="mt-1 flex flex-wrap gap-1.5">
            <Button to="/request-quote" variant="primary" className="px-2 py-1 text-[10px]">
              Request a Quote
            </Button>
            <Button to="/book-appointment" variant="outline" className="px-2 py-1 text-[10px]">
              Book an Appointment
            </Button>
          </div>

          <div className="mt-1 flex flex-wrap gap-2 text-warm-white/80">
            <div className="flex items-center gap-1">
              <ShieldCheck className="text-gold" size={11} />
              <span className="text-[10px]">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="text-gold" size={11} />
              <span className="text-[10px]">Fast Response</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="text-gold" size={11} />
              <span className="text-[10px]">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: full-bleed background image with overlaid content */}
      <div className="relative hidden overflow-hidden sm:block">
        <div className="absolute inset-0">
          <img
            src={settings?.heroImage || PLACEHOLDER}
            alt="Modern kitchen range hood installation"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="container-custom relative z-10 flex min-h-[85vh] flex-col justify-center py-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-sm font-medium text-gold"
          >
            Calgary & Surrounding Areas Alberta
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl font-heading text-5xl font-extrabold leading-tight text-text-dark lg:text-6xl"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-text-dark/80"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button to="/request-quote" variant="primary" className="px-6 py-3 text-base">
              Request a Quote
            </Button>
            <Button to="/book-appointment" variant="outline" className="px-6 py-3 text-base">
              Book an Appointment
            </Button>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-8 text-text-dark/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-gold" size={20} />
              <span className="text-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-gold" size={20} />
              <span className="text-sm">Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-gold" size={20} />
              <span className="text-sm">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

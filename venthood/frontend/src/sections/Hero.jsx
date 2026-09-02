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
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <picture>
          {!settings?.heroImage && <source media="(max-width: 767px)" srcSet={MOBILE_PLACEHOLDER} />}
          <img
            src={settings?.heroImage || PLACEHOLDER}
            alt="Modern kitchen range hood installation"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      <div className="container-custom relative z-10 flex min-h-[100dvh] flex-col justify-end gap-4 pb-24 pt-24 sm:min-h-[85vh] sm:justify-center sm:gap-0 sm:pb-0 sm:py-24">
        <div className="rounded-xl bg-black/85 p-3 sm:rounded-2xl sm:bg-transparent sm:p-0">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-xs font-medium text-gold sm:mb-4 sm:px-4 sm:py-1 sm:text-sm"
          >
            Calgary & Surrounding Areas Alberta
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl font-heading text-xl font-extrabold leading-tight text-warm-white sm:text-5xl sm:text-text-dark lg:text-6xl"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 max-w-xl text-xs text-warm-white/80 sm:mt-6 sm:text-lg sm:text-text-dark/80"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 flex flex-wrap gap-2 sm:mt-8 sm:gap-4"
          >
            <Button to="/request-quote" variant="primary" className="px-3 py-1.5 text-xs sm:px-6 sm:py-3 sm:text-base">
              Request a Quote
            </Button>
            <Button to="/book-appointment" variant="outline" className="px-3 py-1.5 text-xs sm:px-6 sm:py-3 sm:text-base">
              Book an Appointment
            </Button>
          </motion.div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 rounded-lg bg-black/85 p-2 text-warm-white/80 sm:mt-12 sm:gap-8 sm:rounded-xl sm:bg-transparent sm:p-0 sm:text-text-dark/80">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="text-gold" size={14} />
            <span className="text-xs sm:text-sm">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="text-gold" size={14} />
            <span className="text-xs sm:text-sm">Fast Response</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Award className="text-gold" size={14} />
            <span className="text-xs sm:text-sm">Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

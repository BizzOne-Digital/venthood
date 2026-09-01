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
      {/* Mobile: blurred backdrop fill + contained sharp image, so the full hood
          shows with breathing room and no hard black bars around it. */}
      {!settings?.heroImage && (
        <div className="absolute inset-0 sm:hidden">
          <img
            src={MOBILE_PLACEHOLDER}
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-110 object-cover object-center blur-2xl brightness-75"
          />
          <img
            src={MOBILE_PLACEHOLDER}
            alt="Modern kitchen range hood installation"
            className="absolute inset-0 h-full w-full object-contain p-6"
          />
        </div>
      )}

      {/* Desktop, and mobile when a custom settings image is set */}
      <div className={`absolute inset-0 ${!settings?.heroImage ? 'hidden sm:block' : ''}`}>
        <img
          src={settings?.heroImage || PLACEHOLDER}
          alt="Modern kitchen range hood installation"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="container-custom relative z-10 flex min-h-[85vh] flex-col items-start justify-center py-24"
        style={{ textShadow: '0 1px 3px rgba(255,255,255,0.7)' }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-sm font-medium text-gold"
        >
          Calgary & Surrounding Areas Alberta
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl font-heading text-3xl font-extrabold leading-tight text-text-dark sm:text-5xl lg:text-6xl"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-text-dark/80 sm:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button to="/request-quote" variant="primary" className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base">
            Request a Quote
          </Button>
          <Button to="/book-appointment" variant="outline" className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base">
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
    </section>
  );
};

export default Hero;

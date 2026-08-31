import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award } from 'lucide-react';
import Button from '../components/Button.jsx';

const PLACEHOLDER = '/786176294_1474851221127941_1562602384611675836_n.jpg';

const Hero = ({ settings }) => {
  const heading = settings?.heroHeading || "Calgary's Trusted Range Hood & Ventilation Experts";
  const description =
    settings?.heroDescription ||
    'Professional range hood installation, replacement, and kitchen exhaust ventilation services across Calgary and Alberta.';

  return (
    <section className="bg-black">
      <div className="container-custom grid grid-cols-1 items-center gap-0 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start justify-center py-16 lg:py-24">
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
            className="max-w-xl font-heading text-3xl font-extrabold leading-tight text-warm-white sm:text-5xl lg:text-5xl"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-base text-warm-white/80 sm:text-lg"
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

          <div className="mt-12 flex flex-wrap gap-8 text-warm-white/80">
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

        <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-charcoal sm:h-96 lg:h-[85vh] lg:rounded-none">
          <img
            src={settings?.heroImage || PLACEHOLDER}
            alt="Range hood installed by Venthood.ca showing the complete unit"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

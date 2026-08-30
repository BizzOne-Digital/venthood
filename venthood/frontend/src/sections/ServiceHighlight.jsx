import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

const features = [
  {
    image: '/787795894_1592295562546675_5857687339264981762_n.jpg',
    alt: 'Modern glass canopy island range hood installation',
    eyebrow: 'Modern Ventilation',
    title: 'Sleek Designs That Still Perform',
    description:
      'A range hood should look as good as it works. We install modern glass canopy and stainless designs that blend into contemporary kitchens while still moving enough air to keep grease and odors under control.',
  },
  {
    image: '/784389214_1045749075096476_1190588340240264106_n.jpg',
    alt: 'Wall-mount range hood installed against dark marble backsplash',
    eyebrow: 'Ductwork & Venting',
    title: 'Getting the Airflow Right, Every Time',
    description:
      'A great-looking hood is only half the job. We plan duct routing to minimize bends and maximize airflow efficiency, whether venting through the roof, wall, or soffit, so your system actually performs the way it should.',
  },
];

const ServiceHighlight = () => {
  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="How We Work"
          title="Function Meets Finish"
          description="Every installation balances a clean look with proper, code-compliant ventilation performance."
        />

        <div className="space-y-16">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl"
              >
                <img
                  src={f.image}
                  alt={f.alt}
                  className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-96"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-gold">{f.eyebrow}</span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-text-dark sm:text-3xl">{f.title}</h3>
                <p className="mt-4 text-text-gray">{f.description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button to="/request-quote" variant="primary">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlight;

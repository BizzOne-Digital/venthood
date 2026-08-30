import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

const features = [
  {
    image: '/780980562_1063810183316793_2759132301111384229_n.jpg',
    alt: 'Island range hood installation in an open-concept kitchen',
    eyebrow: 'Island Installations',
    title: 'Built for Open-Concept Kitchens',
    description:
      'Island range hoods need precise ceiling ductwork and structural support to look this clean. Our team handles the framing, venting, and finishing so the hood becomes a natural part of your kitchen design, not an afterthought.',
  },
  {
    image: '/783685701_2610210646150943_3407860457152359101_n.jpg',
    alt: 'Wall-mount chimney range hood with marble backsplash',
    eyebrow: 'Custom Finishes',
    title: 'Matched to Your Kitchen, Not a Standard Template',
    description:
      "Every kitchen is different, so every installation should be too. We work around your backsplash, cabinetry, and layout to make sure the final result looks like it was designed that way from the start, whether it's marble, tile, or wood.",
  },
];

const ShowcaseCollage = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Real Jobs, Real Results"
          title="See the Craftsmanship Up Close"
          description="A look at real range hood installations completed by our team across Calgary and area."
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
          <Button to="/projects" variant="primary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseCollage;

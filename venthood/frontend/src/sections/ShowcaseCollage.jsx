import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

const images = [
  { src: '/780980562_1063810183316793_2759132301111384229_n.jpg', alt: 'Island range hood installation in an open-concept kitchen' },
  { src: '/786176294_1474851221127941_1562602384611675836_n.jpg', alt: 'Chimney-style range hood installed over a gas range' },
  { src: '/783685701_2610210646150943_3407860457152359101_n.jpg', alt: 'Wall-mount range hood with marble backsplash' },
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

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 overflow-hidden rounded-xl lg:col-span-1 lg:row-span-2"
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            />
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <Button to="/projects" variant="primary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseCollage;

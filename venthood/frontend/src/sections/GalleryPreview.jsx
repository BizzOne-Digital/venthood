import { useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Button from '../components/Button.jsx';

const images = [
  '/779305517_952805104509640_4780882728811957423_n.jpg',
  '/782381964_1610497227097328_4751905966041151602_n.jpg',
  '/783555969_1603821838114415_2700642312628496288_n.jpg',
  '/787203995_4348230315491797_5125518322257017329_n.jpg',
  '/785978767_1009426635385516_2934371899083596006_n.jpg',
  '/786390515_1370904435229868_6758035697746253391_n.jpg',
];

const GalleryPreview = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Gallery"
          title="More From Our Recent Installs"
          description="Browse a few more shots from completed range hood and ventilation projects."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveIndex(i)}
              className="group aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={src}
                alt={`Range hood installation ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button to="/gallery" variant="outline">
            View Full Gallery
          </Button>
        </div>
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
        onNext={() => setActiveIndex((i) => (i + 1) % images.length)}
      />
    </section>
  );
};

export default GalleryPreview;

import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images = [], index, onClose, onPrev, onNext }) => {
  if (index === null || index === undefined || !images.length) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 text-warm-white hover:text-gold"
      >
        <X size={32} />
      </button>

      {images.length > 1 && (
        <button
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-4 text-warm-white hover:text-gold"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      <img
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        className="max-h-[85vh] max-w-full rounded-lg object-contain"
      />

      {images.length > 1 && (
        <button
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-4 text-warm-white hover:text-gold"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
};

export default Lightbox;

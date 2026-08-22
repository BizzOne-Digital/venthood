import { Phone, MessageCircle } from 'lucide-react';
import { PHONES, WHATSAPP } from '../utils/constants';

const FloatingActions = () => {
  const whatsappNumber = WHATSAPP.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/1${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={`tel:${PHONES[0]}`}
        aria-label="Call us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg transition-transform hover:scale-110"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingActions;

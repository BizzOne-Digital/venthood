import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { NAV_LINKS, PHONES, EMAIL, SERVICE_AREA } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-black text-warm-white">
      <div className="container-custom grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center rounded-md bg-warm-white p-1">
            <img src="/logo.png" alt="Venthood.ca" className="h-16 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-warm-white/60">
            Calgary's trusted range hood installation and kitchen exhaust ventilation experts.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" aria-label="Facebook" className="text-warm-white/60 hover:text-gold">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-warm-white/60 hover:text-gold">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-gold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-warm-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-gold">Get Started</h4>
          <ul className="mt-4 space-y-2 text-sm text-warm-white/70">
            <li>
              <Link to="/request-quote" className="hover:text-gold">
                Request a Quote
              </Link>
            </li>
            <li>
              <Link to="/book-appointment" className="hover:text-gold">
                Book an Appointment
              </Link>
            </li>
            <li>
              <Link to="/customer/login" className="hover:text-gold">
                Customer Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-gold">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-warm-white/70">
            {PHONES.map((phone) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone size={16} className="text-gold" />
                <a href={`tel:${phone}`} className="hover:text-gold">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold" />
              <a href={`mailto:${EMAIL}`} className="hover:text-gold">
                {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-gold" />
              {SERVICE_AREA}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-warm-white/50">
        &copy; {new Date().getFullYear()} Venthood.ca &mdash; {SERVICE_AREA}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

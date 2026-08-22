import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, PHONES, BUSINESS_NAME } from '../utils/constants';
import Button from './Button.jsx';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom flex h-20 items-center justify-between">
        <Link to="/" className="flex shrink-0 items-center">
          <img src="/logo.png" alt={BUSINESS_NAME} className="h-16 w-auto max-h-full" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-gold' : 'text-text-dark hover:text-gold'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${PHONES[0]}`} className="flex items-center gap-2 text-sm font-medium text-text-dark">
            <Phone size={16} className="text-gold" />
            {PHONES[0]}
          </a>
          <Button to="/request-quote" variant="primary">
            Request a Quote
          </Button>
        </div>

        <button
          className="text-text-dark lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border-light bg-white lg:hidden">
          <nav className="container-custom flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${isActive ? 'text-gold' : 'text-text-dark'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/request-quote" variant="primary" className="mt-2 w-full">
              Request a Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

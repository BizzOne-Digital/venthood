import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-gold text-black hover:bg-gold-hover',
  outline: 'border border-gold text-gold hover:bg-gold hover:text-black',
  dark: 'bg-black text-warm-white hover:bg-charcoal',
  ghost: 'text-black hover:text-gold',
};

const Button = ({ children, to, href, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
  const base = `inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={base} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
};

export default Button;

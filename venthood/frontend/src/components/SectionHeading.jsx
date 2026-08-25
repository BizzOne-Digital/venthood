const SectionHeading = ({ eyebrow, title, description, align = 'center', theme = 'light' }) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = theme === 'dark' ? 'text-warm-white' : 'text-text-dark';
  const descriptionColor = theme === 'dark' ? 'text-warm-white/70' : 'text-text-gray';

  return (
    <div className={`max-w-2xl ${alignment} mb-12`}>
      {eyebrow && (
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading text-3xl font-bold sm:text-4xl ${titleColor}`}>{title}</h2>
      {description && <p className={`mt-4 ${descriptionColor}`}>{description}</p>}
    </div>
  );
};

export default SectionHeading;

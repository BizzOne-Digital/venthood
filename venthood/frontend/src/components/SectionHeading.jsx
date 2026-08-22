const SectionHeading = ({ eyebrow, title, description, align = 'center' }) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment} mb-12`}>
      {eyebrow && (
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold text-text-dark sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-text-gray">{description}</p>}
    </div>
  );
};

export default SectionHeading;

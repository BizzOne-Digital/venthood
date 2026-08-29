import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Installations Completed' },
  { value: 8, suffix: '+', label: 'Years of Experience' },
  { value: 5, suffix: '', label: 'Cities Served in Alberta' },
  { value: 100, suffix: '%', label: 'Code-Compliant Work' },
];

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-heading text-4xl font-extrabold text-gold sm:text-5xl">
      {count}
      {suffix}
    </span>
  );
};

const StatsCounter = () => {
  return (
    <section className="bg-black py-16">
      <div className="container-custom grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-warm-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;

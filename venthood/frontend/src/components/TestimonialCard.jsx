import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border-light bg-white p-6">
      <Quote className="text-gold" size={28} />
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? 'fill-gold text-gold' : 'text-border-light'}
          />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm text-text-gray">{testimonial.review}</p>
      <div className="mt-4">
        <p className="font-heading text-sm font-semibold text-text-dark">{testimonial.name}</p>
        <p className="text-xs text-text-gray">{testimonial.location}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;

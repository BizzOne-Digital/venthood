import SectionHeading from '../components/SectionHeading.jsx';
import TestimonialCard from '../components/TestimonialCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Testimonials = ({ testimonials, loading }) => {
  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="bg-warm-white py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          description="Real feedback from homeowners and businesses across Calgary."
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

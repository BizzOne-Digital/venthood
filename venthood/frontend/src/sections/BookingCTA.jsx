import Button from '../components/Button.jsx';

const BookingCTA = () => {
  return (
    <section className="bg-gold py-16">
      <div className="container-custom flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <h3 className="font-heading text-2xl font-bold text-black sm:text-3xl">
            Ready to upgrade your kitchen ventilation?
          </h3>
          <p className="mt-2 text-black/70">
            Get a free, no-obligation quote or book an appointment today.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button to="/request-quote" variant="dark">
            Request a Quote
          </Button>
          <Button to="/book-appointment" variant="outline" className="border-black text-black hover:bg-black hover:text-warm-white">
            Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;

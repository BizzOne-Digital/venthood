import SectionHeading from '../components/SectionHeading.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import Button from '../components/Button.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const HomeFAQ = ({ faqs, loading }) => {
  if (!loading && faqs.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          eyebrow="Have Questions?"
          title="Frequently Asked Questions"
          description="Quick answers to what Calgary homeowners ask us most."
        />

        {loading ? <LoadingSpinner /> : <FAQAccordion faqs={faqs.slice(0, 5)} />}

        <div className="mt-8 text-center">
          <Button to="/faq" variant="outline">
            View All FAQs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;

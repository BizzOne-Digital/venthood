import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionHeading from '../components/SectionHeading.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/faqs')
      .then((res) => setFaqs(res.data.faqs || []))
      .catch((err) => console.error('Failed to load FAQs:', err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          eyebrow="Have Questions?"
          title="Frequently Asked Questions"
          description="Answers to the questions we hear most from Calgary homeowners and businesses."
        />

        {loading ? (
          <LoadingSpinner />
        ) : faqs.length === 0 ? (
          <p className="text-center text-text-gray">No FAQs available yet. Please check back soon.</p>
        ) : (
          <FAQAccordion faqs={faqs} />
        )}
      </div>
    </section>
  );
};

export default FAQ;

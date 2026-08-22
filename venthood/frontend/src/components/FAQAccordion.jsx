import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-border-light rounded-xl border border-border-light bg-white">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq._id || index}>
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="font-heading font-semibold text-text-dark">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && <div className="px-6 pb-5 text-sm text-text-gray">{faq.answer}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;

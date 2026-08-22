import { ShieldCheck, Users, Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

// NOTE: placeholder photo - replace with a real team/job-site photo.
const PLACEHOLDER = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

const About = () => {
  return (
    <div className="py-20">
      <div className="container-custom grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">About Venthood.ca</span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-text-dark sm:text-4xl">
            Calgary's Dedicated Range Hood & Ventilation Specialists
          </h1>
          <p className="mt-4 text-text-gray">
            Venthood.ca was built to solve one problem well: reliable, professional range hood and kitchen
            exhaust ventilation installation for homeowners and businesses across Calgary and the surrounding
            areas of Alberta. Our technicians bring years of hands-on experience to every job, from simple
            replacements to complex island and commercial exhaust systems.
          </p>
          <p className="mt-4 text-text-gray">
            We believe in transparent communication, code-compliant workmanship, and a finished job that looks
            as good as it performs.
          </p>
          <Button to="/request-quote" variant="primary" className="mt-6">
            Request a Quote
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl">
          <img src={PLACEHOLDER} alt="Venthood.ca technician at work" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="container-custom mt-20">
        <SectionHeading eyebrow="Our Commitment" title="What We Stand For" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-border-light bg-white p-6 text-center">
            <ShieldCheck className="mx-auto text-gold" size={28} />
            <h3 className="mt-4 font-heading text-lg font-semibold text-text-dark">Safety & Compliance</h3>
            <p className="mt-2 text-sm text-text-gray">
              Every installation meets Alberta building code and safety standards.
            </p>
          </div>
          <div className="rounded-xl border border-border-light bg-white p-6 text-center">
            <Users className="mx-auto text-gold" size={28} />
            <h3 className="mt-4 font-heading text-lg font-semibold text-text-dark">Local & Reliable</h3>
            <p className="mt-2 text-sm text-text-gray">
              A local Calgary team that shows up on time and communicates clearly.
            </p>
          </div>
          <div className="rounded-xl border border-border-light bg-white p-6 text-center">
            <Award className="mx-auto text-gold" size={28} />
            <h3 className="mt-4 font-heading text-lg font-semibold text-text-dark">Quality Craftsmanship</h3>
            <p className="mt-2 text-sm text-text-gray">
              We take pride in clean, precise work that lasts for years.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

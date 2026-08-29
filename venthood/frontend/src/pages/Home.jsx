import { useEffect, useState } from 'react';
import api from '../services/api';
import Hero from '../sections/Hero.jsx';
import TrustBar from '../sections/TrustBar.jsx';
import ServicesGrid from '../sections/ServicesGrid.jsx';
import ShowcaseCollage from '../sections/ShowcaseCollage.jsx';
import RecentProjects from '../sections/RecentProjects.jsx';
import StatsCounter from '../sections/StatsCounter.jsx';
import WhyChooseUs from '../sections/WhyChooseUs.jsx';
import GalleryPreview from '../sections/GalleryPreview.jsx';
import BookingCTA from '../sections/BookingCTA.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import Process from '../sections/Process.jsx';
import ServiceAreas from '../sections/ServiceAreas.jsx';
import HomeFAQ from '../sections/HomeFAQ.jsx';
import FinalCTA from '../sections/FinalCTA.jsx';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [settingsRes, servicesRes, projectsRes, testimonialsRes, faqsRes] = await Promise.allSettled([
          api.get('/settings'),
          api.get('/services'),
          api.get('/projects', { params: { featured: true } }),
          api.get('/testimonials'),
          api.get('/faqs'),
        ]);

        if (settingsRes.status === 'fulfilled') setSettings(settingsRes.value.data.settings);
        if (servicesRes.status === 'fulfilled') setServices(servicesRes.value.data.services || []);
        if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data.projects || []);
        if (testimonialsRes.status === 'fulfilled') setTestimonials(testimonialsRes.value.data.testimonials || []);
        if (faqsRes.status === 'fulfilled') setFaqs(faqsRes.value.data.faqs || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Hero settings={settings} />
      <TrustBar />
      <ServicesGrid services={services} loading={loading} />
      <ShowcaseCollage />
      <StatsCounter />
      <RecentProjects projects={projects} loading={loading} />
      <WhyChooseUs />
      <GalleryPreview />
      <BookingCTA />
      <Testimonials testimonials={testimonials} loading={loading} />
      <Process />
      <ServiceAreas areas={settings?.serviceAreas} />
      <HomeFAQ faqs={faqs} loading={loading} />
      <FinalCTA />
    </>
  );
};

export default Home;

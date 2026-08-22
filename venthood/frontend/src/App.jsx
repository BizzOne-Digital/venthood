import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const RequestQuote = lazy(() => import('./pages/RequestQuote.jsx'));
const BookAppointment = lazy(() => import('./pages/BookAppointment.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'));
const AdminLogin = lazy(() => import('./admin/pages/Login.jsx'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard.jsx'));
const AdminServices = lazy(() => import('./admin/pages/Services.jsx'));
const AdminProjects = lazy(() => import('./admin/pages/Projects.jsx'));
const AdminGallery = lazy(() => import('./admin/pages/Gallery.jsx'));
const AdminBookings = lazy(() => import('./admin/pages/Bookings.jsx'));
const AdminQuotes = lazy(() => import('./admin/pages/Quotes.jsx'));
const AdminTestimonials = lazy(() => import('./admin/pages/Testimonials.jsx'));
const AdminFAQs = lazy(() => import('./admin/pages/FAQs.jsx'));
const AdminSettings = lazy(() => import('./admin/pages/Settings.jsx'));

const CustomerLayout = lazy(() => import('./customer/CustomerLayout.jsx'));
const CustomerLogin = lazy(() => import('./customer/pages/Login.jsx'));
const CustomerRegister = lazy(() => import('./customer/pages/Register.jsx'));
const CustomerDashboard = lazy(() => import('./customer/pages/Dashboard.jsx'));
const CustomerBookings = lazy(() => import('./customer/pages/Bookings.jsx'));
const CustomerQuotes = lazy(() => import('./customer/pages/Quotes.jsx'));
const CustomerProfile = lazy(() => import('./customer/pages/Profile.jsx'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faqs" element={<AdminFAQs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="bookings" element={<CustomerBookings />} />
          <Route path="quotes" element={<CustomerQuotes />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

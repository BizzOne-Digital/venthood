import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import FloatingActions from '../components/FloatingActions.jsx';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-warm-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default MainLayout;

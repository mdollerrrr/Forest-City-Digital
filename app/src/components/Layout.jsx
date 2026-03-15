import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileCtaBar from './MobileCtaBar';
import GrainOverlay from './GrainOverlay';

export default function Layout() {
  return (
    <>
      <GrainOverlay />
      <Header />
      <MobileCtaBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

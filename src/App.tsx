import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Footer, Header } from './components/SiteLayout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import Contact from './pages/Contact';
import { vehicles, vehicleName } from './data/vehicles';

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const car = vehicles.find(item => pathname === `/cars/${item.slug}`);
    const title = pathname === '/' ? 'SKY Cars — Pre-owned. Redefined.' : pathname === '/cars' ? 'The Collection — SKY Cars' : pathname === '/contact' ? 'Contact — SKY Cars' : car ? `${vehicleName(car)} — SKY Cars` : 'Page Not Found — SKY Cars';
    document.title = title;
    if (hash) requestAnimationFrame(() => {
      if (pathname === '/' && hash === '#intro' && window.innerWidth > 850) {
        const hero = document.querySelector<HTMLElement>('.hero-scroll');
        if (hero) {
          const top = window.scrollY + hero.getBoundingClientRect().top + (hero.offsetHeight - window.innerHeight) * 0.91;
          window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          return;
        }
      }
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NotFound() { return <main className="page-main not-found container-wide"><span className="eyebrow">404 / WRONG TURN</span><h1>This road ends here.</h1><p>The page you're looking for may have moved.</p><Link className="button button-primary" to="/">Back to Home <ArrowRight size={18} /></Link></main>; }

export default function App() {
  return <><RouteEffects /><Header /><Routes><Route path="/" element={<Home />} /><Route path="/cars" element={<Inventory />} /><Route path="/cars/:slug" element={<VehicleDetail />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></>;
}

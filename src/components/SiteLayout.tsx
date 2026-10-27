import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { callHref, dealership, whatsappHref } from '../data/site';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Inventory', to: '/cars' },
  { label: 'About Us', to: '/#about' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [open]);
  const solid = scrolled || location.pathname !== '/' || open;
  return <header className={`site-header ${solid ? 'is-solid' : ''}`}>
    <div className="nav-inner container-wide">
      <Link to="/" className="wordmark" aria-label="SKY Cars home">SKY<span>CARS</span><i>.</i></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(item => item.to.includes('#') ? <Link key={item.label} to={item.to}>{item.label}</Link> : <NavLink key={item.label} end={item.to === '/'} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}
      </nav>
      <Link className="nav-enquire" to="/contact">Enquire Now <ArrowUpRight size={16} aria-hidden="true" /></Link>
      <button className="mobile-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation" inert={!open}>
      {navItems.map(item => <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} /></Link>)}
      <Link className="mobile-nav-cta" to="/contact" onClick={() => setOpen(false)}>Enquire Now <ArrowRight size={18} /></Link>
    </nav>
  </header>;
}

export function Footer() {
  const call = callHref();
  return <footer className="site-footer">
    <div className="container-wide footer-main">
      <div className="footer-brand"><Link to="/" className="wordmark">SKY<span>CARS</span><i>.</i></Link><p>A considered way to discover your next drive. Explore the collection, then speak directly with our team.</p><span className="demo-note">Concept website · Sample listings and illustrative imagery</span></div>
      <div className="footer-col"><h3>Explore</h3><Link to="/">Home</Link><Link to="/cars">Inventory</Link><Link to="/#about">About Us</Link><Link to="/contact">Contact</Link></div>
      <div className="footer-col"><h3>Showroom</h3><span>{dealership.address || 'Location to be confirmed'}</span><span>{dealership.hours || 'Hours to be confirmed'}</span><span>{dealership.phone || 'Phone to be confirmed'}</span>{call && <a href={call}>Call the showroom</a>}</div>
      {dealership.socials && dealership.socials.length > 0 && <div className="footer-col"><h3>Follow</h3>{dealership.socials.map(s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</div>}
    </div>
    <div className="container-wide footer-bottom"><span>© {new Date().getFullYear()} SKY CARS. All rights reserved.</span><span>Made for the journey ahead.</span></div>
  </footer>;
}

export function EnquiryActions({ vehicleName, year, compact = false }: { vehicleName?: string; year?: number; compact?: boolean }) {
  const message = vehicleName && year ? `Hi SKY Cars, I'm interested in the ${vehicleName} (${year}) listed on your website. Is it still available?` : "Hi SKY Cars, I'd like to learn more about your cars.";
  const whatsapp = whatsappHref(message);
  const call = callHref();
  return <div className={`enquiry-actions ${compact ? 'compact' : ''}`}>
    {whatsapp ? <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={18} /></a> : <Link className="button button-primary" to="/contact">Enquire with the Showroom <ArrowUpRight size={18} /></Link>}
    {call ? <a className="button button-outline" href={call}>Call the Showroom</a> : <Link className="button button-outline" to="/contact">Contact Details</Link>}
  </div>;
}

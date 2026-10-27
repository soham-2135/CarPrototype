import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CarFront, MessageCircle, Search, SlidersHorizontal } from 'lucide-react';
import { ScrollHero } from '../components/ScrollHero';
import { Reveal } from '../components/Reveal';
import { EnquiryActions } from '../components/SiteLayout';
import { VehicleCard } from '../components/VehicleCard';
import { dealership } from '../data/site';
import { vehicles } from '../data/vehicles';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [body, setBody] = useState('');
  const search = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (budget) params.set('budget', budget);
    if (body) params.set('body', body);
    navigate(`/cars${params.size ? `?${params}` : ''}`);
  };
  const featured = vehicles.filter(vehicle => vehicle.featured).slice(0, 3);
  return <>
    <ScrollHero />

    <section className="section featured-section" id="collection" aria-labelledby="featured-heading">
      <div className="container-wide">
        <Reveal className="section-head split-head"><div><span className="eyebrow"><span className="eyebrow-line" /> THE COLLECTION</span><h2 id="featured-heading">Find Your Kind<br />of <em>Drive.</em></h2></div><div className="section-aside"><p>A closer look at some of the cars waiting to be discovered.</p><Link className="text-link" to="/cars">View All Cars <ArrowUpRight size={18} /></Link></div></Reveal>
        <div className="vehicle-grid featured-grid">{featured.map((vehicle, index) => <Reveal key={vehicle.id} delay={index * 0.1}><VehicleCard vehicle={vehicle} index={index} /></Reveal>)}</div>
        <p className="inventory-disclaimer">Concept catalog: sample listings, specifications, prices, and imagery are illustrative.</p>
      </div>
    </section>

    <section className="section finder-section" aria-labelledby="finder-heading">
      <div className="container-wide finder-layout">
        <Reveal className="finder-copy"><span className="eyebrow"><span className="eyebrow-line" /> FIND YOUR MATCH</span><h2 id="finder-heading">The Right Car,<br /><em>Without the Guesswork.</em></h2><p>Start with what matters to you. Explore the full collection with filters that make narrowing things down simple.</p><span className="finder-number">02 / DISCOVER</span></Reveal>
        <Reveal className="finder-panel" delay={0.1}><div className="finder-panel-top"><Search size={22} /><span>BEGIN YOUR SEARCH</span><SlidersHorizontal size={19} /></div><form onSubmit={search}><label htmlFor="home-search">Make or model</label><input id="home-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a car, e.g. BMW X3" /><div className="finder-pair"><div><label htmlFor="home-budget">Budget</label><select id="home-budget" value={budget} onChange={event => setBudget(event.target.value)}><option value="">Any budget</option><option value="3000000">Up to ₹30 lakh</option><option value="4000000">Up to ₹40 lakh</option><option value="5000000">Up to ₹50 lakh</option><option value="7000000">Up to ₹70 lakh</option></select></div><div><label htmlFor="home-body">Body type</label><select id="home-body" value={body} onChange={event => setBody(event.target.value)}><option value="">All styles</option><option>Sedan</option><option>SUV</option><option>Coupe</option><option>Hatchback</option></select></div></div><button className="button button-primary finder-submit" type="submit">Explore Cars <ArrowUpRight size={18} /></button></form><div className="finder-panel-footer"><span>Looking for something specific?</span><Link to="/cars">Advanced filters <ArrowRight size={16} /></Link></div></Reveal>
      </div>
    </section>

    <section className="section difference-section" aria-labelledby="difference-heading">
      <div className="container-wide"><Reveal className="difference-head"><span className="eyebrow"><span className="eyebrow-line" /> THE SKY CARS EXPERIENCE</span><h2 id="difference-heading">Good Cars. Clear Details.<br /><em>Personal Service.</em></h2><p>Explore the details, find a car that fits your needs, and speak directly with our team.</p></Reveal><div className="difference-grid">
        {[{ n: '01', title: 'The Details Matter', text: 'Explore vehicle specifications, photographs, and important details before making an enquiry.', icon: <CarFront size={27} strokeWidth={1.4} /> }, { n: '02', title: 'Personal Assistance', text: 'Get in touch directly with the showroom for questions about a vehicle.', icon: <MessageCircle size={27} strokeWidth={1.4} /> }, { n: '03', title: 'Your Choice, Your Pace', text: 'Browse the collection and arrange a viewing when you find the right car.', icon: <ArrowRight size={27} strokeWidth={1.4} /> }].map((item, index) => <Reveal className="difference-item" key={item.n} delay={index * 0.1}><div className="difference-item-top"><span>{item.n} / 03</span>{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}
      </div></div>
    </section>

    <section className="section editorial-section" aria-labelledby="editorial-heading"><div className="container-wide"><Reveal className="editorial-head"><span className="eyebrow"><span className="eyebrow-line" /> BEHIND THE DRIVE</span><h2 id="editorial-heading">More Than Just<br /><em>a First Look.</em></h2></Reveal><div className="editorial-grid"><Reveal className="editorial-main"><img src="/images/car-a6.webp" alt="Illustrative close look at a premium sedan" loading="lazy" width="1200" height="800" /><span className="image-caption">01 / THE EXTERIOR</span></Reveal><Reveal className="editorial-side" delay={0.12}><div className="editorial-side-image"><img src="/images/interior.webp" alt="Illustrative detail of a premium car interior" loading="lazy" width="800" height="650" /><span className="image-caption">02 / THE DETAILS</span></div><div className="editorial-text"><span className="eyebrow small">EVERY DETAIL TELLS A STORY</span><p>From the line of a silhouette to the feeling of the cabin, take the time to discover the car that feels right for you.</p><Link className="text-link" to="/cars/audi-a6-45-tfsi">Explore This Car <ArrowUpRight size={18} /></Link></div></Reveal></div></div></section>

    <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="container-wide about-layout"><Reveal className="about-image"><img src="/images/showroom.webp" alt="Illustrative view of a premium automotive showroom" loading="lazy" width="1200" height="800" /><span>THE SHOWROOM / A PLACE TO START</span></Reveal><Reveal className="about-copy" delay={0.1}><span className="eyebrow"><span className="eyebrow-line" /> A MORE PERSONAL EXPERIENCE</span><h2 id="about-heading">Meet<br /><em>SKY Cars.</em></h2><p>Your next car search should feel straightforward. Explore our collection and connect directly with our team to learn more about the vehicles available.</p><div className="about-details"><div><span>LOCATION</span><strong>{dealership.address || 'Showroom location to be confirmed'}</strong></div><div><span>OPENING HOURS</span><strong>{dealership.hours || 'Business hours to be confirmed'}</strong></div><div><span>CONTACT</span><strong>{dealership.phone || 'Contact number to be confirmed'}</strong></div></div><Link className="button button-outline" to="/contact">Contact Us <ArrowUpRight size={18} /></Link></Reveal></div></section>

    <section className="final-cta" aria-labelledby="final-heading"><div className="container-wide final-cta-inner"><Reveal><span className="eyebrow"><span className="eyebrow-line" /> THE ROAD IS YOURS</span><h2 id="final-heading">Your Next Chapter Starts<br /><em>Behind the Wheel.</em></h2><p>Found a car you like? Let's help you take the next step.</p><EnquiryActions /></Reveal><span className="final-cta-mark" aria-hidden="true">SKY</span></div></section>
  </>;
}

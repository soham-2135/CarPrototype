import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Fuel, Gauge, Maximize2, Settings2, X } from 'lucide-react';
import { EnquiryActions } from '../components/SiteLayout';
import { formatKm, formatPrice, vehicleName, vehicles } from '../data/vehicles';

export default function VehicleDetail() {
  const { slug } = useParams();
  const vehicle = vehicles.find(item => item.slug === slug);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const galleryButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const images = vehicle?.images.filter(Boolean) ?? [];
  useEffect(() => { setActive(0); setLightbox(false); }, [slug]);
  useEffect(() => {
    if (!lightbox) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowRight') setActive(value => (value + 1) % images.length);
      if (event.key === 'ArrowLeft') setActive(value => (value - 1 + images.length) % images.length);
      if (event.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); galleryButton.current?.focus(); };
  }, [lightbox, images.length]);
  if (!vehicle) return <main className="page-main not-found container-wide"><span className="eyebrow">NO VEHICLE FOUND</span><h1>That car isn't in the collection.</h1><Link className="button button-primary" to="/cars">Back to Inventory <ArrowRight size={18} /></Link></main>;
  const name = vehicleName(vehicle);
  return <main className="page-main detail-page"><div className="container-wide" inert={lightbox}><Link className="back-link" to="/cars"><ArrowLeft size={17} /> Back to Inventory</Link><div className="detail-topline"><div><span className="eyebrow"><span className="eyebrow-line" /> THE COLLECTION / {vehicle.bodyType.toUpperCase()}</span><h1>{name}<em>.</em></h1><p>{vehicle.year} {vehicle.variant && `· ${vehicle.variant}`}</p></div><div className="detail-price"><span>INDICATIVE PRICE</span><strong>{formatPrice(vehicle.price)}</strong></div></div><div className="detail-layout"><div className="gallery"><button ref={galleryButton} type="button" className={`gallery-main ${active === 1 ? 'crop-detail' : ''}`} onClick={() => images.length && setLightbox(true)} aria-label="Open image gallery">{images[active] ? <img src={images[active]} alt={`Illustrative view ${active + 1} of ${name}`} width="1200" height="800" /> : <span className="image-fallback">Image coming soon</span>}<span className="gallery-expand"><Maximize2 size={17} /> View full image</span></button><div className="gallery-thumbs">{images.map((src, index) => <button type="button" key={`${src}-${index}`} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-pressed={active === index}><img src={src} alt="" width="220" height="150" loading="lazy" /></button>)}</div><p className="image-disclaimer">Illustrative prototype imagery. Vehicle appearance and specifications require verification.</p></div><aside className="detail-summary"><div className="detail-summary-head"><span>AT A GLANCE</span>{vehicle.status && <span className="status-badge inline">{vehicle.status}</span>}</div><div className="key-specs"><div><span><Gauge size={17} /> Kilometres</span><strong>{formatKm(vehicle.kilometres)}</strong></div><div><span><Fuel size={17} /> Fuel type</span><strong>{vehicle.fuelType}</strong></div><div><span><Settings2 size={17} /> Transmission</span><strong>{vehicle.transmission}</strong></div><div><span>Body style</span><strong>{vehicle.bodyType}</strong></div><div><span>Year</span><strong>{vehicle.year}</strong></div></div><div className="detail-enquiry"><span>INTERESTED IN THIS CAR?</span>{vehicle.available ? <><p>Speak with the showroom team to learn more or arrange a viewing.</p><EnquiryActions vehicleName={name} year={vehicle.year} compact /></> : <p>This sample listing is currently marked unavailable.</p>}</div></aside></div><div className="detail-lower"><div><span className="eyebrow"><span className="eyebrow-line" /> THE STORY</span><h2>Made for the<br /><em>way you move.</em></h2><p>{vehicle.description}</p></div><div><span className="eyebrow"><span className="eyebrow-line" /> HIGHLIGHTS</span><h3>Vehicle features</h3>{vehicle.features.length ? <ul className="feature-list">{vehicle.features.map(feature => <li key={feature}>{feature}</li>)}</ul> : <p>Feature details will be added soon.</p>}</div></div><div className="detail-next"><span>KEEP EXPLORING</span><Link className="text-link" to="/cars">View the Full Collection <ArrowRight size={18} /></Link></div></div>
    {vehicle.available && <div className="mobile-sticky-enquire"><EnquiryActions vehicleName={name} year={vehicle.year} compact /></div>}
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image gallery`}><button ref={closeButton} className="lightbox-close" type="button" aria-label="Close image gallery" onClick={() => setLightbox(false)}><X size={26} /></button><button className="lightbox-prev" type="button" aria-label="Previous image" onClick={() => setActive(value => (value - 1 + images.length) % images.length)}><ChevronLeft size={30} /></button><img src={images[active]} alt={`Illustrative view ${active + 1} of ${name}`} /><button className="lightbox-next" type="button" aria-label="Next image" onClick={() => setActive(value => (value + 1) % images.length)}><ChevronRight size={30} /></button><span className="lightbox-count">{active + 1} / {images.length}</span></div>}
  </main>;
}

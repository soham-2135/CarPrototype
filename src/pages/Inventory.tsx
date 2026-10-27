import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { VehicleCard } from '../components/VehicleCard';
import { vehicles } from '../data/vehicles';

type FilterKey = 'q' | 'budget' | 'body' | 'fuel' | 'transmission' | 'year' | 'km' | 'sort';
export default function Inventory() {
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (!drawerOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setDrawerOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [drawerOpen]);
  const get = (key: FilterKey) => params.get(key) || '';
  const set = (key: FilterKey, value: string) => {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      value ? next.set(key, value) : next.delete(key);
      return next;
    }, { replace: true });
  };
  const reset = () => setParams({}, { replace: true });
  const results = useMemo(() => {
    const q = get('q').toLowerCase().trim();
    const items = vehicles.filter(car => {
      if (q && !`${car.make} ${car.model} ${car.variant || ''}`.toLowerCase().includes(q)) return false;
      if (get('budget') && (car.price == null || car.price > Number(get('budget')))) return false;
      if (get('body') && car.bodyType !== get('body')) return false;
      if (get('fuel') && car.fuelType !== get('fuel')) return false;
      if (get('transmission') && car.transmission !== get('transmission')) return false;
      if (get('year') && car.year < Number(get('year'))) return false;
      if (get('km') && car.kilometres > Number(get('km'))) return false;
      return true;
    });
    const sort = get('sort');
    if (sort === 'price-low') items.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === 'price-high') items.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === 'year-new') items.sort((a, b) => b.year - a.year);
    if (sort === 'year-old') items.sort((a, b) => a.year - b.year);
    if (!sort) items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return items;
  // params identity updates on every filter change.
  }, [params]);
  const filterCount = ['q', 'budget', 'body', 'fuel', 'transmission', 'year', 'km'].filter(key => params.has(key)).length;
  const filters = (prefix: string) => <div className="filter-fields">
    <div className="filter-title"><h2>Filters</h2><button type="button" onClick={reset} className="reset-button">Reset all</button></div>
    <label htmlFor={`${prefix}-search`}>Make or model</label><div className="search-input"><Search size={17} /><input id={`${prefix}-search`} value={get('q')} onChange={event => set('q', event.target.value)} placeholder="Search vehicles" /></div>
    <label htmlFor={`${prefix}-budget`}>Maximum budget</label><select id={`${prefix}-budget`} value={get('budget')} onChange={event => set('budget', event.target.value)}><option value="">Any budget</option><option value="3000000">Up to ₹30 lakh</option><option value="4000000">Up to ₹40 lakh</option><option value="5000000">Up to ₹50 lakh</option><option value="6000000">Up to ₹60 lakh</option><option value="7000000">Up to ₹70 lakh</option></select>
    <label htmlFor={`${prefix}-body`}>Body type</label><select id={`${prefix}-body`} value={get('body')} onChange={event => set('body', event.target.value)}><option value="">All body types</option><option>Sedan</option><option>SUV</option><option>Coupe</option><option>Hatchback</option></select>
    <label htmlFor={`${prefix}-fuel`}>Fuel type</label><select id={`${prefix}-fuel`} value={get('fuel')} onChange={event => set('fuel', event.target.value)}><option value="">All fuel types</option><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></select>
    <label htmlFor={`${prefix}-transmission`}>Transmission</label><select id={`${prefix}-transmission`} value={get('transmission')} onChange={event => set('transmission', event.target.value)}><option value="">Any transmission</option><option>Automatic</option><option>Manual</option></select>
    <label htmlFor={`${prefix}-year`}>Manufacturing year</label><select id={`${prefix}-year`} value={get('year')} onChange={event => set('year', event.target.value)}><option value="">Any year</option><option value="2022">2022 or newer</option><option value="2021">2021 or newer</option><option value="2020">2020 or newer</option></select>
    <label htmlFor={`${prefix}-km`}>Kilometres driven</label><select id={`${prefix}-km`} value={get('km')} onChange={event => set('km', event.target.value)}><option value="">Any mileage</option><option value="20000">Under 20,000 km</option><option value="30000">Under 30,000 km</option><option value="40000">Under 40,000 km</option></select>
    <button type="button" className="button button-primary mobile-show-results" onClick={() => setDrawerOpen(false)}>Show {results.length} {results.length === 1 ? 'car' : 'cars'} <ArrowRight size={18} /></button>
  </div>;
  return <main className="page-main inventory-page"><section className="inventory-banner" aria-labelledby="inventory-heading"><div className="inventory-banner-image" aria-hidden="true" /><div className="inventory-banner-shade" /><div className="container-wide inventory-banner-inner"><Reveal><span className="eyebrow"><span className="eyebrow-line" /> SKY CARS / THE INVENTORY</span><h1 id="inventory-heading">OUR<br /><em>COLLECTION.</em></h1><div className="inventory-banner-foot"><p>A considered collection for every kind of journey. Find the one that moves you.</p><span>EXPLORE / 01—08</span></div></Reveal></div></section>
    <div className="container-wide catalog-introduction"><div><span className="eyebrow"><span className="eyebrow-line" /> FIND YOUR MATCH</span><h2>Explore the collection.</h2></div><p>Browse by body style or refine the details to find a car that fits your needs.</p></div>
    <div className="container-wide inventory-layout"><aside className="filter-sidebar" aria-label="Vehicle filters">{filters('sidebar')}</aside><div className="inventory-results"><div className="catalog-pills" role="group" aria-label="Filter by body type">{['', 'Sedan', 'SUV', 'Coupe', 'Hatchback'].map(body => <button type="button" key={body || 'all'} className={get('body') === body ? 'active' : ''} aria-pressed={get('body') === body} onClick={() => set('body', body)}>{body || 'All Cars'}</button>)}</div><div className="results-toolbar"><div><strong>{results.length} {results.length === 1 ? 'Car' : 'Cars'}</strong><span> in the collection</span></div><button className="mobile-filter-button" type="button" onClick={() => setDrawerOpen(true)}><SlidersHorizontal size={17} /> Filters {filterCount > 0 && <span>{filterCount}</span>}</button><label className="sort-label" htmlFor="inventory-sort">Sort by <select id="inventory-sort" value={get('sort')} onChange={event => set('sort', event.target.value)}><option value="">Recently added</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="year-new">Year: newest first</option><option value="year-old">Year: oldest first</option></select></label></div>
      {results.length ? <div className="vehicle-grid catalog-grid">{results.map((vehicle, index) => <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />)}</div> : <div className="empty-results"><Search size={34} strokeWidth={1.2} /><h2>No cars match that search.</h2><p>Try a different make, budget, or filter to see more of the collection.</p><button className="button button-outline" onClick={reset}>Reset Filters <ArrowRight size={17} /></button></div>}
    </div></div>
    {drawerOpen && <div className="filter-drawer-wrap"><button className="drawer-scrim" type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)} /><div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Vehicle filters"><div className="drawer-head"><span>REFINE YOUR SEARCH</span><button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)}><X size={23} /></button></div>{filters('drawer')}</div></div>}
    <div className="container-wide inventory-end"><p className="inventory-disclaimer">Concept catalog: listings, prices, specifications, and imagery are illustrative.</p><Link className="text-link" to="/contact">Looking for something specific? <ArrowRight size={18} /></Link></div>
  </main>;
}

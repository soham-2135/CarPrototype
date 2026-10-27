import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { callHref, dealership } from '../data/site';

type FormFields = { name: string; email: string; vehicle: string; message: string };
const initial: FormFields = { name: '', email: '', vehicle: '', message: '' };

export default function Contact() {
  const [fields, setFields] = useState<FormFields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const call = callHref();
  const update = (key: keyof FormFields, value: string) => {
    setFields(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof FormFields, string>> = {};
    if (fields.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (fields.message.trim().length < 10) next.message = 'Please enter at least 10 characters.';
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  };

  return <main className="page-main contact-page">
    <section className="contact-masthead container-wide">
      <Reveal><span className="eyebrow"><span className="eyebrow-line" /> A DIRECT CONVERSATION</span><h1>Get in touch <em>with us.</em></h1><p>Questions about a car? Ready for a closer look? Tell us what you have in mind and take the next step at your own pace.</p></Reveal>
    </section>

    <section className="container-wide contact-message-layout" aria-labelledby="contact-message-heading">
      <Reveal className="contact-message-copy"><span className="eyebrow"><span className="eyebrow-line" /> 01 / ENQUIRIES</span><h2 id="contact-message-heading">Leave us<br /><em>a message.</em></h2><p>Whether a particular vehicle caught your eye or you're still exploring, we're here to help you get the details you need.</p><div className="contact-direct"><span>CONTACT THE SHOWROOM</span>{call ? <a href={call}><Phone size={17} /> {dealership.phone}</a> : <p><Phone size={17} /> Phone number to be confirmed</p>}{dealership.email ? <a href={`mailto:${dealership.email}`}><Mail size={17} /> {dealership.email}</a> : <p><Mail size={17} /> Email address to be confirmed</p>}</div></Reveal>
      <Reveal className="contact-form-panel" delay={0.1}>{submitted ? <div className="form-success" role="status"><span className="eyebrow">DEMO FORM</span><h2>Your enquiry is ready.</h2><p>This is a frontend prototype. Your message has not been sent or saved. Add real showroom contact details and an enquiry service before using the form with customers.</p><button className="button button-outline" onClick={() => { setSubmitted(false); setFields(initial); }}>Write Another Enquiry</button></div> : <><div className="form-heading"><span>YOUR ENQUIRY / 01</span><h2>Tell us a little<br /><em>about your search.</em></h2><p>Fields marked * are required.</p></div><form onSubmit={submit} noValidate><div className="contact-form-grid"><div className="form-field"><label htmlFor="contact-name">Full name <span>*</span></label><input id="contact-name" autoComplete="name" value={fields.name} onChange={event => update('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your full name" />{errors.name && <small id="name-error">{errors.name}</small>}</div><div className="form-field"><label htmlFor="contact-email">Email address <span>*</span></label><input id="contact-email" type="email" autoComplete="email" value={fields.email} onChange={event => update('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />{errors.email && <small id="email-error">{errors.email}</small>}</div></div><div className="form-field"><label htmlFor="contact-vehicle">Vehicle of interest <span className="optional">OPTIONAL</span></label><input id="contact-vehicle" value={fields.vehicle} onChange={event => update('vehicle', event.target.value)} placeholder="e.g. BMW X3" /></div><div className="form-field"><label htmlFor="contact-message">Your message <span>*</span></label><textarea id="contact-message" rows={5} value={fields.message} onChange={event => update('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell us how we can help..." />{errors.message && <small id="message-error">{errors.message}</small>}</div><button className="button button-primary form-submit" type="submit">Preview Enquiry <ArrowUpRight size={18} /></button><p className="form-note">Demo only. This form displays a local confirmation and does not deliver or store your message.</p></form></>}</Reveal>
    </section>

    <section className="contact-visit container-wide" aria-labelledby="contact-visit-heading"><Reveal className="contact-visit-heading"><span className="eyebrow"><span className="eyebrow-line" /> 02 / THE SHOWROOM</span><h2 id="contact-visit-heading">Visit the <em>showroom.</em></h2><p>Explore the collection online, then connect with our team to learn about arranging a viewing.</p></Reveal><div className="contact-visit-layout"><Reveal className="contact-visit-image"><img src="/images/showroom.webp" alt="Illustrative premium automotive showroom" loading="lazy" width="1200" height="800" /><span>ILLUSTRATIVE SHOWROOM IMAGE</span></Reveal><Reveal className="contact-visit-details" delay={0.1}><div><MapPin size={20} /><span>LOCATION</span><strong>{dealership.address || 'Showroom location to be confirmed'}</strong>{dealership.address && dealership.directionsUrl && <a href={dealership.directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a>}</div><div><Clock3 size={20} /><span>BUSINESS HOURS</span><strong>{dealership.hours || 'Business hours to be confirmed'}</strong></div><div><Phone size={20} /><span>PHONE</span>{call ? <a href={call}>{dealership.phone}</a> : <strong>Contact number to be confirmed</strong>}</div><div><Mail size={20} /><span>EMAIL</span>{dealership.email ? <a href={`mailto:${dealership.email}`}>{dealership.email}</a> : <strong>Email address to be confirmed</strong>}</div></Reveal></div></section>
  </main>;
}

import { useEffect, useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

const frameCount = 300;
const frameUrl = (variant: 'desktop' | 'mobile', frame: number) =>
  `/hero-frames/${variant}/frame-${String(frame + 1).padStart(3, '0')}.webp`;

function HeroCopy({ headingId }: { headingId: string }) {
  return <div className="container-wide hero-arrival-content">
    <span className="eyebrow"><span className="eyebrow-line" /> PRE-OWNED. REDEFINED.</span>
    <h1 id={headingId}>Find Your<br /><em>Next Drive.</em></h1>
    <p>Discover a considered collection of pre-owned cars, with the details you need to make your next move confidently.</p>
    <div className="hero-actions"><Link className="button button-primary" to="/cars">Explore Inventory <ArrowUpRight size={19} /></Link><Link className="text-link" to="/contact">Talk to Our Team <ArrowRight size={19} /></Link></div>
  </div>;
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!section || !canvas || !content) return;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    let variant: 'desktop' | 'mobile' = window.innerWidth < 769 ? 'mobile' : 'desktop';
    const images = new Map<number, HTMLImageElement>();
    const loading = new Set<number>();
    let targetFrame = 0;
    let displayedFrame = 0;
    let frameRequest = 0;
    let active = true;

    const draw = () => {
      const frame = Math.round(displayedFrame);
      const nearest = [...images.keys()].reduce((best, key) => Math.abs(key - frame) < Math.abs(best - frame) ? key : best, 0);
      const image = images.get(frame) ?? images.get(nearest) ?? images.get(0);
      if (!image) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      context.fillStyle = '#101114';
      context.fillRect(0, 0, canvas.width, canvas.height);
      const scale = variant === 'mobile'
        ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
        : Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const sourceWidth = width / scale;
      const sourceHeight = height / scale;
      if (variant === 'mobile') {
        const destinationWidth = image.naturalWidth * scale / width * canvas.width;
        const destinationHeight = image.naturalHeight * scale / height * canvas.height;
        context.drawImage(image, (canvas.width - destinationWidth) / 2, (canvas.height - destinationHeight) / 2, destinationWidth, destinationHeight);
      } else {
        context.drawImage(image, (image.naturalWidth - sourceWidth) / 2, (image.naturalHeight - sourceHeight) / 2, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
      }
    };
    const load = (frame: number) => {
      if (frame < 0 || frame >= frameCount || images.has(frame) || loading.has(frame) || loading.size >= 12) return;
      loading.add(frame);
      const image = new Image();
      const imageVariant = variant;
      image.decoding = 'async';
      image.onload = () => {
        if (!active || imageVariant !== variant) return;
        loading.delete(frame);
        images.set(frame, image);
        if (!images.has(targetFrame)) load(targetFrame);
        if (images.size > 38) {
          for (const key of images.keys()) {
            if (key !== 0 && Math.abs(key - targetFrame) > 12) images.delete(key);
            if (images.size <= 30) break;
          }
        }
        draw();
      };
      image.onerror = () => { if (imageVariant === variant) loading.delete(frame); };
      image.src = frameUrl(variant, frame);
    };
    const resize = () => {
      const nextVariant = window.innerWidth < 769 ? 'mobile' : 'desktop';
      if (nextVariant !== variant) {
        variant = nextVariant;
        images.clear();
        loading.clear();
        load(0);
        load(frameCount - 1);
        for (let frame = 30; frame < frameCount; frame += 30) load(frame);
        load(targetFrame);
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      draw();
    };
    const tick = () => {
      displayedFrame += (targetFrame - displayedFrame) * 0.24;
      if (Math.abs(targetFrame - displayedFrame) < 0.55) displayedFrame = targetFrame;
      const frame = Math.round(displayedFrame);
      load(frame);
      for (const offset of [-2, -1, 1, 2, 3, 4]) load(frame + offset);
      if (images.has(frame)) draw();
      if (Math.abs(targetFrame - displayedFrame) >= 0.55) frameRequest = requestAnimationFrame(tick);
      else frameRequest = 0;
    };
    const scroll = () => {
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel));
      const desktop = window.innerWidth > 850;
      const sequenceProgress = desktop ? Math.min(1, progress / 0.76) : progress;
      targetFrame = Math.round(sequenceProgress * (frameCount - 1));
      if (desktop && progress >= 0.78) displayedFrame = frameCount - 1;
      const reveal = desktop ? Math.min(1, Math.max(0, (progress - 0.78) / 0.09)) : 0;
      content.style.opacity = String(reveal);
      content.style.transform = desktop ? `translateY(${(1 - reveal) * 22}px) scale(${0.96 + reveal * 0.04})` : '';
      content.style.pointerEvents = reveal > 0.95 ? 'auto' : 'none';
      content.inert = reveal <= 0.95;
      section.style.setProperty('--hero-progress', `${progress * 100}%`);
      load(targetFrame);
      if (!frameRequest) frameRequest = requestAnimationFrame(tick);
    };

    load(0);
    load(frameCount - 1);
    for (let frame = 30; frame < frameCount; frame += 30) load(frame);
    resize();
    scroll();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    return () => {
      active = false;
      cancelAnimationFrame(frameRequest);
      observer.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', resize);
    };
  }, [reduceMotion]);

  const skipAnimation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 850 || !sectionRef.current) return;
    event.preventDefault();
    const section = sectionRef.current;
    const start = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: start + (section.offsetHeight - window.innerHeight) * 0.91, behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return <><section className="hero-scroll" ref={sectionRef} aria-label="Illustrative showroom animation">
    <div className="hero hero-scroll-stage">
      <div className="hero-scroll-poster" role="img" aria-label="Illustrative sequence moving through a premium automotive showroom" />
      <canvas className="hero-scroll-canvas" ref={canvasRef} aria-hidden="true" />
      <section className="hero-arrival hero-arrival-desktop" ref={contentRef} aria-labelledby="hero-heading-desktop" inert={!reduceMotion}>
        <HeroCopy headingId="hero-heading-desktop" />
      </section>
      <div className="hero-bottom container-wide"><span>CURATED FOR THE ROAD AHEAD</span><a href="#intro" onClick={skipAnimation} aria-label="Skip animation and continue to the introduction">SCROLL TO EXPLORE <ArrowDown size={17} /></a><span>01 / 07</span></div>
      <div className="hero-scroll-progress" aria-hidden="true" />
    </div>
  </section>
    <section className="hero-arrival hero-arrival-mobile" id="intro" aria-labelledby="hero-heading-mobile">
      <HeroCopy headingId="hero-heading-mobile" />
    </section>
  </>;
}

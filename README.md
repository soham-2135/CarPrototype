# SKY Cars

A frontend-only, responsive automotive showroom prototype built with React, Vite, TypeScript, Tailwind CSS, React Router, and Motion for React.

## Run locally

```bash
npm install
npm run dev
```

Build with `npm run build`. The generated static site is in `dist/`. The client-side routes are `/`, `/cars`, `/cars/:slug`, and `/contact`; production hosting should return `index.html` for unknown paths so direct links work.

## Replace demo content before launch

- `src/data/vehicles.ts` contains all sample listings, prices, specifications, and image paths. None are live dealership stock.
- `src/data/site.ts` contains the dealership name and optional phone, WhatsApp number, email, address, hours, directions, and social links. Missing phone and WhatsApp numbers never produce a broken enquiry link.
- `public/images/` contains generated illustrative automotive imagery. It is not photography of actual SKY Cars stock or premises.
- `public/hero-frames/` contains 300 frames from the supplied replacement ZIP, converted to separate desktop and mobile WebP sizes. The hero loads a limited rolling set of frames as visitors scroll and shows a still image when reduced motion is preferred.
- The contact form validates fields locally and shows an explicit demo confirmation. It does not send or store messages.

The UI is designed to handle missing prices, images, optional details, and unavailable listings when the mock data is replaced.

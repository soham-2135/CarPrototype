export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';
export type BodyType = 'Sedan' | 'SUV' | 'Coupe' | 'Hatchback';
export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price?: number;
  kilometres: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  images: string[];
  description: string;
  features: string[];
  featured?: boolean;
  status?: 'Featured' | 'Just Added';
  available: boolean;
  createdAt: string;
};

// All listings and photographs are illustrative prototype content, not live stock.
export const vehicles: Vehicle[] = [
  { id: 'sc-01', slug: 'audi-a6-45-tfsi', make: 'Audi', model: 'A6', variant: '45 TFSI', year: 2021, price: 3690000, kilometres: 28400, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', images: ['/images/car-a6.webp', '/images/car-a6.webp', '/images/interior.webp'], description: 'An executive sedan with a restrained profile, a spacious cabin, and an easy sense of occasion on every drive.', features: ['Digital display', 'Leather upholstery', 'Climate control', 'Parking camera'], featured: true, status: 'Featured', available: true, createdAt: '2026-10-12' },
  { id: 'sc-02', slug: 'mercedes-benz-c-200', make: 'Mercedes-Benz', model: 'C-Class', variant: 'C 200', year: 2022, price: 4290000, kilometres: 18500, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', images: ['/images/car-c-class.webp', '/images/car-c-class.webp', '/images/interior.webp'], description: 'A poised, modern sedan with elegant proportions and a cabin designed for calm, comfortable travel.', features: ['Digital cockpit', 'Ambient lighting', 'Climate control', 'Parking sensors'], featured: true, status: 'Just Added', available: true, createdAt: '2026-10-22' },
  { id: 'sc-03', slug: 'bmw-x3-xdrive20d', make: 'BMW', model: 'X3', variant: 'xDrive20d', year: 2021, price: 4650000, kilometres: 32600, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'SUV', images: ['/images/car-x3.webp', '/images/car-x3.webp', '/images/showroom.webp'], description: 'Confident SUV proportions and a versatile interior make the X3 an inviting companion for city journeys and longer escapes.', features: ['All-wheel drive', 'Panoramic roof', 'Power tailgate', 'Parking camera'], featured: true, available: true, createdAt: '2026-09-28' },
  { id: 'sc-04', slug: 'volvo-xc60-b5', make: 'Volvo', model: 'XC60', variant: 'B5', year: 2022, price: 5490000, kilometres: 21400, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', images: ['/images/car-xc60.webp', '/images/car-xc60.webp', '/images/interior.webp'], description: 'An understated Scandinavian SUV with an airy cabin and a relaxed, considered design language.', features: ['Panoramic roof', 'Digital display', 'Power seats', 'Climate control'], featured: true, available: true, createdAt: '2026-10-04' },
  { id: 'sc-05', slug: 'audi-q3-40-tfsi', make: 'Audi', model: 'Q3', variant: '40 TFSI', year: 2021, price: 3450000, kilometres: 29800, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', images: ['/images/car-q3.webp', '/images/car-q3.webp', '/images/showroom.webp'], description: 'Compact dimensions, a purposeful stance, and flexible space for everyday life.', features: ['Digital display', 'Parking camera', 'Climate control', 'LED lighting'], available: true, createdAt: '2026-08-19' },
  { id: 'sc-06', slug: 'mini-cooper-s', make: 'MINI', model: 'Cooper S', variant: '3 Door', year: 2020, price: 2890000, kilometres: 36100, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Hatchback', images: ['/images/car-mini.webp', '/images/car-mini.webp', '/images/interior.webp'], description: 'A compact car with unmistakable character and a lively feel for the city.', features: ['Sport seats', 'Connected display', 'Climate control', 'Parking sensors'], available: true, createdAt: '2026-07-14' },
  { id: 'sc-07', slug: 'range-rover-velar-p250', make: 'Range Rover', model: 'Velar', variant: 'P250', year: 2021, price: 6790000, kilometres: 25500, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', images: ['/images/car-velar.webp', '/images/car-velar.webp', '/images/showroom.webp'], description: 'Sculptural surfaces and a serene cabin give the Velar a distinctive presence.', features: ['Panoramic roof', 'Digital display', 'Power tailgate', 'Parking camera'], available: true, createdAt: '2026-09-02' },
  { id: 'sc-08', slug: 'bmw-430i-gran-coupe', make: 'BMW', model: '4 Series', variant: '430i Gran Coupé', year: 2022, price: 5790000, kilometres: 17200, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Coupe', images: ['/images/car-4-series.webp', '/images/car-4-series.webp', '/images/interior.webp'], description: 'A sleek silhouette with four-door versatility and a driver-focused interior.', features: ['Sport seats', 'Digital display', 'Climate control', 'Parking camera'], available: true, createdAt: '2026-10-16' },
];

export const vehicleName = (vehicle: Vehicle) => `${vehicle.make} ${vehicle.model}`;
export const formatPrice = (price?: number) => price == null ? 'Price on request' : `₹${(price / 100000).toFixed(1)} Lakh`;
export const formatKm = (kilometres: number) => `${new Intl.NumberFormat('en-IN').format(kilometres)} km`;

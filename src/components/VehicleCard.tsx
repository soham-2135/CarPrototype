import { Link } from 'react-router-dom';
import { ArrowUpRight, Fuel, Gauge, Settings2 } from 'lucide-react';
import type { Vehicle } from '../data/vehicles';
import { formatKm, formatPrice, vehicleName } from '../data/vehicles';

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  return <article className="vehicle-card">
    <Link className="vehicle-card-image" to={`/cars/${vehicle.slug}`} aria-label={`View details for ${vehicle.year} ${vehicleName(vehicle)}`}>
      {vehicle.images[0] ? <img src={vehicle.images[0]} alt={`Illustrative photograph for ${vehicleName(vehicle)}`} loading="lazy" width="800" height="540" /> : <span className="image-fallback">Image coming soon</span>}
      {vehicle.status && <span className="status-badge">{vehicle.status}</span>}
      {!vehicle.available && <span className="status-badge unavailable">Unavailable</span>}
      <span className="card-index">0{index + 1}</span>
    </Link>
    <div className="vehicle-card-body">
      <div className="card-title-row"><div><span className="card-year">{vehicle.year} / {vehicle.bodyType}</span><h3><Link to={`/cars/${vehicle.slug}`}>{vehicleName(vehicle)}</Link></h3><p className="variant">{vehicle.variant || ' '}</p></div><ArrowUpRight className="card-arrow" size={23} aria-hidden="true" /></div>
      <div className="vehicle-specs"><span><Gauge size={15} />{formatKm(vehicle.kilometres)}</span><span><Fuel size={15} />{vehicle.fuelType}</span><span><Settings2 size={15} />{vehicle.transmission}</span></div>
      <div className="card-bottom"><strong>{formatPrice(vehicle.price)}</strong><Link to={`/cars/${vehicle.slug}`}>View Details <ArrowUpRight size={16} /></Link></div>
    </div>
  </article>;
}

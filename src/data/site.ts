export type DealershipConfig = {
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  hours?: string;
  directionsUrl?: string;
  socials?: { label: string; url: string }[];
};

// Replace these fields only with verified showroom details before launch.
export const dealership: DealershipConfig = {
  name: 'SKY CARS',
  phone: undefined,
  whatsapp: undefined,
  email: undefined,
  address: undefined,
  hours: undefined,
  directionsUrl: undefined,
  socials: [],
};

export const validPhone = (value?: string) => {
  const digits = value?.replace(/\D/g, '') ?? '';
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
};

export const whatsappHref = (message: string) => {
  const number = validPhone(dealership.whatsapp);
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
};

export const callHref = () => {
  const number = validPhone(dealership.phone);
  return number ? `tel:+${number}` : null;
};

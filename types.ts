export interface MenuItem {
  name: string;
  description?: string;
  price: number;
  highlight?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface ContactInfo {
  address: string;
  mapLink: string;
  whatsapp: string;
  whatsappPretty: string;
  instagram: string;
}
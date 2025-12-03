import { ContactInfo, MenuCategory } from './types';

export const CONTACT_INFO: ContactInfo = {
  address: "Parque La Loma, Punta del Este",
  mapLink: "https://www.google.com/maps/place/Volver/@-34.9125212,-54.9626527,17z/data=!3m1!4b1!4m6!3m5!1s0x957510779036ea43:0x258f33090339d968!8m2!3d-34.9125212!4d-54.9626527!16s%2Fg%2F11c3_9lmg_?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D",
  whatsapp: "59899986692",
  whatsappPretty: "+598 99 986 692",
  instagram: "https://www.instagram.com/restaurantvolver/"
};

export const LOGO_URL = "https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_volver_sinfondo.png";

export const FEATURED_DISHES = [
  {
    id: 1,
    name: "Ojo de Bife",
    description: "Con verduras asadas a la parrilla",
    price: 820,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Spaghetti Langostino",
    description: "Salsa roja casera y mariscos frescos",
    price: 850,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Pizza Cuatro Quesos",
    description: "Nuestra exquisita selección de quesos",
    price: 590,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
  }
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    alt: "Cócteles de autor"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    alt: "Ambiente exterior nocturno"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    alt: "Parrilla en acción"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    alt: "Plato servido"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    alt: "Interior del restaurante"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
    alt: "Detalle de mesa"
  }
];

export const MENU_DATA: MenuCategory[] = [
  {
    id: "entradas",
    title: "Entradas",
    items: [
      { name: "Queso Coalho", price: 370 },
      { name: "Langostino Ajillo", price: 950, highlight: true },
      { name: "Rabas", price: 670 },
      { name: "Miniaturas de Pescado", price: 670 },
      { name: "Ensalada Mixta", price: 290 },
      { name: "Ensalada de Rúcula y Parmesano", price: 390 },
      { name: "Ensalada Tibia Pollo", price: 690 },
    ]
  },
  {
    id: "parrilla",
    title: "De la Parrilla",
    items: [
      { name: "Chorizo Extra", price: 200 },
      { name: "Morcillas Extra", price: 200 },
      { name: "Suprema Grille con Mixta", price: 660 },
      { name: "Asado de Tira", price: 650, highlight: true },
      { name: "Ojo de Bife Verduras", price: 820, highlight: true },
      { name: "Matambrito con Boniato Glaseado", price: 790 },
    ]
  },
  {
    id: "acompanamiento",
    title: "Acompañamiento",
    items: [
      { name: "Papa al Plomo", price: 150 },
      { name: "Papa al Plomo con Roquefort", price: 290 },
      { name: "Verduras al Horno", price: 360 },
      { name: "Boniato Glaseado", price: 220 },
      { name: "Papas Fritas", price: 330 },
    ]
  },
  {
    id: "especialidad",
    title: "Especialidad de la Casa",
    items: [
      { name: "Calabaza Rellena", description: "Camarones y verduras", price: 940, highlight: true }
    ]
  },
  {
    id: "pastas",
    title: "Pastas",
    items: [
      { name: "Lasagna Mixta", price: 680 },
      { name: "Sorrentino 4 Quesos", price: 690 },
      { name: "Spaghetti Langostino", description: "Salsa roja", price: 850, highlight: true },
      { name: "Canelones de Verdura", description: "Salsa fileto o rosa", price: 640 },
    ]
  },
  {
    id: "pescados",
    title: "Pescados",
    items: [
      { name: "Brótola Fresca con Verduras", price: 860 },
      { name: "Salmón Rosado Chileno", description: "Con sus verduras", price: 840, highlight: true },
    ]
  },
  {
    id: "minutas",
    title: "Minutas",
    items: [
      { name: "Milanesas de Ternera c/Fritas", price: 620 },
      { name: "Napolitana c/Fritas", price: 730 },
      { name: "Chivito Canadiense", price: 660 },
      { name: "Chivito al Plato", price: 740 },
      { name: "Veggie Burger al Plato", description: "Con ensalada", price: 620 },
    ]
  },
  {
    id: "pizzas",
    title: "Nuestras Pizzas",
    items: [
      { name: "Margherita", description: "Queso y tomate", price: 490 },
      { name: "Cuatro Quesos", price: 590 },
      { name: "Capresse", description: "Tomate, queso y albahaca", price: 590 },
      { name: "Rúcula y Parmesano", price: 590 },
    ]
  },
  {
    id: "postres",
    title: "Postres",
    items: [
      { name: "Volver a Pecar", price: 230, highlight: true },
      { name: "Tatín Tatén", description: "Tarta de manzana con helado", price: 230 },
      { name: "Crepes de Dulce de Leche", price: 180 },
      { name: "Helados (2 bolas)", price: 180 },
      { name: "Chajá", price: 210 },
      { name: "Flan Casero c/ Dulce de Leche", price: 180 },
      { name: "Budín Catalán", price: 180 },
    ]
  },
  {
    id: "cafe",
    title: "Café",
    items: [
      { name: "Infusiones, Té y Café", price: 80 },
      { name: "Carajillo", price: 140 },
      { name: "Café Irlandes", price: 240 },
      { name: "Café Shakerato", price: 220 },
      { name: "Café Viennese", price: 90 },
    ]
  }
];
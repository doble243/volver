import React from 'react';
import { GALLERY_IMAGES } from '../constants';
import { Instagram } from 'lucide-react';

export const Gallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-volver-dark mb-4">Experiencia Volver</h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Un recorrido visual por nuestros platos, nuestro ambiente y los momentos que hacen único a este lugar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {GALLERY_IMAGES.map((img, index) => (
            <div 
              key={img.id}
              className={`relative overflow-hidden group rounded-sm ${
                index === 0 ? 'col-span-2 row-span-2' : 
                index === 3 ? 'col-span-2 md:col-span-1' : 
                'col-span-1'
              }`}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <Instagram className="text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <a 
                href="https://www.instagram.com/restaurantvolver/" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-volver-dark hover:text-volver-gold transition-colors border-b border-volver-dark hover:border-volver-gold pb-1 font-sans tracking-wide uppercase text-sm font-bold"
            >
                Ver más en Instagram <Instagram size={16} />
            </a>
        </div>
      </div>
    </section>
  );
};
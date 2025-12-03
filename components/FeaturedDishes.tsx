import React from 'react';
import { FEATURED_DISHES } from '../constants';
import { ArrowRight } from 'lucide-react';

export const FeaturedDishes: React.FC = () => {
  return (
    <section className="py-20 bg-volver-dark text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h3 className="text-volver-gold font-sans tracking-widest text-xs uppercase mb-2 font-bold">Recomendaciones</h3>
            <h2 className="text-4xl font-serif">Favoritos del Chef</h2>
          </div>
          <div className="hidden md:block">
            <span className="text-volver-gold text-sm italic font-serif">Sabores inolvidables &rarr;</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {FEATURED_DISHES.map((dish) => (
            <div 
              key={dish.id} 
              className="snap-center shrink-0 w-[85vw] md:w-auto relative group cursor-pointer"
            >
              <div className="relative h-96 overflow-hidden rounded-lg shadow-xl">
                {/* Image */}
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-2xl font-serif font-bold text-white group-hover:text-volver-gold transition-colors">{dish.name}</h4>
                    <span className="bg-volver-gold text-volver-dark font-bold text-sm px-3 py-1 rounded-full">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-gray-300 font-sans text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="h-px w-full bg-white/20 group-hover:bg-volver-gold/50 transition-colors"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="md:hidden flex justify-center mt-4 gap-2">
            {FEATURED_DISHES.map((_, idx) => (
                <div key={idx} className="w-2 h-2 rounded-full bg-white/20"></div>
            ))}
        </div>
      </div>
    </section>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { MENU_DATA } from '../constants';
import { MenuCategory } from '../types';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_DATA[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeData: MenuCategory | undefined = MENU_DATA.find(c => c.id === activeCategory);

  // Auto-scroll active category into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
      if (activeButton) {
        const container = scrollContainerRef.current;
        const scrollLeft = activeButton.offsetLeft - (container.clientWidth / 2) + (activeButton.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  // Handle loading state when category changes
  useEffect(() => {
    setIsLoading(true);
    // Simulate network delay / transition time for effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const SkeletonItem = () => (
    <div className="flex justify-between items-start p-5 bg-white rounded-xl shadow-sm border border-gray-100 h-full select-none">
      <div className="flex-1 pr-4 space-y-3">
        {/* Title Placeholder */}
        <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded w-2/3"></div>

        {/* Description Placeholder */}
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded w-full"></div>
          <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded w-4/5"></div>
        </div>
      </div>
      {/* Price Placeholder */}
      <div className="h-6 w-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded"></div>
    </div>
  );

  return (
    <section id="menu" className="py-16 md:py-20 bg-volver-cream relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h3 className="text-volver-gold font-sans tracking-widest text-xs md:text-sm uppercase mb-2 font-bold">Descubre</h3>
          <h2 className="text-4xl md:text-5xl font-serif text-volver-dark mb-6">Nuestra Carta</h2>
          <div className="w-24 h-1 bg-volver-gold mx-auto"></div>
        </div>

        {/* Category Navigation - Mobile First: Horizontal Scroll */}
        <div className="relative mb-10 group">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide gap-3 md:gap-4 md:justify-center px-4 -mx-4 md:mx-0 snap-x"
          >
            {MENU_DATA.map((category) => (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`snap-center shrink-0 px-6 py-2.5 rounded-full text-sm md:text-base font-sans transition-all duration-300 whitespace-nowrap border ${activeCategory === category.id
                    ? 'bg-volver-dark text-white border-volver-dark shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-volver-gold hover:text-volver-dark'
                  }`}
              >
                {category.title}
              </button>
            ))}
          </div>
          {/* Fade effect on sides for mobile to indicate scroll */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-volver-cream to-transparent md:hidden pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-volver-cream to-transparent md:hidden pointer-events-none"></div>
        </div>

        {/* Menu Items Grid */}
        <div className="max-w-5xl mx-auto min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonItem key={i} />
              ))}
            </div>
          ) : (
            activeData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {activeData.items.map((item, index) => (
                  <div
                    key={`${activeCategory}-${index}`}
                    className="flex justify-between items-start p-5 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group animate-fade-in-scale opacity-0 h-full"
                    style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'forwards' }}
                  >
                    <div className="pr-4 flex-1">
                      <h4 className={`font-serif text-lg md:text-xl mb-1 leading-tight transition-colors duration-300 group-hover:text-volver-gold ${item.highlight ? 'text-volver-dark font-semibold' : 'text-gray-800'}`}>
                        {item.name}
                        {item.highlight && <span className="ml-2 inline-block text-[10px] text-volver-gold font-sans uppercase tracking-wider border border-volver-gold/30 px-1.5 py-0.5 rounded align-middle group-hover:bg-volver-gold group-hover:text-white transition-colors">Recomendado</span>}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-gray-500 font-light italic font-serif mt-1 transition-colors duration-300 group-hover:text-gray-700">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="font-sans font-bold text-lg text-volver-dark whitespace-nowrap transition-all duration-300 group-hover:text-volver-gold group-hover:scale-110 origin-right">
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs md:text-sm text-gray-400 italic">* Precios en Pesos Uruguayos. Sujetos a cambios sin previo aviso.</p>
        </div>
      </div>
    </section>
  );
};
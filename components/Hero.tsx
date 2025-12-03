import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Scroll handling
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    
    // Mouse movement for subtle parallax on desktop
    const handleMouseMove = (e: MouseEvent) => {
        // Only trigger on larger screens
        if (window.innerWidth > 768) {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // Range -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2; // Range -1 to 1
            setMousePos({ x, y });
        }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScrollToMenu = () => {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
          const headerOffset = 100;
          const elementPosition = menuSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
      }
  };

  return (
    <section id="home" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Container with Parallax & Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
            className="absolute inset-[-5%] w-[110%] h-[110%]"
            style={{ 
                // Combine Scroll Parallax + Mouse Parallax
                transform: `
                    translateY(${offset * 0.5}px) 
                    translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)
                `,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* The Ken Burns Zoom Effect is applied to this inner container */}
            <div className="w-full h-full animate-ken-burns">
                <img
                    src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop"
                    alt="Restaurante Ambiente"
                    className="w-full h-full object-cover opacity-90"
                />
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-volver-dark via-transparent to-black/50 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* Content Container - Reverse Mouse Movement for Depth */}
      <div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
        style={{ 
            transform: `
                translateY(${offset * 0.2}px) 
                translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)
            `,
            opacity: 1 - offset / 700,
            transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Decorative Gold Line */}
        <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-volver-gold mb-6 md:mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}></div>

        <h2 className="text-volver-gold text-sm md:text-base font-sans tracking-[0.4em] uppercase mb-6 animate-fade-in-up font-bold drop-shadow-lg opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Punta del Este
        </h2>
        
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-serif mb-8 leading-none animate-fade-in-up drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          Volver
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-100 font-light max-w-2xl mx-auto mb-12 leading-relaxed font-sans drop-shadow-md animate-fade-in-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          Una experiencia gastronómica que fusiona la tradición de la parrilla con sabores modernos frente al mar.
        </p>
        
        <div className="animate-fade-in-up group opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
           <button 
             onClick={handleScrollToMenu}
             className="relative overflow-hidden border border-white/40 bg-white/5 backdrop-blur-sm text-white px-10 py-4 transition-all duration-500 font-serif italic text-xl hover:border-volver-gold hover:text-volver-dark shadow-2xl"
           >
             <span className="relative z-10 transition-colors duration-500">Ver Nuestra Carta</span>
             <div className="absolute inset-0 bg-volver-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out"></div>
           </button>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 group" 
        onClick={handleScrollToMenu}
        style={{ opacity: Math.max(0, 1 - offset / 300) }}
      >
        <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-white/70 group-hover:text-volver-gold transition-colors duration-300">Descubre</span>
            <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-volver-gold animate-[shimmer_2s_infinite]"></div>
            </div>
        </div>
      </div>
    </section>
  );
};
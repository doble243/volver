import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedDishes } from './components/FeaturedDishes';
import { Menu } from './components/Menu';
import { Gallery } from './components/Gallery';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { UtensilsCrossed, Calendar } from 'lucide-react';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Force scroll to top on mount to prevent browser restoration or auto-scroll issues
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-volver-cream selection:bg-volver-gold selection:text-white">
      <Navbar onOpenReservation={openReservation} />

      <main className="flex-grow">
        <Hero />
        <FeaturedDishes />
        <Menu />
        <Gallery />
        <InfoSection onOpenReservation={openReservation} />
      </main>

      <Footer />

      <ReservationModal isOpen={isReservationOpen} onClose={closeReservation} />

      {/* Floating Reservation Action Button - Premium Mobile Optimized */}
      <button
        onClick={openReservation}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center gap-3 pl-6 pr-7 py-4 rounded-full bg-volver-gold/95 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-[#b08b45] hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
        aria-label="Reservar Mesa"
      >
        <div className="relative">
          <UtensilsCrossed size={22} className="text-white transform group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-1.5 -right-1.5 bg-white text-volver-dark rounded-full p-[3px] border border-volver-gold shadow-sm">
            <Calendar size={10} strokeWidth={3} />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-serif font-bold tracking-wide text-white leading-none text-base shadow-sm">
            Reservar
          </span>
          <span className="text-[10px] text-white/90 font-sans tracking-widest uppercase leading-none mt-0.5">
            Mesa
          </span>
        </div>

        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
        </div>
      </button>
    </div>
  );
}

export default App;
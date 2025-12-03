import React, { useState, useEffect } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { LOGO_URL, CONTACT_INFO } from '../constants';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Menú', href: '#menu' },
    { name: 'Ubicación', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Smooth scroll with offset calculation to prevent header from covering title
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Calculate header offset (approx 80-100px depending on state + extra padding)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleReservationClick = () => {
    setIsMobileMenuOpen(false);
    onOpenReservation();
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-volver-dark/90 shadow-lg backdrop-blur-md py-2 border-b border-white/10' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer z-50 relative" 
            onClick={() => handleNavClick('#home')}
          >
            <img 
              src={LOGO_URL} 
              alt="Volver Logo" 
              className={`transition-all duration-500 object-contain ${
                isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-20'
              }`} 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm tracking-[0.2em] uppercase font-sans font-bold hover:text-volver-gold transition-colors duration-300 relative group ${
                  isScrolled ? 'text-white' : 'text-white drop-shadow-md'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-volver-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <div className="h-6 w-px bg-white/30 mx-2"></div>
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-volver-gold transition-colors transform hover:scale-110 duration-300"
            >
              <Instagram size={20} />
            </a>
            <button
              onClick={handleReservationClick}
              className="bg-volver-gold text-white px-6 py-2 rounded-sm font-serif italic hover:bg-white hover:text-volver-dark transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
            >
              Reservar
            </button>
          </div>

          {/* Mobile Menu Toggle Button (Animated) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-8 h-6 relative flex flex-col justify-between items-end">
              <span 
                className={`h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'w-8 rotate-45 translate-y-2.5 bg-volver-gold' : 'w-8 bg-white'
                }`} 
              />
              <span 
                className={`h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'w-6 bg-white'
                }`} 
              />
              <span 
                className={`h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-3 bg-volver-gold' : 'w-4 bg-white'
                }`} 
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Unique Full-screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-volver-dark/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="flex flex-col h-full justify-center items-center relative z-10 p-6">
            
            {/* Decorative Line */}
            <div className={`w-px h-20 bg-gradient-to-b from-transparent via-volver-gold to-transparent absolute top-[15%] transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}></div>

            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-4xl font-serif text-white hover:text-volver-gold transition-all duration-500 transform ${
                    isMobileMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div 
              className={`mt-12 flex flex-col items-center gap-6 transition-all duration-700 delay-500 transform ${
                 isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
               <button
                onClick={handleReservationClick}
                className="bg-volver-gold text-white text-lg px-10 py-4 rounded-sm font-serif italic shadow-lg active:scale-95 transition-transform"
              >
                Reservar Mesa
              </button>

              <div className="flex gap-8 mt-4">
                <a
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={28} />
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MessageCircle size={28} />
                </a>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};
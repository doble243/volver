import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { LOGO_URL, CONTACT_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
           <img 
            src={LOGO_URL} 
            alt="Volver Logo" 
            className="h-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500" 
          />
        </div>
        <p className="font-serif text-lg mb-6 text-volver-gold">Volver</p>
        
        <div className="flex justify-center gap-8 mb-8">
          <a
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 group"
            aria-label="Instagram"
          >
            <div className="p-3 border border-gray-800 rounded-full group-hover:border-volver-gold group-hover:bg-white/5 transition-all duration-300">
              <Instagram size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
            </div>
          </a>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 group"
            aria-label="WhatsApp"
          >
             <div className="p-3 border border-gray-800 rounded-full group-hover:border-volver-gold group-hover:bg-white/5 transition-all duration-300">
              <MessageCircle size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
            </div>
          </a>
        </div>

        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Sabores que te hacen regresar. Cocina de autor y parrilla en un entorno único en Punta del Este.
        </p>
        
        <div className="w-full h-px bg-gray-800 max-w-xs mx-auto mb-8"></div>
        <p className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} Restaurante Volver. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
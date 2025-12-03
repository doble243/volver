import React from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface InfoSectionProps {
  onOpenReservation: () => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="location" className="bg-volver-dark text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Contact Details */}
          <div className="space-y-8 md:space-y-10 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-volver-gold text-center lg:text-left">Visítanos</h2>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8 text-center lg:text-left">
                Ubicados frente a la emblemática Fuente de los Lobos Marinos, Volver ofrece un refugio gastronómico donde cada detalle cuenta. Ideal para cenas románticas, reuniones familiares y eventos especiales.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <MapPin className="text-volver-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Dirección</h3>
                  <p className="text-gray-400 text-sm md:text-base">{CONTACT_INFO.address}</p>
                  <a 
                    href={CONTACT_INFO.mapLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-volver-gold text-sm mt-2 inline-flex items-center hover:underline"
                  >
                    Ver en Google Maps <ExternalLink size={14} className="ml-1"/>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <Phone className="text-volver-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Reservas</h3>
                  <p className="text-gray-400 text-sm">WhatsApp</p>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                    className="text-white text-base md:text-lg hover:text-volver-gold transition-colors block mt-1"
                  >
                    {CONTACT_INFO.whatsappPretty}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <Instagram className="text-volver-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Síguenos</h3>
                  <a 
                    href={CONTACT_INFO.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    @restaurantvolver
                  </a>
                </div>
              </div>

               <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <Clock className="text-volver-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-1">Horarios</h3>
                  <p className="text-gray-400 text-sm md:text-base">Abierto todos los días</p>
                  <p className="text-gray-500 italic text-xs mt-1">Consultar disponibilidad</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 text-center lg:text-left">
               <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto inline-block bg-volver-gold text-volver-dark font-bold px-8 py-4 rounded-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                Reservar Mesa Ahora
              </button>
            </div>
          </div>

          {/* Map Embed */}
          <div className="order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[600px] w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl relative group">
             {/* Google Maps Embed for Punta del Este location */}
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.4045501865913!2d-54.96522762332616!3d-34.91252117285514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x957510779036ea43%3A0x258f33090339d968!2sVolver!5e0!3m2!1sen!2suy!4v1700000000000!5m2!1sen!2suy"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                className="grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Ubicación Volver Punta del Este"
              ></iframe>
              {/* Overlay for style */}
              <div className="absolute inset-0 pointer-events-none border-4 border-volver-gold/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
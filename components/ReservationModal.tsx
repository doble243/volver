import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Users, Clock, User, Calendar, AlertCircle, Check } from 'lucide-react';
import { LOGO_URL, CONTACT_INFO } from '../constants';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Generate the next 3 days options
  const dateOptions = Array.from({ length: 3 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Format weekday (e.g., "lun", "mar")
    const weekday = d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
    const dayNumber = d.getDate();

    let label = '';
    if (i === 0) label = 'Hoy';
    else if (i === 1) label = 'Mañana';
    else label = 'Pasado';

    return { value: dateStr, label, dayNumber, weekday };
  });


  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setError('');
    }
  }, [isOpen]);

  // Handle Date Change and generate time slots
  useEffect(() => {
    if (!date) {
      setAvailableTimeSlots([]);
      return;
    }

    const generateSlots = (dateString: string) => {
      // Create date object safely from string YYYY-MM-DD
      const [year, month, day] = dateString.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ...

      let schedules: { start: string; end: string }[] = [];

      // Logic based on provided hours:
      // Mon(1), Tue(2), Wed(3): 12–15:30, 20:00–00:00
      // Thu(4), Sun(0): 12–15:45, 20:00–00:00
      // Fri(5), Sat(6): 12–15:45, 19:30–23:30

      if (dayOfWeek >= 1 && dayOfWeek <= 3) {
        // Mon, Tue, Wed
        schedules = [
          { start: '12:00', end: '15:30' },
          { start: '20:00', end: '23:45' } // 00:00 treated as end of day
        ];
      } else if (dayOfWeek === 4 || dayOfWeek === 0) {
        // Thu, Sun
        schedules = [
          { start: '12:00', end: '15:45' },
          { start: '20:00', end: '23:45' }
        ];
      } else if (dayOfWeek === 5 || dayOfWeek === 6) {
        // Fri, Sat
        schedules = [
          { start: '12:00', end: '15:45' },
          { start: '19:30', end: '23:30' }
        ];
      }

      const slots: string[] = [];
      
      schedules.forEach(schedule => {
        const [startHour, startMinute] = schedule.start.split(':').map(Number);
        const [endHour, endMinute] = schedule.end.split(':').map(Number);
        
        let current = new Date(year, month - 1, day, startHour, startMinute);
        const end = new Date(year, month - 1, day, endHour, endMinute);

        while (current <= end) {
          const h = current.getHours().toString().padStart(2, '0');
          const m = current.getMinutes().toString().padStart(2, '0');
          slots.push(`${h}:${m}`);
          current.setMinutes(current.getMinutes() + 15);
        }
      });

      setAvailableTimeSlots(slots);
      
      // If previously selected time is invalid for new date, clear it
      if (time && !slots.includes(time)) {
        setTime('');
      }
    };

    generateSlots(date);
  }, [date]);


  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!time || !date) {
        setError("Por favor completa la fecha y la hora.");
        return;
    }

    // Format date for display
    let dateDisplay = date;
    try {
        const [y, m, d] = date.split('-');
        dateDisplay = `${d}/${m}/${y}`;
    } catch (e) {}
    
    const message = `Hola Restaurante Volver, me gustaría solicitar una reserva.%0A%0A*Datos de la reserva:*%0A👤 *Nombre:* ${name}%0A👥 *Personas:* ${guests}%0A📅 *Fecha:* ${dateDisplay}%0A🕒 *Horario:* ${time}`;
    
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-volver-cream w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-fade-in-up border border-volver-gold/20 max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-volver-dark p-6 text-center relative border-b-2 border-volver-gold sticky top-0 z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
          <div className="flex justify-center mb-3">
            <img src={LOGO_URL} alt="Volver" className="h-16 object-contain drop-shadow-md" />
          </div>
          <h3 className="text-volver-gold font-serif text-2xl tracking-wide">Tu Reserva</h3>
          <p className="text-gray-400 text-sm font-light mt-1">Parque La Loma</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-volver-dark uppercase tracking-wider flex items-center gap-2">
              <User size={14} className="text-volver-gold" /> Nombre
            </label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-b-2 border-gray-200 focus:border-volver-gold rounded-t px-3 py-3 outline-none transition-all placeholder-gray-300 text-gray-800"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
             {/* Guests Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-volver-dark uppercase tracking-wider flex items-center gap-2">
                <Users size={14} className="text-volver-gold" /> Personas
              </label>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-white border-b-2 border-gray-200 focus:border-volver-gold rounded-t px-3 py-3 outline-none transition-all text-gray-800"
              >
                 {[...Array(15)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Persona' : 'Personas'}</option>
                 ))}
                 <option value="15+">Más de 15</option>
              </select>
            </div>

            {/* Date Field (Custom 3-day selector) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-volver-dark uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-volver-gold" /> Fecha
              </label>
              <div className="grid grid-cols-3 gap-3">
                {dateOptions.map((option) => {
                  const isSelected = date === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDate(option.value)}
                      className={`flex flex-col items-center justify-center p-3 rounded border transition-all duration-300 relative overflow-hidden ${
                        isSelected 
                          ? 'bg-volver-gold border-volver-gold text-white shadow-md transform scale-[1.02]' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-volver-gold/50'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wide opacity-90">{option.label}</span>
                      <span className="text-2xl font-serif font-bold leading-none my-1">{option.dayNumber}</span>
                      <span className="text-[10px] uppercase opacity-75">{option.weekday}</span>
                      
                      {isSelected && (
                        <div className="absolute top-1 right-1">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
           {/* Time Field - Dropdown */}
           <div className="space-y-2">
              <label className="text-xs font-bold text-volver-dark uppercase tracking-wider flex items-center gap-2">
                <Clock size={14} className="text-volver-gold" /> Horario Preferente
              </label>
              <div className="relative">
                <select
                    required
                    disabled={!date}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border-b-2 border-gray-200 focus:border-volver-gold rounded-t px-3 py-3 outline-none transition-all text-gray-800 disabled:bg-gray-100 disabled:text-gray-400 appearance-none"
                >
                    <option value="" disabled>
                        {date ? 'Seleccionar hora' : 'Primero selecciona una fecha'}
                    </option>
                    {availableTimeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
                {/* Visual arrow indicator */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              
              {date && availableTimeSlots.length === 0 && (
                  <p className="text-[10px] text-red-500 mt-1">No hay horarios disponibles para este día (Posiblemente cerrado).</p>
              )}
            </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={!time || !date || !name}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded shadow-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 mt-4 group"
          >
            <MessageCircle size={24} className="group-hover:animate-bounce" />
            <span className="font-sans">Confirmar Reserva</span>
          </button>
          
          <p className="text-[10px] text-center text-gray-500 mt-2 leading-tight">
            Se abrirá WhatsApp con los detalles ya escritos.
          </p>
        </form>
      </div>
    </div>
  );
};
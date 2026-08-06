import React from 'react';
import logoImg from '../assets/images/ramad_e_taiba_logo_1785930018584.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'dark'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textClass = variant === 'light' ? 'text-white' : 'text-[#0B1F3A]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem Circle */}
      <div className={`${sizeMap[size]} rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md bg-[#0B1F3A] shrink-0 flex items-center justify-center p-0.5 relative group`}>
        <img
          src={logoImg}
          alt="Ramad-e-Taiba Travel & Tours"
          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight leading-none text-base md:text-lg font-serif ${textClass}`}>
            RAMAD-E-TAIBA
          </span>
          <span className="text-[10px] md:text-[11px] font-bold text-[#D4AF37] tracking-widest uppercase mt-0.5">
            Travel & Tours • Karachi
          </span>
        </div>
      )}
    </div>
  );
};

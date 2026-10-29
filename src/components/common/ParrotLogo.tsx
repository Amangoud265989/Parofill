import React from 'react';

interface ParrotLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  animated?: boolean;
}

export const ParrotLogo: React.FC<ParrotLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  animated = false,
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16',
  };

  const textMap = {
    sm: 'text-base font-bold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-extrabold',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
          aria-label="ParroFill Parrot Logo"
        >
          <defs>
            {/* Primary Parrot Emerald Gradient */}
            <linearGradient id="parrotFeather" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Crest highlight */}
            <linearGradient id="crestGlow" x1="20" y1="5" x2="60" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Wing Gradient */}
            <linearGradient id="wingGrad" x1="15" y1="40" x2="60" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>

            {/* Golden Beak Gradient */}
            <linearGradient id="beakGrad" x1="60" y1="35" x2="95" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Body and head curve */}
          <path
            d="M 50 12 C 32 12 20 28 20 48 C 20 68 32 86 48 88 C 58 89 68 84 72 74 C 74 69 75 60 75 52 C 75 30 65 12 50 12 Z"
            fill="url(#parrotFeather)"
          />

          {/* Sleek Feather Crest */}
          <path
            d="M 50 12 C 55 4 64 2 70 6 C 68 12 62 16 54 18 Z"
            fill="url(#crestGlow)"
          />
          <path
            d="M 44 14 C 47 7 53 6 58 9 C 55 14 50 17 44 18 Z"
            fill="#34D399"
          />

          {/* Wing Arc with speed feathers */}
          <path
            d="M 32 44 C 36 38 46 36 50 44 C 54 52 46 72 32 80 C 26 72 26 54 32 44 Z"
            fill="url(#wingGrad)"
            opacity="0.95"
          />

          {/* AI Autofill Feather Swift Streak */}
          <path
            d="M 42 46 C 46 42 54 44 55 50 C 56 56 48 70 38 74"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Cheek highlight patch */}
          <ellipse cx="48" cy="42" rx="6" ry="7" fill="#A7F3D0" opacity="0.45" />

          {/* Intelligent, Friendly Eye */}
          <circle cx="53" cy="34" r="6" fill="#FFFFFF" />
          <circle cx="54" cy="34" r="3.2" fill="#0F172A" />
          <circle cx="55.5" cy="32.5" r="1.3" fill="#FFFFFF" />

          {/* Golden Curved Beak */}
          <path
            d="M 68 32 C 74 32 88 38 90 48 C 90 51 84 52 78 52 C 70 52 66 46 66 42 Z"
            fill="url(#beakGrad)"
          />
          {/* Lower beak */}
          <path
            d="M 68 46 C 73 46 78 49 76 54 C 73 55 68 53 66 50 Z"
            fill="#D97706"
          />
        </svg>
      </div>

      {showWordmark && (
        <span className={`tracking-tight text-slate-900 font-sans ${textMap[size]}`}>
          Parro<span className="text-emerald-600">Fill</span>
        </span>
      )}
    </div>
  );
};

export const ParrotAssistantAvatar: React.FC<{ size?: number; isThinking?: boolean }> = ({
  size = 40,
  isThinking = false,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-1 flex items-center justify-center shadow-sm shrink-0 ${
        isThinking ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-white animate-pulse' : ''
      }`}
    >
      <ParrotLogo size="sm" showWordmark={false} className="w-full h-full" />
    </div>
  );
};

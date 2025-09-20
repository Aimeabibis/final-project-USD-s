import React from 'react';

interface ToggleThemeButtonProps {
  dark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({ dark, onToggle, className }) => (
  <button
    onClick={onToggle}
    className={`p-2 rounded-full bg-green-600 text-white shadow-2xl hover:bg-green-700 transition flex items-center justify-center cursor-pointer ${className || ''}`}
    aria-label="Toggle dark mode"
  >
    {dark ? (
      // Icône lune
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21 12.79A9 9 0 0 1 11.21 3a1 1 0 0 0-1.13 1.32A7 7 0 0 0 13 21a7 7 0 0 0 7.68-6.92 1 1 0 0 0-.68-.93ZM13 19a5 5 0 0 1-4.95-5.56A1 1 0 0 0 7 12a7 7 0 0 0 7 7 1 1 0 0 0-.99-1Z"/>
      </svg>
    ) : (
      // Icône soleil
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </g>
      </svg>
    )}
  </button>
);

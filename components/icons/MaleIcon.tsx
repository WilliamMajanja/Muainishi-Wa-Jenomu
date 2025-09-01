
import React from 'react';

export const MaleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5" />
    <line x1="17" y1="7" x2="22" y2="2" />
    <polyline points="17 2 22 2 22 7" />
  </svg>
);

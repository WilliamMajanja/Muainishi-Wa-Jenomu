
import React from 'react';

export const DnaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 14.01s3.63-3.62 7.26-3.62c3.63 0 7.26 3.62 7.26 3.62"/>
    <path d="M4 10.01s3.63 3.62 7.26 3.62c3.63 0 7.26-3.62 7.26-3.62"/>
    <path d="M10.39 5.5s-1.81 1.81-1.81 3.63.81 2.72 1.81 3.63"/>
    <path d="M14.49 18.5s1.81-1.81 1.81-3.63-.81-2.72-1.81-3.63"/>
    <path d="M11.26 10.39c-2.73-2.72-2.73-7.14 0-9.86"/>
    <path d="M13.61 14.49c2.73 2.72 2.73 7.14 0 9.86"/>
  </svg>
);

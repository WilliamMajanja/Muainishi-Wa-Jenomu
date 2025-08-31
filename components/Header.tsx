
import React from 'react';
import { DnaIcon } from './icons/DnaIcon';

export const Header: React.FC = () => (
  <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-brand-accent/50">
    <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
      <DnaIcon className="w-10 h-10 text-brand-highlight" />
      <h1 className="text-3xl sm:text-4xl font-bold text-brand-text tracking-wider">
        Muainishi wa Jenomu
      </h1>
    </div>
    <p className="text-center text-brand-light mt-2">AI-Powered Human Genome Analysis</p>
  </header>
);
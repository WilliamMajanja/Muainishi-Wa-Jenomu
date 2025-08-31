import React from 'react';

interface VizContainerProps {
  title: string;
  summary: string;
  children: React.ReactNode;
}

export const VizContainer: React.FC<VizContainerProps> = ({ title, summary, children }) => {
  return (
    <div className="p-4 bg-brand-primary rounded-lg">
      <h3 className="text-xl font-bold text-brand-highlight mb-2">{title}</h3>
      <p className="text-brand-light mb-6 prose prose-invert prose-sm max-w-none">{summary}</p>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};
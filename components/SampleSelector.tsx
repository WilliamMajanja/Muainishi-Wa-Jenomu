import React from 'react';
import { sampleData } from '../sampleData';
import { GenomeSample } from '../types';

interface SampleSelectorProps {
  onSampleSelect: (sample: GenomeSample) => void;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ onSampleSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
        <p className="text-brand-light my-2">or select a sample dataset:</p>
        <div className="flex flex-wrap justify-center gap-2">
            {sampleData.map(sample => (
                <button
                    key={sample.name}
                    onClick={() => onSampleSelect(sample)}
                    title={sample.description}
                    className="px-3 py-1.5 text-sm bg-brand-secondary text-brand-light rounded-md border border-brand-accent hover:bg-brand-accent hover:text-brand-text transition-colors"
                >
                    {sample.name}
                </button>
            ))}
        </div>
    </div>
  );
};

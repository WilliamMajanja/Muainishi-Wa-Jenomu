import React, { useState, useMemo } from 'react';
import { sampleData } from '../sampleData';
import { GenomeSample } from '../types';
import { SearchIcon } from './icons/SearchIcon';

interface SampleSelectorProps {
  onToggleSample: (sample: GenomeSample) => void;
  selectedSamples: GenomeSample[];
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ onToggleSample, selectedSamples }) => {
  const [query, setQuery] = useState('');

  const selectedSampleNames = useMemo(() => new Set(selectedSamples.map(s => s.name)), [selectedSamples]);

  const filteredSamples = useMemo(() => {
    if (!query) {
      return sampleData;
    }
    const lowerCaseQuery = query.toLowerCase();
    return sampleData.filter(sample =>
      sample.name.toLowerCase().includes(lowerCaseQuery) ||
      sample.description.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Search historical genomes (e.g., Henrietta Lacks, Ötzi)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-brand-secondary border-2 border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-highlight focus:border-brand-highlight outline-none transition-colors duration-200"
          aria-label="Search for historical genome samples"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-light pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSamples.length > 0 ? (
          filteredSamples.map(sample => {
            const isSelected = selectedSampleNames.has(sample.name);
            return (
              <button
                key={sample.name}
                onClick={() => onToggleSample(sample)}
                className={`p-4 bg-brand-secondary rounded-lg border-2 text-left h-full flex flex-col hover:bg-brand-accent hover:border-brand-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-brand-highlight transition-all duration-200
                  ${isSelected ? 'border-brand-highlight ring-2 ring-brand-highlight' : 'border-brand-accent'}
                `}
                aria-pressed={isSelected}
              >
                <h4 className="font-bold text-brand-text flex-shrink-0">{sample.name}</h4>
                <p className="text-sm text-brand-light mt-1 flex-grow">{sample.description}</p>
              </button>
            )
          })
        ) : (
          <div className="col-span-full text-center py-8 bg-brand-secondary rounded-lg">
            <p className="text-brand-light">No samples found for "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
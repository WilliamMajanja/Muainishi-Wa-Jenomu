
import React from 'react';
import { IntegrationData } from '../../types';
import { VizContainer } from './VizContainer';
import { DnaIcon } from '../icons/DnaIcon';

const IntegrationMarkerIcon: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    {title && <title>{title}</title>}
    <path fillRule="evenodd" d="M12 2.25c-5.132 0-9.25 4.118-9.25 9.25 0 5.926 7.234 11.433 8.783 12.83a.75.75 0 001.034.001c1.549-1.396 8.783-6.903 8.783-12.83C21.25 6.368 17.132 2.25 12 2.25zm0 12.5a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5z" clipRule="evenodd" />
  </svg>
);


const confidenceColors: Record<string, string> = {
    'High': 'text-brand-rose',
    'Medium': 'text-brand-gold',
    'Low': 'text-brand-light'
};

export const IntegrationViz: React.FC<{ data: IntegrationData }> = ({ data }) => {
    
    const pointsByChromosome = data.integrationPoints.reduce<Record<string, typeof data.integrationPoints>>((acc, point) => {
        if (!acc[point.chromosome]) {
            acc[point.chromosome] = [];
        }
        acc[point.chromosome].push(point);
        return acc;
    }, {});
    
    // Sort chromosomes (e.g., 1, 2, ..., 10, X, Y, MT)
    const sortedChromosomes = Object.keys(pointsByChromosome).sort((a, b) => {
        const aIsNumeric = !isNaN(Number(a));
        const bIsNumeric = !isNaN(Number(b));
        if (aIsNumeric && bIsNumeric) return Number(a) - Number(b);
        if (aIsNumeric) return -1;
        if (bIsNumeric) return 1;
        return a.localeCompare(b);
    });

    return (
      <VizContainer title="Viral Integration Analysis" summary={data.summary}>
        {data.integrationPoints.length > 0 ? (
          <div className="space-y-6">
            {sortedChromosomes.map(chromosome => (
              <div key={chromosome} className="bg-brand-secondary p-4 rounded-lg border border-brand-accent/50">
                <h4 className="font-bold text-lg text-brand-light mb-4">Chromosome {chromosome}</h4>
                <div className="relative w-full h-8 bg-brand-accent rounded-full flex items-center px-2">
                  <DnaIcon className="w-full h-4 text-brand-primary opacity-50"/>
                  
                  {/* For simplicity, we'll distribute points evenly along the view. */}
                  {pointsByChromosome[chromosome].map((point, index) => {
                      const positionPercent = (index + 1) / (pointsByChromosome[chromosome].length + 1) * 100;
                      const color = confidenceColors[point.confidence] || 'text-brand-light';
                      return (
                        <div 
                          key={`${point.position}-${index}`} 
                          className="absolute group"
                          style={{ left: `${positionPercent}%`, transform: 'translateX(-50%)' }}
                        >
                            <IntegrationMarkerIcon className={`w-6 h-6 ${color} cursor-pointer drop-shadow-lg transition-transform group-hover:scale-125`} />
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max p-2 text-xs bg-brand-primary text-brand-text rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow-lg">
                                <strong>{point.viralSource}</strong>
                                <p>Position: {point.position.toLocaleString()}</p>
                                <p>Confidence: <span className={`font-bold ${color}`}>{point.confidence}</span></p>
                            </div>
                        </div>
                      )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-brand-secondary rounded-lg">
            <p className="text-lg text-brand-light">No viral integration points were detected in this sample.</p>
          </div>
        )}
      </VizContainer>
    );
};

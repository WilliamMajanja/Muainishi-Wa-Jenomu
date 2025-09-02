
import React, { useState, useRef, useEffect } from 'react';
import { IntegrationData, IntegrationPoint } from '../../types';
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
    const [activePoint, setActivePoint] = useState<IntegrationPoint | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    
    // Effect to handle clicks outside the active popup to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // If there's no active popup, do nothing
            if (!popupRef.current) return;
            
            // If the click is inside the popup or on any marker button, do nothing
            if (popupRef.current.contains(target) || target.closest('[data-is-marker="true"]')) {
                return;
            }
            
            // Otherwise, close the popup
            setActivePoint(null);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array ensures this effect runs only once

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
                      const isActive = activePoint?.chromosome === point.chromosome && activePoint?.position === point.position;
                      return (
                        <div 
                          key={`${point.position}-${index}`} 
                          className="absolute"
                          style={{ left: `${positionPercent}%`, transform: 'translateX(-50%)' }}
                        >
                            <button
                              onClick={() => setActivePoint(isActive ? null : point)}
                              className="relative"
                              aria-label={`View details for integration at ${point.position}`}
                              data-is-marker="true"
                            >
                                <IntegrationMarkerIcon className={`w-6 h-6 ${color} cursor-pointer drop-shadow-lg transition-transform hover:scale-125 ${isActive ? 'scale-125' : ''}`} />
                            </button>
                            {isActive && (
                               <div 
                                ref={popupRef}
                                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max p-3 text-xs bg-brand-primary text-brand-text rounded-md transition-opacity z-20 shadow-lg border border-brand-accent/50"
                                role="dialog"
                                aria-modal="true"
                              >
                                  <button onClick={() => setActivePoint(null)} className="absolute top-1 right-1 text-brand-light hover:text-brand-text p-0.5" aria-label="Close details">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                  </button>
                                  <strong className="font-bold text-base block mb-1 pr-4">{point.viralSource}</strong>
                                  <p><strong>Position:</strong> {point.position.toLocaleString()}</p>
                                  <p className="flex items-center"><strong>Confidence:</strong> <span className={`font-bold ml-1.5 ${color}`}>{point.confidence}</span></p>
                                  <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-x-4 border-x-transparent border-t-4 border-t-brand-primary"></div>
                              </div>
                            )}
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

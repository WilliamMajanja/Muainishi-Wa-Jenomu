import React from 'react';
import { IntegrationData } from '../../types';
import { VizContainer } from './VizContainer';
import { DnaIcon } from '../icons/DnaIcon';

// Fix: Update the component's props to accept a `title` for the SVG tooltip.
const IntegrationMarkerIcon: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    {/* Add a title element for accessibility and tooltips */}
    {title && <title>{title}</title>}
    <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path fillRule="evenodd" d="M12 23c-4.418 0-8-3.582-8-8 0-4.418 8-13 8-13s8 8.582 8 13c0 4.418-3.582 8-8 8Zm0-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
  </svg>
);


export const IntegrationViz: React.FC<{ data: IntegrationData }> = ({ data }) => {
    return (
      <VizContainer title="Viral Integration Analysis" summary={data.summary}>
        {data.integrationPoints && data.integrationPoints.length > 0 ? (
          <div className="space-y-4">
            {data.integrationPoints.map((point, index) => (
              <div key={index} className="p-4 bg-brand-secondary rounded-lg border border-brand-accent/50">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-brand-green mb-1">Potential Integration Point</h4>
                        <p className="text-sm text-brand-light">
                            <span className="font-semibold text-brand-text">Chromosome:</span> {point.chromosome} @ <span className="font-mono">{point.position.toLocaleString()}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-brand-text">{point.viralSource}</p>
                        <p className="text-sm text-brand-light">Confidence: {point.confidence}</p>
                    </div>
                </div>
                 <div className="relative flex items-center gap-2 mt-4 text-brand-light">
                    <div className="h-1.5 flex-1 bg-brand-blue rounded-l-full"></div>
                    <IntegrationMarkerIcon className="w-8 h-8 text-red-500 absolute left-1/2 -translate-x-1/2 -top-4 animate-pulse" title={`Integration of ${point.viralSource}`} />
                    <div className="h-1.5 flex-1 bg-brand-blue rounded-r-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-brand-secondary rounded-lg">
            <DnaIcon className="w-12 h-12 mx-auto text-brand-green mb-4" />
            <p className="text-lg text-brand-light">No definitive viral integration points were identified in the sample.</p>
          </div>
        )}
      </VizContainer>
    );
};

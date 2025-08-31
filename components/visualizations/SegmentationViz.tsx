import React from 'react';
import { SegmentationData } from '../../types';
import { VizContainer } from './VizContainer';

const segmentColors: Record<string, string> = {
    'Gene': 'bg-brand-blue',
    'Regulatory': 'bg-brand-green',
    'Non-coding': 'bg-brand-orange',
    'default': 'bg-brand-purple',
};

export const SegmentationViz: React.FC<{ data: SegmentationData }> = ({ data }) => {
    const totalLength = data.totalLength || data.segments.reduce((max, s) => Math.max(max, s.endPosition), 0);

    return (
      <VizContainer title="Genomic Segmentation" summary={data.summary}>
        <div className="w-full bg-brand-secondary p-4 rounded-lg">
            <h4 className="font-bold text-brand-light mb-4">Chromosome Segments</h4>
            <div className="relative w-full h-8 bg-brand-accent rounded-full">
                {data.segments.map(segment => {
                    const width = ((segment.endPosition - segment.startPosition) / totalLength) * 100;
                    const left = (segment.startPosition / totalLength) * 100;
                    const color = segmentColors[segment.type] || segmentColors.default;

                    return (
                        <div
                            key={segment.segmentId}
                            className={`absolute h-full rounded-full ${color} transition-all duration-300 hover:scale-110 origin-center group`}
                            style={{ left: `${left}%`, width: `${width}%`, minWidth: '2px' }}
                            title={`${segment.type}: ${segment.description}`}
                        >
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max p-2 text-xs bg-brand-primary text-brand-text rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                            <strong>{segment.segmentId} ({segment.type})</strong>
                            <p>{segment.startPosition.toLocaleString()} - {segment.endPosition.toLocaleString()}</p>
                            <p>{segment.description}</p>
                          </div>
                        </div>
                    );
                })}
            </div>
             <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm">
                {Object.entries(segmentColors).filter(([key]) => key !== 'default').map(([key, value]) => (
                    <div key={key} className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${value}`}></span>
                        <span>{key}</span>
                    </div>
                ))}
            </div>
        </div>
      </VizContainer>
    );
};


import React, { useState, useMemo } from 'react';
import { ComparativeMutationData } from '../../types';
import { VizContainer } from './VizContainer';
import { MutationCard } from './MutationCard';

export const ComparativeMutationViz: React.FC<{ data: ComparativeMutationData }> = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Memoize the set of all mutations for quick lookup of shared status
    const allMutations = useMemo(() => {
        const mutationMap = new Map<string, number>();
        data.comparisonResults.forEach(result => {
            // Ensure mutations array exists before iterating
            if (result.mutations) {
                result.mutations.forEach(mutation => {
                    const key = `${mutation.gene}::${mutation.id}`;
                    mutationMap.set(key, (mutationMap.get(key) || 0) + 1);
                });
            }
        });
        return mutationMap;
    }, [data.comparisonResults]);
    
    const activeSample = data.comparisonResults[activeTab];

    return (
      <VizContainer title="Comparative Mutation Analysis" summary={data.summary}>
        <div className="flex flex-col">
            <div className="border-b border-brand-accent flex-wrap flex overflow-x-auto">
                {data.comparisonResults.map((result, index) => (
                    <button
                        key={result.sampleName}
                        onClick={() => setActiveTab(index)}
                        className={`py-3 px-5 text-sm font-bold transition-all duration-300 border-b-4 flex items-center gap-3 whitespace-nowrap
                            ${activeTab === index 
                                ? 'border-brand-highlight text-brand-text'
                                : 'border-transparent text-brand-light hover:text-brand-text hover:bg-brand-accent/50'
                            }
                        `}
                    >
                        <span>{result.sampleName}</span>
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-full transition-colors duration-300
                            ${activeTab === index
                                ? 'bg-brand-highlight text-brand-primary'
                                : 'bg-brand-accent text-brand-light'
                            }
                        `}>
                            {result.mutations?.length || 0}
                        </span>
                    </button>
                ))}
            </div>
            <div className="mt-6">
                {activeSample && activeSample.mutations && activeSample.mutations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeSample.mutations.map((mutation, index) => {
                            const key = `${mutation.gene}::${mutation.id}`;
                            const isShared = (allMutations.get(key) || 0) > 1;
                            return (
                                <MutationCard 
                                    key={`${mutation.id}-${index}`} 
                                    mutation={mutation} 
                                    badge={isShared ? 'Shared' : 'Unique'}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-brand-secondary rounded-lg">
                        <p className="text-lg text-brand-light">No significant mutations identified in this sample.</p>
                    </div>
                )}
            </div>
        </div>
      </VizContainer>
    );
};

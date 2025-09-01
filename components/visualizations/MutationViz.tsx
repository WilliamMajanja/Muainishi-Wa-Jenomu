
import React from 'react';
import { MutationData } from '../../types';
import { VizContainer } from './VizContainer';
import { MutationCard } from './MutationCard';

export const MutationViz: React.FC<{ data: MutationData }> = ({ data }) => {
    return (
      <VizContainer title="Mutation Tracking" summary={data.summary}>
        {data.mutations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.mutations.map((mutation, index) => (
              <MutationCard key={`${mutation.id}-${index}`} mutation={mutation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-brand-secondary rounded-lg">
            <p className="text-lg text-brand-light">No significant mutations identified in this sample.</p>
          </div>
        )}
      </VizContainer>
    );
};

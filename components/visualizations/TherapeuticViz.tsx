import React from 'react';
import { TherapeuticInsightsData } from '../../types';
import { VizContainer } from './VizContainer';

export const TherapeuticViz: React.FC<{ data: TherapeuticInsightsData }> = ({ data }) => {
    return (
      <VizContainer title="Therapeutic Insights" summary={data.summary}>
        <div className="space-y-4">
            {data.targets.map((target, index) => (
                <div key={`${target.gene}-${index}`} className="bg-brand-secondary p-4 rounded-lg border border-brand-accent/50">
                    <h4 className="text-lg font-bold text-brand-rose">{target.gene}</h4>
                    <div className="mt-2">
                        <h5 className="font-semibold text-brand-light mb-1">Associated Conditions</h5>
                        <div className="flex flex-wrap gap-2">
                           {target.associatedConditions.map(condition => (
                               <span key={condition} className="text-xs font-medium bg-brand-accent text-brand-text px-2 py-1 rounded-full">
                                   {condition}
                               </span>
                           ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5 className="font-semibold text-brand-light mb-1">Therapeutic Approach</h5>
                        <p className="text-sm text-brand-text bg-brand-primary p-3 rounded-md">{target.therapeuticApproach}</p>
                    </div>
                </div>
            ))}
        </div>
      </VizContainer>
    );
};
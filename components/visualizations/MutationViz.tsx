import React from 'react';
import { MutationData } from '../../types';
import { VizContainer } from './VizContainer';

const significanceColor: Record<string, string> = {
  'Pathogenic': 'text-red-400',
  'Likely Pathogenic': 'text-orange-400',
  'Uncertain Significance': 'text-yellow-400',
  'Likely Benign': 'text-green-400',
  'Benign': 'text-green-500',
  'default': 'text-brand-light',
}

export const MutationViz: React.FC<{ data: MutationData }> = ({ data }) => {
    return (
      <VizContainer title="Mutation Tracking" summary={data.summary}>
        <div className="overflow-x-auto bg-brand-secondary p-2 rounded-lg">
          <table className="w-full min-w-[600px] text-sm text-left">
            <thead className="border-b border-brand-accent text-brand-light uppercase">
              <tr>
                <th scope="col" className="px-4 py-3">Gene</th>
                <th scope="col" className="px-4 py-3">Identifier (ID)</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Clinical Significance</th>
              </tr>
            </thead>
            <tbody>
              {data.mutations.map((mutation, index) => (
                <tr key={`${mutation.id}-${index}`} className="border-b border-brand-accent/50 hover:bg-brand-accent/30">
                  <td className="px-4 py-3 font-mono font-bold text-brand-text">{mutation.gene}</td>
                  <td className="px-ax4 py-3 font-mono">{mutation.id}</td>
                  <td className="px-4 py-3">{mutation.type}</td>
                  <td className={`px-4 py-3 font-semibold ${significanceColor[mutation.clinicalSignificance] || significanceColor.default}`}>
                    {mutation.clinicalSignificance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VizContainer>
    );
};

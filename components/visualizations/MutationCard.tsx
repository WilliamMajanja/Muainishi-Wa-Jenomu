
import React from 'react';
import { Mutation } from '../../types';

interface MutationCardProps {
  mutation: Mutation;
  badge?: 'Shared' | 'Unique' | null;
}

// Reusing the significance colors but adding background colors too
const significanceStyles: Record<string, { text: string; bg: string; border: string; }> = {
  'Pathogenic': { text: 'text-red-400', bg: 'bg-red-900/50', border: 'border-red-500/80' },
  'Likely Pathogenic': { text: 'text-orange-400', bg: 'bg-orange-900/50', border: 'border-orange-500/80' },
  'Uncertain Significance': { text: 'text-yellow-400', bg: 'bg-yellow-900/50', border: 'border-yellow-500/80' },
  'Likely Benign': { text: 'text-green-400', bg: 'bg-green-900/50', border: 'border-green-500/80' },
  'Benign': { text: 'text-green-500', bg: 'bg-green-800/60', border: 'border-green-400/80' },
  'default': { text: 'text-brand-light', bg: 'bg-brand-accent/50', border: 'border-brand-accent' },
}

export const MutationCard: React.FC<MutationCardProps> = ({ mutation, badge }) => {
  const styles = significanceStyles[mutation.clinicalSignificance] || significanceStyles.default;

  return (
    <div className={`p-4 rounded-lg border ${styles.border} ${styles.bg} flex flex-col justify-between`}>
      <div>
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-lg font-bold font-mono text-brand-text break-all">{mutation.gene}</h4>
          {badge && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
              badge === 'Shared'
                ? 'bg-brand-purple/80 text-white'
                : 'bg-brand-cyan/80 text-brand-primary'
            }`}>
              {badge}
            </span>
          )}
        </div>
        <p className={`font-semibold ${styles.text}`}>{mutation.clinicalSignificance}</p>
      </div>
      <div className="mt-4 text-sm text-brand-light bg-brand-primary/50 p-3 rounded-md">
        <p><strong>ID:</strong> <span className="font-mono">{mutation.id}</span></p>
        <p><strong>Type:</strong> <span className="font-mono">{mutation.type}</span></p>
      </div>
    </div>
  );
};

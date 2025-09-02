import React from 'react';
import { Mutation } from '../../types';
import { ExternalLinkIcon } from '../icons/ExternalLinkIcon';

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

  // Function to generate the most relevant external link for a mutation
  const getExternalLinkDetails = (): { url: string; text: string; } | null => {
    // Prioritize dbSNP link if an rsID is available, as it's the most specific identifier.
    if (mutation.id && mutation.id.toLowerCase().startsWith('rs')) {
      return {
        url: `https://www.ncbi.nlm.nih.gov/snp/${mutation.id}`,
        text: `View on NCBI dbSNP`
      };
    }
    // As a fallback, link to ClinVar for the gene, which is highly relevant for clinical significance.
    if (mutation.gene) {
      const searchTerm = `${mutation.gene}[gene]`;
      return {
        url: `https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(searchTerm)}`,
        text: `Search ClinVar for ${mutation.gene}`
      };
    }
    return null;
  };

  const externalLinkDetails = getExternalLinkDetails();

  return (
    <div className={`p-4 rounded-lg border ${styles.border} ${styles.bg} flex flex-col justify-between`}>
      <div>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h4 className="text-lg font-bold font-mono text-brand-text break-all">{mutation.gene || 'Unknown Gene'}</h4>
            <p className={`font-semibold ${styles.text}`}>{mutation.clinicalSignificance}</p>
          </div>
          {badge && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap self-start ${
              badge === 'Shared'
                ? 'bg-brand-purple/80 text-white'
                : 'bg-brand-cyan/80 text-brand-primary'
            }`}>
              {badge}
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 text-sm text-brand-light bg-brand-primary/50 p-3 rounded-md space-y-1">
        <p><strong>ID:</strong> <span className="font-mono">{mutation.id}</span></p>
        <p><strong>Type:</strong> <span className="font-mono">{mutation.type}</span></p>
        {mutation.position && (
          <p><strong>Position:</strong> <span className="font-mono">{mutation.position}</span></p>
        )}
        {mutation.refAllele && mutation.altAllele && (
          <p><strong>Change:</strong> <span className="font-mono">{mutation.refAllele} &rarr; {mutation.altAllele}</span></p>
        )}
        {externalLinkDetails && (
            <a 
                href={externalLinkDetails.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={externalLinkDetails.text}
                className="flex items-center gap-1.5 text-brand-highlight hover:underline pt-1 group"
            >
                <span>{externalLinkDetails.text}</span>
                <ExternalLinkIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
        )}
      </div>
    </div>
  );
};
import { AnalysisType } from './types';

export const ANALYSIS_DESCRIPTIONS: Record<AnalysisType, string> = {
  [AnalysisType.CLASSIFICATION]: 'Classify the genome to identify potential ancestry, haplogroups, and notable genetic markers.',
  [AnalysisType.SEGMENTATION]: 'Identify and describe key segments like genes, regulatory regions, and non-coding DNA within the genome.',
  [AnalysisType.INTEGRATION]: 'Analyze the sequence for signs of viral integration, identifying potential sites and viral sources.',
  [AnalysisType.MUTATION]: 'Identify and track significant mutations, detailing their type, clinical significance, and associated genes.',
  [AnalysisType.PHARMACOGENOMICS]: 'Analyze genetic markers to predict drug efficacy and potential for adverse reactions (e.g., CYP450 enzymes).',
  [AnalysisType.THERAPEUTIC_INSIGHTS]: 'Identify genes that are known targets for existing or experimental therapies (e.g., gene therapy, oncology drugs).',
  [AnalysisType.INTEGRATIVE_ANALYSIS]: 'Connect findings across domains, linking mutations to pharmacogenomics and therapeutic options for a holistic view.',
  [AnalysisType.COMPARATIVE_MUTATION]: 'Compare significant mutations side-by-side across multiple selected genome samples to identify key differences.',
};

export const ANALYSIS_COLORS: Record<AnalysisType, { border: string; text: string; bg: string; shadow: string }> = {
    [AnalysisType.CLASSIFICATION]: { border: 'border-brand-blue', text: 'text-brand-blue', bg: 'bg-brand-blue', shadow: 'shadow-brand-blue/50' },
    [AnalysisType.SEGMENTATION]: { border: 'border-brand-purple', text: 'text-brand-purple', bg: 'bg-brand-purple', shadow: 'shadow-brand-purple/50' },
    [AnalysisType.INTEGRATION]: { border: 'border-brand-green', text: 'text-brand-green', bg: 'bg-brand-green', shadow: 'shadow-brand-green/50' },
    [AnalysisType.MUTATION]: { border: 'border-brand-orange', text: 'text-brand-orange', bg: 'bg-brand-orange', shadow: 'shadow-brand-orange/50' },
    [AnalysisType.PHARMACOGENOMICS]: { border: 'border-brand-gold', text: 'text-brand-gold', bg: 'bg-brand-gold', shadow: 'shadow-brand-gold/50' },
    [AnalysisType.THERAPEUTIC_INSIGHTS]: { border: 'border-brand-rose', text: 'text-brand-rose', bg: 'bg-brand-rose', shadow: 'shadow-brand-rose/50' },
    [AnalysisType.INTEGRATIVE_ANALYSIS]: { border: 'border-brand-cyan', text: 'text-brand-cyan', bg: 'bg-brand-cyan', shadow: 'shadow-brand-cyan/50' },
    [AnalysisType.COMPARATIVE_MUTATION]: { border: 'border-brand-purple', text: 'text-brand-purple', bg: 'bg-brand-purple', shadow: 'shadow-brand-purple/50' },
};
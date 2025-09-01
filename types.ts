export enum AnalysisType {
  CLASSIFICATION = 'Classification',
  SEGMENTATION = 'Segmentation',
  INTEGRATION = 'Integration',
  MUTATION = 'Mutation Tracking',
  PHARMACOGENOMICS = 'Pharmacogenomics',
  THERAPEUTIC_INSIGHTS = 'Therapeutic Insights',
  INTEGRATIVE_ANALYSIS = 'Integrative Analysis',
  COMPARATIVE_MUTATION = 'Comparative Mutation',
}

// Data structures for visualizations
export interface AncestryResult {
  region: string;
  percentage: number;
}
export interface HaplogroupResult {
  type: 'Maternal' | 'Paternal' | 'Unknown';
  group: string;
}
export interface ClassificationData {
  summary: string;
  ancestry: AncestryResult[];
  haplogroups: HaplogroupResult[];
}

export interface Segment {
  segmentId: string;
  chromosome: string;
  startPosition: number;
  endPosition: number;
  type: string;
  description: string;
}
export interface SegmentationData {
  summary: string;
  segments: Segment[];
  totalLength: number; // To help with scaling the visualization
}

export interface IntegrationPoint {
    chromosome: string;
    position: number;
    viralSource: string;
    confidence: 'High' | 'Medium' | 'Low';
}
export interface IntegrationData {
    summary: string;
    integrationPoints: IntegrationPoint[];
}

export interface Mutation {
    id: string;
    gene: string;
    type: string;
    clinicalSignificance: 'Pathogenic' | 'Likely Pathogenic' | 'Benign' | 'Likely Benign' | 'Uncertain Significance' | string;
}
export interface MutationData {
    summary: string;
    mutations: Mutation[];
}

export interface DrugImplication {
    drug: string;
    implication: string;
}
export interface PharmacogenomicsVariant {
    gene: string;
    variant: string;
    phenotype: 'Poor Metabolizer' | 'Intermediate Metabolizer' | 'Normal Metabolizer' | 'Rapid Metabolizer' | 'Ultra-rapid Metabolizer' | string;
    drugImplications: DrugImplication[];
}
export interface PharmacogenomicsData {
    summary: string;
    variants: PharmacogenomicsVariant[];
}

export interface TherapeuticTarget {
    gene: string;
    associatedConditions: string[];
    therapeuticApproach: string; // e.g., "Monoclonal antibody target", "Candidate for gene therapy"
}

export interface TherapeuticInsightsData {
    summary: string;
    targets: TherapeuticTarget[];
}

export interface IntegrativeFinding {
  gene: string;
  narrative: string; // A text description connecting the findings
  mutation?: Pick<Mutation, 'id' | 'type' | 'clinicalSignificance'>;
  pharmacogenomicVariant?: Pick<PharmacogenomicsVariant, 'variant' | 'phenotype'>;
  therapeuticTarget?: Pick<TherapeuticTarget, 'associatedConditions' | 'therapeuticApproach'>;
}
export interface IntegrativeAnalysisData {
  summary: string;
  findings: IntegrativeFinding[];
}

export interface ComparativeResult {
  sampleName: string;
  mutations: Mutation[];
}
export interface ComparativeMutationData {
  summary: string;
  comparisonResults: ComparativeResult[];
}


// Fix: Convert AnalysisResult to a discriminated union type.
// This allows TypeScript to correctly infer the type of `structuredData`
// based on the `title` property, ensuring type safety in components like ResultsDisplay.
export type AnalysisResult =
  | {
      title: AnalysisType.CLASSIFICATION;
      content: string;
      structuredData?: ClassificationData;
    }
  | {
      title: AnalysisType.SEGMENTATION;
      content: string;
      structuredData?: SegmentationData;
    }
  | {
      title: AnalysisType.INTEGRATION;
      content: string;
      structuredData?: IntegrationData;
    }
  | {
      title: AnalysisType.MUTATION;
      content: string;
      structuredData?: MutationData;
    }
  | {
      title: AnalysisType.PHARMACOGENOMICS;
      content: string;
      structuredData?: PharmacogenomicsData;
    }
  | {
      title: AnalysisType.THERAPEUTIC_INSIGHTS;
      content: string;
      structuredData?: TherapeuticInsightsData;
    }
  | {
      title: AnalysisType.INTEGRATIVE_ANALYSIS;
      content: string;
      structuredData?: IntegrativeAnalysisData;
    }
  | {
      title: AnalysisType.COMPARATIVE_MUTATION;
      content: string;
      structuredData?: ComparativeMutationData;
    };


export interface GenomeSample {
  name: string;
  description: string;
  content: string;
}
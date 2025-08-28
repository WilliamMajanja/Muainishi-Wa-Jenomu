export enum AnalysisType {
  CLASSIFICATION = 'Classification',
  SEGMENTATION = 'Segmentation',
  INTEGRATION = 'Integration',
  MUTATION = 'Mutation Tracking',
  PHARMACOGENOMICS = 'Pharmacogenomics',
}

export interface AnalysisResult {
  title: string;
  content: string;
}

export interface GenomeSample {
  name: string;
  description: string;
  content: string;
}

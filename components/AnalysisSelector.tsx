import React from 'react';
import { AnalysisType } from '../types';
import { ANALYSIS_DESCRIPTIONS, ANALYSIS_COLORS } from '../constants';
import { ClassificationIcon } from './icons/ClassificationIcon';
import { SegmentationIcon } from './icons/SegmentationIcon';
import { IntegrationIcon } from './icons/IntegrationIcon';
import { MutationIcon } from './icons/MutationIcon';
import { PharmacogenomicsIcon } from './icons/PharmacogenomicsIcon';
import { TherapeuticIcon } from './icons/TherapeuticIcon';
import { IntegrativeIcon } from './icons/IntegrativeIcon';
import { ComparativeIcon } from './icons/ComparativeIcon';

interface AnalysisSelectorProps {
  onSelect: (type: AnalysisType) => void;
  selectedType: AnalysisType | null;
  isVisible: boolean;
  mode: 'single' | 'comparison';
}

const icons: Record<AnalysisType, React.FC<{className?: string}>> = {
  [AnalysisType.CLASSIFICATION]: ClassificationIcon,
  [AnalysisType.SEGMENTATION]: SegmentationIcon,
  [AnalysisType.INTEGRATION]: IntegrationIcon,
  [AnalysisType.MUTATION]: MutationIcon,
  [AnalysisType.PHARMACOGENOMICS]: PharmacogenomicsIcon,
  [AnalysisType.THERAPEUTIC_INSIGHTS]: TherapeuticIcon,
  [AnalysisType.INTEGRATIVE_ANALYSIS]: IntegrativeIcon,
  [AnalysisType.COMPARATIVE_MUTATION]: ComparativeIcon,
};

const singleAnalysisTypes: AnalysisType[] = [
    AnalysisType.CLASSIFICATION,
    AnalysisType.SEGMENTATION,
    AnalysisType.INTEGRATION,
    AnalysisType.MUTATION,
    AnalysisType.PHARMACOGENOMICS,
    AnalysisType.THERAPEUTIC_INSIGHTS,
    AnalysisType.INTEGRATIVE_ANALYSIS,
];

const comparisonAnalysisTypes: AnalysisType[] = [
    AnalysisType.COMPARATIVE_MUTATION,
];

export const AnalysisSelector: React.FC<AnalysisSelectorProps> = ({ onSelect, selectedType, isVisible, mode }) => {
  if (!isVisible) return null;

  const analysisTypesToShow = mode === 'single' ? singleAnalysisTypes : comparisonAnalysisTypes;
  const gridCols = mode === 'single' ? 'lg:grid-cols-3 xl:grid-cols-7' : 'lg:grid-cols-1';

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-brand-light">2. Select Analysis Type</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4`}>
        {analysisTypesToShow.map((type) => {
          const Icon = icons[type];
          const colors = ANALYSIS_COLORS[type];
          const isSelected = selectedType === type;

          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`flex flex-col items-center p-6 text-center rounded-lg border-2 transition-all duration-300 transform
                ${isSelected
                  ? `${colors.border} ${colors.shadow} bg-brand-accent shadow-lg scale-105`
                  : `bg-brand-secondary border-brand-accent hover:border-brand-light hover:bg-brand-accent hover:-translate-y-1`
                }
              `}
              aria-pressed={isSelected}
            >
              <div className={`transition-colors duration-300 ${isSelected ? colors.text : 'text-brand-light'}`}>
                <Icon className="w-8 h-8 mb-2" />
              </div>
              <h3 className="font-bold text-brand-text text-base">{type}</h3>
              <p className="text-sm text-brand-light mt-2">{ANALYSIS_DESCRIPTIONS[type]}</p>
            </button>
          )
        })}
      </div>
    </div>
  );
};
import React from 'react';
import { AnalysisType } from '../types';
import { ANALYSIS_DESCRIPTIONS, ANALYSIS_COLORS } from '../constants';
import { ClassificationIcon } from './icons/ClassificationIcon';
import { SegmentationIcon } from './icons/SegmentationIcon';
import { IntegrationIcon } from './icons/IntegrationIcon';
import { MutationIcon } from './icons/MutationIcon';
import { PharmacogenomicsIcon } from './icons/PharmacogenomicsIcon';

interface AnalysisSelectorProps {
  onSelect: (type: AnalysisType) => void;
  selectedType: AnalysisType | null;
  isVisible: boolean;
}

const icons: Record<AnalysisType, React.FC<{className?: string}>> = {
  [AnalysisType.CLASSIFICATION]: ClassificationIcon,
  [AnalysisType.SEGMENTATION]: SegmentationIcon,
  [AnalysisType.INTEGRATION]: IntegrationIcon,
  [AnalysisType.MUTATION]: MutationIcon,
  [AnalysisType.PHARMACOGENOMICS]: PharmacogenomicsIcon,
};

export const AnalysisSelector: React.FC<AnalysisSelectorProps> = ({ onSelect, selectedType, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-brand-light">2. Select Analysis Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.values(AnalysisType).map((type) => {
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
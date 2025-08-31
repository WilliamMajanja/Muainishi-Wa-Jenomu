import React from 'react';
import { PharmacogenomicsData } from '../../types';
import { VizContainer } from './VizContainer';

const phenotypeColor: Record<string, string> = {
    'Poor Metabolizer': '#D08770', // brand-orange
    'Intermediate Metabolizer': '#EBCB8B', // brand-gold
    'Normal Metabolizer': '#A3BE8C', // brand-green
    'Rapid Metabolizer': '#5E81AC', // brand-blue
    'Ultra-rapid Metabolizer': '#B48EAD', // brand-purple
    'default': '#778DA9', // brand-light
}

export const PharmacogenomicsViz: React.FC<{ data: PharmacogenomicsData }> = ({ data }) => {
    return (
      <VizContainer title="Pharmacogenomics Report" summary={data.summary}>
        <div className="space-y-4">
            {data.variants.map((variant, index) => (
                <div key={`${variant.gene}-${index}`} className="bg-brand-secondary p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-lg font-bold text-brand-text">{variant.gene} - <span className="font-mono">{variant.variant}</span></h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full text-white" style={{backgroundColor: phenotypeColor[variant.phenotype] || phenotypeColor.default}}>
                            {variant.phenotype}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5 className="font-semibold text-brand-light mb-2">Drug Implications</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            {variant.drugImplications.map((imp, i) => (
                                <li key={i}>
                                    <strong className="text-brand-text">{imp.drug}:</strong> <span className="text-brand-light">{imp.implication}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
      </VizContainer>
    );
};

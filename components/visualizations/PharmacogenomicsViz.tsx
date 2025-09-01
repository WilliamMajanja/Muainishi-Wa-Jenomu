
import React from 'react';
import { PharmacogenomicsData } from '../../types';
import { VizContainer } from './VizContainer';
import { PharmacogenomicsIcon } from '../icons/PharmacogenomicsIcon';

const phenotypeColor: Record<string, string> = {
    'Poor Metabolizer': '#D08770', // brand-orange
    'Intermediate Metabolizer': '#EBCB8B', // brand-gold
    'Normal Metabolizer': '#A3BE8C', // brand-green
    'Rapid Metabolizer': '#5E81AC', // brand-blue
    'Ultra-rapid Metabolizer': '#B48EAD', // brand-purple
    'default': '#778DA9', // brand-light
}

const phenotypeOrder = [
    'Poor Metabolizer',
    'Intermediate Metabolizer',
    'Normal Metabolizer',
    'Rapid Metabolizer',
    'Ultra-rapid Metabolizer'
];

const MetabolizerScale: React.FC<{ phenotype: string }> = ({ phenotype }) => {
    const phenotypeIndex = phenotypeOrder.indexOf(phenotype);
    
    return (
        <div className="w-full mt-4">
            <div className="flex justify-between text-xs text-brand-light mb-1">
                <span>Poor</span>
                <span>Normal</span>
                <span>Ultra-rapid</span>
            </div>
            <div className="h-2.5 w-full bg-brand-primary rounded-full flex">
                {phenotypeOrder.map((p, index) => (
                    <div key={p} className="flex-1 first:rounded-l-full last:rounded-r-full relative">
                        {index === phenotypeIndex && (
                            <div 
                                className="absolute -top-1 -bottom-1 w-full h-4 rounded-full border-2 border-brand-text shadow-lg"
                                style={{ backgroundColor: phenotypeColor[p] || phenotypeColor.default }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export const PharmacogenomicsViz: React.FC<{ data: PharmacogenomicsData }> = ({ data }) => {
    return (
      <VizContainer title="Pharmacogenomics Report" summary={data.summary}>
        <div className="space-y-6">
            {data.variants.map((variant, index) => (
                <div key={`${variant.gene}-${index}`} className="bg-brand-secondary p-4 rounded-lg border border-brand-accent/50">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-brand-primary rounded-full">
                                <PharmacogenomicsIcon className="w-6 h-6 text-brand-gold"/>
                           </div>
                            <div>
                                <h4 className="text-lg font-bold text-brand-text">{variant.gene}</h4>
                                <p className="font-mono text-sm text-brand-light">{variant.variant}</p>
                            </div>
                        </div>
                        <div className="text-xs font-bold px-3 py-1.5 rounded-full text-white whitespace-nowrap" style={{backgroundColor: phenotypeColor[variant.phenotype] || phenotypeColor.default}}>
                            {variant.phenotype}
                        </div>
                    </div>
                    
                    <MetabolizerScale phenotype={variant.phenotype} />

                    <div className="mt-6">
                        <h5 className="font-semibold text-brand-light mb-2">Drug Implications</h5>
                        <ul className="space-y-2 text-sm">
                            {variant.drugImplications.map((imp, i) => (
                                <li key={i} className="flex gap-3 items-start p-3 bg-brand-primary rounded-md">
                                    <strong className="text-brand-text flex-shrink-0 w-28 break-words">{imp.drug}:</strong> 
                                    <span className="text-brand-light">{imp.implication}</span>
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

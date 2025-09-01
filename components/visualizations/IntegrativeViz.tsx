
import React from 'react';
import { IntegrativeAnalysisData } from '../../types';
import { VizContainer } from './VizContainer';
import { MutationIcon } from '../icons/MutationIcon';
import { PharmacogenomicsIcon } from '../icons/PharmacogenomicsIcon';
import { TherapeuticIcon } from '../icons/TherapeuticIcon';

export const IntegrativeViz: React.FC<{ data: IntegrativeAnalysisData }> = ({ data }) => {
    return (
      <VizContainer title="Integrative Analysis" summary={data.summary}>
        <div className="space-y-6">
            {data.findings.map((finding, index) => (
                <div key={`${finding.gene}-${index}`} className="bg-brand-secondary p-4 rounded-lg border border-brand-accent/50">
                    <h4 className="text-xl font-bold text-brand-cyan">{finding.gene}</h4>
                    <p className="text-sm text-brand-light mt-2 mb-4 italic border-l-4 border-brand-accent pl-3">{finding.narrative}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {finding.mutation && (
                            <div className="bg-brand-primary p-3 rounded-md">
                                <div className="flex items-center gap-2 font-bold text-brand-orange mb-2">
                                    <MutationIcon className="w-5 h-5"/>
                                    <span>Mutation</span>
                                </div>
                                <p><strong className="text-brand-light">ID:</strong> {finding.mutation.id}</p>
                                <p><strong className="text-brand-light">Type:</strong> {finding.mutation.type}</p>
                                <p><strong className="text-brand-light">Significance:</strong> {finding.mutation.clinicalSignificance}</p>
                            </div>
                        )}
                         {finding.pharmacogenomicVariant && (
                            <div className="bg-brand-primary p-3 rounded-md">
                                <div className="flex items-center gap-2 font-bold text-brand-gold mb-2">
                                    <PharmacogenomicsIcon className="w-5 h-5"/>
                                    <span>Pharmacogenomics</span>
                                </div>
                                <p><strong className="text-brand-light">Variant:</strong> {finding.pharmacogenomicVariant.variant}</p>
                                <p><strong className="text-brand-light">Phenotype:</strong> {finding.pharmacogenomicVariant.phenotype}</p>
                            </div>
                        )}
                        {finding.therapeuticTarget && (
                            <div className="bg-brand-primary p-3 rounded-md">
                                 <div className="flex items-center gap-2 font-bold text-brand-rose mb-2">
                                    <TherapeuticIcon className="w-5 h-5"/>
                                    <span>Therapeutic Target</span>
                                </div>
                                <p><strong className="text-brand-light">Approach:</strong> {finding.therapeuticTarget.therapeuticApproach}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </VizContainer>
    );
};
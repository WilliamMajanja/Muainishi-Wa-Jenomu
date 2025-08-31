import React, { useState } from 'react';
import { AnalysisResult, AnalysisType } from '../types';
import { ANALYSIS_COLORS } from '../constants';
import { ClassificationViz, SegmentationViz, IntegrationViz, MutationViz, PharmacogenomicsViz } from './visualizations';

// Fix: Update component props to rely on the `result` object's discriminated union type.
// The `analysisType` prop is no longer needed as the type can be inferred from `result.title`.
interface ResultsDisplayProps {
  result: AnalysisResult | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const [view, setView] = useState<'visual' | 'raw'>('visual');
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  // Default to raw view if no structured data is available
  const currentView = result.structuredData ? view : 'raw';
  
  const colors = ANALYSIS_COLORS[result.title];

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderVisualization = () => {
    if (!result.structuredData) {
      return <p className="text-brand-light text-center">No structured data available for visualization.</p>;
    }
    // Fix: Switch on `result.title` to leverage the discriminated union.
    // This correctly narrows the type of `result` and `result.structuredData` in each case block, fixing the errors.
    switch(result.title) {
      case AnalysisType.CLASSIFICATION:
        return <ClassificationViz data={result.structuredData} />;
      case AnalysisType.SEGMENTATION:
        return <SegmentationViz data={result.structuredData} />;
      case AnalysisType.INTEGRATION:
        return <IntegrationViz data={result.structuredData} />;
      case AnalysisType.MUTATION:
        return <MutationViz data={result.structuredData} />;
      case AnalysisType.PHARMACOGENOMICS:
        return <PharmacogenomicsViz data={result.structuredData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-6 bg-brand-secondary rounded-lg border border-brand-accent">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className={`text-2xl font-bold ${colors.text}`}>{result.title} Results</h2>
        <div className="flex items-center gap-2">
            {result.structuredData && (
                 <div className="flex rounded-md bg-brand-primary p-1">
                    <button onClick={() => setView('visual')} className={`px-3 py-1 text-sm rounded ${currentView === 'visual' ? 'bg-brand-accent text-brand-text' : 'text-brand-light'}`}>Graphical</button>
                    <button onClick={() => setView('raw')} className={`px-3 py-1 text-sm rounded ${currentView === 'raw' ? 'bg-brand-accent text-brand-text' : 'text-brand-light'}`}>Raw Data</button>
                 </div>
            )}
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-sm bg-brand-accent text-brand-light rounded hover:bg-brand-light hover:text-brand-primary transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      
      {currentView === 'visual' ? (
        renderVisualization()
      ) : (
        <pre className="whitespace-pre-wrap break-words font-mono text-brand-text bg-brand-primary p-4 rounded-md overflow-x-auto">
          <code>{result.content}</code>
        </pre>
      )}
    </div>
  );
};

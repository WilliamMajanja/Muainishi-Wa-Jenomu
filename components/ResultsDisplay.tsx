import React, { useState } from 'react';
import { AnalysisResult, AnalysisType } from '../types';
import { ANALYSIS_COLORS } from '../constants';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  analysisType: AnalysisType | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, analysisType }) => {
  const [copied, setCopied] = useState(false);

  if (!result || !analysisType) return null;
  
  const colors = ANALYSIS_COLORS[analysisType];

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-brand-secondary rounded-lg border border-brand-accent">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${colors.text}`}>{result.title} Results</h2>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-brand-accent text-brand-light rounded hover:bg-brand-light hover:text-brand-primary transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words font-mono text-brand-text bg-brand-primary p-4 rounded-md overflow-x-auto">
        <code>{result.content}</code>
      </pre>
    </div>
  );
};
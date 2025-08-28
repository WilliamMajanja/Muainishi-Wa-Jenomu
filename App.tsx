import React, { useState, useCallback } from 'react';
import { AnalysisType, AnalysisResult, GenomeSample } from './types';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { SampleSelector } from './components/SampleSelector';
import { AnalysisSelector } from './components/AnalysisSelector';
import { Loader } from './components/Loader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { runGenomeAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; size?: number } | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  const handleFileSelect = useCallback(async (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    try {
      const content = await readFileContent(file);
      setFileContent(content);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to read file: ${errorMessage}`);
      setFileContent(null);
      setSelectedFile(null);
    }
  }, []);
  
  const handleSampleSelect = useCallback((sample: GenomeSample) => {
    setSelectedFile({ name: sample.name });
    setFileContent(sample.content);
    setResult(null);
    setError(null);
  }, []);

  const handleAnalysisSelect = useCallback((type: AnalysisType) => {
    setSelectedAnalysis(type);
    setResult(null);
    setError(null);
  }, []);

  const handleRunAnalysis = async () => {
    if (!fileContent || !selectedAnalysis) {
      setError("Please select a file and an analysis type.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisContent = await runGenomeAnalysis(fileContent, selectedAnalysis);
      setResult({
        title: selectedAnalysis,
        content: analysisContent,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to run analysis: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setFileContent(null);
    setSelectedAnalysis(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  }

  const isAnalysisSetupComplete = !!fileContent && !!selectedAnalysis;

  return (
    <div className="min-h-screen bg-brand-primary font-sans">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
          
          {result && (
             <div className="w-full max-w-4xl text-center">
              <button
                onClick={handleReset}
                className="bg-brand-cyan text-brand-primary font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start New Analysis
              </button>
            </div>
          )}

          {!result && !isLoading && (
            <>
              <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
              
              <SampleSelector onSampleSelect={handleSampleSelect} />

              <AnalysisSelector onSelect={handleAnalysisSelect} selectedType={selectedAnalysis} isVisible={!!fileContent} />
              
              {isAnalysisSetupComplete && (
                <div className="text-center pt-4">
                   <h2 className="text-lg font-semibold mb-4 text-brand-light">3. Run Analysis</h2>
                  <button
                    onClick={handleRunAnalysis}
                    disabled={isLoading}
                    className="bg-brand-cyan text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analyze Genome
                  </button>
                </div>
              )}
            </>
          )}

          {isLoading && <Loader />}
          
          {error && (
            <div className="w-full max-w-2xl p-4 text-center bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
              <p className="font-bold">Analysis Error</p>
              <p>{error}</p>
            </div>
          )}

          <ResultsDisplay result={result} analysisType={selectedAnalysis} />
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-brand-accent">
          <p>&copy; {new Date().getFullYear()} Muainishi wa Jenomu. AI-powered analysis.</p>
      </footer>
    </div>
  );
};

export default App;

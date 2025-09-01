import React, { useState, useCallback, useMemo } from 'react';
import { AnalysisType, AnalysisResult, GenomeSample } from './types';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { SampleSelector } from './components/SampleSelector';
import { AnalysisSelector } from './components/AnalysisSelector';
import { Loader } from './components/Loader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { runGenomeAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [selectedSamples, setSelectedSamples] = useState<GenomeSample[]>([]);
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

  const resetStateForNewSelection = () => {
    setResult(null);
    setError(null);
    setSelectedAnalysis(null);
  }

  const handleFileSelect = useCallback(async (file: File) => {
    resetStateForNewSelection();
    try {
      const content = await readFileContent(file);
      const newSample: GenomeSample = { 
        name: file.name, 
        content, 
        description: `Uploaded file on ${new Date().toLocaleDateString()}`
      };
      setSelectedSamples([newSample]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to read file: ${errorMessage}`);
      setSelectedSamples([]);
    }
  }, []);
  
  const handleToggleSample = useCallback((sample: GenomeSample) => {
    resetStateForNewSelection();
    setSelectedSamples(prev => {
        const isSelected = prev.some(s => s.name === sample.name);
        if (isSelected) {
            return prev.filter(s => s.name !== sample.name);
        } else {
            return [...prev, sample];
        }
    });
  }, []);

  const handleAnalysisSelect = useCallback((type: AnalysisType) => {
    setSelectedAnalysis(type);
    setResult(null);
    setError(null);
  }, []);

  const handleRunAnalysis = async () => {
    if (selectedSamples.length === 0 || !selectedAnalysis) {
      setError("Please select at least one sample and an analysis type.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { raw, structured } = await runGenomeAnalysis(selectedSamples, selectedAnalysis);
      setResult({
        title: selectedAnalysis,
        content: raw,
        structuredData: structured,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to run analysis: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedSamples([]);
    setSelectedAnalysis(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  }

  const analysisMode = useMemo(() => (selectedSamples.length > 1 ? 'comparison' : 'single'), [selectedSamples]);
  const isReadyForAnalysis = selectedSamples.length > 0;
  const isAnalysisSetupComplete = isReadyForAnalysis && !!selectedAnalysis;

  return (
    <div className="min-h-screen bg-brand-primary font-sans">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-10">
          
          {result && (
             <div className="w-full max-w-4xl text-center">
              <button
                onClick={handleReset}
                className="bg-brand-highlight text-brand-primary font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-highlight/30"
              >
                Start New Analysis
              </button>
            </div>
          )}

          {!result && !isLoading && (
            <>
              <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedSamples.length === 1 ? selectedSamples[0] : null} />
              
              <div className="w-full max-w-4xl mx-auto text-center">
                  <div className="inline-block my-2 px-4 py-1 text-sm font-bold text-brand-accent bg-brand-secondary rounded-full">OR</div>
                  <h2 className="text-lg font-semibold mb-4 text-brand-light">
                    {analysisMode === 'single' ? 'Select a sample from the library' : 'Select multiple samples to compare'}
                  </h2>
              </div>

              <SampleSelector onToggleSample={handleToggleSample} selectedSamples={selectedSamples}/>

              <AnalysisSelector 
                onSelect={handleAnalysisSelect} 
                selectedType={selectedAnalysis} 
                isVisible={isReadyForAnalysis} 
                mode={analysisMode}
              />
              
              {isAnalysisSetupComplete && (
                <div className="text-center pt-4">
                   <h2 className="text-lg font-semibold mb-4 text-brand-light">3. Run Analysis</h2>
                  <button
                    onClick={handleRunAnalysis}
                    disabled={isLoading}
                    className="bg-brand-highlight text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-highlight/30"
                  >
                    {`Analyze ${selectedSamples.length} Sample${selectedSamples.length > 1 ? 's' : ''}`}
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

          <ResultsDisplay result={result} />
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-brand-accent">
          <p>&copy; {new Date().getFullYear()} Muainishi wa Jenomu. AI-powered analysis.</p>
      </footer>
    </div>
  );
};

export default App;
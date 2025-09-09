
import React, { useState, useCallback } from 'react';
import { type MitigationResult } from './types';
import { generateMitigations } from './services/geminiService';
import { Header } from './components/Header';
import { RiskInputForm } from './components/RiskInputForm';
import { MitigationDisplay } from './components/MitigationDisplay';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [riskDescription, setRiskDescription] = useState<string>('');
  const [riskObjective, setRiskObjective] = useState<string>('');
  const [riskStatement, setRiskStatement] = useState<string>('');
  
  const [mitigationResult, setMitigationResult] = useState<MitigationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!riskDescription || !riskObjective || !riskStatement) {
      setError("Please fill in all risk fields.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMitigationResult(null);

    try {
      const result = await generateMitigations({ riskDescription, riskObjective, riskStatement });
      setMitigationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [riskDescription, riskObjective, riskStatement]);
  
  const isFormIncomplete = !riskDescription || !riskObjective || !riskStatement;

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-white">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full max-w-4xl">
        <div className="bg-white p-6 md:p-8 rounded-2xl">
          <RiskInputForm
            riskDescription={riskDescription}
            setRiskDescription={setRiskDescription}
            riskObjective={riskObjective}
            setRiskObjective={setRiskObjective}
            riskStatement={riskStatement}
            setRiskStatement={setRiskStatement}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isFormIncomplete={isFormIncomplete}
          />
        </div>

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {mitigationResult && <MitigationDisplay result={mitigationResult} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

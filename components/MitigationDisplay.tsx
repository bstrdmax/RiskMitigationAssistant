
import React from 'react';
import { type MitigationResult } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface MitigationDisplayProps {
  result: MitigationResult;
}

const ResultCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-lg font-semibold text-purple-800 ml-3">{title}</h3>
        </div>
        <div className="text-gray-700">{children}</div>
    </div>
);


export const MitigationDisplay: React.FC<MitigationDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800">Generated Mitigation Strategy</h2>
      
      <ResultCard title="Control Objective" icon={<ClipboardIcon className="w-6 h-6 text-purple-600"/>}>
        <p>{result.controlObjective}</p>
      </ResultCard>

      <ResultCard title="Control Description" icon={<DocumentTextIcon className="w-6 h-6 text-purple-600"/>}>
        <p className="whitespace-pre-wrap">{result.controlDescription}</p>
      </ResultCard>
      
      <ResultCard title="Suggested Audit Documentation" icon={<CheckCircleIcon className="w-6 h-6 text-purple-600"/>}>
        <ul className="list-disc list-inside space-y-2">
            {result.suggestedDocumentation.map((doc, index) => (
                <li key={index}>{doc}</li>
            ))}
        </ul>
      </ResultCard>

    </div>
  );
};

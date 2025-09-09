
import React from 'react';
import { GenerateIcon } from './icons/GenerateIcon';

interface RiskInputFormProps {
  riskDescription: string;
  setRiskDescription: (value: string) => void;
  riskObjective: string;
  setRiskObjective: (value: string) => void;
  riskStatement: string;
  setRiskStatement: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
  isFormIncomplete: boolean;
}

const InputLabel: React.FC<{ children: React.ReactNode; htmlFor: string }> = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">{children}</label>
);

const TextArea: React.FC<{ id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string }> = ({ id, value, onChange, placeholder }) => (
    <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
    />
);

export const RiskInputForm: React.FC<RiskInputFormProps> = ({
  riskDescription,
  setRiskDescription,
  riskObjective,
  setRiskObjective,
  riskStatement,
  setRiskStatement,
  handleSubmit,
  isLoading,
  isFormIncomplete,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <InputLabel htmlFor="risk-description">Risk Description</InputLabel>
        <TextArea 
            id="risk-description"
            value={riskDescription} 
            onChange={(e) => setRiskDescription(e.target.value)}
            placeholder="e.g., Unauthorized access to sensitive customer data due to weak authentication."
        />
      </div>
      <div>
        <InputLabel htmlFor="risk-objective">Risk Objective</InputLabel>
        <TextArea 
            id="risk-objective"
            value={riskObjective} 
            onChange={(e) => setRiskObjective(e.target.value)}
            placeholder="e.g., To prevent data breaches and maintain customer trust."
        />
      </div>
      <div>
        <InputLabel htmlFor="risk-statement">Risk Statement</InputLabel>
        <TextArea
            id="risk-statement" 
            value={riskStatement} 
            onChange={(e) => setRiskStatement(e.target.value)}
            placeholder="e.g., A threat actor could exploit weak user passwords to gain unauthorized access to the customer database, resulting in data exfiltration and reputational damage."
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading || isFormIncomplete}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          <GenerateIcon className="w-5 h-5 mr-2 -ml-1" />
          {isLoading ? 'Generating...' : 'Generate Mitigations'}
        </button>
      </div>
    </form>
  );
};

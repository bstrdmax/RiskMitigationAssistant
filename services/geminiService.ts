import { type RiskInput, type MitigationResult } from '../types';

export const generateMitigations = async (riskInput: RiskInput): Promise<MitigationResult> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(riskInput),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'An unexpected server error occurred.' }));
      throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }

    const result: MitigationResult = await response.json();
    return result;

  } catch (error) {
    console.error("Error calling backend service:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the server.");
  }
};

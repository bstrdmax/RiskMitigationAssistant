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
      console.error("Server responded with an error:", response.status, response.statusText);
      const errorData = await response.json().catch(() => {
        console.error("Failed to parse server response as JSON. The server might be misconfigured or down.");
        // This is the fallback error when the server response isn't valid JSON,
        // which can happen with 404s, 502s, etc.
        return ({ error: 'An unexpected server error occurred.' });
      });
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
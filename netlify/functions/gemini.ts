import type { Handler } from '@netlify/functions';
import { GoogleGenAI, Type } from "@google/genai";
import type { RiskInput, MitigationResult } from '../../types';

// This will be set as an environment variable in the Netlify UI.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set in Netlify function environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        controlObjective: {
            type: Type.STRING,
            description: 'A concise statement describing the goal of the control to mitigate the provided risk.'
        },
        controlDescription: {
            type: Type.STRING,
            description: 'A detailed, actionable description of the mitigation or control to be implemented.'
        },
        suggestedDocumentation: {
            type: Type.ARRAY,
            description: 'A list of documents or evidence types to maintain for future audits related to this control.',
            items: {
                type: Type.STRING
            }
        }
    },
    required: ['controlObjective', 'controlDescription', 'suggestedDocumentation']
};

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ error: "Request body is missing." }) };
        }
        
        const { riskDescription, riskObjective, riskStatement } = JSON.parse(event.body) as RiskInput;

        if (!riskDescription || !riskObjective || !riskStatement) {
             return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields in request body." }) };
        }

        const prompt = `
            You are an expert risk management and compliance consultant. Your task is to analyze a given risk and propose a clear control objective, a detailed control description, and a list of suggested documentation for audit purposes.
            Crucially, all output you generate must be written at an 8th-grade readability level to ensure it is clear, concise, and easy for a broad audience to understand.
            Given the following risk details:
            - Risk Description: "${riskDescription}"
            - Risk Objective: "${riskObjective}"
            - Risk Statement: "${riskStatement}"
            Please generate a response in JSON format that adheres to the provided schema. The JSON object must contain the following keys: "controlObjective", "controlDescription", and "suggestedDocumentation".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });
        
        let jsonString = response.text.trim();

        if (jsonString.startsWith("```json")) {
            jsonString = jsonString.slice(7, -3).trim();
        } else if (jsonString.startsWith("```")) {
            jsonString = jsonString.slice(3, -3).trim();
        }

        if (!jsonString) {
             throw new Error("API returned an empty response.");
        }

        const result: MitigationResult = JSON.parse(jsonString);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error("Error in Netlify function:", error);
        const message = error instanceof Error ? error.message : "An unknown server error occurred.";
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: "Failed to generate mitigations from the AI.", details: message }),
        };
    }
};
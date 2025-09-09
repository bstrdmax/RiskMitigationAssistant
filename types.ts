
export interface RiskInput {
  riskDescription: string;
  riskObjective: string;
  riskStatement: string;
}

export interface MitigationResult {
  controlObjective: string;
  controlDescription: string;
  suggestedDocumentation: string[];
}

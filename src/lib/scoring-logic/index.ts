export interface ScoringInputs {
  consistency: number;
  intensity: number;
  subjectiveGrowth: number;
}

export interface ScoringWeights {
  consistency: number;
  intensity: number;
  subjectiveGrowth: number;
}

export const defaultScoringWeights: ScoringWeights = {
  consistency: 0.4,
  intensity: 0.4,
  subjectiveGrowth: 0.2,
};

export function calculateCategoryScore(
  _inputs: ScoringInputs,
  _weights: ScoringWeights = defaultScoringWeights,
): number {
  // Scoring rules will be implemented with explicit normalization and clamping.
  return 0;
}

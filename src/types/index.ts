export type CategoryKey =
  | 'career'
  | 'fitness'
  | 'hobbies'
  | 'service'
  | 'learning'
  | 'recovery'
  | 'relationships'
  | 'discipline';

export interface CategoryConfig {
  label: string;
  color: string;
  targetScore: number;
}

export interface SnapshotMetrics {
  stravaDistance?: number;
  hoursInvested: Record<CategoryKey, number>;
}

export interface Snapshot {
  id: string;
  timestamp: string;
  scores: Record<CategoryKey, number>;
  reflections: string;
  metrics: SnapshotMetrics;
}

export interface Goal {
  id: string;
  category: CategoryKey;
  title: string;
  targetDate: string;
  currentValue: number;
  targetValue: number;
  unit: string;
}

export interface IdentitySystem {
  version: string;
  categories: Record<CategoryKey, CategoryConfig>;
  snapshots: Snapshot[];
  goals: Goal[];
}

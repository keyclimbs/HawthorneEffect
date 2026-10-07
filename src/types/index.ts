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

export type CommitmentMode = 'advance' | 'maintain' | 'minimum_effective_dose';

export interface UserProfile {
  name: string;
  identityStatement: string;
  twelveMonthTheme: string;
}

export interface Commitment {
  id: string;
  category: CategoryKey;
  title: string;
  roleInLife: string;
  enoughThisSeason: string;
  mode: CommitmentMode;
  weeklyMinimum: string;
  nextAction: string;
}

export interface DailyCheckIn {
  date: string;
  energy: number;
  recovery: number;
  contribution: number;
  connection: number;
  congruence: number;
  energySource: string;
  energyDrain: string;
  identityEvidence: string;
  notes: string;
}

export interface LocalAppState {
  profile: UserProfile;
  commitments: Commitment[];
  checkIns: DailyCheckIn[];
  activeTab: string;
}

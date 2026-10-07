export enum LifeCategory {
  Career = "career",
  Fitness = "fitness",
  Hobbies = "hobbies",
  Learning = "learning",
  Service = "service",
  Recovery = "recovery",
  Relationships = "relationships",
  Discipline = "discipline",
}

export enum GoalStatus {
  Active = "active",
  Completed = "completed",
  Paused = "paused",
  Archived = "archived",
}

export enum MetricUnit {
  Count = "count",
  Minutes = "minutes",
  Hours = "hours",
  Kilometers = "kilometers",
  Miles = "miles",
  Steps = "steps",
  Percentage = "percentage",
  Rating = "rating",
}

export enum ReflectionMood {
  Struggling = "struggling",
  Low = "low",
  Steady = "steady",
  Good = "good",
  Energized = "energized",
}

export enum ReflectionSource {
  Journal = "journal",
  WeeklyReview = "weekly-review",
  MonthlyReview = "monthly-review",
  CheckIn = "check-in",
}

export interface LifeCategoryDefinition {
  id: LifeCategory;
  label: string;
  description: string;
  color: string;
}

export interface CategoryScore {
  categoryId: LifeCategory;
  score: number;
}

export interface MetricDefinition {
  id: string;
  name: string;
  categoryId: LifeCategory;
  unit: MetricUnit;
  description?: string;
  targetValue?: number;
}

export interface MetricEntry {
  id: string;
  metricId: string;
  categoryId: LifeCategory;
  value: number;
  recordedAt: string;
  note?: string;
}

export interface Goal {
  id: string;
  title: string;
  categoryId: LifeCategory;
  status: GoalStatus;
  progress: number;
  createdAt: string;
  targetDate?: string;
  completedAt?: string;
  description?: string;
  metricId?: string;
}

export interface Reflection {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  categoryIds: LifeCategory[];
  mood?: ReflectionMood;
  source: ReflectionSource;
}

export interface MonthlySnapshot {
  id: string;
  month: string;
  createdAt: string;
  scores: CategoryScore[];
  highlights: string[];
  challenges: string[];
  reflectionIds: string[];
}

export interface StravaSummary {
  connected: boolean;
  syncedAt?: string;
  activityCount?: number;
  distanceKm?: number;
  movingTimeMinutes?: number;
  elevationGainMeters?: number;
  activeDays?: number;
}

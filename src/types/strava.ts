export interface StravaManualEntry {
  id: string;
  recordedAt: string;
  activityType: 'run' | 'ride' | 'walk' | 'hike' | 'other';
  distanceKm: number;
  note?: string;
}

import type { IdentitySystem } from '../types';
import type { StravaManualEntry } from '../types/strava';

export const sampleIdentityData: IdentitySystem = {
  version: '0.1.0',
  categories: {
    career: { label: 'Career', color: '#546a7b', targetScore: 8 },
    fitness: { label: 'Fitness', color: '#8b6f47', targetScore: 8 },
    hobbies: { label: 'Hobbies', color: '#8b5e83', targetScore: 7 },
    service: { label: 'Service', color: '#6b8068', targetScore: 7 },
    learning: { label: 'Learning', color: '#587291', targetScore: 9 },
    recovery: { label: 'Recovery', color: '#8a817c', targetScore: 8 },
    relationships: { label: 'Relationships', color: '#9b6b62', targetScore: 9 },
    discipline: { label: 'Discipline', color: '#6f7278', targetScore: 8 },
  },
  snapshots: [
    {
      id: 'snapshot-2026-09',
      timestamp: '2026-09-30T18:00:00.000Z',
      scores: {
        career: 7.2,
        fitness: 6.8,
        hobbies: 5.9,
        service: 6.4,
        learning: 7.7,
        recovery: 5.8,
        relationships: 7.4,
        discipline: 6.9,
      },
      reflections:
        'September felt steady. Work had good momentum, while recovery and hobbies need more deliberate space.',
      metrics: {
        stravaDistance: 42.6,
        hoursInvested: {
          career: 34,
          fitness: 5.5,
          hobbies: 3,
          service: 2,
          learning: 6,
          recovery: 4,
          relationships: 8,
          discipline: 5,
        },
      },
    },
    {
      id: 'snapshot-2026-08',
      timestamp: '2026-08-31T18:00:00.000Z',
      scores: {
        career: 6.8,
        fitness: 6.2,
        hobbies: 6.1,
        service: 6.1,
        learning: 7.1,
        recovery: 5.2,
        relationships: 7,
        discipline: 6.4,
      },
      reflections:
        'August brought useful learning and connection, but the weekly rhythm was inconsistent.',
      metrics: {
        stravaDistance: 31.2,
        hoursInvested: {
          career: 30,
          fitness: 4,
          hobbies: 4,
          service: 2,
          learning: 4.5,
          recovery: 3,
          relationships: 7,
          discipline: 4,
        },
      },
    },
  ],
  goals: [
    {
      id: 'goal-learning-project',
      category: 'learning',
      title: 'Complete the systems design course',
      targetDate: '2026-11-15',
      currentValue: 6,
      targetValue: 12,
      unit: 'modules',
    },
    {
      id: 'goal-fitness-running',
      category: 'fitness',
      title: 'Build a consistent running base',
      targetDate: '2026-12-01',
      currentValue: 42.6,
      targetValue: 60,
      unit: 'km / month',
    },
    {
      id: 'goal-recovery-evenings',
      category: 'recovery',
      title: 'Protect two quiet evenings each week',
      targetDate: '2026-10-31',
      currentValue: 1,
      targetValue: 2,
      unit: 'evenings',
    },
  ],
};

export const sampleStravaEntries: StravaManualEntry[] = [
  {
    id: 'strava-2026-09-28',
    recordedAt: '2026-09-28T07:10:00.000Z',
    activityType: 'run',
    distanceKm: 6.4,
    note: 'Easy neighborhood loop',
  },
  {
    id: 'strava-2026-09-21',
    recordedAt: '2026-09-21T08:00:00.000Z',
    activityType: 'hike',
    distanceKm: 11.8,
    note: 'Morning trail hike',
  },
];

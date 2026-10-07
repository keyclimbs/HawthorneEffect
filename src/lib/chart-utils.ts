import type { CategoryKey, IdentitySystem, Snapshot } from '../types';

export interface ChartPoint {
  key: CategoryKey;
  label: string;
  value: number;
}

export interface RadarSeries {
  id: 'current' | 'target' | 'previous';
  label: string;
  color: string;
  points: ChartPoint[];
}

export function snapshotToChartPoints(
  snapshot: Snapshot,
  labels: Record<CategoryKey, string>,
): ChartPoint[] {
  return (Object.keys(labels) as CategoryKey[]).map((key) => ({
    key,
    label: labels[key],
    value: snapshot.scores[key],
  }));
}

export function identityToRadarSeries(identity: IdentitySystem): RadarSeries[] {
  const [current, previous] = identity.snapshots;
  const categoryKeys = Object.keys(identity.categories) as CategoryKey[];
  const labels = Object.fromEntries(
    categoryKeys.map((key) => [key, identity.categories[key].label]),
  ) as Record<CategoryKey, string>;

  return [
    {
      id: 'current',
      label: 'Current',
      color: '#334e68',
      points: current ? snapshotToChartPoints(current, labels) : [],
    },
    {
      id: 'target',
      label: 'Target',
      color: '#b7791f',
      points: categoryKeys.map((key) => ({
        key,
        label: labels[key],
        value: identity.categories[key].targetScore,
      })),
    },
    {
      id: 'previous',
      label: 'Previous',
      color: '#829ab1',
      points: previous ? snapshotToChartPoints(previous, labels) : [],
    },
  ];
}

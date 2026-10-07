import type { CSSProperties } from 'react';
import type { RadarSeries } from '../../lib/chart-utils';

interface RadarChartProps {
  series: RadarSeries[];
  maxValue?: number;
}

interface Point {
  x: number;
  y: number;
}

const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 172;
const GRID_LEVELS = [2, 4, 6, 8, 10];

function polarPoint(index: number, count: number, value: number, maxValue: number): Point {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
  const distance = (value / maxValue) * RADIUS;

  return {
    x: CENTER + Math.cos(angle) * distance,
    y: CENTER + Math.sin(angle) * distance,
  };
}

function polygonPoints(values: number[], maxValue: number): string {
  return values
    .map((value, index) => {
      const point = polarPoint(index, values.length, value, maxValue);
      return `${point.x},${point.y}`;
    })
    .join(' ');
}

function formatValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function RadarLegend({ series }: { series: RadarSeries[] }) {
  return (
    <div className="radar-legend" aria-label="Chart legend">
      {series.map((item) => (
        <span className="radar-legend__item" key={item.id}>
          <span
            aria-hidden="true"
            className="radar-legend__swatch"
            style={{ '--legend-color': item.color } as CSSProperties}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function RadarChart({ series, maxValue = 10 }: RadarChartProps) {
  const points = series[0]?.points ?? [];
  const categoryCount = points.length;

  if (categoryCount === 0) {
    return <p className="radar-chart__empty">No category scores available.</p>;
  }

  return (
    <div className="radar-chart">
      <div className="radar-chart__canvas">
        <svg
          aria-label="Radar chart comparing current, target, and previous scores"
          className="radar-chart__svg"
          role="img"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <title>Current, target, and previous category scores</title>
          {GRID_LEVELS.map((level) => (
            <polygon
              className="radar-chart__grid"
              key={level}
              points={polygonPoints(Array(categoryCount).fill(level), maxValue)}
            />
          ))}
          {points.map((point, index) => {
            const axisPoint = polarPoint(index, categoryCount, maxValue, maxValue);
            const labelPoint = polarPoint(index, categoryCount, maxValue + 1.25, maxValue);
            const angle = (360 * index) / categoryCount;
            const textAnchor =
              angle > 15 && angle < 165 ? 'start' : angle > 195 && angle < 345 ? 'end' : 'middle';

            return (
              <g key={point.key}>
                <line
                  className="radar-chart__axis"
                  x1={CENTER}
                  x2={axisPoint.x}
                  y1={CENTER}
                  y2={axisPoint.y}
                />
                <text
                  className="radar-chart__label"
                  textAnchor={textAnchor}
                  x={labelPoint.x}
                  y={labelPoint.y}
                >
                  {point.label}
                </text>
              </g>
            );
          })}
          <text className="radar-chart__scale" x={CENTER + 7} y={CENTER - RADIUS + 5}>
            10
          </text>
          {series
            .filter((item) => item.points.length === categoryCount)
            .map((item) => (
              <g key={item.id}>
                <polygon
                  className={`radar-chart__series radar-chart__series--${item.id}`}
                  fill={item.color}
                  points={polygonPoints(
                    item.points.map((point) => point.value),
                    maxValue,
                  )}
                  stroke={item.color}
                />
                {item.points.map((point, index) => {
                  const marker = polarPoint(index, categoryCount, point.value, maxValue);
                  return (
                    <circle
                      className="radar-chart__marker"
                      cx={marker.x}
                      cy={marker.y}
                      fill={item.color}
                      key={`${item.id}-${point.key}`}
                      r="3.5"
                    >
                      <title>
                        {item.label}, {point.label}: {formatValue(point.value)} / {maxValue}
                      </title>
                    </circle>
                  );
                })}
              </g>
            ))}
        </svg>
      </div>
      <RadarLegend series={series} />
    </div>
  );
}

import type { CategoryConfig, CategoryKey } from '../../types';

interface TimeInvestmentListProps {
  hoursInvested: Record<CategoryKey, number>;
  categories: Record<CategoryKey, CategoryConfig>;
}

export function TimeInvestmentList({ hoursInvested, categories }: TimeInvestmentListProps) {
  const entries = (Object.entries(hoursInvested) as [CategoryKey, number][])
    .filter(([, hours]) => hours > 0)
    .sort(([, first], [, second]) => second - first);
  const totalHours = entries.reduce((sum, [, hours]) => sum + hours, 0);

  return (
    <div className="time-investment-list">
      <div className="time-summary">
        <strong>{totalHours.toFixed(1)}</strong>
        <span>hours invested this month</span>
      </div>

      <ul className="time-list">
        {entries.map(([categoryKey, hours]) => {
          const category = categories[categoryKey];
          const share = totalHours === 0 ? 0 : (hours / totalHours) * 100;

          return (
            <li className="time-investment-row" key={categoryKey}>
              <div className="time-row-label">
                <span className="category-label">
                  <span
                    className="category-swatch"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                  />
                  {category.label}
                </span>
                <strong>{hours.toFixed(1)}h</strong>
              </div>
              <progress
                className="progress-bar progress-bar-muted"
                value={share}
                max="100"
                aria-label={`${category.label}: ${hours.toFixed(1)} hours`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import type { CategoryConfig, Goal } from '../../types';

interface GoalCardProps {
  goal: Goal;
  category: CategoryConfig;
}

type GoalState = 'active' | 'completed' | 'overdue';

function getGoalState(goal: Goal): GoalState {
  if (goal.currentValue >= goal.targetValue) {
    return 'completed';
  }

  if (new Date(`${goal.targetDate}T23:59:59`).getTime() < Date.now()) {
    return 'overdue';
  }

  return 'active';
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`));
}

export function GoalCard({ goal, category }: GoalCardProps) {
  const progress = Math.min(100, Math.max(0, (goal.currentValue / goal.targetValue) * 100));
  const state = getGoalState(goal);
  const statusLabel = state === 'completed' ? 'Complete' : state === 'overdue' ? 'Past due' : 'In progress';

  return (
    <article className="goal-card">
      <div className="goal-card-topline">
        <span className="category-label">
          <span className="category-swatch" style={{ backgroundColor: category.color }} aria-hidden="true" />
          {category.label}
        </span>
        <span className={`status status-${state}`}>{statusLabel}</span>
      </div>

      <h3>{goal.title}</h3>

      <div className="goal-progress-meta">
        <span>
          {goal.currentValue} of {goal.targetValue} {goal.unit}
        </span>
        <strong>{Math.round(progress)}%</strong>
      </div>
      <progress
        className="progress-bar"
        value={progress}
        max="100"
        aria-label={`${goal.title} progress`}
      />

      <p className="goal-due-date">
        Due <time dateTime={goal.targetDate}>{formatDate(goal.targetDate)}</time>
      </p>
    </article>
  );
}

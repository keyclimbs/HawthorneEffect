import type { CategoryConfig, CategoryKey, Goal } from '../../types';
import { GoalCard } from './GoalCard';

interface GoalListProps {
  goals: Goal[];
  categories: Record<CategoryKey, CategoryConfig>;
}

export function GoalList({ goals, categories }: GoalListProps) {
  return (
    <div className="goal-list" aria-label="Active goals">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} category={categories[goal.category]} />
      ))}
    </div>
  );
}

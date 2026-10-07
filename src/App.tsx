import { sampleIdentityData, sampleStravaEntries } from './data/sampleData';
import { GoalList, TimeInvestmentList } from './components/dashboard';
import type { CategoryKey, Snapshot } from './types';
import './styles.css';

const navItems = ['Dashboard', 'Evolution', 'Identity', 'Log', 'Settings'];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

function formatCategory(category: CategoryKey) {
  return sampleIdentityData.categories[category].label;
}

function averageScore(snapshot: Snapshot) {
  const scores = Object.values(snapshot.scores);
  return scores.reduce((total, score) => total + score, 0) / scores.length;
}

function Section({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-heading">
        <h2>{title}</h2>
        <span className="section-rule" />
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const currentSnapshot = sampleIdentityData.snapshots[0];
  const previousSnapshot = sampleIdentityData.snapshots[1];
  const scoreDelta = averageScore(currentSnapshot) - averageScore(previousSnapshot);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <span className="brand-mark">K</span>
            <div>
              <strong>KeyClimbs</strong>
              <span>Personal operating system</span>
            </div>
          </div>

          <nav className="primary-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                className={item === 'Dashboard' ? 'nav-item active' : 'nav-item'}
                href="#"
                key={item}
                onClick={(event) => event.preventDefault()}
              >
                <span className="nav-dot" />
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <div>
            <strong>Local workspace</strong>
            <span>Last saved just now</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="date-label">Wednesday, October 7, 2026</p>
            <h1>Good morning, Alex.</h1>
            <p className="page-intro">
              A quiet view of where your energy is going, and what is taking shape.
            </p>
          </div>
          <button className="log-button" type="button">
            + Add reflection
          </button>
        </header>

        <div className="dashboard-grid">
          <Section title="Overview" className="overview-section">
            <div className="overview-context">
              <p>
                A simple read on how your current shape compares with your target and previous
                snapshot. Scores are directional signals, not a verdict.
              </p>
            </div>
            <div className="overview-content">
              <div className="score-block">
                <span className="score-value">{averageScore(currentSnapshot).toFixed(1)}</span>
                <span className="score-label">average score</span>
                <span className="score-change">
                  {scoreDelta >= 0 ? '↑' : '↓'} {Math.abs(scoreDelta).toFixed(1)} from August
                </span>
              </div>
              <div className="category-list">
                {(Object.entries(currentSnapshot.scores) as [CategoryKey, number][])
                  .sort(([, first], [, second]) => second - first)
                  .slice(0, 4)
                  .map(([category, score]) => (
                    <div className="category-row" key={category}>
                      <span className="category-name">
                        <span
                          className="category-swatch"
                          style={{ backgroundColor: sampleIdentityData.categories[category].color }}
                        />
                        {formatCategory(category)}
                      </span>
                      <span className="category-score">
                        <strong>{score.toFixed(1)}</strong>
                        <small>
                          target {sampleIdentityData.categories[category].targetScore.toFixed(1)}
                        </small>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <p className="section-note">
              Scores are directional signals from your time, consistency, and reflections—not a
              verdict.
            </p>
          </Section>

          <Section title="Goals" className="goals-section">
            <GoalList goals={sampleIdentityData.goals} categories={sampleIdentityData.categories} />
          </Section>

          <Section title="Time invested" className="time-section">
            <TimeInvestmentList
              hoursInvested={currentSnapshot.metrics.hoursInvested}
              categories={sampleIdentityData.categories}
            />
          </Section>

          <Section title="Reflections" className="reflection-section">
            <article className="reflection">
              <div className="reflection-meta">
                <span>September review</span>
                <time dateTime={currentSnapshot.timestamp}>{formatDate(currentSnapshot.timestamp)}</time>
              </div>
              <p>{currentSnapshot.reflections}</p>
            </article>
            <article className="reflection secondary-reflection">
              <div className="reflection-meta">
                <span>August review</span>
                <time dateTime={previousSnapshot.timestamp}>{formatDate(previousSnapshot.timestamp)}</time>
              </div>
              <p>{previousSnapshot.reflections}</p>
            </article>
          </Section>

          <Section title="Snapshots" className="snapshots-section">
            <div className="snapshot-summary">
              <div>
                <strong>{formatDate(currentSnapshot.timestamp)}</strong>
                <span>current snapshot</span>
              </div>
              <span className="snapshot-score">{averageScore(currentSnapshot).toFixed(1)}</span>
            </div>
            <div className="snapshot-summary previous">
              <div>
                <strong>{formatDate(previousSnapshot.timestamp)}</strong>
                <span>previous snapshot</span>
              </div>
              <span className="snapshot-score">{averageScore(previousSnapshot).toFixed(1)}</span>
            </div>
            <button className="text-button" type="button">
              View evolution →
            </button>
          </Section>

          <Section title="Strava" className="strava-section">
            <div className="strava-placeholder">
              <div className="strava-icon">↗</div>
              <div>
                <strong>Manual activity log</strong>
                <p>API connection is not active in the MVP. These entries are recorded manually.</p>
              </div>
            </div>
            <ul className="activity-list">
              {sampleStravaEntries.map((entry) => (
                <li key={entry.id}>
                  <span>{entry.activityType}</span>
                  <strong>{entry.distanceKm} km</strong>
                  <time dateTime={entry.recordedAt}>{formatDate(entry.recordedAt)}</time>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
    </div>
  );
}

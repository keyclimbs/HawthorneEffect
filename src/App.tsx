import { useEffect, useMemo, useState } from 'react';
import { RadarChart } from './components/charts';
import { sampleIdentityData, sampleStravaEntries } from './data/sampleData';
import { identityToRadarSeries } from './lib/chart-utils';
import { clearState, loadState, saveState } from './lib/store';
import type { Commitment, CommitmentMode, DailyCheckIn, LocalAppState } from './types';
import './styles.css';

const tabs = ['Today', 'Identity', 'Commitments', 'Check-in', 'Progress', 'Settings'] as const;
type Tab = (typeof tabs)[number];

const seededCommitments: Commitment[] = [
  {
    id: 'aws',
    category: 'career',
    title: 'Technology career',
    roleInLife: 'Financial stability, technical mastery, future leverage.',
    enoughThisSeason: 'Strong performance and a deliberate next-step plan.',
    mode: 'advance',
    weeklyMinimum: 'Protect the workday and one focused learning block.',
    nextAction: 'Finish the systems design module',
  },
  {
    id: 'service',
    category: 'service',
    title: 'Fire Rescue / EMS',
    roleInLife: 'Direct service, belonging, and real-world impact.',
    enoughThisSeason: 'Reliable training and a sustainable duty commitment.',
    mode: 'maintain',
    weeklyMinimum: 'One training or duty commitment.',
    nextAction: 'Confirm Saturday training',
  },
  {
    id: 'endurance',
    category: 'fitness',
    title: 'Endurance readiness',
    roleInLife: 'Exploration, resilience, and time outside.',
    enoughThisSeason: 'Build a durable base without chasing a peak.',
    mode: 'minimum_effective_dose',
    weeklyMinimum: 'Two easy sessions.',
    nextAction: 'Schedule an easy neighborhood loop',
  },
  {
    id: 'relationships',
    category: 'relationships',
    title: 'Relationships / connection',
    roleInLife: 'The people who make a full life feel shared.',
    enoughThisSeason: 'One meaningful, undistracted connection each week.',
    mode: 'maintain',
    weeklyMinimum: 'One deliberate check-in.',
    nextAction: 'Text someone you miss',
  },
];

const seedState: LocalAppState = {
  profile: {
    name: 'Alex',
    identityStatement:
      'I am a capable technical professional who stays physically ready, serves my community, and uses technology to make real-world impact.',
    twelveMonthTheme:
      'Build a sustainable career in technology while staying ready to serve and connected to the people and places that matter.',
  },
  commitments: seededCommitments,
  checkIns: [],
  activeTab: 'Today',
};

const modeLabels: Record<CommitmentMode, string> = {
  advance: 'Advance',
  maintain: 'Maintain',
  minimum_effective_dose: 'Minimum dose',
};

function todayLabel(): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

function averageScore(): number {
  const scores = Object.values(sampleIdentityData.snapshots[0].scores);
  return scores.reduce((total, score) => total + score, 0) / scores.length;
}

function App() {
  const [state, setState] = useState(() => loadState(seedState));
  const [notice, setNotice] = useState('');
  const currentTab = (state.activeTab as Tab) || 'Today';
  const latestCheckIn = state.checkIns[0];
  const chartSeries = useMemo(() => identityToRadarSeries(sampleIdentityData), []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  function setTab(tab: Tab): void {
    setState((current) => ({ ...current, activeTab: tab }));
  }

  function updateProfile(field: 'identityStatement' | 'twelveMonthTheme', value: string): void {
    setState((current) => ({ ...current, profile: { ...current.profile, [field]: value } }));
  }

  function updateMode(id: string, mode: CommitmentMode): void {
    setState((current) => ({
      ...current,
      commitments: current.commitments.map((commitment) =>
        commitment.id === id ? { ...commitment, mode } : commitment,
      ),
    }));
  }

  function submitCheckIn(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const checkIn: DailyCheckIn = {
      date: new Date().toISOString(),
      energy: Number(form.get('energy') ?? 3),
      recovery: Number(form.get('recovery') ?? 3),
      contribution: Number(form.get('contribution') ?? 2),
      connection: Number(form.get('connection') ?? 2),
      congruence: Number(form.get('congruence') ?? 2),
      energySource: String(form.get('energySource') ?? ''),
      energyDrain: String(form.get('energyDrain') ?? ''),
      identityEvidence: String(form.get('identityEvidence') ?? ''),
      notes: String(form.get('notes') ?? ''),
    };
    setState((current) => ({ ...current, checkIns: [checkIn, ...current.checkIns] }));
    setNotice('Observation recorded. A hard day can still be aligned.');
    event.currentTarget.reset();
  }

  function exportData(): void {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hawthorne-effect-data.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetData(): void {
    if (!window.confirm('Clear local entries and restore the demo workspace?')) return;
    clearState();
    setState(seedState);
    setNotice('Demo workspace restored.');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <span className="brand-mark">H</span>
            <div>
              <strong>Hawthorne Effect</strong>
              <span>Personal operating system</span>
            </div>
          </div>
          <nav className="primary-nav" aria-label="Primary navigation">
            {tabs.map((tab) => (
              <button
                className={`nav-item ${currentTab === tab ? 'active' : ''}`}
                key={tab}
                onClick={() => setTab(tab)}
                type="button"
              >
                <span className="nav-dot" />
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <span className="status-dot" />
          <div>
            <strong>Private local workspace</strong>
            <span>Saved in this browser</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="date-label">{todayLabel()}</p>
            <h1>{currentTab === 'Today' ? `Good morning, ${state.profile.name}.` : currentTab}</h1>
            <p className="page-intro">
              A calm place to decide what matters this season, then notice the evidence.
            </p>
          </div>
          <button className="log-button" onClick={() => setTab('Check-in')} type="button">
            + Daily check-in
          </button>
        </header>

        {notice && <p className="notice" role="status">{notice}</p>}
        {currentTab === 'Today' && (
          <Today
            state={state}
            latestCheckIn={latestCheckIn}
            onCheckIn={() => setTab('Check-in')}
            onIdentity={() => setTab('Identity')}
          />
        )}
        {currentTab === 'Identity' && (
          <Identity state={state} onChange={updateProfile} onProgress={() => setTab('Progress')} />
        )}
        {currentTab === 'Commitments' && (
          <Commitments commitments={state.commitments} onModeChange={updateMode} />
        )}
        {currentTab === 'Check-in' && <CheckIn onSubmit={submitCheckIn} latest={latestCheckIn} />}
        {currentTab === 'Progress' && <Progress chartSeries={chartSeries} />}
        {currentTab === 'Settings' && <Settings onExport={exportData} onReset={resetData} />}
      </main>
    </div>
  );
}

function Panel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading"><h2>{title}</h2><span className="panel-rule" /></div>
      {children}
    </section>
  );
}

function Today({ state, latestCheckIn, onCheckIn, onIdentity }: { state: LocalAppState; latestCheckIn?: DailyCheckIn; onCheckIn: () => void; onIdentity: () => void }) {
  const advance = state.commitments.find((item) => item.mode === 'advance');
  const support = state.commitments.filter((item) => item.mode === 'maintain');
  const minimum = state.commitments.filter((item) => item.mode === 'minimum_effective_dose');
  return (
    <div className="dashboard-grid">
      <Panel title="Who I am practicing becoming" className="identity-panel">
        <button className="identity-quote" onClick={onIdentity} type="button">
          “{state.profile.identityStatement}”
        </button>
        <p className="muted">{state.profile.twelveMonthTheme}</p>
        <div className="season-strip"><span>Current season</span><strong>Build with steadiness</strong><em>86 days left</em></div>
      </Panel>
      <Panel title="Today’s next expression" className="next-action-panel">
        <span className="mode-pill mode-advance">Advance</span>
        <h3>{advance?.nextAction}</h3>
        <p className="muted">{advance?.enoughThisSeason}</p>
        <button className="button-primary" onClick={onCheckIn} type="button">Record today’s evidence</button>
      </Panel>
      <Panel title="Support without optimizing" className="commitment-panel">
        {support.map((item) => <CommitmentRow item={item} key={item.id} />)}
      </Panel>
      <Panel title="Minimum effective dose" className="commitment-panel">
        {minimum.map((item) => <CommitmentRow item={item} key={item.id} />)}
      </Panel>
      <Panel title="Evidence so far" className="evidence-panel">
        <div className="evidence-stat"><strong>{state.checkIns.length}</strong><span>honest observations recorded</span></div>
        <p className="reflection-copy">{latestCheckIn?.identityEvidence || 'Your ordinary actions become visible here after a check-in.'}</p>
      </Panel>
      <Panel title="A useful reminder" className="insight-panel">
        <p className="insight-kicker">Why this helps</p>
        <h3>Specific if-then plans reduce friction.</h3>
        <p className="muted">Write the first action with a time, place, and trigger. This supports follow-through without pretending fatigue or competing demands disappear.</p>
      </Panel>
    </div>
  );
}

function CommitmentRow({ item }: { item: Commitment }) {
  return <div className="commitment-row"><div><strong>{item.title}</strong><span>{item.weeklyMinimum}</span></div><small>{modeLabels[item.mode]}</small></div>;
}

function Identity({ state, onChange, onProgress }: { state: LocalAppState; onChange: (field: 'identityStatement' | 'twelveMonthTheme', value: string) => void; onProgress: () => void }) {
  return <div className="single-column">
    <Panel title="Identity before intensity">
      <div className="form-stack">
        <label>Identity statement<textarea value={state.profile.identityStatement} onChange={(event) => onChange('identityStatement', event.target.value)} /></label>
        <label>12-month theme<textarea value={state.profile.twelveMonthTheme} onChange={(event) => onChange('twelveMonthTheme', event.target.value)} /></label>
      </div>
      <div className="values-list">{['Capability', 'Service', 'Readiness', 'Connection', 'Integrity', 'Curiosity', 'Recovery'].map((value) => <span key={value}>{value}</span>)}</div>
    </Panel>
    <Panel title="Evidence I am becoming this person">
      <p className="muted">Identity follows repeated evidence, not perfect motivation. Capture what mattered, especially when no one was watching.</p>
      <button className="button-secondary" onClick={onProgress} type="button">View the longer pattern →</button>
    </Panel>
  </div>;
}

function Commitments({ commitments, onModeChange }: { commitments: Commitment[]; onModeChange: (id: string, mode: CommitmentMode) => void }) {
  return <div className="commitment-board">{(['advance', 'maintain', 'minimum_effective_dose'] as CommitmentMode[]).map((mode) => <section className="board-column" key={mode}><div className="column-heading"><h2>{modeLabels[mode]}</h2><span>{commitments.filter((item) => item.mode === mode).length}</span></div>{commitments.filter((item) => item.mode === mode).map((item) => <article className="commitment-card" key={item.id}><div className="card-title"><h3>{item.title}</h3><span className="category-label">{sampleIdentityData.categories[item.category].label}</span></div><p>{item.roleInLife}</p><strong>Enough this season</strong><p>{item.enoughThisSeason}</p><label>Mode<select value={item.mode} onChange={(event) => onModeChange(item.id, event.target.value as CommitmentMode)}>{Object.entries(modeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><div className="next-action"><span>Next action</span><strong>{item.nextAction}</strong></div></article>)}</section>)}</div>;
}

function CheckIn({ onSubmit, latest }: { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; latest?: DailyCheckIn }) {
  return <div className="single-column"><Panel title="Observe the day before judging it"><form className="checkin-form" onSubmit={onSubmit}><div className="range-grid"><label>Energy <input defaultValue="3" max="5" min="1" name="energy" type="range" /></label><label>Recovery <input defaultValue="3" max="5" min="1" name="recovery" type="range" /></label><label>Contribution <select defaultValue="2" name="contribution"><option value="1">No</option><option value="2">Somewhat</option><option value="3">Yes</option></select></label><label>Connection <select defaultValue="2" name="connection"><option value="1">No</option><option value="2">Somewhat</option><option value="3">Yes</option></select></label><label>Congruence <select defaultValue="2" name="congruence"><option value="1">No</option><option value="2">Somewhat</option><option value="3">Yes</option></select></label></div><label>What gave you energy today?<textarea name="energySource" /></label><label>What drained you today?<textarea name="energyDrain" /></label><label>What did you do because it mattered—not because it protected an image?<textarea name="identityEvidence" required /></label><label>Optional note<textarea name="notes" /></label><button className="button-primary" type="submit">Save observation</button></form></Panel>{latest && <Panel title="Last observation"><p className="reflection-copy">{latest.identityEvidence}</p></Panel>}</div>;
}

function Progress({ chartSeries }: { chartSeries: ReturnType<typeof identityToRadarSeries> }) {
  return <div className="dashboard-grid"><Panel title="Skill shape" className="progress-chart-panel"><p className="muted">Descriptive signals across your life areas, not a score of human worth.</p><RadarChart series={chartSeries} /></Panel><Panel title="Time invested"><div className="metric-highlight"><strong>65.5</strong><span>hours across life areas this month</span></div><ul className="plain-list">{Object.entries(sampleIdentityData.snapshots[0].metrics.hoursInvested).slice(0, 5).map(([key, value]) => <li key={key}><span>{sampleIdentityData.categories[key as keyof typeof sampleIdentityData.categories].label}</span><strong>{value}h</strong></li>)}</ul></Panel><Panel title="Strava placeholder"><div className="placeholder"><strong>Manual activity log</strong><p>Integration is intentionally deferred. {sampleStravaEntries.length} seeded activities are shown as a quiet placeholder for later import.</p></div></Panel></div>;
}

function Settings({ onExport, onReset }: { onExport: () => void; onReset: () => void }) {
  return <div className="single-column"><Panel title="Local workspace"><p className="muted">Your entries are stored in this browser for this MVP. Nothing is sent to a backend.</p><div className="settings-actions"><button className="button-secondary" onClick={onExport} type="button">Export all data as JSON</button><button className="button-danger" onClick={onReset} type="button">Clear local data</button></div></Panel></div>;
}

export default App;

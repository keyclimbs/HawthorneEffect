import type { LocalAppState } from '../types';

const STORAGE_KEY = 'hawthorne-effect-state';

export function loadState(seed: LocalAppState): LocalAppState {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return seed;
    const parsed: Partial<LocalAppState> = JSON.parse(saved);
    return {
      ...seed,
      ...parsed,
      profile: { ...seed.profile, ...parsed.profile },
      commitments: parsed.commitments ?? seed.commitments,
      checkIns: parsed.checkIns ?? seed.checkIns,
    };
  } catch {
    return seed;
  }
}

export function saveState(state: LocalAppState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

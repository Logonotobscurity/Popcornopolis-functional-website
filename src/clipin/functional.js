import { useEffect, useState } from 'react';

export const CLIPIN_STORAGE_KEYS = {
  session: 'clipin.session',
  history: 'clipin.history',
  scheduled: 'clipin.scheduled',
};

export function useRouteLoading(locationKey, delay = 300) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    const timer = window.setTimeout(() => setLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [locationKey, delay]);

  return loading;
}

export function readStoredJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

export function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => readStoredJson(key, initialValue));

  useEffect(() => {
    writeStoredJson(key, value);
  }, [key, value]);

  return [value, setValue];
}

export function createHistoryItem({ title, action, iconType = 'default' }) {
  return {
    id: crypto.randomUUID(),
    title,
    date: new Date().toISOString(),
    action,
    iconType,
  };
}

export function createScheduledItem({ clipId, platform, scheduledFor }) {
  return {
    id: crypto.randomUUID(),
    clipId,
    platform,
    scheduledFor,
    status: 'pending',
  };
}

export function transitionClass(isVisible) {
  return isVisible ? 'clipin-transition-visible' : 'clipin-transition-hidden';
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "space-explorer-progress-v1";

const EMPTY_PROGRESS = {
  version: 1,
  discoveries: [],
  missions: [],
  experiments: [],
  nova: [],
};

const TARGETS = {
  discoveries: 8,
  missions: 20,
  experiments: 5,
  nova: 10,
};

const ProgressContext = createContext(null);

function sanitizeProgress(value) {
  if (!value || typeof value !== "object") return EMPTY_PROGRESS;

  return {
    version: 1,
    discoveries: Array.isArray(value.discoveries) ? [...new Set(value.discoveries.filter(Boolean))] : [],
    missions: Array.isArray(value.missions) ? [...new Set(value.missions.filter(Boolean))] : [],
    experiments: Array.isArray(value.experiments) ? [...new Set(value.experiments.filter(Boolean))] : [],
    nova: Array.isArray(value.nova) ? [...new Set(value.nova.filter(Boolean))] : [],
  };
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(sanitizeProgress(JSON.parse(stored)));
    } catch {
      // El progreso empieza vacío si localStorage no está disponible o contiene datos inválidos.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Space Explorer sigue funcionando aunque el navegador no permita persistencia local.
    }
  }, [progress, ready]);

  const recordProgress = useCallback((type, id) => {
    if (!Object.prototype.hasOwnProperty.call(TARGETS, type) || !id) return;
    const safeId = String(id);

    setProgress((current) => {
      if (current[type].includes(safeId)) return current;
      return { ...current, [type]: [...current[type], safeId] };
    });
  }, []);

  const stats = useMemo(() => {
    const counts = {
      discoveries: progress.discoveries.length,
      missions: progress.missions.length,
      experiments: progress.experiments.length,
      nova: progress.nova.length,
    };

    const completed = Object.keys(TARGETS).reduce(
      (sum, key) => sum + Math.min(counts[key], TARGETS[key]),
      0
    );
    const total = Object.values(TARGETS).reduce((sum, value) => sum + value, 0);

    return {
      ...counts,
      percent: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [progress]);

  const value = useMemo(
    () => ({ progress, stats, ready, recordProgress, targets: TARGETS }),
    [progress, stats, ready, recordProgress]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}

// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) || '') ?? initialValue; } catch { return initialValue; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(stored)); }, [key, stored]);
  return [stored, setStored] as const;
}
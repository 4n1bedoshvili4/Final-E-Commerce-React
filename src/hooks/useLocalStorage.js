import { useEffect, useState } from "react";

/**
 * Persist a piece of state into localStorage.
 * Safe on first render even if storage is unavailable.
 */
export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (private mode, full storage, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}

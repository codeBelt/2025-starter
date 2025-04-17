import {useCallback, useEffect, useState} from 'react';
import {colorSchemeThemeId} from '@/hooks/useColorScheme/useColorScheme.constants';
import type {ColorSchemeTheme} from '@/hooks/useColorScheme/useColorScheme.types';
import {getInitialColorScheme} from '@/hooks/useColorScheme/useColorScheme.utils';

/**
 * Custom hook that manages the color scheme (light/dark) based on the user's preferences
 * and browser/system settings.
 *
 * This hook checks the following in order:
 * 1. If a theme is stored in `localStorage`, it uses that.
 * 2. If no theme is stored, it defaults to the system's `prefers-color-scheme`.
 * 3. It listens for changes in the system's color scheme preference and updates accordingly.
 *
 * It ensures that the theme is not applied during server-side rendering to avoid hydration issues in Next.js.
 *
 * @returns The hook returns an object with the following properties:
 * - `scheme` (string): The current color scheme. Can be either 'light' or 'dark'.
 * - `toggle` (function): Function to toggle between light and dark mode.
 * - `setDark` (function): Function to force dark mode.
 * - `setLight` (function): Function to force light mode.
 * - `respectSystem` (function): Function to reset the theme to respect the system's preference.
 */
export const useColorScheme = () => {
  const [scheme, setScheme] = useState<ColorSchemeTheme>(getInitialColorScheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', scheme === 'dark');

    if (scheme === 'dark' || scheme === 'light') {
      localStorage.theme = scheme;
    } else {
      localStorage.removeItem(colorSchemeThemeId);
    }
  }, [scheme]);

  const toggle = useCallback(() => setScheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);
  const setDark = useCallback(() => setScheme('dark'), []);
  const setLight = useCallback(() => setScheme('light'), []);

  const respectSystem = useCallback(() => {
    localStorage.removeItem(colorSchemeThemeId);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setScheme(prefersDark ? 'dark' : 'light');
  }, []);

  return {
    scheme,
    toggle,
    setDark,
    setLight,
    respectSystem,
  };
};

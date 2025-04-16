import type {ColorSchemeTheme} from '@/hooks/useColorScheme/useColorScheme.types';

export const getInitialColorScheme = (): ColorSchemeTheme => {
  if (typeof window === 'undefined') return 'light';

  if (localStorage.theme === 'dark') return 'dark';
  if (localStorage.theme === 'light') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

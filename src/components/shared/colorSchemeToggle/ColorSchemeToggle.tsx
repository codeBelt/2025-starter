'use client';
import {useIsClient} from '@uidotdev/usehooks';
import {useColorScheme} from '@/hooks/useColorScheme/useColorScheme';

export const ColorSchemeToggle = () => {
  const isClient = useIsClient();
  const {scheme, toggle, setDark, setLight, respectSystem} = useColorScheme();

  return (
    <div className="mx-auto max-w-md space-y-4 rounded bg-white p-6 text-gray-800 shadow dark:bg-gray-900 dark:text-white">
      <p className="font-semibold text-lg">
        Current Scheme: {isClient ? <span className="capitalize">{scheme}</span> : null}
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={toggle}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          type={'button'}
        >
          Toggle Scheme
        </button>
        <button
          onClick={setDark}
          className="rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-900"
          type={'button'}
        >
          Force Dark
        </button>
        <button
          onClick={setLight}
          className="rounded bg-yellow-400 px-4 py-2 text-black transition hover:bg-yellow-500"
          type={'button'}
        >
          Force Light
        </button>
        <button
          onClick={respectSystem}
          className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          type={'button'}
        >
          Use System Preference
        </button>
      </div>
    </div>
  );
};

import {Inter, JetBrains_Mono} from 'next/font/google';

/**
 * Next.js: https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts
 * Tailwind v4: https://nextjs.org/docs/app/building-your-application/optimizing/fonts#tailwind-css-v4
 *              https://tailwindcss.com/docs/theme
 */

export const interFont = Inter({
  subsets: ['latin'],
  weight: [
    // '300', // font-light
    '400', // font-normal
    '500', // font-medium
    '600', // font-semibold
    '700', // font-bold
    // '800', // font-extrabold
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const jetBrainsMonoFont = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  subsets: ['latin'],
});

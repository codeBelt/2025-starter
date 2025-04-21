import '@/styles/globals.css';

import type {LayoutRouteProps} from '@/lib/nextjs/nextjs.types';
import {interFont, jetBrainsMonoFont} from '@/styles/fonts';

export async function generateMetadata() {
  return {
    title: {
      template: '%s | My Company',
      default: 'This is my default title!',
      // absolute: '...', // Do not include in this file
    },
    description: 'This is my default description',
  };
}

export default function RootLayout({children}: LayoutRouteProps) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${interFont.className} ${jetBrainsMonoFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

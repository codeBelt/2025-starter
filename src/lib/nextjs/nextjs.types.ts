import type {ReactNode} from 'react';

export interface LayoutRouteProps {
  children: ReactNode;
}

export interface PageRouteProps<P = undefined, S = Record<string, string | string[] | undefined>> {
  params: P;
  searchParams: S;
}

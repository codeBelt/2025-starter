import type {ChartConfig} from '@/components/ui/shadcn/chart';

export const tableCellViewerChartData = [
  {month: 'January', desktop: 186, mobile: 80},
  {month: 'February', desktop: 305, mobile: 200},
  {month: 'March', desktop: 237, mobile: 120},
  {month: 'April', desktop: 73, mobile: 190},
  {month: 'May', desktop: 209, mobile: 130},
  {month: 'June', desktop: 214, mobile: 140},
];

export const tableCellViewerChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

import {chartData} from '@/components/pages/homePage/HomePage.constants';
import {ChartAreaInteractive} from '@/components/pages/homePage/chartAreaInteractive/ChartAreaInteractive';
import {DataTable} from '@/components/pages/homePage/dataTable/DataTable';
import {SectionCards} from '@/components/pages/homePage/sectionCards/SectionCards';
import {AppSidebar} from '@/components/shared/appSidebar/AppSidebar';
import {SiteHeader} from '@/components/shared/siteHeader/SiteHeader';
import {SidebarInset, SidebarProvider} from '@/components/ui/shadcn/sidebar';
import type {CSSProperties} from 'react';

export function HomePage() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={chartData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

'use client';
import {sidebarData} from '@/components/appSidebar/AppSidebar.constants';
import {NavDocuments} from '@/components/appSidebar/navDocuments/NavDocuments';
import {NavMain} from '@/components/appSidebar/navMain/NavMain';
import {NavSecondary} from '@/components/appSidebar/navSecondary/NavSecondary';
import {NavUser} from '@/components/appSidebar/navUser/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/shadcn/sidebar';
import {IconInnerShadowTop} from '@tabler/icons-react';
import type {ComponentProps} from 'react';

type Props = ComponentProps<typeof Sidebar> & {};

export function AppSidebar({...sideProps}: Props) {
  return (
    <Sidebar collapsible="offcanvas" {...sideProps}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="http://google.com">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavDocuments items={sidebarData.documents} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

'use client';
import {sidebarData} from '@/components/shared/appSidebar/AppSidebar.constants';
import {NavDocuments} from '@/components/shared/appSidebar/navDocuments/NavDocuments';
import {NavMain} from '@/components/shared/appSidebar/navMain/NavMain';
import {NavSecondary} from '@/components/shared/appSidebar/navSecondary/NavSecondary';
import {NavUser} from '@/components/shared/appSidebar/navUser/NavUser';
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
import Link from 'next/link';
import type {ComponentProps} from 'react';

interface Props extends ComponentProps<typeof Sidebar> {}

export function AppSidebar({...sideProps}: Props) {
  return (
    <Sidebar collapsible="offcanvas" {...sideProps}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
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

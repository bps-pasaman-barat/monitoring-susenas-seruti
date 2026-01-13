"use client";

import * as React from "react";
import {
  IconBrandGoogleAnalytics,
  IconDashboard,
  IconFolder,
  IconSettings,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "BUMN dan SWASTA",
      url: "/admin-bumn-swasta",
      icon: IconFolder,
    },

    {
      title: "KECAMATAN",
      url: "/admin-kecamatan",
      icon: IconFolder,
    },
    {
      title: "NAGARI",
      url: "/admin-nagari",
      icon: IconFolder,
    },
    {
      title: "OPD",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "VERTIKAL",
      url: "#",
      icon: IconFolder,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconBrandGoogleAnalytics className="!size-5" />
                <span className="text-base font-semibold">DDA</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

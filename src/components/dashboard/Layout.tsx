"use client";

import type * as React from "react";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { Sidebar } from "@/components/dashboard/Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />

      <div className="flex-1 p-6">
        <header className="flex items-center justify-end mb-6">
          <ProfileDropdown />
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;

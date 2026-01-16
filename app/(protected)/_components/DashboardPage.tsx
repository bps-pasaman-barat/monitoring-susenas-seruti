"use client";

import useSWR from "swr";
import MonitoringCard from "./MonitoringCard";
import { fetcher } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { SettingsMenu } from "@/components/SettingsMenu";

export default function DashboardPage() {
  const interval = 5000;
  const { data, error, isLoading } = useSWR("/api/backend", fetcher, {
    refreshInterval: interval,
  });
  console.log(data)
  if (isLoading) return <DashboardLoading />;
  if (error) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SettingsMenu />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MonitoringCard
          label="Seruti"
          className1="bg-green-400"
          className2="bg-red-200"
          totalEntri={data.data.seruti.totalEntriSeruti}
          totalMasuk={data.data.seruti.totalMasukSeruti}
        />

        <MonitoringCard
          className1="bg-green-400"
          className2="bg-red-200"
          label="Susenas"
          totalEntri={data.data.susenas.totalEntriSusenas}
          totalMasuk={data.data.susenas.totalMasukSusenas}
        />
      </div>
    </div>
  );
}
function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Memuat data dashboard…</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-48 rounded-2xl border bg-muted/40 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import useSWR from "swr";
import MonitoringCard from "./MonitoringCard";
import { fetcher } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { SettingsMenu } from "@/components/SettingsMenu";
type KecamatanData = Record<string, number>;
export type DashboardData = {
  totalSusenasMasuk: KecamatanData;
  totalSusenasEntri: KecamatanData;
  totalSerutiMasuk: KecamatanData;
  totalSerutiEntri: KecamatanData;
};
export type DashboardApiResponse = {
  data: DashboardData;
};
export default function DashboardPage() {
  const interval = 5000;
  const { data, error, isLoading } = useSWR<DashboardApiResponse>(
    "/api/backend",
    fetcher,
    {
      refreshInterval: interval,
    },
  );

  if (isLoading) return <DashboardLoading />;
  if (error) return null;
  console.log(data);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SettingsMenu />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data && (
          <>
            <MonitoringCard
              label="Seruti"
              className1="bg-green-200"
              className2="bg-red-100"
              totalEntri={data.data.totalSerutiEntri}
              totalMasuk={data.data.totalSerutiMasuk}
            />

            <MonitoringCard
              label="Susenas"
              className1="bg-green-200"
              className2="bg-red-100"
              totalEntri={data.data.totalSusenasEntri}
              totalMasuk={data.data.totalSusenasMasuk}
            />
          </>
        )}
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

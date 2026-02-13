"use client";

import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { SettingsMenu } from "@/components/SettingsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/lib/utils";
import MonitoringCard from "./MonitoringCard";
import { useSession } from "@/hooks/useSession";

type KecamatanData = Record<string, number>;
export type DashboardData = {
  totalSusenasMasuk: KecamatanData;
  totalSusenasEntri: KecamatanData;
  totalSerutiMasuk: KecamatanData;
  totalSerutiEntri: KecamatanData;
};
export type DataUploaded = {
  uploadSerutiEntri: number;
  uploadSerutiMasuk: number;
  uploadSusenasEntri: number;
  uploadSusenasMasuk: number;
};
export type DashboardApiResponse = {
  data: DashboardData;
  uploaded: DataUploaded;
};
export default function DashboardPage() {
  const session = useSession();
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
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {session ? (
          <SettingsMenu role={session?.role} />
        ) : (
          <>
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </>
        )}
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
      <h1 className="text-xl text-center font-bold">
        FILE EXCEL TOTAL YANG DI UPLOAD
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Seruti Entri</CardTitle>
          </CardHeader>
          <CardContent>{data?.uploaded.uploadSerutiEntri}</CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Seruti Pemasukan</CardTitle>
          </CardHeader>
          <CardContent>{data?.uploaded.uploadSerutiMasuk}</CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Susenas Entri</CardTitle>
          </CardHeader>
          <CardContent>{data?.uploaded.uploadSusenasEntri}</CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Susenas Pemasukan</CardTitle>
          </CardHeader>
          <CardContent>{data?.uploaded.uploadSusenasMasuk}</CardContent>
        </Card>
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

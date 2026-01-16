"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardPage from "@/app/(protected)/_components/DashboardPage";
import SesunasPage from "@/app/(protected)/_components/susenasPage";
import SerutiPage from "@/app/(protected)/_components/SerutiPage";

export default function MainTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("hal") ?? "dashboard";

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("hal", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      {/* TAB BUTTON */}
      <TabsList className="mx-auto  grid w-fit grid-cols-3 gap-4 bg-transparent mb-4">
        <TabsTrigger
          value="dashboard"
          className="rounded-md bg-blue-200 px-6 py-2 text-white data-[state=active]:bg-blue-700"
        >
          DASHBOARD
        </TabsTrigger>
        <TabsTrigger
          value="susenas"
          className="rounded-md bg-blue-200 px-6 py-2 text-white data-[state=active]:bg-blue-700"
        >
          INPUT DATA SUSENAS
        </TabsTrigger>
        <TabsTrigger
          value="seruti"
          className="rounded-md bg-blue-200 px-6 py-2 text-white data-[state=active]:bg-blue-700"
        >
          INPUT DATA SERUTI
        </TabsTrigger>
      </TabsList>

      {/* CONTENT */}
      <TabsContent value="dashboard">
        <DashboardPage />
      </TabsContent>
      <TabsContent value="susenas">
        <SesunasPage />
      </TabsContent>
      <TabsContent value="seruti">
        <SerutiPage />
      </TabsContent>
    </Tabs>
  );
}

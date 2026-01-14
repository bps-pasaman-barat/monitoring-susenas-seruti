"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SerutiPage from "../_components/SerutiPage";
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("hal") ?? "dashboard";

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("hal", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="min-h-screen bg-white p-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        {/* TAB BUTTON */}
        <TabsList className="mx-auto mb-6 grid w-fit grid-cols-3 gap-4 bg-transparent">
          <TabsTrigger
            value="dashboard"
            className="rounded bg-blue-400 px-6 py-2 text-white data-[state=active]:bg-blue-700"
          >
            DASHBOARD
          </TabsTrigger>
          <TabsTrigger
            value="susenas"
            className="rounded bg-blue-400 px-6 py-2 text-white data-[state=active]:bg-blue-700"
          >
            INPUT DATA SUSENAS
          </TabsTrigger>
          <TabsTrigger
            value="seruti"
            className="rounded bg-blue-400 px-6 py-2 text-white data-[state=active]:bg-blue-700"
          >
            INPUT DATA SERUTI
          </TabsTrigger>
        </TabsList>

        {/* CONTENT */}
        <TabsContent value="dashboard">
          {/* <DashboardCard /> */}isi
        </TabsContent>

        <TabsContent value="susenas">{/* <DashboardCard /> */}isi</TabsContent>

        <TabsContent value="seruti">
          <SerutiPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}

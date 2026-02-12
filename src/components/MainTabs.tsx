"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardPage from "@/app/(protected)/_components/DashboardPage";
import SerutiPage from "@/app/(protected)/_components/SerutiPage";
import SesunasPage from "@/app/(protected)/_components/susenasPage";
import UploadTemplatePage from "@/app/(protected)/_components/UploadTemplate";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MainTabs({ role }: { role: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("hal") ?? "dashboard";
  const tabVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("hal", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      {/* TAB BUTTON */}
      <TabsList className="mx-auto py-0 grid w-fit grid-cols-4 gap-4 bg-transparent shadow-md  mb-4">
        <TabsTrigger
          value="dashboard"
          className="
          
      rounded-none
      px-0
      text-gray-500
      border-b-2
      border-transparent
    data-[state=active]:bg-blue-100
      data-[state=active]:text-blue-700
      data-[state=active]:border-blue-700
    "
        >
          DASHBOARD
        </TabsTrigger>
        <TabsTrigger
          value="susenas"
          className="
      rounded-none
      px-4 py-1
      text-gray-500
      border-b-2 border-transparent
      data-[state=active]:text-green-700
      data-[state=active]:bg-green-100
      data-[state=active]:border-green-700
    "
        >
          INPUT DATA SUSENAS
        </TabsTrigger>
        <TabsTrigger
          value="seruti"
          className="
      rounded-none
      px-4 py-1
      text-gray-500
      border-b-2 border-transparent
         data-[state=active]:bg-blue-100
      data-[state=active]:text-blue-700
      data-[state=active]:border-blue-700
    "
        >
          INPUT DATA SERUTI
        </TabsTrigger>
        <TabsTrigger
          value="upload"
          className="
      rounded-none
      px-4 py-1
      text-gray-500
      border-b-2 border-transparent
         data-[state=active]:bg-blue-100
      data-[state=active]:text-blue-700
      data-[state=active]:border-blue-700
    "
        >
          UPLOAD TEMPLATE
        </TabsTrigger>
      </TabsList>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        {activeTab === "dashboard" && (
          <motion.div
            key="dashboard"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeIn" }}
          >
            <DashboardPage role={role} />
          </motion.div>
        )}

        {activeTab === "susenas" && (
          <motion.div
            key="susenas"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeIn" }}
          >
            <SesunasPage />
          </motion.div>
        )}

        {activeTab === "seruti" && (
          <motion.div
            key="seruti"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeIn" }}
          >
            <SerutiPage />
          </motion.div>
        )}
        {activeTab === "upload" && (
          <motion.div
            key="upload"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeIn" }}
          >
            <UploadTemplatePage />
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
}

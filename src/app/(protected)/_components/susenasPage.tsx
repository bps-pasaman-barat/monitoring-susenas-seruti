"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormSesunasEntri from "./FormSusenasEntri";
import FormSesunasMasuk from "./FormSusenasMasuk";

export default function SesunasPage() {
  const [activeTab, setActiveTab] = useState("entri");
  const slideVariants = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
  };
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="flex w-full gap-6 justify-center">
        <TabsList className=" bg-white rounded-lg shadow-md">
          <TabsTrigger
            className="w-full justify-start px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-slate-50 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            value="entri"
          >
            Dokumen entri
          </TabsTrigger>
          <TabsTrigger
            className="w-full justify-start px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-slate-50 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            value="masuk"
          >
            Dokumen Masuk
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <AnimatePresence mode="wait">
            {activeTab === "entri" && (
              <motion.div
                key="entri"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <FormSesunasEntri />
              </motion.div>
            )}

            {activeTab === "masuk" && (
              <motion.div
                key="masuk"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <FormSesunasMasuk />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Tabs>
  );
}

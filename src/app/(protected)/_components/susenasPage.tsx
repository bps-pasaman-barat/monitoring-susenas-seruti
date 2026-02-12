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
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-row items-center "
    >
      <TabsList className="flex h-40 flex-col border bg-blue-300 ">
        <TabsTrigger className="w-full justify-start uppercase" value="entri">
          Dokumen entri
        </TabsTrigger>
        <TabsTrigger className="w-full justify-start uppercase" value="masuk">
          Dokumen Masuk
        </TabsTrigger>
      </TabsList>
      <div className="relative flex-1 overflow-hidden ">
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
    </Tabs>
  );
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FormSerutiEntri from "./FormSerutiEntri";
import FormSerutiMasuk from "./FormSerutiMasuk";
export default function Page() {
  return (
    <>
      <Tabs
        className="flex w-full flex-row gap-6 items-center"
        defaultValue="entri"
      >
        <TabsList className="flex h-40 flex-col">
          <TabsTrigger className="w-full justify-start uppercase" value="entri">
            Dokumen entri
          </TabsTrigger>
          <TabsTrigger className="w-full justify-start uppercase" value="masuk">
            Dokumen Masuk
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 ">
          <TabsContent value="entri" className="w-3xl mx-auto">
            <FormSerutiEntri />
          </TabsContent>
          <TabsContent value="masuk" className="w-3xl mx-auto">
            <FormSerutiMasuk />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}

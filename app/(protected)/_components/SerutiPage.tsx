import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FormSerutiEntri from "./FormSerutiEntri";
import FormSerutiMasuk from "./FormSerutiMasuk";
export default function SerutiPage() {
  return (
    <>
      <Tabs className="flex w-full flex-row items-center" defaultValue="entri">
        <TabsList className="flex h-40 flex-col bg-blue-300">
          <TabsTrigger className="w-full justify-start uppercase" value="entri">
            Dokumen entri
          </TabsTrigger>
          <TabsTrigger className="w-full justify-start uppercase" value="masuk">
            Dokumen Masuk
          </TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="entri" className=" mx-auto">
            <FormSerutiEntri />
          </TabsContent>
          <TabsContent value="masuk" className=" mx-auto">
            <FormSerutiMasuk />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}

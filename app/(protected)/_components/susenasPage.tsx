import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FormSesunasEntri from "./FormSusenasEntri";
import FormSesunasMasuk from "./FormSusenasMasuk";

export default function Page() {
  return (
    <>
      <Tabs className="flex w-full flex-row items-center" defaultValue="entri">
        <TabsList className="flex h-40 flex-col">
          <TabsTrigger className="w-full justify-start uppercase" value="entri">
            Dokumen entri
          </TabsTrigger>
          <TabsTrigger className="w-full justify-start uppercase" value="masuk">
            Dokumen Masuk
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 ">
          <TabsContent value="entri" className="mx-auto">
            <FormSesunasEntri />
          </TabsContent>
          <TabsContent value="masuk" className="mx-auto">
            <FormSesunasMasuk />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}

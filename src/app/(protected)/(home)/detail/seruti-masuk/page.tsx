import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "seruti entri Kecamatan",
};

import { FolderOpen } from "lucide-react";
import Link from "next/link";
import ButtonBack from "@/components/boilerplate/ButtonBack";
import { ChartDialog } from "@/components/ChartDialog";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { kecamatan } from "../../../../../../constants";

export default async function Page() {
  return (
    <div className="p-6">
      <ButtonBack linkUrl="/" />
      <h1 className="text-2xl font-bold mb-4">
        Monitoring tiap Kecamatan Seruti Dokumen masuk
      </h1>
      <ScrollArea className="h-150">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kecamatan.map((kec) => (
            <Card key={kec.key} className=" gap-4 p-4 ">
              <div className=" hover:bg-gray-100 cursor-pointer transition w-10">
                <ChartDialog
                  tipe="seruti-masuk"
                  kecamatan={kec.label.toLocaleLowerCase()}
                  title={kec.label}
                />
              </div>
              <div className="flex flex-col w-32 mx-auto hover:bg-gray-100 cursor-pointer transition justify-center items-center">
                <Link
                  target="_blank"
                  href={`/detail/seruti-masuk/${kec.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                  <span className="font-medium">{kec.label}</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

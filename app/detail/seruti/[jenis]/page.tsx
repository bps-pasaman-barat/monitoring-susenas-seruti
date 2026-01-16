import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seruti per Kecamatan",
};

import { FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { kecamatan } from "@/constants";
import ButtonBack from "@/components/boilerplate/ButtonBack";

export default async function Page({
  params,
}: {
  params: Promise<{ jenis: string }>;
}) {
  const jenis = (await params).jenis;
  return (
    <>
      <div className="p-6">
        <ButtonBack linkUrl="/" />
        <h1 className="text-2xl font-bold mb-4">
          Monitoring tiap Kecamatan Data {jenis} seruti
        </h1>
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kecamatan.map((kec) => (
              <Card
                key={kec.key}
                className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer transition"
              >
                <FolderOpen className="w-6 h-6 text-blue-500" />
                <span className="font-medium">{kec.label}</span>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

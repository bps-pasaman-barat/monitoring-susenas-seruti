import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Susenas masuk Kecamatan",
};

import { FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { kecamatan } from "@/constants";
import ButtonBack from "@/components/boilerplate/ButtonBack";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="p-6">
        <ButtonBack linkUrl="/" />
        <h1 className="text-2xl font-bold mb-4">
          Monitoring tiap Kecamatan Seruti Dokumen masuk
        </h1>
        <ScrollArea className="h-150">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kecamatan.map((kec) => (
              <Link
                key={kec.key}
                target="_blank"
                href={`/detail/seruti-masuk/${kec.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer transition">
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                  <span className="font-medium">{kec.label}</span>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

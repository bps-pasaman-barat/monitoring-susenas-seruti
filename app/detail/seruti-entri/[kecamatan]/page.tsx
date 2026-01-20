import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seruti Entri",
};

import ButtonBack from "@/components/boilerplate/ButtonBack";
import TableSerutiEntri from "./_components/TableSerutiEntri";

export default async function Page({
  params,
}: {
  params: Promise<{ kecamatan: string }>;
}) {
  const kecamatan = (await params).kecamatan;

  return (
    <>
      <div className="p-6">
        <ButtonBack linkUrl="/detail/seruti-masuk" />
        <h1 className="text-2xl font-bold mb-4">
          Seruti Entri Kecamatan {kecamatan}
        </h1>
        <TableSerutiEntri kecamatan={kecamatan} />
      </div>
    </>
  );
}

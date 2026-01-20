import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Susenas entri",
};

import ButtonBack from "@/components/boilerplate/ButtonBack";
import TableSusenasEntri from "./_components/TableSusenasEntri";

export default async function Page({
  params,
}: {
  params: Promise<{ kecamatan: string }>;
}) {
  const kecamatan = (await params).kecamatan;

  return (
    <>
      <div className="p-6">
        <ButtonBack linkUrl="/detail/susenas-entri" />
        <h1 className="text-2xl font-bold mb-4">
          Susenas Entri Kecamatan {kecamatan}
        </h1>
        <TableSusenasEntri kecamatan={kecamatan} />
      </div>
    </>
  );
}

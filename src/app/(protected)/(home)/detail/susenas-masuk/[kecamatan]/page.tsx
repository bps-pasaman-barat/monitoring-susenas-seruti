import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Susenas masuk",
};

import ButtonBack from "@/components/boilerplate/ButtonBack";
import TableSusenasMasuk from "./_components/TableSusenasMasuk";

export default async function Page({
  params,
}: {
  params: Promise<{ kecamatan: string }>;
}) {
  const kecamatan = (await params).kecamatan;

  return (
    <div className="p-6">
      <ButtonBack linkUrl="/detail/susenas-masuk" />
      <h1 className="text-2xl font-bold mb-4">
        Susenas Masuk Kecamatan {kecamatan}
      </h1>
      <TableSusenasMasuk kecamatan={kecamatan} />
    </div>
  );
}

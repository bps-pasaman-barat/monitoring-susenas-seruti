import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Susenas per Kecamatan",
};

import ButtonBack from "@/components/boilerplate/ButtonBack";
import Table from "./_components/DataTable";

export default async function Page({
  params,
}: {
  params: Promise<{ kecamatan: string }>;
}) {
  const kecamatan = (await params).kecamatan;

  return (
    <>
      <div className="p-6">
        <ButtonBack linkUrl="/detail/susenas-masuk" />
        <h1 className="text-2xl font-bold mb-4">
          Seluruh Data Kecamatan {kecamatan}
        </h1>
        <Table kecamatan={kecamatan} />
      </div>
    </>
  );
}

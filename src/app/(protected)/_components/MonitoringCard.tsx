"use client";
import Link from "next/link";
import { ChartEntri } from "./ChartEntri";
import { ChartMasuk } from "./ChartMasuk";
import { kecamatan } from "@/constants";
import { Button } from "@/components/ui/button";

type Props = {
  totalEntri: Record<string, number>;
  totalMasuk: Record<string, number>;
  label: string;
  className1?: string;
  className2?: string;
};

export default function MonitoringCard({
  totalEntri,
  totalMasuk,
  label,
  className1 = "",
  className2 = "",
}: Props) {
  // konversi data agar semua kecamatan terisi, jika tidak ada maka 0
  const dataMasuk = kecamatan.map((k) => ({
    name: k.label,
    value: totalMasuk[k.label] ?? 0,
  }));

  const dataEntri = kecamatan.map((k) => ({
    name: k.label,
    value: totalEntri[k.label] ?? 0,
  }));

  const sumMasuk = dataMasuk.reduce((a, b) => a + b.value, 0);
  const sumEntri = dataEntri.reduce((a, b) => a + b.value, 0);

  return (
    <div
      className="space-y-6 rounded-2xl border p-6 bg-background
                 transition-all duration-300 ease-out
                 hover:shadow-md hover:-translate-y-1"
    >
      <h2 className="text-center text-xl font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div className={`rounded-xl border p-4 ${className2}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground capitalize">
              Total Data Masuk
            </p>
            <Button>
              <Link
                href={`detail/${label.toLocaleLowerCase()}-masuk`}
                className="text-white uppercase"
                target="_blank"
              >
                detail
              </Link>
            </Button>
          </div>
          <ChartMasuk totalMasuk={dataMasuk} />
          <p className="text-3xl font-bold">{sumMasuk}</p>
        </div>

        <div className={`rounded-xl border p-4 ${className1}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Data Entri</p>
            <Button>
              <Link
                href={`detail/${label.toLocaleLowerCase()}-entri`}
                className="text-white uppercase"
                target="_blank"
              >
                detail
              </Link>
            </Button>
          </div>
          <ChartEntri totalEntri={dataEntri} />
          <p className="text-3xl font-bold">{sumEntri}</p>
        </div>
      </div>
    </div>
  );
}

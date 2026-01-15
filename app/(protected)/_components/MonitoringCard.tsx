"use client";
import { ChartEntri } from "./ChartEntri";
import { ChartMasuk } from "./ChartMasuk";
type Props = {
  totalEntri: number;
  totalMasuk: number;
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
  return (
    <div
      className="space-y-6 rounded-2xl border p-6 bg-background
                 transition-all duration-300 ease-out
                 hover:shadow-md hover:-translate-y-1"
    >
      <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div className={`rounded-xl border p-4 ${className2}`}>
          <p className="text-xs text-muted-foreground">Total Data Masuk</p>
          <ChartMasuk totalMasuk={totalMasuk} />
          <p className="text-3xl font-bold">{totalMasuk}</p>
        </div>
        <div className={`rounded-xl border p-4 ${className1}`}>
          <p className="text-xs text-muted-foreground">Total Data Entri</p>
          <ChartEntri totalEntri={totalEntri} />
          <p className="text-3xl font-bold">{totalEntri}</p>
        </div>
      </div>
    </div>
  );
}

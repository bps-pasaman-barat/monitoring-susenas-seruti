"use client";
import { PieChart, Pie, Cell } from "recharts";

type ChartData = { name: string; value: number };

export function ChartMasuk({ totalMasuk }: { totalMasuk: ChartData[] }) {
  const limitLocalStorage = localStorage.getItem("maxMasuk");
  const limit = limitLocalStorage ? Number(limitLocalStorage) : 10000;
  const colors = [
    "#1f77b4", // biru tua
    "#ff7f0e", // oranye
    "#2ca02c", // hijau
    "#000000", // hitam
    "#9467bd", // ungu
    "#8c564b", // cokelat
    "#e377c2", // pink
    "#7f7f7f", // abu-abu
    "#bcbd22", // lime / kuning-hijau
    "#17becf", // cyan
  ];

  const total = totalMasuk.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="flex flex-col md:flex-row gap-4 z-20">
      <PieChart width={200} height={200}>
        <Pie
          data={totalMasuk}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          outerRadius={70}
          paddingAngle={2}
        >
          {totalMasuk.map((entry, i) => (
            <Cell key={entry.name} fill={colors[i % colors.length]} />
          ))}
        </Pie>
      </PieChart>

      <div className="flex flex-col gap-2 text-sm">
        {totalMasuk.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="font-medium">{d.name}</span>
            <span className="text-muted-foreground">({d.value})</span>
          </div>
        ))}

        <p className="text-xs text-muted-foreground mt-1">
          Total sekarang: {total} / {limit} (
          {((total / limit) * 100).toFixed(2)}%)
        </p>
      </div>
    </div>
  );
}

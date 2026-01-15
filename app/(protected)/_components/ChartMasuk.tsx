"use client";

import {  useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export function ChartMasuk({ totalMasuk }: { totalMasuk: number }) {
  const [limit, setLimit] = useState<number>(() => {
    const parsed = Number(localStorage.getItem("maxMasuk"));
    return Number.isNaN(parsed) ? 100 : parsed;
  });
  const used = Math.min(totalMasuk, limit);
  const remaining = Math.max(limit - totalMasuk, 0);

  const color = {
    merah: "#3b82f6",
    biru: "#ef4444",
  };
  const data = [
    { name: "Terpakai", value: used, color: color.merah },
    { name: "Sisa", value: remaining, color: color.biru },
  ];

  return (
    <div className="flex items-center gap-4 z-20">
      <PieChart width={160} height={160}>
        <Pie data={data} innerRadius={50} outerRadius={70} dataKey="value">
          {data.map((masuk, i) => (
            <Cell key={i} fill={masuk.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="space-y-2 text-sm">
        <LegendItem color={color.merah} label="Sudah masuk" value={used} />
        <LegendItem color={color.biru} label="Belum masuk" value={remaining} />
        <p className="text-xs text-muted-foreground">Batas: {limit}</p>
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground">({value})</span>
    </div>
  );
}

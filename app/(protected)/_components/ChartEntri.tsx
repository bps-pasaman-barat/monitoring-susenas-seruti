"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export function ChartEntri({ totalEntri }: { totalEntri: number }) {
  const [limit, setLimit] = useState<number>(100);

  useEffect(() => {
    const stored = localStorage.getItem("maxEntri");
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed)) {
        setLimit(parsed);
      }
    }
  }, []);

  const used = Math.min(totalEntri, limit);
  const remaining = Math.max(limit - totalEntri, 0);

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
      {/* Chart */}
      <PieChart width={160} height={160}>
        <Pie data={data} innerRadius={50} outerRadius={70} dataKey="value">
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="space-y-2 text-sm">
        <LegendItem color={color.merah} label="Sudah masuk" value={remaining} />
        <LegendItem color={color.biru} label="Belum masuk" value={used} />
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

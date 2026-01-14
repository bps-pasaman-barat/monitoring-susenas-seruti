"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export function ChartMasuk({ totalMasuk }: { totalMasuk: number }) {
  const [limit, setLimit] = useState<number>(1000); 

  useEffect(() => {
    const stored = localStorage.getItem("limitMasuk");
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed)) {
        setLimit(parsed);
      }
    }
  }, []);
  const used = Math.min(totalMasuk, limit);
  const remaining = Math.max(limit - totalMasuk, 0);

  const data = [
    { name: "Terpakai", value: used },
    { name: "Sisa", value: remaining },
  ];

  const COLORS = [
    "#ef4444", // merah (terpakai)
    "#3b82f6", // biru (sisa)
  ];

  return (
    <PieChart width={200} height={200}>
      <Pie data={data} innerRadius={60} outerRadius={80} dataKey="value">
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i]} />
        ))}
      </Pie>
    </PieChart>
  );
}

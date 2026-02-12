"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ChartPieIcon } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type ChartKecProps = {
  kecamatan: string;
  title: string;
  tipe: string;
};

type ChartApiResponse = {
  data: {
    kecamatan: string;
    totalInputManual: number;
    totalUploadExcel: number;
    found: boolean;
  };
};

const COLORS = ["#2563eb", "#e5e7eb"]; 

export function ChartDialog({ kecamatan, title, tipe }: ChartKecProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    [],
  );

  const MAX_FILE = 100;

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) return;

    setLoading(true);

    const resp = await fetch(`/api/detail/${tipe}/${kecamatan}`);
    const json: ChartApiResponse = await resp.json();

    if (json.data?.found) {
      const used = Math.min(json.data.totalInputManual, MAX_FILE);
      const remaining = Math.max(MAX_FILE - used, 0);

      setChartData([
        {
          name: "Data terinput",
          value: used,
        },
        {
          name: "Sisa kuota",
          value: remaining,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <ChartPieIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="h-64">
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading data…
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
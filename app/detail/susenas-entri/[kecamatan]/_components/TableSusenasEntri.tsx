"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
  Loader2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SusenasEntriResponse } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function TableSusenasEntri({
  kecamatan,
}: {
  kecamatan: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const orderBy = searchParams.get("orderBy") ?? "nks";
  const order = searchParams.get("order") ?? "asc";

  const [data, setData] = useState<SusenasEntriResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUrl = (
    newPage: number,
    newLimit = limit,
    newOrderBy = orderBy,
    newOrder = order,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());
    params.set("orderBy", newOrderBy);
    params.set("order", newOrder);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/backend/susenas-entri/${kecamatan}?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`,
        );

        if (!res.ok) throw new Error("Fetch gagal");
        const result: SusenasEntriResponse = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kecamatan, page, limit, orderBy, order]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-75 text-slate-600">
        <Loader2 className="w-10 h-10 animate-spin mb-3" />
        <p className="text-sm">Memuat data...</p>
      </div>
    );

  if (!data || data.data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-75 text-slate-500">
        <Inbox className="w-12 h-12 mb-3" />
        <p className="text-lg font-medium">Data tidak ditemukan</p>
        <p className="text-sm text-slate-400">
          Tidak ada data yang bisa ditampilkan
        </p>
      </div>
    );
  const toggleSort = (field: string) => {
    if (orderBy === field) {
      updateUrl(1, limit, field, order === "asc" ? "desc" : "asc");
    } else {
      updateUrl(1, limit, field, "asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Total data: {data.meta.total}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm">Limit:</span>
          <select
            value={limit}
            onChange={(e) => updateUrl(1, Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <Table className="border rounded-lg overflow-hidden">
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="text-slate-700 font-semibold">No</TableHead>
            <TableHead className="text-slate-700 font-semibold">
              Provinsi
            </TableHead>
            <TableHead className="text-slate-700 font-semibold">
              Kabupaten
            </TableHead>
            <TableHead className="text-slate-700 font-semibold">
              Kecamatan
            </TableHead>
            <TableHead className="text-slate-700 font-semibold">
              Nagari
            </TableHead>

            <TableHead className="text-slate-700 font-semibold">
              Kode SLS
            </TableHead>
            <TableHead className="text-slate-700 font-semibold">
              Kode Sub SLS
            </TableHead>
            <TableHead className="text-slate-700 font-semibold">
              No Ruta
            </TableHead>
            <TableHead
              onClick={() => toggleSort("nks")}
              className="text-blue-700 font-semibold cursor-pointer select-none"
            >
              <div className="flex items-center gap-1">
                NKS
                {orderBy === "nks" &&
                  (order === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("nama_petugas_entri")}
              className="text-blue-700 font-semibold cursor-pointer select-none"
            >
              <div className="flex items-center gap-1">
                Petugas Entri
                {orderBy === "nama_petugas_entri" &&
                  (order === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>

            <TableHead
              onClick={() => toggleSort("tgl_entri")}
              className="text-blue-700 font-semibold cursor-pointer select-none"
            >
              <div className="flex items-center gap-1">
                Tanggal Entri
                {orderBy === "tgl_entri" &&
                  (order === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.data.map((item, i) => (
            <TableRow
              key={item.id}
              className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <TableCell className="font-medium text-slate-600">
                {(page - 1) * limit + i + 1}
              </TableCell>

              <TableCell className="text-slate-700">{item.provinsi}</TableCell>
              <TableCell className="text-slate-700">{item.kabupaten}</TableCell>
              <TableCell className="text-slate-700">
                {item.kecamatan.kecamatan}
              </TableCell>
              <TableCell className="text-slate-700">{item.nagari}</TableCell>
              <TableCell className="text-slate-600">{item.sls}</TableCell>
              <TableCell className="text-slate-600">
                {item.kode_sls_subsls}
              </TableCell>
              <TableCell className="text-slate-800 ">{item.no_ruta}</TableCell>
              <TableCell className="text-slate-600 font-medium">
                {item.nks}
              </TableCell>
              <TableCell className="text-slate-600">
                {item.nama_petugas_entri}
              </TableCell>

              <TableCell className="text-slate-600 whitespace-nowrap">
                {new Date(item.tgl_entri).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-2 pt-4">
        <Button
          onClick={() => updateUrl(1)}
          disabled={page === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          <ChevronsLeft size={18} />
        </Button>

        <Button
          onClick={() => updateUrl(page - 1)}
          disabled={page === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </Button>

        {Array.from({ length: data.meta.totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 || p === data.meta.totalPages || Math.abs(p - page) <= 1,
          )
          .map((p) => (
            <Button
              key={p}
              onClick={() => updateUrl(p)}
              className={`px-3 py-1 border rounded ${
                p === page ? "bg-black text-white" : "hover:bg-green-500"
              }`}
            >
              {p}
            </Button>
          ))}

        <Button
          onClick={() => updateUrl(page + 1)}
          disabled={page === data.meta.totalPages}
          className="p-2 border rounded disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </Button>

        <Button
          onClick={() => updateUrl(data.meta.totalPages)}
          disabled={page === data.meta.totalPages}
          className="p-2 border rounded disabled:opacity-50"
        >
          <ChevronsRight size={18} />
        </Button>
      </div>
    </div>
  );
}

"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
  Loader2,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadSusenasEntriResponse } from "@/types";


export default function TableUploadEntriSeruti() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const orderBy = searchParams.get("orderBy") ?? "createdAt";
  const order = searchParams.get("order") ?? "desc";
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
  const { mutate } = useSWRConfig();

  async function handleDelete(filename: string) {
    try {
      const res = await fetch(
        `/api/backend/uploaded-seruti/entri/${filename}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Delete gagal");

      toast.success("File berhasil dihapus");

      // invalidate semua tabel upload
      mutate(
        (key) =>
          typeof key === "string" &&
          key.startsWith("/api/backend/uploaded-seruti/entri"),
      );
    } catch (_err) {
      toast.error("Gagal menghapus file");
    }
  }

  const toggleSort = (field: string) => {
    if (orderBy === field) {
      updateUrl(1, limit, field, order === "asc" ? "desc" : "asc");
    } else {
      updateUrl(1, limit, field, "asc");
    }
  };

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error("Fetch gagal");
      return res.json();
    });

  const key = `/api/backend/uploaded-seruti/entri?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;

  const { data, isLoading } = useSWR<UploadSusenasEntriResponse>(key, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-75">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p className="text-sm text-slate-600">Memuat data…</p>
      </div>
    );

  if (!data || data.data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-75">
        <Inbox className="w-10 h-10 mb-2 text-slate-400" />
        <p className="text-sm text-slate-500">Belum Ada File Yang Di Upload</p>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total data: {data.meta.total}
        </p>

        <select
          value={limit}
          onChange={(e) => updateUrl(1, Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>

            <TableHead
              onClick={() => toggleSort("filename")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                Filename
                {orderBy === "filename" &&
                  (order === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>

            <TableHead>Path</TableHead>

            <TableHead
              onClick={() => toggleSort("createdAt")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                Tanggal Upload
                {orderBy === "createdAt" &&
                  (order === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.data.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{(page - 1) * limit + i + 1}</TableCell>
              <TableCell className="font-medium">{item.filename}</TableCell>
              <TableCell className="text-slate-600">{item.path}</TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hapus file?</DialogTitle>
                      <DialogDescription>
                        File <b>{item.filename}</b> akan dihapus permanen.
                        Tindakan ini tidak bisa dibatalkan.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Batal</Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(item.filename)}
                        >
                          Hapus
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-1 pt-4">
        <Button onClick={() => updateUrl(1)} disabled={page === 1}>
          <ChevronsLeft size={16} />
        </Button>
        <Button onClick={() => updateUrl(page - 1)} disabled={page === 1}>
          <ChevronLeft size={16} />
        </Button>
        <Button
          onClick={() => updateUrl(page + 1)}
          disabled={page === data.meta.totalPages}
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          onClick={() => updateUrl(data.meta.totalPages)}
          disabled={page === data.meta.totalPages}
        >
          <ChevronsRight size={16} />
        </Button>
      </div>
    </div>
  );
}

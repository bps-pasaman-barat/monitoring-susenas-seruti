/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import DashboardLayout from "@/components/dashboard/Layout";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
     const error: any = new Error("An error occurred while fetching the data.");
     error.info = await res.json().catch(() => ({}));
     error.status = res.status;
     throw error;
  }
  return res.json();
};

export default function NagariPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Fetch Nagari
  const { data: nagariData, isLoading } = useSWR(
    `/api/default-nagari?page=${page}&limit=10&search=${debouncedSearch}`,
    fetcher
  );

  // Fetch Kecamatan for dropdown
  const { data: kecamatanData } = useSWR("/api/default-kecamatan", (url) =>
    fetch(url).then((r) => r.json().then((j) => j.data))
  );

  const list = nagariData?.data || [];
  const metadata = nagariData?.metadata || { page: 1, totalPages: 1, total: 0 };

  // Create State
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newKecamatanId, setNewKecamatanId] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newKecamatanId)
      return toast.error("Nama dan Kecamatan wajib diisi");

    try {
      const res = await fetch("/api/default-nagari", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newName, kecamatanId: newKecamatanId }),
      });
      if (!res.ok) throw new Error("Gagal membuat");
      toast.success("Nagari dibuat");
      setNewName("");
      setNewKecamatanId("");
      setCreateOpen(false);
      mutate((key) => typeof key === "string" && key.startsWith("/api/default-nagari"));
    } catch (err: any) {
      toast.error(err?.message || "Gagal membuat nagari");
    }
  }

  // Edit State
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  function openEdit(item: any) {
    setEditing(item);
    setNewName(item.nama);
    setNewKecamatanId(String(item.kecamatanId));
    setEditOpen(true);
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    try {
      const res = await fetch(`/api/default-nagari/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newName, kecamatanId: newKecamatanId }),
      });
      if (!res.ok) throw new Error("Gagal update");
      toast.success("Diperbarui");
      setEditOpen(false);
      setEditing(null);
      setNewName("");
      setNewKecamatanId("");
      mutate((key) => typeof key === "string" && key.startsWith("/api/default-nagari"));
    } catch (err) {
      toast.error("Gagal memperbarui");
    }
  }

  // Delete
  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      const res = await fetch(`/api/default-nagari/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal hapus");
      toast.success("Dihapus");
      mutate((key) => typeof key === "string" && key.startsWith("/api/default-nagari"));
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-white rounded-md border space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Manajemen Nagari</h2>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setNewName(""); setNewKecamatanId(""); }}>Tambah Nagari</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Nagari</DialogTitle>
                <DialogDescription>
                  Masukkan nama nagari dan pilih kecamatan.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Nama Nagari</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Contoh: Nagari A"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kecamatan</Label>
                  <Select value={newKecamatanId} onValueChange={setNewKecamatanId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {kecamatanData?.map((k: any) => (
                        <SelectItem key={k.id} value={String(k.id)}>
                          {k.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                  <Button type="submit">Buat</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
            <Input 
                className="max-w-sm"
                placeholder="Cari Nagari..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
        </div>

        <Table className="border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Nagari</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Memuat data...</span>
                    </div>
                  </TableCell>
                </TableRow>
            ) : list.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">Tidak ada data</TableCell>
                </TableRow>
            ) : (
                list.map((item: any, i: number) => (
                <TableRow key={item.id}>
                    <TableCell>{(metadata.page - 1) * 10 + i + 1}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.kecamatan?.nama || "-"}</TableCell>
                    <TableCell>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                        Edit
                        </Button>
                        <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        >
                        Hapus
                        </Button>
                    </div>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
                Halaman {metadata.page} dari {metadata.totalPages} ({metadata.total} data)
            </div>
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page >= metadata.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Nagari</DialogTitle>
              <DialogDescription>Ubah data nagari.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Nama Nagari</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kecamatan</Label>
                  <Select value={newKecamatanId} onValueChange={setNewKecamatanId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {kecamatanData?.map((k: any) => (
                        <SelectItem key={k.id} value={String(k.id)}>
                          {k.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

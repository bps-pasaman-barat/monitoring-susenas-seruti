/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import DashboardLayout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await res.json().catch(() => ({}));
    error.status = res.status;
    throw error;
  }
  return res.json().then((j) => j.data);
};

export default function KecamatanPage() {
  const { data: kecamatan, isLoading } = useSWR<any[]>(
    "/api/default-kecamatan",
    fetcher,
  );

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  async function handleCreate(e?: any) {
    e?.preventDefault();
    if (!name) return toast.error("Nama kecamatan wajib diisi");
    try {
      const res = await fetch("/api/default-kecamatan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kecamatan: name }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Gagal membuat");
      }
      toast.success("Kecamatan dibuat");
      setName("");
      setOpen(false);
      await mutate("/api/default-kecamatan");
    } catch (err: any) {
      toast.error(err?.message || "Gagal membuat kecamatan");
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/default-kecamatan/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Gagal hapus");
      }
      toast.success("Dihapus");
      await mutate("/api/default-kecamatan");
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus");
    }
  }

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  function openEdit(item: any) {
    setEditing(item);
    setEditOpen(true);
    setName(item.nama);
  }

  async function handleEdit(e?: any) {
    e?.preventDefault();
    if (!editing) return;
    try {
      const res = await fetch(`/api/default-kecamatan/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kecamatan: name }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Gagal update");
      }
      toast.success("Diperbarui");
      setEditOpen(false);
      setEditing(null);
      setName("");
      await mutate("/api/default-kecamatan");
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui");
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-white rounded-md border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Manajemen Kecamatan</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Tambah Kecamatan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Kecamatan</DialogTitle>
                <DialogDescription>
                  Masukkan nama kecamatan baru.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <input
                  className="w-full border rounded px-3 py-2"
                  value={name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                />
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

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Memuat data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : kecamatan?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center h-24 text-muted-foreground"
                  >
                    Belum ada data kecamatan
                  </TableCell>
                </TableRow>
              ) : (
                kecamatan?.map((k, i) => (
                  <TableRow key={k.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{k.nama}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => openEdit(k)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(k.id)}
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
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Kecamatan</DialogTitle>
              <DialogDescription>Ubah nama kecamatan.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4 mt-4">
              <input
                className="w-full border rounded px-3 py-2"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
              />
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

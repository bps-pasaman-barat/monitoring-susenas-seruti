"use client";
import { Edit, Trash2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import DashboardLayout from "@/components/dashboard/Layout";
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

type UsersResp = {
  id: string;
  username: string;
  role: string;
};

export default function UserPage() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((j) => j.data as UsersResp[]);

  const { data: users } = useSWR<UsersResp[]>("/api/users", fetcher);
  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Delete gagal");

      toast.success("users berhasil dihapus");

      await mutate("/api/users");
    } catch (err) {
      console.log(err);
      toast.error("Gagal menghapus users");
    }
  }
  // create user form state
  const [openCreate, setOpenCreate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!username || !password)
      return toast.error("Username dan password wajib diisi");
    if (password !== confirmPassword)
      return toast.error("Password dan konfirmasi tidak cocok");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Gagal membuat user");
      }

      toast.success("User berhasil dibuat");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
      setOpenCreate(false);
      await mutate("/api/users");
    } catch (err) {
      // biome-ignore lint/suspicious/noExplicitAny: error handling
      const error = err as any;
      toast.error(error?.message || "Gagal membuat user");
    }
  }
  // edit user form state
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("user");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");

  function openEdit(item: UsersResp) {
    setEditingId(item.id);
    setEditUsername(item.username);
    setEditRole(item.role ?? "user");
    setEditPassword("");
    setEditConfirmPassword("");
    setEditOpen(true);
  }

  async function handleEditSubmit(e: FormEvent) {
    e.preventDefault();
    if (editPassword && editPassword !== editConfirmPassword)
      return toast.error("Password dan konfirmasi tidak cocok");
    if (!editingId) return toast.error("Invalid user");

    try {
      // biome-ignore lint/suspicious/noExplicitAny: dynamic body construction
      const body: any = { role: editRole };
      if (editPassword) body.password = editPassword;

      const res = await fetch(`/api/users/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Gagal mengupdate user");
      }

      toast.success("User berhasil diperbarui");
      setEditOpen(false);
      setEditingId(null);
      await mutate("/api/users");
    } catch (err) {
      // biome-ignore lint/suspicious/noExplicitAny: error handling
      const error = err as any;
      toast.error(error?.message || "Gagal mengupdate user");
    }
  }
  return (
    <DashboardLayout>
      <div className="min-h-100 rounded-md border bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Users</h2>
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button>Tambah User</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
                <DialogDescription>
                  Buat user baru dengan username dan password.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
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
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Perbarui role atau password user.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
                <div>
                  <label
                    htmlFor="editUsername"
                    className="block text-sm font-medium"
                  >
                    Username
                  </label>
                  <input
                    id="editUsername"
                    className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-100"
                    value={editUsername}
                    readOnly
                  />
                </div>

                <div>
                  <label
                    htmlFor="editRole"
                    className="block text-sm font-medium"
                  >
                    Role
                  </label>
                  <select
                    id="editRole"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="editPassword"
                    className="block text-sm font-medium"
                  >
                    Password (opsional)
                  </label>
                  <input
                    id="editPassword"
                    type="password"
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="editConfirmPassword"
                    className="block text-sm font-medium"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    id="editConfirmPassword"
                    type="password"
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    value={editConfirmPassword}
                    onChange={(e) => setEditConfirmPassword(e.target.value)}
                  />
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
        <Table className="border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>

              <TableHead>Username</TableHead>

              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>

          {users && (
            <TableBody>
              {users.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{item.username}</TableCell>
                  <TableCell className="text-slate-600">{item.role}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Hapus User?</DialogTitle>
                            <DialogDescription>
                              <b>{item.username}</b> akan dihapus permanen.
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
                                onClick={() => handleDelete(item.id)}
                              >
                                Hapus
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </DashboardLayout>
  );
}

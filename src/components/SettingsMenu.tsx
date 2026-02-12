import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SettingsLimitDialog } from "@/app/(protected)/_components/PengaturanBatasMaximal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SettingsMenu({ role }: { role: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {role === "admin" && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard-admin"
              className="w-full flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="flex justify-center">
          <SettingsLimitDialog />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton collapsed />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface Props {
  collapsed?: boolean;
}

import { logout } from "@/app/actions/auth";

export function SignOutButton({ collapsed: _collapsed }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut size={18} />
          Logout
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yakin Ingin Keluar</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <form action={logout}>
            <Button variant="destructive" type="submit">
              Logout
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

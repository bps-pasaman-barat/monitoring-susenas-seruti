"use client";

import { Settings2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsLimitDialog() {
  const [seruti, setSeruti] = useState<number>(() => {
    const v = Number(localStorage.getItem("maxMasuk"));
    return Number.isNaN(v) ? 1000 : v;
  });

  const [susenas, setSusenas] = useState<number>(() => {
    const v = Number(localStorage.getItem("maxEntri"));
    return Number.isNaN(v) ? 1000 : v;
  });

  function handleSave() {
    localStorage.setItem("maxMasuk", String(seruti));
    localStorage.setItem("maxEntri", String(susenas));
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {" "}
          <Settings2Icon />
          Setting Batas
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atur Batas Max</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seruti">Set Max Masuk</Label>
            <Input
              id="seruti"
              type="number"
              value={seruti}
              onChange={(e) => setSeruti(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="susenas">Set Max Entri</Label>
            <Input
              id="susenas"
              type="number"
              value={susenas}
              onChange={(e) => setSusenas(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

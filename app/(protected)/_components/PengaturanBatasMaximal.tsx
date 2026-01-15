"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsLimitDialog() {
  const [seruti, setSeruti] = useState<number>(1000);
  const [susenas, setSusenas] = useState<number>(1000);

  useEffect(() => {
    const s1 = localStorage.getItem("maxMasuk");
    const s2 = localStorage.getItem("maxEntri");

    if (s1) setSeruti(Number(s1));
    if (s2) setSusenas(Number(s2));
  }, []);

  function handleSave() {
    localStorage.setItem("maxMasuk", String(seruti));
    localStorage.setItem("maxEntri", String(susenas));
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="ms-4">
        <Button variant="ghost">Setting Batas</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atur Batas max</DialogTitle>
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

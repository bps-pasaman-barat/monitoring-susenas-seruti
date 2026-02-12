"use client";

import { Download, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
  title: string;
  url: string;
  urlKey: string;
}
export function UploadDokumenMasukCard({ title, url, urlKey }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

  async function handleSubmit() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("file berhasil di-upload");

      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      mutate((key) => typeof key === "string" && key.startsWith(urlKey));
    } catch (err) {
      console.error(err);
      toast.error("Upload gagal karena sudah ada file dengan nama yg sama");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-blue-400 transition bg-blue-300">
          <CardContent className="p-6 text-center font-semibold">
            Upload Dokumen Masuk {title}
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Dokumen Masuk {title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-medium">Upload File</p>
            <Input
              type="file"
              ref={inputRef}
              accept=".xlsx"
              onChange={handleFileChange}
              disabled={loading}
            />
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!file || loading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Template Dokumen</p>
            <p className="text-sm text-muted-foreground">
              Gunakan template resmi agar format sesuai sistem.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/?hal=upload" target="_blank" rel="noopener">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UploadedFile } from "@/types";


export default function UploadTemplatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/upload-template");
      if (!res.ok) throw new Error("Failed fetch");
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function handleSubmit() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/upload-template", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Template berhasil di-upload");

      setFile(null);
      if (inputRef.current) inputRef.current.value = "";

      fetchFiles();
    } catch (err) {
      console.error(err);
      toast.error("Upload gagal karena sudah ada file dengan nama yg sama");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/upload-template/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Template berhasil dihapus");

      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus template");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Upload box */}
        <div className="rounded-lg border bg-background p-6 shadow-sm space-y-4">
          <Field className="gap-2">
            <FieldLabel htmlFor="picture">
              Excel File Template (XLSX)
            </FieldLabel>

            <Input
              ref={inputRef}
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              disabled={loading}
              className="file:mr-4 file:rounded-md
                         file:pt-1
                         file:bg-primary file:px-4
                         file:text-sm file:font-medium
                         file:text-primary-foreground
                         hover:file:bg-primary/90"
            />

            <FieldDescription>
              Upload file template Excel{" "}
              <span className="text-red-500">.xlsx</span>
            </FieldDescription>
          </Field>

          <Button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="w-full"
          >
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </div>

        <div className="space-y-3">
          {files.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border p-4 bg-background shadow-sm flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="font-medium">{item.filename}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </div>
                <a
                  href={item.path}
                  target="_blank"
                  className="text-sm text-primary underline"
                >
                  Download
                </a>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {files.length === 0 && (
            <div className="text-sm text-muted-foreground text-center">
              Belum ada template yang di-upload
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { saveSusenasEntri } from "@/app/server/sesunas.actions";
import { InputDateField } from "@/components/boilerplate/FormDate";
import { InputTextField } from "@/components/boilerplate/InputField";
import { KecamatanSelect } from "@/components/boilerplate/KecamatanField";
import NagariField from "@/components/boilerplate/NagariField";
import { UploadDokumenEntriCard } from "@/components/UploadDokumenEntri";
import { Button } from "@/components/ui/button";
import {
  type SusenasEntriForm,
  SusenasSchemaEntri,
} from "@/schema/form.schema";
import TableUploadEntriSusenas from "./TableUploadEntriSusenas";

export default function FormSesunasEntri() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SusenasEntriForm>({
    resolver: zodResolver(SusenasSchemaEntri),
    defaultValues: {
      kecamatanId: undefined,
      kabupaten: "Pasaman Barat",
      kode_sls_subsls: "",
      nagari: "",
      nama_petugas_entri: "",
      nks: "",
      no_ruta: "",
      provinsi: "Sumatera Barat",
      sls: "",
      tgl_entri: undefined,
    },
  });

  const onSubmit = (data: SusenasEntriForm) => {
    startTransition(async () => {
      const result = await saveSusenasEntri(data);

      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);

        if (result.errors) {
          Object.values(result.errors)
            .flat()
            .forEach((err) => {
              toast.error(err);
            });
        }
      }
    });
  };

  return (
    <>
      <h1 className="text-xl text-center font-semibold uppercase mt-10 mb-2">
        dokumen yang di-entri susenas
      </h1>
      <div className="space-y-4 w-full border p-4 ">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputTextField form={form} name="provinsi" label="Provinsi" />
              <InputTextField form={form} name="kabupaten" label="Kabupaten" />
              <KecamatanSelect name="kecamatanId" form={form} />
              <NagariField form={form} />
              <InputTextField form={form} name="sls" label="SLS" />
              <InputTextField
                form={form}
                name="kode_sls_subsls"
                label="KODE SLS/SUBSLS"
              />
              <InputTextField form={form} name="nks" label="NKS" />
              <InputTextField form={form} name="no_ruta" label="Nomor Ruta" />
              <InputTextField
                form={form}
                name="nama_petugas_entri"
                label="Nama Petugas Entri"
              />
            </div>

            <InputDateField
              placeholder="26 desember 2025"
              form={form}
              label="Tanggal Di-Entri"
              name="tgl_entri"
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </form>
        </FormProvider>
        <UploadDokumenEntriCard
          urlKey="/api/backend/uploaded-susenas/entri"
          url="/api/upload-susenas-entri"
          title="Susenas"
        />
        <TableUploadEntriSusenas />
      </div>
    </>
  );
}

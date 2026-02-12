"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { InputTextField } from "@/components/boilerplate/InputField";
import { SerutiMasukForm, SerutiSchemaMasuk } from "@/schema/form.schema";
import { InputDateField } from "@/components/boilerplate/FormDate";
import { saveSerutiMasuk } from "@/app/server/seruti.actions";
import { toast } from "sonner";
import { useTransition } from "react";
import { KecamatanSelect } from "@/components/boilerplate/KecamatanField";
import NagariField from "@/components/boilerplate/NagariField";
import { UploadDokumenMasukCard } from "@/components/UploadDokumenMasuk";
import TableUploadMasukSeruti from "./TableUploadMasukSeruti";

export default function FormSerutiMasuk() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SerutiMasukForm>({
    resolver: zodResolver(SerutiSchemaMasuk),
    defaultValues: {
      kecamatanId: 0,
      kabupaten: "Pasaman Barat",
      kode_sls_subsls: "",
      nagari: "",
      nama_PML: "",
      nama_PPL: "",
      tgl_masuk: undefined,
      nks: "",
      no_ruta: "",
      provinsi: "Sumatera Barat",
      sls: "",
    },
  });

  const onSubmit = (data: SerutiMasukForm) => {
    startTransition(async () => {
      const result = await saveSerutiMasuk(data);

      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);

        if (result.errors) {
          Object.values(result.errors)
            .flat()
            .forEach((err) => toast.error(err));
        }
      }
    });
  };

  return (
    <>
      <h1 className="text-xl text-center font-semibold uppercase mt-10 mb-2">
        dokumen yang masuk seruti
      </h1>
      <div className="space-y-4 w-full border p-4">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <InputTextField form={form} name="nama_PML" label="Nama PML" />
              <InputTextField form={form} name="nama_PPL" label="Nama PPL" />
              <InputTextField form={form} name="no_ruta" label="Nomor Ruta" />
            </div>
            <InputDateField
              form={form}
              label="Tanggal Pemasukan"
              name="tgl_masuk"
              placeholder="26 desember 2025"
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </form>
        </FormProvider>
        <UploadDokumenMasukCard
          title="Seruti"
          url="/api/upload-seruti-masuk"
          urlKey="/api/backend/uploaded-seruti/masuk"
        />
        <TableUploadMasukSeruti />
      </div>
    </>
  );
}

"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputTextField } from "@/components/boilerplate/InputField";
import { InputDateField } from "@/components/boilerplate/FormDate";
import { toast } from "sonner";
import { useTransition } from "react";
import { SusenasMasukForm, SusenasMasukSchema } from "@/schema/form.schema";
import { saveSusenasMasuk } from "@/app/server/sesunas.actions";

export default function FormSesunasMasuk() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SusenasMasukForm>({
    resolver: zodResolver(SusenasMasukSchema),
    defaultValues: {
      kecamatan: "",
      kabupaten: "",
      kode_sls_subsls: "",
      nagari: "",
      nama_PML: "",
      nama_PPL: "",
      tgl_masuk: undefined,
      nks: "",
      no_ruta: "",
      provinsi: "",
      sls: "",
    },
  });

  const onSubmit = (data: SusenasMasukForm) => {
    startTransition(async () => {
      const result = await saveSusenasMasuk(data);

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
      <h1 className="text-xl text-center font-semibold uppercase mb-4">
        dokumen yang masuk susenas
      </h1>
      <div className="space-y-4 w-full border p-4">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputTextField form={form} name="provinsi" label="Provinsi" />
              <InputTextField form={form} name="kabupaten" label="Kabupaten" />
              <InputTextField form={form} name="kecamatan" label="Kecamatan" />
              <InputTextField form={form} name="nagari" label="Nagari" />
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
      </div>
    </>
  );
}

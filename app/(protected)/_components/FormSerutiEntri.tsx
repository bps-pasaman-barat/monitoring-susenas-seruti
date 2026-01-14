"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SerutiEntriForm, SerutiSchemaEntri } from "@/schema/form.schema";
import { InputTextField } from "@/components/boilerplate/InputField";
import { InputDateField } from "@/components/boilerplate/FormDate";

export default function FormSerutiEntri() {
  const form = useForm<SerutiEntriForm>({
    resolver: zodResolver(SerutiSchemaEntri),
    defaultValues: {
      kecamatan: "",
      kabupaten: "",
      kode_sls_subsls: "",
      nagari: "",
      nama_petugas_entri: "",
      nks: "",
      no_ruta: "",
      provinsi: "",
      sls: "",
      tgl_entri: new Date(),
    },
  });

  const onSubmit = async (data: SerutiEntriForm) => {
    alert(JSON.stringify(data));
    form.reset();
  };

  return (
    <>
      <h1 className="text-xl text-center font-semibold uppercase">
        dokumen yang di-entri
      </h1>
      <div className="space-y-4 w-full border p-4 mt-2">
        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <InputTextField form={form} name="provinsi" label="Provinsi" />
                <InputTextField
                  form={form}
                  name="kabupaten"
                  label="Kabupaten"
                />
                <InputTextField
                  form={form}
                  name="kecamatan"
                  label="Kecamatan"
                />
                <InputTextField form={form} name="nagari" label="Nagari" />
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
                form={form}
                label="Tanggal Di-Entri"
                name="tgl_entri"
              />

              <Button type="submit" className="w-full">
                Simpan
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}

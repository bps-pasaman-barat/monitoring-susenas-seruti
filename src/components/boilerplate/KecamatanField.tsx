/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

type SelectOption = {
  value: number;
  label: string;
};

type Props<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
  name?: string;
  label?: string;
};

export function KecamatanSelect<T extends FieldValues = any>({
  form,
  name = "kecamatan",
  label = "Kecamatan",
}: Props<T>) {
  const { data } = useSWR("/api/default-kecamatan", fetcher);

  const kecamatanList = data?.data || [];

  const selectOptions: SelectOption[] = kecamatanList.map((item: any) => ({
    value: item.id,
    label: item.nama,
  }));

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <CreatableSelect
            options={selectOptions}
            isClearable
            placeholder={`Pilih ${label}`}
            value={
              typeof field.value === "number"
                ? (selectOptions.find((opt) => opt.value === field.value) ??
                  null)
                : null
            }
            onChange={(option: any) => {
              field.onChange(option?.value ?? null);
            }}
            onBlur={field.onBlur}
            isLoading={!data}
          />
        )}
      />
    </div>
  );
}

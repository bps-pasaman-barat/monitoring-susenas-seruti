/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";

import { kecamatan } from "@/constants";
import dynamic from "next/dynamic";

const CreatableSelect = dynamic(
  () => import("react-select/creatable"),
  { ssr: false },
);
type SelectOption = {
  value: number;
  label: string;
};

type Props<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
  name?: string;
  label?: string;
  options?: { key: number; label: string }[];
};

export function KecamatanSelect<T extends FieldValues = any>({
  form,
  name = "kecamatan",
  label = "Kecamatan",
  options = kecamatan,
}: Props<T>) {
  const selectOptions: SelectOption[] = options.map((item) => ({
    value: item.key,
    label: item.label,
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
          />
        )}
      />
    </div>
  );
}

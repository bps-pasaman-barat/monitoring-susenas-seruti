/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { kecamatan } from "@/constants";
type SelectOption = {
  value: string;
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
    value: item.label,
    label: item.label,
  }));

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <CreatableSelect<SelectOption, false>
            options={selectOptions}
            isClearable
            placeholder={`Pilih atau ketik ${label}`}
            value={
              field.value
                ? { value: String(field.value), label: String(field.value) }
                : null
            }
            onChange={(option) => {
              field.onChange(option?.value ?? "");
            }}
            onBlur={field.onBlur}
          />
        )}
      />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { wilayah, kecamatan } from "@/constants";
import { FieldValues, UseFormReturn, useWatch } from "react-hook-form";

interface FieldProps<T extends FieldValues = any> {
  form: UseFormReturn<T>;
}

export default function NagariField({ form }: FieldProps) {
  const kecamatanId = useWatch({
    control: form.control,
    name: "kecamatanId",
  });

  const [open, setOpen] = useState(false);

  const kecamatanLabel = useMemo(() => {
    return kecamatan.find(k => k.key === kecamatanId)?.label ?? "";
  }, [kecamatanId]);

  const kecamatanKey = kecamatanLabel.toUpperCase();

  const nagariOptions =
    wilayah
      .find((w) => w.kecamatan === kecamatanKey)
      ?.nagari.map((n) => n.nama) ?? [];

  return (
    <FormField
      control={form.control}
      name="nagari"
      render={({ field }) => {
        const value = field.value ?? "";

        const filtered = nagariOptions.filter((n) =>
          n.toLowerCase().includes(value.toLowerCase())
        );

        return (
          <FormItem className="relative">
            <FormLabel>Nama Nagari</FormLabel>

            <FormControl>
              <Input
                {...field}
                placeholder={
                  kecamatanId
                    ? "Pilih nagari"
                    : "Pilih kecamatan dulu"
                }
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                disabled={!kecamatanId}
              />
            </FormControl>

            {open && filtered.length > 0 && (
              <ul className="absolute top-full mt-2 z-20 max-h-125 w-full overflow-y-auto rounded-md border bg-white shadow-md">
                {filtered.map((n) => (
                  <li
                    key={n}
                    onMouseDown={() => {
                      field.onChange(n);
                      setOpen(false);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

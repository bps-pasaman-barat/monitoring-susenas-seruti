/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  type FieldValues,
  type UseFormReturn,
  useWatch,
} from "react-hook-form";
import useSWR from "swr";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";

interface FieldProps<T extends FieldValues = any> {
  form: UseFormReturn<T>;
}

export default function NagariField({ form }: FieldProps) {
  const kecamatanId = useWatch({
    control: form.control,
    name: "kecamatanId",
  });

  const [open, setOpen] = useState(false);

  // Fetch Nagari based on kecamatanId
  // limit=100 should be enough for nagari in one kecamatan
  // Only fetch if kecamatanId is present
  const { data: nagariData } = useSWR(
    kecamatanId
      ? `/api/default-nagari?kecamatanId=${kecamatanId}&limit=100`
      : null,
    fetcher,
  );

  const nagariList = (nagariData?.data || []).map((n: any) => n.nama);

  return (
    <FormField
      control={form.control}
      name="nagari"
      render={({ field }) => {
        const value = field.value ?? "";

        const filtered = nagariList.filter((n: string) =>
          n.toLowerCase().includes(value.toLowerCase()),
        );

        return (
          <FormItem className="relative">
            <FormLabel>Nama Nagari</FormLabel>

            <FormControl>
              <Input
                {...field}
                placeholder={
                  kecamatanId ? "Pilih nagari" : "Pilih kecamatan dulu"
                }
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
                disabled={!kecamatanId}
                autoComplete="off"
              />
            </FormControl>

            {open && filtered.length > 0 && (
              <ul className="absolute top-full mt-2 z-20 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-md">
                {filtered.map((n: string) => (
                  <li
                    key={n}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent blur before click
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

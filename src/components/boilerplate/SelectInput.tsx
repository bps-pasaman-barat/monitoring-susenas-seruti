/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
};

type Props<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
  name: string;
  valueSelect: Option[];
};

export function SelectInput({
  name,
  label,
  open,
  setOpen,
  form,
  valueSelect,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {field.value || `Pilih ${label}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Cari ${label}...`} />
                <CommandEmpty>Tidak ditemukan</CommandEmpty>

                <CommandGroup>
                  {valueSelect.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item.label}
                      onSelect={(value) => {
                        field.onChange(value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === item.label
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

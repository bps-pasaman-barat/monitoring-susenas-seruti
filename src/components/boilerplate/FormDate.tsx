"use client";

import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date?: Date) {
  if (!date) return "";

  return date
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .toLowerCase();
}

type FieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
};

export function InputDateField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "12 januari 2022",
}: FieldProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>();
  const [inputValue, setInputValue] = React.useState("");

  const value = useWatch({
    control: form.control,
    name,
  }) as Date | undefined;

  React.useEffect(() => {
    if (value instanceof Date) {
      setInputValue(formatDate(value));
      setMonth(value);
    } else {
      setInputValue("");
      setMonth(undefined);
    }
  }, [value]);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-3">
          <Label className="px-1">{label}</Label>

          <div className="relative flex gap-2">
            <Input
              value={inputValue}
              placeholder={placeholder}
              className="bg-background pr-10"
              onChange={(e) => {
                const text = e.target.value;
                setInputValue(text);

                const parsed = parseDate(text);
                if (parsed) {
                  field.onChange(parsed);
                  setMonth(parsed);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                >
                  <CalendarIcon className="size-3.5" />
                  <span className="sr-only">Select date</span>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                sideOffset={10}
              >
                <Calendar
                  mode="single"
                  selected={value}
                  month={month}
                  captionLayout="dropdown"
                  onMonthChange={setMonth}
                  onSelect={(d) => {
                    field.onChange(d);
                    setInputValue(formatDate(d));
                    setMonth(d);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    />
  );
}

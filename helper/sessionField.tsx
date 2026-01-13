import { useEffect } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

/* Simpan Inputan dari session field*/
export function useFormPersistSession<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>,
  key: string
) {
  useEffect(() => {
    const savedData = sessionStorage.getItem(key);
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form, key]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form, key]);
}

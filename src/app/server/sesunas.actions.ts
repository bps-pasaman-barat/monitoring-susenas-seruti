"use server";

import { prisma } from "@/lib/db";

import {
  type SusenasEntriForm,
  type SusenasMasukForm,
  SusenasMasukSchema,
  SusenasSchemaEntri,
} from "@/schema/form.schema";

export async function saveSusenasMasuk(input: SusenasMasukForm) {
  const parsed = SusenasMasukSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await prisma.susenasMasuk.create({
      data: parsed.data,
    });

    return {
      success: true,
      message: "Data berhasil disimpan",
      data,
    };
  } catch (_error) {
    return {
      success: false,
      message: "Gagal menyimpan data",
    };
  }
}

export async function saveSusenasEntri(input: SusenasEntriForm) {
  const parsed = SusenasSchemaEntri.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await prisma.susenasEntri.create({
      data: parsed.data,
    });

    return {
      success: true,
      message: "Data berhasil disimpan",
      data,
    };
  } catch (_error) {
    return {
      success: false,
      message: "Gagal menyimpan data",
    };
  }
}

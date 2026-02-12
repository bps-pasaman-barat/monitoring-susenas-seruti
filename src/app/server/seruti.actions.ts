"use server";

import { prisma } from "@/lib/db";

import {
  SerutiSchemaMasuk,
  SerutiMasukForm,
  SerutiSchemaEntri,
  SerutiEntriForm,
} from "@/schema/form.schema";

export async function saveSerutiMasuk(input: SerutiMasukForm) {
  const parsed = SerutiSchemaMasuk.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await prisma.serutiMasuk.create({
      data: parsed.data,
    });

    return {
      success: true,
      message: "Data berhasil disimpan",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal menyimpan data",
    };
  }
}

export async function saveSerutiEntri(input: SerutiEntriForm) {
  const parsed = SerutiSchemaEntri.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await prisma.serutiEntri.create({
      data: parsed.data,
    });

    return {
      success: true,
      message: "Data berhasil disimpan",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal menyimpan data",
    };
  }
}

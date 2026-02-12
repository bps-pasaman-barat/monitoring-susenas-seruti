/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const body = await request.json().catch(() => ({}));
    const { kecamatan } = body ?? {};
    if (!kecamatan)
      return NextResponse.json(
        { error: "kecamatan required" },
        { status: 400 },
      );

    const updated = await prisma.defaultKecamatan.update({
      where: { id: Number(id) },
      data: { nama: kecamatan },
    });
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Nama kecamatan sudah ada" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update kecamatan" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    await prisma.$transaction([
      prisma.defaultNagari.deleteMany({ where: { kecamatanId: Number(id) } }),
      prisma.defaultKecamatan.delete({ where: { id: Number(id) } }),
    ]);
    return NextResponse.json({ message: "deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete kecamatan. Ensure no related data exists." },
      { status: 500 },
    );
  }
}

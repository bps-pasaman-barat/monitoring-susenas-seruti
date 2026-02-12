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
    const { nama, kecamatanId } = body ?? {};
    const data: any = {};
    if (nama) data.nama = nama;
    if (kecamatanId) data.kecamatanId = Number(kecamatanId);

    if (!Object.keys(data).length)
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );

    const updated = await prisma.defaultNagari.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update nagari" },
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
    await prisma.defaultNagari.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete nagari" },
      { status: 500 },
    );
  }
}

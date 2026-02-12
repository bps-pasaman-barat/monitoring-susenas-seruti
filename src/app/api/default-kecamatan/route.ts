/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const data = await prisma.defaultKecamatan.findMany({
      orderBy: { nama: "asc" },
    });
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch kecamatan" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { kecamatan } = body ?? {};
    if (!kecamatan)
      return NextResponse.json(
        { error: "kecamatan required" },
        { status: 400 },
      );

    const created = await prisma.defaultKecamatan.create({
      data: { nama: kecamatan },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create kecamatan" },
      { status: 500 },
    );
  }
}

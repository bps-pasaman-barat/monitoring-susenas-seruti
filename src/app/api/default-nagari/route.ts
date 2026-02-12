/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const kecamatanId = searchParams.get("kecamatanId");

    const skip = (page - 1) * limit;

    // biome-ignore lint/suspicious/noExplicitAny: dynamic where clause
    const where: any = {};

    if (search) {
      where.nama = { contains: search, mode: "insensitive" };
    }

    if (kecamatanId) {
      where.kecamatanId = Number(kecamatanId);
    }

    const [data, total] = await prisma.$transaction([
      prisma.defaultNagari.findMany({
        where,
        take: limit,
        skip,
        include: { kecamatan: true },
        orderBy: [{ kecamatan: { nama: "asc" } }, { nama: "asc" }],
      }),
      prisma.defaultNagari.count({ where }),
    ]);

    return NextResponse.json({
      data,
      metadata: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch nagari" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { nama, kecamatanId } = body ?? {};
    if (!nama || !kecamatanId)
      return NextResponse.json(
        { error: "nama and kecamatanId required" },
        { status: 400 },
      );

    const created = await prisma.defaultNagari.create({
      data: { nama, kecamatanId: Number(kecamatanId) },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create nagari" },
      { status: 500 },
    );
  }
}

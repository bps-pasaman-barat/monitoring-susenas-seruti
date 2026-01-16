import { prisma } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ nama: string }> }
) {
  const kecamatan = (await params).nama;
  //   jenis hanya ada dua yaitu "masuk" dan "entri"
  const jenis = req.nextUrl.searchParams.get("jenis");

  try {
    // Query Prisma berdasarkan kecamatan
    const data = await prisma.serutiEntri.findMany({
      where: {
        kecamatan: {
          equals: kecamatan,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

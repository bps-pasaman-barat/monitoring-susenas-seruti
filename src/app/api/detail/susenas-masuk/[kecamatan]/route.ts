import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kecamatan: string }> },
) {
  try {
    const kecamatanParam = decodeURIComponent((await params).kecamatan);

    const kec = await prisma.kecamatan.findFirst({
      where: {
        kecamatan: {
          equals: kecamatanParam,
        },
      },
      select: { id: true },
    });
    const inputSeruti = kec
      ? await prisma.serutiEntri.count({
          where: { kecamatanId: kec.id },
        })
      : 0;

    const uploadSeruti = await prisma.uploadedSusenasMasuk.count();

    return NextResponse.json({
      data: {
        kecamatan: kecamatanParam,
        totalInputManual: inputSeruti,
        totalUploadExcel: uploadSeruti,
        found: Boolean(kec),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Kesalahan server" }, { status: 500 });
  }
}

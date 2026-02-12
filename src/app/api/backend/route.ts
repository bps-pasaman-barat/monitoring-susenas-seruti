import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const groupedSerutiMasuk = await prisma.serutiMasuk.groupBy({
      by: ["kecamatanId"],
      _count: { _all: true },
    });
    const groupedSerutiEntri = await prisma.serutiEntri.groupBy({
      by: ["kecamatanId"],
      _count: { _all: true },
    });
    const groupedSusenasMasuk = await prisma.susenasMasuk.groupBy({
      by: ["kecamatanId"],
      _count: { _all: true },
    });
    const groupedSusenasEntri = await prisma.susenasEntri.groupBy({
      by: ["kecamatanId"],
      _count: { _all: true },
    });

    const kecamatanList = await prisma.kecamatan.findMany({
      select: { id: true, kecamatan: true },
    });

    const kecamatanMap = Object.fromEntries(
      kecamatanList.map((k) => [k.id, k.kecamatan]),
    );

    const totalSerutiMasuk = Object.fromEntries(
      groupedSerutiMasuk.map((g) => [
        kecamatanMap[g.kecamatanId] ?? "Unknown",
        g._count._all,
      ]),
    );
    const totalSerutiEntri = Object.fromEntries(
      groupedSerutiEntri.map((g) => [
        kecamatanMap[g.kecamatanId] ?? "Unknown",
        g._count._all,
      ]),
    );
    const totalSusenasEntri = Object.fromEntries(
      groupedSusenasEntri.map((g) => [
        kecamatanMap[g.kecamatanId] ?? "Unknown",
        g._count._all,
      ]),
    );
    const totalSusenasMasuk = Object.fromEntries(
      groupedSusenasMasuk.map((g) => [
        kecamatanMap[g.kecamatanId] ?? "Unknown",
        g._count._all,
      ]),
    );
    const [
      uploadSerutiEntri,
      uploadSerutiMasuk,
      uploadSusenasMasuk,
      uploadSusenasEntri,
    ] = await Promise.all([
      prisma.uploadedSerutiEntri.count(),
      prisma.uploadedSerutiMasuk.count(),
      prisma.uploadedSusenasMasuk.count(),
      prisma.uploadedSusenasEntri.count(),
    ]);

    return NextResponse.json(
      {
        uploaded: {
          uploadSerutiEntri,
          uploadSerutiMasuk,
          uploadSusenasMasuk,
          uploadSusenasEntri,
        },
        data: {
          totalSusenasMasuk,
          totalSusenasEntri,
          totalSerutiMasuk,
          totalSerutiEntri,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/dashboard error:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data dashboard" },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { NextResponse } from "next/server";
function slugToTitle(slug: string) {
  return slug
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export async function GET(
  request: Request,
  { params }: { params: Promise<{ kecamatan: string }> },
) {
  try {
    const slug = (await params).kecamatan;

    const namaKecamatan = slugToTitle(slug);
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;
    const total = await prisma.susenasMasuk.count({
      where: {
        kecamatan: {
          kecamatan: namaKecamatan,
        },
      },
    });

    const data = await prisma.susenasMasuk.findMany({
      where: {
        kecamatan: {
          kecamatan: namaKecamatan,
        },
      },
      include: {
        kecamatan: true,
      },
      skip,
      take: limit,
      orderBy: {
        tgl_masuk: "desc",
      },
    });

    return NextResponse.json({
      title: "susenas_masuk",
      nama_kec: namaKecamatan,
      data,
      meta: {
        slug,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Prisma error:", error);

    // Database tidak bisa terkoneksi
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          message: "Database tidak dapat dihubungi",
          error: "DB_CONNECTION_FAILED",
        },
        { status: 503 },
      );
    }

    // Query salah / constraint error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: "Kesalahan query database",
          error: error.code, // contoh: P2002, P2025, dll
        },
        { status: 400 },
      );
    }

    // Error lain (bug, runtime, dll)
    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 },
    );
  }
}

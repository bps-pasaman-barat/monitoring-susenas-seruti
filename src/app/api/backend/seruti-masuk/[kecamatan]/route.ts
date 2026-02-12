import { type NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { slugToTitle } from "@/helper/slug";
import { prisma } from "@/lib/db";

const ORDERABLE_FIELDS = ["nks", "tgl_masuk"] as const;
type OrderableField = (typeof ORDERABLE_FIELDS)[number];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ kecamatan: string }> },
) {
  try {
    const slug = (await params).kecamatan;

    const namaKecamatan = slugToTitle(slug);
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    const orderByParam = searchParams.get("orderBy") as OrderableField | null;
    const orderParam = searchParams.get("order") === "desc" ? "desc" : "asc";

    const orderByField: OrderableField = ORDERABLE_FIELDS.includes(
      orderByParam as OrderableField,
    )
      ? (orderByParam as OrderableField)
      : "nks";

    const orderBy: Record<string, "asc" | "desc"> = {
      [orderByField]: orderParam,
    };
    const total = await prisma.serutiMasuk.count({
      where: {
        kecamatan: {
          kecamatan: namaKecamatan,
        },
      },
    });

    const data = await prisma.serutiMasuk.findMany({
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
      orderBy,
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
        orderBy: orderByField,
        order: orderParam,
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

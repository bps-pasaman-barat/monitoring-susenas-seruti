import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const ORDERABLE_FIELDS = ["filename", "createdAt"] as const;
type OrderableField = (typeof ORDERABLE_FIELDS)[number];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    const orderByParam = searchParams.get("orderBy") as OrderableField | null;
    const orderParam = searchParams.get("order") === "desc" ? "desc" : "asc";

    const orderByField: OrderableField = ORDERABLE_FIELDS.includes(
      orderByParam as OrderableField,
    )
      ? orderByParam!
      : "createdAt";

    const total = await prisma.uploadedSerutiEntri.count();

    const data = await prisma.uploadedSerutiEntri.findMany({
      skip,
      take: limit,
      orderBy: {
        [orderByField]: orderParam,
      },
    });

    return NextResponse.json({
      data,
      meta: {
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

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          message: "Database tidak dapat dihubungi",
          error: "DB_CONNECTION_FAILED",
        },
        { status: 503 },
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: "Kesalahan query database",
          error: error.code,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 },
    );
  }
}

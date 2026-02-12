import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nks: string }> },
) {
  try {
    const nks = (await params).nks;
    const data = await prisma.dataNKS.findFirst({
      where: { nks: nks },
      select: {
        kodeSls: true,
        kodeSubSls: true,
      },
    });
    if (!data) {
      return NextResponse.json(
        { status: "error", message: "Data NKS tidak ditemukan" },
        { status: 404 },
      );
    }
    return NextResponse.json({ status: "success", data });
  } catch (error) {
    console.error("GET /data-nks error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi kesalahan pada aplikasi",
      },
      { status: 500 },
    );
  }
}

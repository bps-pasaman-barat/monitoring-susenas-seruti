import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalEntriSeruti = await prisma.serutiEntri.count();
    const totalMasukSeruti = await prisma.serutiMasuk.count();
    const totalEntriSusenas = await prisma.susenasEntri.count();
    const totalMasukSusenas = await prisma.susenasMasuk.count();

    return NextResponse.json(
      {
        data: {
          seruti: { totalEntriSeruti, totalMasukSeruti },
          susenas: { totalEntriSusenas, totalMasukSusenas },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/backend error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data dashboard",
      },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const filename = (await params).filename;

    const file = await prisma.uploadedSusenasEntri.findUnique({
      where: { filename },
    });

    if (!file) {
      return NextResponse.json(
        { message: "File tidak ditemukan" },
        { status: 404 },
      );
    }

    
    const filePath = path.join(process.cwd(), "public", file.path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.uploadedSusenasEntri.delete({
      where: { filename },
    });

    return NextResponse.json({
      message: "File berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete error:", error);

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
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

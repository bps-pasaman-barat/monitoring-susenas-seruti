import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads-susenas-masuk");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = file.name;
    const filePath = path.join(uploadDir, filename);

    // cek apakah file sudah ada di DB
    const existing = await prisma.uploadedSusenasMasuk.findUnique({
      where: { filename },
    });

    const buffer = Buffer.from(await file.arrayBuffer());

    // writeFileSync otomatis overwrite jika file sudah ada
    fs.writeFileSync(filePath, buffer);

    let result;

    if (existing) {
      // update record lama (opsional, kalau path sama bisa skip update)
      result = await prisma.uploadedSusenasMasuk.update({
        where: { filename },
        data: {
          path: `/uploads-susenas-masuk/${filename}`,
        },
      });
    } else {
      // buat record baru
      result = await prisma.uploadedSusenasMasuk.create({
        data: {
          filename,
          path: `/uploads-susenas-masuk/${filename}`,
        },
      });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

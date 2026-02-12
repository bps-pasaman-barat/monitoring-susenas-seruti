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

    const uploadDir = path.join(process.cwd(), "public/uploads-seruti-masuk");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = file.name;
    const filePath = path.join(uploadDir, filename);

    const existing = await prisma.uploadedSerutiMasuk.findUnique({
      where: { filename },
    });

    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(filePath, buffer);
    let result;
    if (existing) {
      // update record lama (opsional, kalau path sama bisa skip update)
      result = await prisma.uploadedSerutiMasuk.update({
        where: { filename },
        data: {
          path: `/uploads-seruti-masuk/${filename}`,
        },
      });
    } else {
      // buat record baru
      result = await prisma.uploadedSerutiMasuk.create({
        data: {
          filename,
          path: `/uploads-seruti-masuk/${filename}`,
        },
      });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads-susenas-entri");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = file.name;
    const filePath = path.join(uploadDir, filename);

    const existing = await prisma.uploadedSerutiEntri.findUnique({
      where: { filename },
    });

    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(filePath, buffer);
    const result = existing
      ? await prisma.uploadedSerutiEntri.update({
          where: { filename },
          data: {
            path: `/uploads-seruti-entri/${filename}`,
          },
        })
      : await prisma.uploadedSerutiEntri.create({
          data: {
            filename,
            path: `/uploads-seruti-entri/${filename}`,
          },
        });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

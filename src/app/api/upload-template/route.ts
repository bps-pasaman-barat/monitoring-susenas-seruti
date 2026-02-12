import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const saved = await prisma.uploadedTemplate.create({
      data: {
        filename,
        path: `/uploads/${filename}`,
      },
    });

    return NextResponse.json(saved);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const files = await prisma.uploadedTemplate.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(files);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 },
    );
  }
}

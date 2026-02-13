import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export async function GET(_request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({
        error: "you have not access to this resource",
        status: 403,
      });
    }
    if (session.role !== "admin") {
      return NextResponse.json({
        error: "you have not access to this resource you are not admin btw",
        status: 403,
      });
    }

    const totalUser = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    return NextResponse.json({
      data: totalUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, role } = body ?? {};

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { error: "Username sudah dipakai" },
        { status: 409 },
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashed, role: role ?? "user" },
    });

    return NextResponse.json(
      { data: { id: user.id, username: user.username, role: user.role } },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

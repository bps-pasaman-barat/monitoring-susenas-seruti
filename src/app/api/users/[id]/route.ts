/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await request.json().catch(() => ({}));
    const { role, password } = body ?? {};

    // biome-ignore lint/suspicious/noExplicitAny: dynamic update object
    const data: any = {};
    if (role) data.role = role;
    if (password) data.password = await bcrypt.hash(password, 10);

    if (!Object.keys(data).length) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({ where: { id }, data });

    return NextResponse.json(
      { data: { id: user.id, username: user.username, role: user.role } },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

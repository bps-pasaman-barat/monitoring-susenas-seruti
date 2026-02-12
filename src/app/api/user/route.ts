/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const totalUser = await prisma.user.count();
    return NextResponse.json({
      data: totalUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

import { kecamatan } from "@/constants";
import {
  generateSerutiEntri,
  generateSerutiMasuk,
  generateSusenasEntri,
  generateSusenasMasuk,
} from "@/data-example";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  /**
   * Seed user
   *
   */

  // ambil semua id kecamatan yg valid
  // const kecamatanIds = (
  //   await prisma.kecamatan.findMany({
  //     select: { id: true },
  //   })
  // ).map((k) => k.id);

  const hashedPassword = await bcrypt.hash("useradmin", 10);

  await prisma.user.createMany({
    data: {
      username: "useradmin",
      password: hashedPassword,
    },
    skipDuplicates: true,
  });

  const kecamatans = kecamatan.map((data) => ({
    id: data.key,
    kecamatan: data.label,
  }));
  await prisma.kecamatan.createMany({
    data: kecamatans,
  });
  // await prisma.susenasEntri.createMany({
  //   data: generateSusenasEntri(500, kecamatanIds),
  //   skipDuplicates: true,
  // });

  // await prisma.serutiEntri.createMany({
  //   data: generateSerutiEntri(500, kecamatanIds),
  //   skipDuplicates: true,
  // });

  // await prisma.susenasMasuk.createMany({
  //   data: generateSusenasMasuk(500, kecamatanIds),
  //   skipDuplicates: true,
  // });

  // await prisma.serutiMasuk.createMany({
  //   data: generateSerutiMasuk(500, kecamatanIds),
  //   skipDuplicates: true,
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

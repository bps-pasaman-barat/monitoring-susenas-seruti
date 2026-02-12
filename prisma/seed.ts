import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";
import { kecamatan, wilayah } from "../constants/index";
import {
  generateSerutiEntri,
  generateSerutiMasuk,
  generateSusenasEntri,
  generateSusenasMasuk,
} from "../data-example";
import { DATA_AWAL_SLS } from "../data-example/sls";

async function main() {
  /**
   * Seed user
   *
   */

  /* Create Users */
  const hashedPasswordAdmin = await bcrypt.hash("useradmin", 10);
  const hashedPasswordUser = await bcrypt.hash("user", 10);

  await prisma.user.upsert({
    where: { username: "useradmin" },
    update: { role: "admin", password: hashedPasswordAdmin },
    create: {
      username: "useradmin",
      password: hashedPasswordAdmin,
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { username: "user" },
    update: { role: "user", password: hashedPasswordUser },
    create: {
      username: "user",
      password: hashedPasswordUser,
      role: "user",
    },
  });

  /* Create Kecamatans first */
  const kecamatans = kecamatan.map((data) => ({
    id: data.key,
    kecamatan: data.label,
  }));
  await prisma.kecamatan.createMany({
    data: kecamatans,
    skipDuplicates: true,
  });

  // ambil semua id kecamatan yg valid
  const kecamatanIds = (
    await prisma.kecamatan.findMany({
      select: { id: true },
    })
  ).map((k) => k.id);

  await prisma.dataNKS.createMany({
    data: DATA_AWAL_SLS,
    skipDuplicates: true,
  });
  await prisma.susenasEntri.createMany({
    data: generateSusenasEntri(500, kecamatanIds),
    skipDuplicates: true,
  });

  await prisma.serutiEntri.createMany({
    data: generateSerutiEntri(500, kecamatanIds),
    skipDuplicates: true,
  });

  await prisma.susenasMasuk.createMany({
    data: generateSusenasMasuk(500, kecamatanIds),
    skipDuplicates: true,
  });

  await prisma.serutiMasuk.createMany({
    data: generateSerutiMasuk(500, kecamatanIds),
    skipDuplicates: true,
  });
  for (const k of kecamatan) {
    await prisma.defaultKecamatan.upsert({
      where: { nama: k.label.toUpperCase() },
      update: {},
      create: {
        nama: k.label.toUpperCase(),
      },
    });
  }

  for (const w of wilayah) {
    const kecamatan = await prisma.defaultKecamatan.findUnique({
      where: { nama: w.kecamatan.toUpperCase() },
    });

    if (!kecamatan) {
      console.warn(`Kecamatan ${w.kecamatan} tidak ditemukan`);
      continue;
    }

    for (const n of w.nagari) {
      await prisma.defaultNagari.upsert({
        where: {
          nama_kecamatanId: {
            nama: n.nama.toUpperCase(),
            kecamatanId: kecamatan.id,
          },
        },
        update: {},
        create: {
          nama: n.nama.toUpperCase(),
          kecamatanId: kecamatan.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

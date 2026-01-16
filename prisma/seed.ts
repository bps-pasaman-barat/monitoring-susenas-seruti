import {
  serutiEntriData,
  serutiMasukData,
  susenasEntriData,
  susenasMasukData,
} from "@/data-example";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
const kecamatanList = Array.from(
  { length: 100 },
  (_, i) => `Kecamatan Dummy ${i + 1}`
);

type HasWilayah = {
  kecamatan: string;
  sls: string;
  kode_sls_subsls: string;
  nks: string;
  no_ruta: string;
};

function expandWithDifferentKecamatan<T extends HasWilayah>(
  baseData: T[],
  kecamatanList: string[]
): T[] {
  return kecamatanList.flatMap((kecamatan, index) =>
    baseData.map((item) => ({
      ...item,
      kecamatan,
      sls: `${item.sls}-${index + 1}`,
      kode_sls_subsls: `${item.kode_sls_subsls}-${index + 1}`,
      nks: `${item.nks}-${index + 1}`,
      no_ruta: `${item.no_ruta}-${index + 1}`,
    }))
  );
}

async function main() {
  const hashedPassword = await bcrypt.hash("useradmin", 10);

  await prisma.user.createMany({
    data: {
      username: "useradmin",
      password: hashedPassword,
    },
    skipDuplicates: true,
  });

  const susenasEntriExpanded = expandWithDifferentKecamatan(
    susenasEntriData,
    kecamatanList
  );

  const serutiEntriExpanded = expandWithDifferentKecamatan(
    serutiEntriData,
    kecamatanList
  );

  const susenasMasukExpanded = expandWithDifferentKecamatan(
    susenasMasukData,
    kecamatanList
  );

  const serutiMasukExpanded = expandWithDifferentKecamatan(
    serutiMasukData,
    kecamatanList
  );

  await prisma.susenasEntri.createMany({
    data: susenasEntriExpanded,
    skipDuplicates: true,
  });

  await prisma.serutiEntri.createMany({
    data: serutiEntriExpanded,
    skipDuplicates: true,
  });

  await prisma.susenasMasuk.createMany({
    data: susenasMasukExpanded,
    skipDuplicates: true,
  });

  await prisma.serutiMasuk.createMany({
    data: serutiMasukExpanded,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

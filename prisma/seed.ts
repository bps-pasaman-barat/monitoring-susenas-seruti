import { keteranganPerkara, perkara_cerai } from "@/constant/data";
import { jenisPenyakitDinkes } from "@/constant/dinkes.opd";
import { kecamatan, nagari, parpol } from "@/constant/menu";
import { tahun } from "@/constant/menu.opd";
import { durasi_tahanan, jenis_tindak_pidana } from "@/constant/menu.vertikal";
import { gangguanKamtibmas, pangkat } from "@/constant/polisi_resort.vertikal";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("useradmin", 10);
  const kecamatanLower = kecamatan.map((k) => ({
    id: k.key,
    label: k.label.toLowerCase(),
  }));
  const tahuns = tahun.map((k) => ({
    id: k.key,
    label: k.label,
  }));
  const penyakit_dinkes = tahun.map((k) => ({
    id: k.key,
    label: k.label,
  }));
  const ketPerkara = keteranganPerkara.map((d) => ({
    id: d.key,
    jenis: d.label.toLocaleLowerCase(),
  }));
  const parpols = parpol.map((d) => ({
    id: d.key,
    label: d.label.toLocaleLowerCase(),
  }));
  const gangguanKamtibmase = gangguanKamtibmas.map((d) => ({
    id: d.key,
    label: d.label.toLocaleLowerCase(),
  }));
  const pangkats = pangkat.map((d) => ({
    id: d.key,
    label: d.label.toLocaleLowerCase(),
  }));
  const lapas_durasi = durasi_tahanan.map((d) => ({
    id: d.key,
    label: d.label.toLocaleLowerCase(),
  }));
  const jenis_pidana = jenis_tindak_pidana.map((d) => ({
    id: d.key,
    label: d.label.toLocaleLowerCase(),
  }));
  const jenis_cerai = perkara_cerai.map((d) => ({
    id: d.key,
    label: d.label.toLocaleLowerCase(),
  }));

  await prisma.gangguanKamtibnas.createMany({
    data: gangguanKamtibmase,
    skipDuplicates: true,
  });
  await prisma.tahunDispen.createMany({
    data: tahuns,
    skipDuplicates: true,
  });

  await prisma.pangkatPolisi.createMany({
    data: pangkats,
    skipDuplicates: true,
  });

  await prisma.penyakitDinkes.createMany({
    data: penyakit_dinkes,
    skipDuplicates: true,
  });

  await prisma.jenisPerkaraCerai.createMany({
    data: jenis_cerai,
    skipDuplicates: true,
  });
  await prisma.keteranganPerkara.createMany({
    data: ketPerkara,
    skipDuplicates: true,
  });

  await prisma.jenisTindakPidana.createMany({
    data: jenis_pidana,
    skipDuplicates: true,
  });

  await prisma.durasiTahanan.createMany({
    data: lapas_durasi,
    skipDuplicates: true,
  });
  await prisma.parpolList.createMany({
    data: parpols,
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: {
      username: "useradmin",
      password: hashedPassword,
    },
    skipDuplicates: true,
  });
  const NagariLower = nagari.map((k) => ({
    id: k.key,
    label: k.label.toLowerCase(),
  }));

  await prisma.namaKecamatan.createMany({
    data: kecamatanLower,
    skipDuplicates: true,
  });
  await prisma.namaNagari.createMany({
    data: NagariLower,
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

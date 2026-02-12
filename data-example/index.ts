import { faker } from "@faker-js/faker";

/* =========================
   Helper umum
========================= */

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumeric(length: number): string {
  return faker.string.numeric(length);
}

/* =========================
   Ambil kecamatanId random
========================= */

function randomKecamatanId(kecamatanIds: number[]): number {
  return randomFrom(kecamatanIds);
}

/* =========================
   Generator SUSENAS ENTRI
========================= */

export function generateSusenasEntri(count: number, kecamatanIds: number[]) {
  return Array.from({ length: count }).map(() => ({
    provinsi: "Sumatera Barat",
    kabupaten: "Pasaman Barat",

    kecamatanId: randomKecamatanId(kecamatanIds),

    nagari: faker.location.city(),
    sls: randomNumeric(2),
    kode_sls_subsls: randomNumeric(4),
    nks: randomNumeric(6),
    no_ruta: randomNumeric(3),
    nama_petugas_entri: faker.person.fullName(),
    tgl_entri: faker.date.between({
      from: "2026-01-01",
      to: "2026-03-01",
    }),
  }));
}

/* =========================
   Generator SERUTI ENTRI
========================= */

export function generateSerutiEntri(count: number, kecamatanIds: number[]) {
  return Array.from({ length: count }).map(() => ({
    provinsi: "Sumatera Barat",
    kabupaten: "Pasaman Barat",

    kecamatanId: randomKecamatanId(kecamatanIds),

    nagari: faker.location.city(),
    sls: randomNumeric(2),
    kode_sls_subsls: randomNumeric(4),
    nks: randomNumeric(7),
    no_ruta: randomNumeric(3),
    nama_petugas_entri: faker.person.fullName(),
    tgl_entri: faker.date.between({
      from: "2026-01-01",
      to: "2026-03-01",
    }),
  }));
}

/* =========================
   Generator SUSENAS MASUK
========================= */

export function generateSusenasMasuk(count: number, kecamatanIds: number[]) {
  return Array.from({ length: count }).map(() => ({
    provinsi: "Sumatera Barat",
    kabupaten: "Pasaman Barat",

    kecamatanId: randomKecamatanId(kecamatanIds),

    nagari: faker.location.city(),
    sls: randomNumeric(2),
    kode_sls_subsls: randomNumeric(4),
    nks: randomNumeric(6),
    nama_PML: faker.person.fullName(),
    nama_PPL: faker.person.fullName(),
    no_ruta: randomNumeric(3),
    tgl_masuk: faker.date.between({
      from: "2026-01-01",
      to: "2026-03-01",
    }),
  }));
}

/* =========================
   Generator SERUTI MASUK
========================= */

export function generateSerutiMasuk(count: number, kecamatanIds: number[]) {
  return Array.from({ length: count }).map(() => ({
    provinsi: "Sumatera Barat",
    kabupaten: "Pasaman Barat",

    kecamatanId: randomKecamatanId(kecamatanIds),

    nagari: faker.location.city(),
    sls: randomNumeric(2),
    kode_sls_subsls: randomNumeric(4),
    nks: randomNumeric(7),
    nama_PML: faker.person.fullName(),
    nama_PPL: faker.person.fullName(),
    no_ruta: randomNumeric(3),
    tgl_masuk: faker.date.between({
      from: "2026-01-01",
      to: "2026-03-01",
    }),
  }));
}

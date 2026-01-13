import * as XLSX from "xlsx-js-style";
import {
  BpjsKecamatan,
  BpjsKelompokKecamatan,
} from "@/lib/generated/prisma/client";

export function exportBpjsToExcel(
  dataKecamatan: BpjsKecamatan[],
  dataKelompok: BpjsKelompokKecamatan[],
  fileName = "BPJS.xlsx"
) {
  const workbook = XLSX.utils.book_new();

  // === Sheet Kecamatan ===
  const sheetKecamatan = dataKecamatan.map((item) => ({
    Kecamatan: item.kecamatan,
    KelasI: item.kelasI,
    KelasII: item.kelasII,
    KelasIII: item.kelasIII,
    Jumlah: item.jumlah,
  }));

  const totalKecamatan = dataKecamatan.reduce(
    (acc, curr) => ({
      KelasI: acc.KelasI + curr.kelasI,
      KelasII: acc.KelasII + curr.kelasII,
      KelasIII: acc.KelasIII + curr.kelasIII,
      Jumlah: acc.Jumlah + curr.jumlah,
    }),
    { KelasI: 0, KelasII: 0, KelasIII: 0, Jumlah: 0 }
  );

  sheetKecamatan.push({ Kecamatan: "Total", ...totalKecamatan });

  const ws1 = XLSX.utils.json_to_sheet(sheetKecamatan);
  XLSX.utils.book_append_sheet(workbook, ws1, "Kecamatan");

  // === Sheet Kelompok ===
  const sheetKelompok = dataKelompok.map((item) => ({
    Kecamatan: item.kecamatan,
    NonPBI: item.non_pbi,
    PBI: item.pbi,
    Jumlah: item.jumlah,
  }));

  const totalKelompok = dataKelompok.reduce(
    (acc, curr) => ({
      NonPBI: acc.NonPBI + curr.non_pbi,
      PBI: acc.PBI + curr.pbi,
      Jumlah: acc.Jumlah + curr.jumlah,
    }),
    { NonPBI: 0, PBI: 0, Jumlah: 0 }
  );

  sheetKelompok.push({ Kecamatan: "Total", ...totalKelompok });

  const ws2 = XLSX.utils.json_to_sheet(sheetKelompok);
  XLSX.utils.book_append_sheet(workbook, ws2, "Kelompok");

  XLSX.writeFile(workbook, fileName);
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as XLSX from "xlsx-js-style";
export interface SheetData {
  sheetName: string;
  data: Record<string, any>[];
  totalFields?: string[];
}
export function exportToExcel(sheets: SheetData[], fileName: string) {
  const workbook = XLSX.utils.book_new();

  sheets.forEach((sheet) => {
    const { sheetName, data, totalFields } = sheet;
    const sheetData = [...data];

    if (totalFields && totalFields.length > 0 && data.length > 0) {
      const totalRow: Record<string, any> = {};

      // hitung total kolom numerik
      totalFields.forEach((key) => {
        totalRow[key] = data.reduce(
          (sum, row) => sum + (Number(row[key]) || 0),
          0
        );
      });

      // kolom label prioritas
      const labelKeys = ["Bulan", "Uraian", "Fasilitas"];
      const labelKey = labelKeys.find((key) => key in data[0]);

      if (labelKey) {
        totalRow[labelKey] = "Total";
      }

      sheetData.push(totalRow);
    }

    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);
  });

  XLSX.writeFile(workbook, fileName);
}

// import { z } from "zod";

// export const excelRowSchema = z.object({
//   kode_prop: z.string().regex(/^\d{2}$/, "Kode prop harus 2 digit"),
//   kode_kab: z.string().regex(/^\d{2}$/, "Kode kab harus 2 digit"),
//   kode_nks: z.string().regex(/^\d{5}$/, "Kode NKS harus 5 digit"),
//   no_urut_ruta: z.string().regex(/^\d{1,2}$/, "No urut max 2 digit"),
//   sudah_selesai: z.enum(["sudah", "belum"]),
//   nama_pml: z.string().min(1),
//   nama_ppl: z.string().min(1),
//   tanggal_pemasukan: z.coerce.date(),
// });

// export const excelSchema = z.array(excelRowSchema);

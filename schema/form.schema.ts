import z from "zod";

export const SerutiSchemaEntri = z.object({
  provinsi: z.string().min(1, "wajib di isi"),
  kabupaten: z.string().min(1, "wajib di isi"),
  kecamatan: z.string().min(1, "wajib di isi"),
  nagari: z.string().min(1, "wajib di isi"),
  sls: z.string().min(1, "wajib di isi"),
  kode_sls_subsls: z.string().min(1, "wajib di isi"),
  nks: z.string().min(1, "wajib di isi"),
  no_ruta: z.string().min(1, "wajib di isi"),
  nama_petugas_entri: z.string().min(1, "wajib di isi"),
  tgl_entri: z.date(),
});

export type SerutiEntriForm = z.infer<typeof SerutiSchemaEntri>;
export const SerutiSchemaMasuk = z.object({
  provinsi: z.string().min(1, "wajib di isi"),
  kabupaten: z.string().min(1, "wajib di isi"),
  kecamatan: z.string().min(1, "wajib di isi"),
  nagari: z.string().min(1, "wajib di isi"),
  sls: z.string().min(1, "wajib di isi"),
  kode_sls_subsls: z.string().min(1, "wajib di isi"),
  nks: z.string().min(1, "wajib di isi"),
  nama_PML: z.string().min(1, "wajib di isi"),
  nama_PPL: z.string().min(1, "wajib di isi"),
  no_ruta: z.string().min(1, "wajib di isi"),
  tgl_masuk: z.date(),
});

export type SerutiMasukForm = z.infer<typeof SerutiSchemaMasuk>;

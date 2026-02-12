import z from "zod";

export const SerutiSchemaEntri = z.object({
  provinsi: z.string().min(1, "wajib di isi"),
  kabupaten: z.string().min(1, "wajib di isi"),
  kecamatanId: z.number().int().positive(),
  nagari: z.string().min(1, "wajib di isi"),
  sls: z.string().min(1, "wajib di isi").max(4, "harus 4 digit"),
  kode_sls_subsls: z.string().min(1, "wajib di isi").max(2, "harus 4 digit"),
  nks: z.string().min(1, "wajib di isi"),
  no_ruta: z.string().min(1, "wajib di isi").max(2, "harus 2 digit"),
  nama_petugas_entri: z.string().min(1, "wajib di isi"),
  tgl_entri: z.date(),
});

export type SerutiEntriForm = z.infer<typeof SerutiSchemaEntri>;

export const SusenasSchemaEntri = SerutiSchemaEntri;
export type SusenasEntriForm = z.infer<typeof SusenasSchemaEntri>;

export const SerutiSchemaMasuk = z.object({
  provinsi: z.string().min(1, "wajib di isi"),
  kabupaten: z.string().min(1, "wajib di isi"),
  kecamatanId: z.number().int().positive(),
  nagari: z.string().min(1, "wajib di isi"),
  sls: z.string().min(1, "wajib di isi").max(4, "harus 4 digit"),
  kode_sls_subsls: z.string().min(1, "wajib di isi").max(2, "harus 4 digit"),
  nks: z.string().min(1, "wajib di isi"),
  nama_PML: z.string().min(1, "wajib di isi"),
  nama_PPL: z.string().min(1, "wajib di isi"),
  no_ruta: z.string().min(1, "wajib di isi").max(2, "harus 2 digit"),
  tgl_masuk: z.date(),
});

export type SerutiMasukForm = z.infer<typeof SerutiSchemaMasuk>;

export const SusenasMasukSchema = SerutiSchemaMasuk;
export type SusenasMasukForm = z.infer<typeof SusenasMasukSchema>;

export type Kecamatan = {
  id: number;
  kecamatan: string;
};

// "id": 14,
// "kecamatanId": 1,
// "provinsi": "Sumatera Barat",
// "kabupaten": "Pasaman Barat",
// "nagari": "Ornfort",
// "sls": "37",
// "kode_sls_subsls": "9509",
// "nks": "279156",
// "no_ruta": "419",
// "nama_petugas_entri": "Mr. Abel Strosin-Robel PhD",
// "tgl_entri": "2026-02-28T05:49:34.085Z",
// "kecamatan": {
// 	"id": 1,
// 	"kecamatan": "Sungai Beremas"
// }

export type SusenasEntriItem = {
  id: number;
  kecamatanId: number;
  provinsi: string;
  kabupaten: string;
  nagari: string;
  sls: string;
  kode_sls_subsls: string;
  nks: string;
  nama_petugas_entri: string;
  no_ruta: string;
  tgl_entri: string;
  kecamatan: Kecamatan;
};
export type SusenasMasukItem = {
  id: number;
  kecamatanId: number;
  provinsi: string;
  kabupaten: string;
  nagari: string;
  sls: string;
  kode_sls_subsls: string;
  nks: string;
  nama_PML: string;
  nama_PPL: string;
  no_ruta: string;
  tgl_masuk: string;
  kecamatan: Kecamatan;
};

export type SusenasMasukResponse = {
  title: string;
  nama_kec: string;
  data: SusenasMasukItem[];
  meta: {
    slug: string;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
export type SusenasEntriResponse = {
  title: string;
  nama_kec: string;
  data: SusenasEntriItem[];
  meta: {
    slug: string;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

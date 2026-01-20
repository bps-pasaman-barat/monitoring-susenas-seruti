
export type Kecamatan = {
  id: number;
  kecamatan: string;
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
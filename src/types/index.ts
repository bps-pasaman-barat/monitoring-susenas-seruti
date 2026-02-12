export type Kecamatan = {
  id: number;
  kecamatan: string;
};

export type UploadedFile = {
  id: number;
  filename: string;
  path: string;
  createdAt: string;
};
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

export type SerutiMasukResponse = SusenasMasukResponse;
export type SerutiEntriResponse = SusenasEntriResponse;
type BaseUpload = {
  id: string;
  filename: string;
  path: string;
  createdAt: string;
};
export type UploadSusenasEntriResponse = {
  data: BaseUpload[];
  meta: {
    slug: string;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

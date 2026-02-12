export const kecamatan: { key: number; label: string }[] = [
  {
    key: 1,
    label: "Sungai Beremas",
  },
  {
    key: 2,

    label: "Ranah Batahan",
  },
  {
    key: 3,
    label: "Koto Balingka",
  },
  {
    key: 4,
    label: "Sungai Aur",
  },
  {
    key: 5,
    label: "Lembah Malintang",
  },
  {
    key: 6,
    label: "Gunung Tuleh",
  },
  {
    key: 7,
    label: "Talamau",
  },
  {
    key: 8,
    label: "Pasaman",
  },
  {
    key: 9,
    label: "Luhak Nan Duo",
  },
  {
    key: 10,
    label: "Sasak Ranah Pasisie",
  },
  {
    key: 11,
    label: "Kinali",
  },
];

type Nagari = {
  nama: string;
};
export type Wilayah = {
  kecamatan: string;
  nagari: Nagari[];
};

export const wilayah: Wilayah[] = [
  {
    kecamatan: "SUNGAI BEREMAS",
    nagari: [{ nama: "AIA BANGIH" }],
  },
  {
    kecamatan: "RANAH BATAHAN",
    nagari: [
      { nama: "DESA BARU" },
      { nama: "BATAHAN" },
      { nama: "DESA BARU BARAT" },
      { nama: "BATAHAN UTARA" },
      { nama: "BATAHAN TENGAH" },
      { nama: "BATAHAN BARAT" },
      { nama: "BATAHAN SELATAN" },
    ],
  },
  {
    kecamatan: "KOTO BALINGKA",
    nagari: [
      { nama: "PARIK" },
      { nama: "KOTO TANGAH" },
      { nama: "KOTO TUO" },
      { nama: "KOTO NAN DUO" },
      { nama: "PAMATANG PANJANG" },
      { nama: "RANAH KOTO TINGGI" },
    ],
  },
  {
    kecamatan: "SUNGAI AUR",
    nagari: [
      { nama: "SUNGAI AUA" },
      { nama: "SALINGKA MUARO" },
      { nama: "RANAH MALINTANG" },
      { nama: "RANAH AIR HAJI" },
      { nama: "KASIK PUTIH SUNGAI TANANG" },
      { nama: "AUA SERUMPUN" },
      { nama: "SIKILANG SUNGAI AUR SELATAN" },
    ],
  },
  {
    kecamatan: "LEMBAH MALINTANG",
    nagari: [
      { nama: "UJUANG GADIANG" },
      { nama: "BRASTAGI UJUANG GADIANG" },
      { nama: "TAMPUS DAMAI UJUANG GADIANG" },
      { nama: "TALUAK AMBUN UJUANG GADIANG" },
      { nama: "KOTO GUNUNG UJUANG GADIANG" },
      { nama: "KOTO SAWAH UJUANG GADIANG" },
      { nama: "SALIDO SAROHA UJUANG GADIANG" },
      { nama: "KUAMANG ALAI UJUANG GADIANG" },
      { nama: "SITUAK UJUANG GADIANG" },
    ],
  },
  {
    kecamatan: "GUNUNG TULEH",
    nagari: [
      { nama: "MUARO KIAWAI" },
      { nama: "RABI JONGOR" },
      { nama: "MUARO KIAWAI BARAT" },
      { nama: "MUARO KIAWAI HILIR" },
      { nama: "SEBERANG KENAIKAN" },
      { nama: "BAHORAS" },
      { nama: "RANAH SUNGAI MAGELANG" },
    ],
  },
  {
    kecamatan: "TALAMAU",
    nagari: [
      { nama: "KAJAI" },
      { nama: "TALU" },
      { nama: "SINURUIK" },
      { nama: "SIMPANG TIMBO ABU KAJAI" },
      { nama: "KAJAI SELATAN" },
      { nama: "SUNGAI JANIAH TALU" },
      { nama: "TABEK SIRAH TALU" },
    ],
  },
  {
    kecamatan: "PASAMAN",
    nagari: [
      { nama: "LINGKUANG AUA" },
      { nama: "AUA KUNIANG" },
      { nama: "AIA GADANG" },
      { nama: "LINGKUANG AUA TIMUR" },
      { nama: "LINGKUANG AUA BARU" },
      { nama: "LINGKUANG AUA BANDAREJO" },
      { nama: "LINGKUANG AUA JAMBAK" },
      { nama: "LINGKUANG AUA DALAM" },
      { nama: "LINGKUANG AUA BARAT" },
      { nama: "LINGKUANG AUA HILIA" },
      { nama: "PINAGA AUA KUNIANG" },
      { nama: "SUKOMANANTI AUA KUNIANG" },
      { nama: "LUBUAK LANDUA AUA KUNIANG" },
      { nama: "LEMBAH BINUANG AUA KUNIANG" },
      { nama: "AIA GADANG TIMUR" },
      { nama: "AIA GADANG BARAT" },
    ],
  },
  {
    kecamatan: "LUHAK NAN DUO",
    nagari: [
      { nama: "KOTO BARU" },
      { nama: "KAPA" },
      { nama: "GIRI MAJU" },
      { nama: "OPHIR" },
      { nama: "MAHAKARYA" },
      { nama: "SARIAK" },
      { nama: "SUNGAI TALANG" },
      { nama: "JAMBAK SELATAN" },
      { nama: "PUJO RAHAYU" },
    ],
  },
  {
    kecamatan: "SASAK RANAH PASISIE",
    nagari: [
      { nama: "SASAK" },
      { nama: "PADANG HARAPAN" },
      { nama: "RANAH PASISIE" },
      { nama: "MALIGI" },
    ],
  },
  {
    kecamatan: "KINALI",
    nagari: [
      { nama: "KATIAGAN" },
      { nama: "KINALI" },
      { nama: "AMPEK KOTO" },
      { nama: "AMPEK KOTO BARAT" },
      { nama: "BANCAH KARIANG" },
      { nama: "MUDIAK LABUAH" },
      { nama: "TANDIKEK" },
      { nama: "LANGGAM SEPAKAT" },
      { nama: "LANGGAM SAIYO" },
      { nama: "ANAM KOTO UTARA" },
      { nama: "ANAM KOTO SELATAN" },
      { nama: "SIGUNANTI" },
      { nama: "BANDUA BALAI" },
      { nama: "BUNUIK" },
      { nama: "PADANG CANDUAH" },
      { nama: "LIMAU PURUIK" },
      { nama: "KOTO GADANG JAYA" },
    ],
  },
];

-- CreateTable
CREATE TABLE "Kecamatan" (
    "id" SERIAL NOT NULL,
    "kecamatan" TEXT NOT NULL,

    CONSTRAINT "Kecamatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seruti_entri" (
    "id" SERIAL NOT NULL,
    "kecamatanId" INTEGER NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "nagari" TEXT NOT NULL,
    "sls" TEXT NOT NULL,
    "kode_sls_subsls" TEXT NOT NULL,
    "nks" TEXT NOT NULL,
    "no_ruta" TEXT NOT NULL,
    "nama_petugas_entri" TEXT NOT NULL,
    "tgl_entri" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seruti_entri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seruti_masuk" (
    "id" SERIAL NOT NULL,
    "kecamatanId" INTEGER NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "nagari" TEXT NOT NULL,
    "sls" TEXT NOT NULL,
    "kode_sls_subsls" TEXT NOT NULL,
    "nks" TEXT NOT NULL,
    "nama_PML" TEXT NOT NULL,
    "nama_PPL" TEXT NOT NULL,
    "no_ruta" TEXT NOT NULL,
    "tgl_masuk" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seruti_masuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "susenas_entri" (
    "id" SERIAL NOT NULL,
    "kecamatanId" INTEGER NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "nagari" TEXT NOT NULL,
    "sls" TEXT NOT NULL,
    "kode_sls_subsls" TEXT NOT NULL,
    "nks" TEXT NOT NULL,
    "no_ruta" TEXT NOT NULL,
    "nama_petugas_entri" TEXT NOT NULL,
    "tgl_entri" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "susenas_entri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "susenas_masuk" (
    "id" SERIAL NOT NULL,
    "kecamatanId" INTEGER NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "nagari" TEXT NOT NULL,
    "sls" TEXT NOT NULL,
    "kode_sls_subsls" TEXT NOT NULL,
    "nks" TEXT NOT NULL,
    "nama_PML" TEXT NOT NULL,
    "nama_PPL" TEXT NOT NULL,
    "no_ruta" TEXT NOT NULL,
    "tgl_masuk" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "susenas_masuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kecamatan_kecamatan_key" ON "Kecamatan"("kecamatan");

-- CreateIndex
CREATE UNIQUE INDEX "seruti_entri_nks_key" ON "seruti_entri"("nks");

-- CreateIndex
CREATE UNIQUE INDEX "seruti_masuk_nks_key" ON "seruti_masuk"("nks");

-- CreateIndex
CREATE UNIQUE INDEX "susenas_entri_nks_key" ON "susenas_entri"("nks");

-- CreateIndex
CREATE UNIQUE INDEX "susenas_masuk_nks_key" ON "susenas_masuk"("nks");

-- AddForeignKey
ALTER TABLE "seruti_entri" ADD CONSTRAINT "seruti_entri_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seruti_masuk" ADD CONSTRAINT "seruti_masuk_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "susenas_entri" ADD CONSTRAINT "susenas_entri_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "susenas_masuk" ADD CONSTRAINT "susenas_masuk_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

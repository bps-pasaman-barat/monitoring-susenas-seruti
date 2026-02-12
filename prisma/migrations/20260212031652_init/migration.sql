-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DefaultKecamatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DefaultKecamatan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DefaultNagari` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `kecamatanId` INTEGER NOT NULL,

    INDEX `DefaultNagari_kecamatanId_idx`(`kecamatanId`),
    UNIQUE INDEX `DefaultNagari_nama_kecamatanId_key`(`nama`, `kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kecamatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kecamatan_kecamatan_key`(`kecamatan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nagari` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `kecamatanId` INTEGER NOT NULL,

    INDEX `Nagari_kecamatanId_idx`(`kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SerutiEntri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatanId` INTEGER NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `kabupaten` VARCHAR(191) NOT NULL,
    `nagari` VARCHAR(191) NOT NULL,
    `sls` VARCHAR(191) NOT NULL,
    `kode_sls_subsls` VARCHAR(191) NOT NULL,
    `nks` VARCHAR(191) NOT NULL,
    `no_ruta` VARCHAR(191) NOT NULL,
    `nama_petugas_entri` VARCHAR(191) NOT NULL,
    `tgl_entri` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SerutiEntri_nks_key`(`nks`),
    INDEX `SerutiEntri_kecamatanId_idx`(`kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SerutiMasuk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatanId` INTEGER NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `kabupaten` VARCHAR(191) NOT NULL,
    `nagari` VARCHAR(191) NOT NULL,
    `sls` VARCHAR(191) NOT NULL,
    `kode_sls_subsls` VARCHAR(191) NOT NULL,
    `nks` VARCHAR(191) NOT NULL,
    `nama_PML` VARCHAR(191) NOT NULL,
    `nama_PPL` VARCHAR(191) NOT NULL,
    `no_ruta` VARCHAR(191) NOT NULL,
    `tgl_masuk` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SerutiMasuk_nks_key`(`nks`),
    INDEX `SerutiMasuk_kecamatanId_idx`(`kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SusenasEntri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatanId` INTEGER NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `kabupaten` VARCHAR(191) NOT NULL,
    `nagari` VARCHAR(191) NOT NULL,
    `sls` VARCHAR(191) NOT NULL,
    `kode_sls_subsls` VARCHAR(191) NOT NULL,
    `nks` VARCHAR(191) NOT NULL,
    `no_ruta` VARCHAR(191) NOT NULL,
    `nama_petugas_entri` VARCHAR(191) NOT NULL,
    `tgl_entri` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SusenasEntri_nks_key`(`nks`),
    INDEX `SusenasEntri_kecamatanId_idx`(`kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SusenasMasuk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatanId` INTEGER NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `kabupaten` VARCHAR(191) NOT NULL,
    `nagari` VARCHAR(191) NOT NULL,
    `sls` VARCHAR(191) NOT NULL,
    `kode_sls_subsls` VARCHAR(191) NOT NULL,
    `nks` VARCHAR(191) NOT NULL,
    `nama_PML` VARCHAR(191) NOT NULL,
    `nama_PPL` VARCHAR(191) NOT NULL,
    `no_ruta` VARCHAR(191) NOT NULL,
    `tgl_masuk` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SusenasMasuk_nks_key`(`nks`),
    INDEX `SusenasMasuk_kecamatanId_idx`(`kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UploadedTemplate_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedSusenasMasuk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UploadedSusenasMasuk_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedSerutiMasuk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UploadedSerutiMasuk_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedSusenasEntri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UploadedSusenasEntri_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedSerutiEntri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UploadedSerutiEntri_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataNKS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kodeProvinsi` VARCHAR(191) NOT NULL,
    `kodeKabupaten` VARCHAR(191) NOT NULL,
    `kodeKecamatan` VARCHAR(191) NOT NULL,
    `kodeNagari` VARCHAR(191) NOT NULL,
    `namaProvinsi` VARCHAR(191) NOT NULL,
    `namaKabupaten` VARCHAR(191) NOT NULL,
    `namaKecamatan` VARCHAR(191) NOT NULL,
    `namaNagari` VARCHAR(191) NOT NULL,
    `kodeSls` VARCHAR(191) NOT NULL,
    `kodeSubSls` VARCHAR(191) NOT NULL,
    `nks` VARCHAR(191) NOT NULL,
    `namaSls` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DataNKS_nks_key`(`nks`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DefaultNagari` ADD CONSTRAINT `DefaultNagari_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `DefaultKecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nagari` ADD CONSTRAINT `Nagari_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `Kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SerutiEntri` ADD CONSTRAINT `SerutiEntri_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `Kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SerutiMasuk` ADD CONSTRAINT `SerutiMasuk_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `Kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SusenasEntri` ADD CONSTRAINT `SusenasEntri_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `Kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SusenasMasuk` ADD CONSTRAINT `SusenasMasuk_kecamatanId_fkey` FOREIGN KEY (`kecamatanId`) REFERENCES `Kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

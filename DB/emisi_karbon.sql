-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 30, 2025 at 10:41 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emisi_karbon`
--

-- --------------------------------------------------------

--
-- Table structure for table `aktivitas_harian`
--

CREATE TABLE `aktivitas_harian` (
  `id_aktivitas` int NOT NULL,
  `id_user` int NOT NULL,
  `tanggal` date NOT NULL,
  `km` int DEFAULT NULL,
  `listrik_kWh` float DEFAULT NULL,
  `konsumsi_hewani` float DEFAULT NULL,
  `konsumsi_nabati` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emisi_karbon`
--

CREATE TABLE `emisi_karbon` (
  `id` int NOT NULL,
  `id_aktivitas` int NOT NULL,
  `total_emisi` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id_user` int NOT NULL,
  `nama_user` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rekomendasipengurangan`
--

CREATE TABLE `rekomendasipengurangan` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `tanggal` date NOT NULL,
  `isi_rekomendasi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `visualisasihasil`
--

CREATE TABLE `visualisasihasil` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `jenis_visual` varchar(100) DEFAULT NULL,
  `data_visual` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aktivitas_harian`
--
ALTER TABLE `aktivitas_harian`
  ADD PRIMARY KEY (`id_aktivitas`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `emisi_karbon`
--
ALTER TABLE `emisi_karbon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_aktivitas` (`id_aktivitas`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `rekomendasipengurangan`
--
ALTER TABLE `rekomendasipengurangan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `visualisasihasil`
--
ALTER TABLE `visualisasihasil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aktivitas_harian`
--
ALTER TABLE `aktivitas_harian`
  MODIFY `id_aktivitas` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emisi_karbon`
--
ALTER TABLE `emisi_karbon`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rekomendasipengurangan`
--
ALTER TABLE `rekomendasipengurangan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visualisasihasil`
--
ALTER TABLE `visualisasihasil`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aktivitas_harian`
--
ALTER TABLE `aktivitas_harian`
  ADD CONSTRAINT `aktivitas_harian_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `pengguna` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `emisi_karbon`
--
ALTER TABLE `emisi_karbon`
  ADD CONSTRAINT `emisi_karbon_ibfk_1` FOREIGN KEY (`id_aktivitas`) REFERENCES `aktivitas_harian` (`id_aktivitas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rekomendasipengurangan`
--
ALTER TABLE `rekomendasipengurangan`
  ADD CONSTRAINT `rekomendasipengurangan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `pengguna` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visualisasihasil`
--
ALTER TABLE `visualisasihasil`
  ADD CONSTRAINT `visualisasihasil_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `pengguna` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

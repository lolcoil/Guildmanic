-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Okt 2016 um 00:38
-- Server-Version: 10.1.16-MariaDB
-- PHP-Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `guildmanic`
--
CREATE DATABASE IF NOT EXISTS `guildmanic` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `guildmanic`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `refferal_id` int(10) DEFAULT NULL,
  `password` blob NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `last_login_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `refferal_id`, `password`, `registration_date`, `email_verified`, `last_login_date`) VALUES
(3, 'lexu', 'lexu@lancamp.ch', NULL, '9ece086e9bac491fac5c1d1046ca11d737b92a2b2ebd93f005d7b710110c0a678288166e7fbe796883a4f2e9b3ca9f484f521d0ce464345cc1aec96779149c14', '2016-10-11 02:07:48', 0, NULL),
(4, 'test', 't@t.com', 0, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 04:30:29', 0, NULL),
(5, 'tree', 'tt@t.com', 0, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 04:38:20', 0, NULL),
(6, 'table', 'ttt@t.com', 3, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 04:41:00', 0, NULL),
(7, 'toor', 'tttt@t.com', 0, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 04:45:41', 0, NULL),
(8, 'boob', 'ttttt@t.com', 3, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 04:47:06', 0, NULL),
(9, 'gagi', 'tttttt@t.com', 3, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 04:53:54', 0, NULL),
(10, 'troll', 'troll@trolls.com', 5, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 22:25:48', 0, NULL),
(11, 'napp', 'na@n.com', 5, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-12 22:45:44', 0, NULL),
(12, 'gimp', 'g@g.com', 0, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:25:05', 0, NULL),
(13, 'root', 'r@r.com', 5, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:44:57', 0, NULL),
(14, 'boon', 'b@b.com', 5, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:49:43', 0, NULL),
(15, 'baba', 'ba@ba.com', 3, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:52:11', 0, NULL),
(16, 'aaaa', 'a@a.com', 14, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:53:22', 0, NULL),
(17, 'bbbb', 'bb@b.com', 14, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:56:51', 0, NULL),
(18, 'cccc', 'c@c.com', 17, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:59:10', 0, NULL),
(19, 'dddd', 'd@d.com', 16, '73b0f2a0ccb313f2f872532c21b7e10034393ef0d6910bf4f009add403fe024edf917ff552611f013c4100042679b00d4db9ae4a7fb4034cea9bfe9af04975a7', '2016-10-13 01:59:42', 0, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

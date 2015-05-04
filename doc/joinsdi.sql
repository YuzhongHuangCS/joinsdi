-- phpMyAdmin SQL Dump
-- version 4.2.12deb2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 04, 2015 at 09:09 PM
-- Server version: 10.0.17-MariaDB-0ubuntu1
-- PHP Version: 5.6.4-4ubuntu6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `joinsdi`
--

-- --------------------------------------------------------

--
-- Table structure for table `submit`
--

CREATE TABLE IF NOT EXISTS `submit` (
`ID` int(11) NOT NULL,
  `visitorID` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) NOT NULL,
  `num` int(10) unsigned NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('男','女') NOT NULL,
  `category` varchar(64) NOT NULL,
  `major` varchar(64) NOT NULL,
  `gpa` varchar(64) NOT NULL,
  `rank` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `dormitory` varchar(64) NOT NULL,
  `remark` text NOT NULL,
  `social` text NOT NULL,
  `workshop` set('5月23日18:00~20:00','5月23日20:30~22:30','5月24日18:00~20:00') NOT NULL,
  `avator` varchar(64) NOT NULL DEFAULT '',
  `apply` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
`ID` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '1',
  `first` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `download` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `refer` varchar(256) NOT NULL,
  `ua` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `submit`
--
ALTER TABLE `submit`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `submit`
--
ALTER TABLE `submit`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `visitor`
--
ALTER TABLE `visitor`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

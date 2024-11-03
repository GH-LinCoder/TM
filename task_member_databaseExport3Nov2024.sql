-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2024 at 03:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task&member`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `MId` int(11) NOT NULL,
  `MEmail` varchar(100) NOT NULL,
  `MUserName` varchar(100) NOT NULL,
  `MDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`MId`, `MEmail`, `MUserName`, `MDate`) VALUES
(1, 'firs@glob.com', 'FirstiRides', '2024-09-20 22:00:00'),
(2, 'sug@jabbi.com', 'Secondscount', '2024-09-21 22:00:00'),
(3, 'brisia300@lodo.es', 'Brisia', '2024-10-10 18:38:37'),
(4, 'grunble0@yahho.es', 'jodi', '2024-10-10 18:39:22'),
(5, 'munchfromb0@yahho.co.uk', 'Fromblemunch', '2024-10-10 18:40:00'),
(6, 'malcootrevi0@yahho.co.uk', 'GorgiPorgie', '2024-10-10 18:40:31'),
(7, 'gabbledruug@gmukle.co.uk', 'Comolpip', '2024-10-10 18:41:17'),
(8, 'jpoj34@thrup.zu', 'JayPodj', '2024-10-29 19:34:36'),
(14, 'GCDrumm9@coozi.von', 'GC', '2024-10-29 20:53:46'),
(16, 'JPLooza@coozi.von', 'Loozabien', '2024-10-29 20:55:08'),
(17, 'Fooza@coozi.von', 'TheFooz', '2024-10-29 21:16:12'),
(18, 'fruitval@coozi.von', 'FruityTootie', '2024-10-29 21:08:49'),
(19, 'chubal@coozi.von', 'Mignod', '2024-10-29 21:17:33'),
(20, 'Noodswoh@coozi.von', 'Nubby', '2024-10-29 21:17:33'),
(21, 'frumple678@coo !zi.von', 'FootieMad', '2024-10-29 21:18:15'),
(22, 'BubbleGumm@coozi.von', 'BGchewi', '2024-10-29 21:19:31'),
(24, 'gunnifrool@nudzi.jb', 'JabelTheMuck', '2024-10-29 21:40:45'),
(25, 'Jabbleool@nudzi.jb', 'Loojab', '2024-10-30 17:42:15'),
(26, 'm567@coozi.com', 'Mi569', '2024-10-30 17:36:48'),
(27, 'JugglreBunni@coozi.com', 'Juglar', '2024-10-30 17:40:53'),
(28, 'fordFet@yahoo.com', 'Dirvem', '2024-10-30 17:39:06'),
(29, 'Feline678@yahoo.com', 'Pussydevi', '2024-10-30 17:40:22');

-- --------------------------------------------------------

--
-- Table structure for table `tasklist`
--

CREATE TABLE `tasklist` (
  `TLId` int(11) NOT NULL,
  `TaskId` int(11) NOT NULL,
  `StudentId` int(11) NOT NULL,
  `ManagerId` int(11) NOT NULL,
  `Stage` int(11) NOT NULL,
  `TaskListDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasklist`
--

INSERT INTO `tasklist` (`TLId`, `TaskId`, `StudentId`, `ManagerId`, `Stage`, `TaskListDate`) VALUES
(1, 3, 2, 3, 2, '2024-10-10 19:09:26'),
(2, 3, 3, 1, 3, '2024-10-10 19:09:56'),
(3, 2, 3, 1, 1, '2024-10-10 19:10:19');

-- --------------------------------------------------------

--
-- Table structure for table `tasksheader`
--

CREATE TABLE `tasksheader` (
  `THId` int(11) NOT NULL,
  `TaskName` varchar(100) NOT NULL DEFAULT 'Needs name',
  `TaskDesc` varchar(255) NOT NULL DEFAULT 'Needs description',
  `TaskAuthor` int(11) NOT NULL,
  `TaskFaq` varchar(255) DEFAULT NULL,
  `TaskDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasksheader`
--

INSERT INTO `tasksheader` (`THId`, `TaskName`, `TaskDesc`, `TaskAuthor`, `TaskFaq`, `TaskDate`) VALUES
(1, 'Avanti!', 'First staps in Spain', 1, '', '2024-10-08 21:21:12'),
(2, 'Noche Una', 'What more erros?', 2, '', '2024-10-08 21:22:11'),
(3, 'Building a Task', 'The steps to putting a task or course into the database', 1, NULL, '2024-10-10 18:47:48'),
(4, 'Learning T&M', 'How to manage the software that runs T&M', 1, NULL, '2024-10-10 18:49:07'),
(5, 'Being friendly', 'How to manage the rising sense of alienation in communal action', 2, NULL, '2024-10-10 18:50:17'),
(6, 'October 18th Celebration', 'The People & Task Summaries now read the database and display complicated reads', 1, NULL, '2024-10-18 21:01:34'),
(7, 'October 18th Celebration', 'The People & Task Summaries now read the database and display complicated reads', 1, NULL, '2024-10-18 21:01:34'),
(8, 'The October 29th', 'A task created this day when summary reports are partially working', 1, NULL, '2024-10-29 18:16:34'),
(9, 'The October 29th', 'A task created this day when summary reports are partially working', 1, NULL, '2024-10-29 18:16:34');

-- --------------------------------------------------------

--
-- Table structure for table `tasksstages`
--

CREATE TABLE `tasksstages` (
  `TSId` int(11) NOT NULL,
  `TaskId` int(11) NOT NULL,
  `StageNum` int(11) NOT NULL,
  `StageName` varchar(100) NOT NULL,
  `StageDesc` varchar(255) NOT NULL,
  `StageAuthor` int(11) NOT NULL,
  `StageFaq` varchar(255) DEFAULT 'Url to stage details',
  `StageDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasksstages`
--

INSERT INTO `tasksstages` (`TSId`, `TaskId`, `StageNum`, `StageName`, `StageDesc`, `StageAuthor`, `StageFaq`, `StageDate`) VALUES
(1, 1, 1, 'Step lightly', 'Because it is dark', 1, '0', '2024-10-08 21:32:51'),
(2, 1, 2, 'Even More errors', 'Handling with carestage as can be imagined', 3, '', '2024-10-10 18:51:54'),
(3, 1, 3, 'Even More errors', 'Handling with carestage as can be imagined', 2, '', '2024-10-10 18:52:32'),
(4, 2, 1, 'Start with hope', 'How to begin this task', 3, 'Url to stage details', '2024-10-10 18:58:46'),
(5, 2, 2, 'Losing hope', 'How to struggle', 2, 'Url to stage details', '2024-10-10 18:58:09'),
(6, 3, 2, 'Think of a short name', 'The first step is creating the task header whish has a name, a description and an author', 2, 'Url to stage details', '2024-10-10 19:01:39'),
(7, 3, 3, 'Your task needs stages', 'Each stage of the task needs its own name, a number, a description and an author', 2, 'Url to stage details', '2024-10-10 19:03:20'),
(8, 3, 4, 'How many stages?', 'Each stage of the task should be short enough to not be overwhelming', 2, 'Url to stage details', '2024-10-10 19:04:23'),
(9, 9, 1, 'Tuesday evening', 'The first stage of the Oct 29th task', 1, 'Url to stage details', '2024-10-29 18:20:43'),
(10, 9, 2, '19:22', 'The second stage of the Oct 29th task', 1, 'Url to stage details', '2024-10-29 18:23:02'),
(11, 9, 2, '19:22', 'The second stage of the Oct 29th task', 1, 'Url to stage details', '2024-10-29 18:23:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`MId`);

--
-- Indexes for table `tasklist`
--
ALTER TABLE `tasklist`
  ADD PRIMARY KEY (`TLId`),
  ADD KEY `TaskId` (`TaskId`,`StudentId`,`ManagerId`);

--
-- Indexes for table `tasksheader`
--
ALTER TABLE `tasksheader`
  ADD PRIMARY KEY (`THId`),
  ADD KEY `TaskAuthor` (`TaskAuthor`);

--
-- Indexes for table `tasksstages`
--
ALTER TABLE `tasksstages`
  ADD PRIMARY KEY (`TSId`),
  ADD KEY `TaskId` (`TaskId`,`StageAuthor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `MId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tasklist`
--
ALTER TABLE `tasklist`
  MODIFY `TLId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasksheader`
--
ALTER TABLE `tasksheader`
  MODIFY `THId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tasksstages`
--
ALTER TABLE `tasksstages`
  MODIFY `TSId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

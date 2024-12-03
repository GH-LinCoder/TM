-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 08:57 PM
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
  `MUserName` varchar(100) NOT NULL,
  `MEmail` varchar(100) NOT NULL,
  `MDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`MId`, `MUserName`, `MEmail`, `MDate`) VALUES
(1, 'FirstiRides', 'firs@glob.com', '2024-09-20 22:00:00'),
(2, 'Secondscount', 'sug@jabbi.com', '2024-09-21 22:00:00'),
(3, 'Brisia', 'brisia300@lodo.es', '2024-10-10 18:38:37'),
(4, 'jodi', 'grunble0@yahho.es', '2024-10-10 18:39:22'),
(5, 'Fromblemunch', 'munchfromb0@yahho.co.uk', '2024-10-10 18:40:00'),
(6, 'GorgiPorgie', 'malcootrevi0@yahho.co.uk', '2024-10-10 18:40:31'),
(7, 'Comolpip', 'gabbledruug@gmukle.co.uk', '2024-10-10 18:41:17'),
(8, 'JayPodj', 'jpoj34@thrup.zu', '2024-10-29 19:34:36'),
(14, 'GC', 'GCDrumm9@coozi.von', '2024-10-29 20:53:46'),
(16, 'Loozabien', 'JPLooza@coozi.von', '2024-10-29 20:55:08'),
(17, 'TheFooz', 'Fooza@coozi.von', '2024-10-29 21:16:12'),
(18, 'FruityTootie', 'fruitval@coozi.von', '2024-10-29 21:08:49'),
(19, 'Mignod', 'chubal@coozi.von', '2024-10-29 21:17:33'),
(20, 'Nubby', 'Noodswoh@coozi.von', '2024-10-29 21:17:33'),
(21, 'FootieMad', 'frumple678@coo !zi.von', '2024-10-29 21:18:15'),
(22, 'BGchewi', 'BubbleGumm@coozi.von', '2024-10-29 21:19:31'),
(24, 'JabelTheMuck', 'gunnifrool@nudzi.jb', '2024-10-29 21:40:45'),
(25, 'Loojab', 'Jabbleool@nudzi.jb', '2024-10-30 17:42:15'),
(26, 'Mi569', 'm567@coozi.com', '2024-10-30 17:36:48'),
(27, 'Juglar', 'JugglreBunni@coozi.com', '2024-10-30 17:40:53'),
(28, 'Dirvem', 'fordFet@yahoo.com', '2024-10-30 17:39:06'),
(29, 'Pussydevi', 'Feline678@yahoo.com', '2024-10-30 17:40:22'),
(30, 'PottyBumb', 'pottonBumble@gross.es', '2024-11-12 20:45:34'),
(31, 'clotmouth', 'trkimble@gross.es', '2024-11-15 17:49:42'),
(32, 'Jickygirl', 'jicnomisme@forever.co.uk', '2024-11-12 20:51:30'),
(33, 'Jickylicky', 'nomosme@yahoo.co.uk', '2024-11-15 17:51:27'),
(34, 'RichRiky', 'franrick@gmail.com', '2024-11-12 20:59:37'),
(35, 'Budha or bust', 'brahmin305@gmail.com', '2024-11-15 17:50:44'),
(36, 'testiman', 'testfor2@dupe.com', '2024-11-15 17:29:20'),
(37, 'Grey Earl', 'teafor2@dupe.com', '2024-11-15 17:50:13'),
(38, 'wellzee', 'doesThiswork@upesh.co', '2024-11-15 17:40:16'),
(39, 'mySqly', 'strincleanmk@uxedsh.co', '2024-11-15 17:48:43'),
(40, 'preppir', 'mktorvskia@provitch.ru', '2024-11-15 18:09:39'),
(41, 'Glabbi', 'jak@pag.org', '2024-11-26 15:12:40'),
(42, 'OnceDeletedNeverForgotten', 'ham897@pag.org', '2024-11-26 15:15:22'),
(43, 'Glabbif', 'jak@pagi.org', '2024-11-26 15:14:40'),
(44, 'VeryLongIsIt?', 'vinny678@itlaiano.it', '2024-11-26 15:36:31'),
(45, 'A_very_long_use', 'vinny678@itlaiano.org', '2024-11-26 15:35:15'),
(46, 'A_very_long_user_nam', 'vinny678@itlcaiano.org', '2024-11-26 15:37:58'),
(47, 'Very_long_user_name_', 'joh678@itlcaiano.org', '2024-11-26 15:44:22'),
(48, 'FelicityFelineFellow', 'felicitySmithOfGrange@itlcaiano.org', '2024-11-26 15:47:35');

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
(3, 2, 3, 1, 1, '2024-10-10 19:10:19'),
(4, 11, 5, 5, 1, '2024-11-20 19:58:20'),
(5, 1, 24, 31, 1, '2024-11-20 20:02:01'),
(6, 31, 24, 8, 1, '2024-11-20 20:06:50'),
(7, 5, 25, 29, 1, '2024-11-20 20:08:47'),
(8, 4, 25, 29, 1, '2024-11-20 20:13:45'),
(9, 4, 22, 29, 1, '2024-11-20 20:14:09'),
(10, 8, 7, 25, 1, '2024-11-20 20:17:21'),
(11, 8, 16, 25, 1, '2024-11-24 19:17:14'),
(12, 8, 27, 25, 1, '2024-11-20 20:29:48'),
(13, 6, 1, 8, 1, '2024-11-24 18:18:10'),
(14, 11, 1, 8, 1, '2024-11-24 19:15:13'),
(16, 12, 16, 8, 1, '2024-11-24 19:17:14'),
(17, 31, 19, 8, 1, '2024-11-24 20:02:32'),
(26, 6, 22, 8, 1, '2024-11-24 20:39:47'),
(36, 6, 7, 8, 1, '2024-11-24 21:05:35'),
(40, 6, 8, 8, 1, '2024-11-24 21:13:42');

-- --------------------------------------------------------

--
-- Table structure for table `tasksheader`
--

CREATE TABLE `tasksheader` (
  `THId` int(11) NOT NULL,
  `TaskName` varchar(100) NOT NULL DEFAULT 'Needs name',
  `TaskDesc` varchar(255) NOT NULL DEFAULT 'Needs description',
  `TaskAuthor` int(11) NOT NULL,
  `TaskFaq` varchar(255) DEFAULT 'possible Url to task details',
  `TaskDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasksheader`
--

INSERT INTO `tasksheader` (`THId`, `TaskName`, `TaskDesc`, `TaskAuthor`, `TaskFaq`, `TaskDate`) VALUES
(1, 'Avanti!', 'First staps in Spain', 1, 'Url', '2024-11-21 22:03:37'),
(2, 'Noche Una', 'What more erros?', 2, 'Url', '2024-11-21 22:03:37'),
(3, 'Building a Task', 'The steps to putting a task or course into the database', 1, 'Url', '2024-11-21 22:03:37'),
(4, 'Learning T&M', 'How to manage the software that runs T&M', 1, 'Url', '2024-11-21 22:03:37'),
(5, 'Being friendly', 'How to manage the rising sense of alienation in communal action', 2, 'Url', '2024-11-21 22:03:37'),
(6, 'October 18th Celebration', 'The People & Task Summaries now read the database and display complicated reads', 1, 'Url', '2024-11-21 22:03:37'),
(8, 'The October 29th', 'A task created this day when summary reports are partially working', 1, 'Url', '2024-11-21 22:03:37'),
(11, 'Permissions', 'How to code for roles/permissions. A youtube video by Web Dev Simplified\r\n\r\nUses typescript which is javascript with types', 1, 'https://youtu.be/5GG-VUvruzE', '2024-11-17 19:54:27'),
(12, 'Sessions', 'How to code for user sessions PHP', 1, 'https://www.youtube.com/watch?v=JAgd_L3GhI0', '2024-11-17 19:57:01'),
(31, 'Session security', 'same person as session video', 1, 'https://www.youtube.com/watch?v=FbLYsTHJKDw', '2024-11-17 19:58:01'),
(32, 'Report Bugs', 'Add a stage to represent bugs', 1, '', '2024-11-21 17:49:48'),
(41, 'Name', 'Description', 1, '', '2024-11-25 20:14:25');

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
(1, 1, 1, 'Step lightly', 'Because it is dark', 1, 'Url', '2024-11-21 22:04:58'),
(2, 1, 2, 'Even More errors', 'Handling with carestage as can be imagined', 3, 'Url', '2024-11-21 22:05:18'),
(3, 1, 3, 'Even More errors', 'Handling with carestage as can be imagined', 2, 'Url', '2024-11-21 22:05:18'),
(4, 2, 1, 'Start with hope', 'How to begin this task', 3, 'Url to stage details', '2024-10-10 18:58:46'),
(5, 2, 2, 'Losing hope', 'How to struggle', 2, 'Url to stage details', '2024-10-10 18:58:09'),
(6, 3, 1, 'Think of a short name', 'The first step is creating the task header whish has a name, a description and an author', 2, 'Url to stage details', '2024-11-07 22:00:40'),
(7, 3, 2, 'Your task needs stages', 'Each stage of the task needs its own name, a number, a description and an author', 2, 'Url to stage details', '2024-11-07 22:00:40'),
(8, 3, 3, 'How many stages?', 'Each stage of the task should be short enough to not be overwhelming', 2, 'Url to stage details', '2024-11-07 22:00:40'),
(9, 8, 1, 'Tuesday evening', 'The first stage of the Oct 29th task', 1, 'Url to stage details', '2024-11-25 20:59:34'),
(10, 11, 2, 'Imaginary ', 'The second stage of the 9th task', 1, 'Url to stage details', '2024-11-25 20:58:31'),
(11, 8, 2, '19:22', 'The second stage of the Oct 29th task', 1, 'Url to stage details', '2024-11-25 20:59:55'),
(12, 31, 1, 'Text version', 'Of sessions on php', 1, 'https://clouddevs.com/php/mastering-sessions/', '2024-11-17 21:05:45'),
(13, 32, 1, 'Student Card', 'Opens from table okay, but nav next previous calls a php that only shows the keys. It doesn\'t show the names.', 1, 'Url to stage details', '2024-11-21 18:01:12'),
(15, 32, 2, 'INSERT text', 'Need htmlspecialchars( $_POST[&#039;label&#039;] in all php files that insert text', 1, 'Url to stage details', '2024-11-21 18:06:07'),
(16, 32, 3, 'INSERT - all', 'Need prevent double entries into Db', 1, 'Url to stage details', '2024-11-21 18:07:26'),
(17, 32, 4, 'Stages', 'Need prevent duplicate stage numbersinto Db', 1, 'Url to stage details', '2024-11-21 18:08:05'),
(19, 6, 5, 'nov25', 'testOfCreateStage', 1, 'Url to stage details', '2024-11-25 20:35:54'),
(23, 12, 1, 'should', 'crash', 19, 'Url to stage details', '2024-11-25 21:06:32');

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
  ADD KEY `TaskId` (`TaskId`,`StudentId`,`ManagerId`),
  ADD KEY `constraintStudentId` (`StudentId`),
  ADD KEY `constraintManagerId` (`ManagerId`);

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
  ADD KEY `TaskId` (`TaskId`,`StageAuthor`),
  ADD KEY `AuthoOfStage` (`StageAuthor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `MId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tasklist`
--
ALTER TABLE `tasklist`
  MODIFY `TLId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `tasksheader`
--
ALTER TABLE `tasksheader`
  MODIFY `THId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `tasksstages`
--
ALTER TABLE `tasksstages`
  MODIFY `TSId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasklist`
--
ALTER TABLE `tasklist`
  ADD CONSTRAINT `constraintManagerId` FOREIGN KEY (`ManagerId`) REFERENCES `members` (`MId`),
  ADD CONSTRAINT `constraintStudentId` FOREIGN KEY (`StudentId`) REFERENCES `members` (`MId`),
  ADD CONSTRAINT `constraintTaskId` FOREIGN KEY (`TaskId`) REFERENCES `tasksheader` (`THId`);

--
-- Constraints for table `tasksstages`
--
ALTER TABLE `tasksstages`
  ADD CONSTRAINT `AuthoOfStage` FOREIGN KEY (`StageAuthor`) REFERENCES `members` (`MId`),
  ADD CONSTRAINT `TaskOfStage` FOREIGN KEY (`TaskId`) REFERENCES `tasksheader` (`THId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE DATABASE  IF NOT EXISTS `fairpoliticsdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fairpoliticsdb`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: fairpoliticsdb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `algorithm_user_chosen`
--

DROP TABLE IF EXISTS `algorithm_user_chosen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `algorithm_user_chosen` (
  `algorithm_id` int NOT NULL,
  `user_id` varchar(9) NOT NULL,
  PRIMARY KEY (`algorithm_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `algorithm_user_chosen`
--

LOCK TABLES `algorithm_user_chosen` WRITE;
/*!40000 ALTER TABLE `algorithm_user_chosen` DISABLE KEYS */;
INSERT INTO `algorithm_user_chosen` VALUES (0,'1234'),(0,'222'),(0,'777'),(0,'888'),(0,'999');
/*!40000 ALTER TABLE `algorithm_user_chosen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_like_approval`
--

DROP TABLE IF EXISTS `comment_like_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_like_approval` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(9) NOT NULL,
  PRIMARY KEY (`comment_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_like_approval`
--

LOCK TABLES `comment_like_approval` WRITE;
/*!40000 ALTER TABLE `comment_like_approval` DISABLE KEYS */;
INSERT INTO `comment_like_approval` VALUES (1,'111'),(1,'222'),(1,'333'),(2,'222'),(2,'333'),(3,'222'),(3,'225'),(4,'111'),(5,'44'),(6,'222'),(6,'333'),(35,'222');
/*!40000 ALTER TABLE `comment_like_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follower` (
  `user_id` varchar(9) NOT NULL,
  `user_following_id` varchar(9) NOT NULL,
  PRIMARY KEY (`user_id`,`user_following_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower`
--

LOCK TABLES `follower` WRITE;
/*!40000 ALTER TABLE `follower` DISABLE KEYS */;
INSERT INTO `follower` VALUES ('111','222'),('111','333'),('222','111'),('222','444'),('222','888'),('333','111'),('333','222'),('333','225'),('888','222'),('888','333'),('888','444'),('888','777');
/*!40000 ALTER TABLE `follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_details`
--

DROP TABLE IF EXISTS `login_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_details` (
  `user_id` varchar(9) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `gmail` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_details`
--

LOCK TABLES `login_details` WRITE;
/*!40000 ALTER TABLE `login_details` DISABLE KEYS */;
INSERT INTO `login_details` VALUES ('111','0544444444',NULL,NULL,'111'),('1234','','fairpolitics5@gmail.com',NULL,'1234'),('222','0542522545','',NULL,'111'),('225','54656746',NULL,NULL,'44'),('333','054225215','talfreestyle@gmail.com',NULL,'44'),('444','053125121',NULL,NULL,'11'),('555','0514512152',NULL,NULL,'111'),('777','0542522545',NULL,NULL,'777'),('888','0542522545',NULL,NULL,'888'),('999','0542522545',NULL,NULL,'999');
/*!40000 ALTER TABLE `login_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll`
--

DROP TABLE IF EXISTS `poll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll` (
  `poll_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(9) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`poll_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll`
--

LOCK TABLES `poll` WRITE;
/*!40000 ALTER TABLE `poll` DISABLE KEYS */;
INSERT INTO `poll` VALUES (1,'111','first Poll','first desc',NULL),(2,'111','first Poll','first desc',NULL),(3,'333','first Poll','first desc',NULL),(5,'222','Do you like this Lorem Ipsum description?','first poll',NULL),(93,'444','poll title ','poll description',NULL);
/*!40000 ALTER TABLE `poll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_answer`
--

DROP TABLE IF EXISTS `poll_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll_answer` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `poll_id` int NOT NULL,
  `user_id` varchar(9) NOT NULL,
  `answer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`answer_id`,`poll_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_answer`
--

LOCK TABLES `poll_answer` WRITE;
/*!40000 ALTER TABLE `poll_answer` DISABLE KEYS */;
INSERT INTO `poll_answer` VALUES (1,1,'111','test'),(2,1,'111','yes'),(3,1,'111','no'),(4,2,'111','not sure'),(5,2,'111','yes'),(6,2,'111','no'),(7,3,'111','not sure'),(8,3,'111','yes'),(10,5,'222','Yes'),(183,93,'444','maybe'),(184,93,'444','yes'),(185,5,'222','No'),(186,5,'222','Maybe');
/*!40000 ALTER TABLE `poll_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_answer_approval`
--

DROP TABLE IF EXISTS `poll_answer_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll_answer_approval` (
  `answer_id` int NOT NULL,
  `user_id` varchar(9) NOT NULL,
  PRIMARY KEY (`answer_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_answer_approval`
--

LOCK TABLES `poll_answer_approval` WRITE;
/*!40000 ALTER TABLE `poll_answer_approval` DISABLE KEYS */;
INSERT INTO `poll_answer_approval` VALUES (1,'111'),(1,'222'),(1,'225'),(2,'225'),(2,'333'),(2,'444'),(3,'222'),(3,'225'),(3,'333'),(3,'444'),(183,'222');
/*!40000 ALTER TABLE `poll_answer_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(9) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`post_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=346 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'222','What is Lorem Ipsum?','null','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','null'),(2,'225','schebar',NULL,'shcebarrrr',NULL),(3,'222','Why do we use it?','null','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','null'),(4,'111','title','tag','description','null'),(5,'222','Where does it come from?','shchebarist','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',NULL),(6,'444','tal','omer','lorem ipsum','a'),(343,'111','new new post','new new post','new new post','new new post'),(344,'222','Where can I get some?','ASD','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',NULL),(345,'222','hope you like my profile','','let me know what do you want me to talk about next time','');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_like_approval`
--

DROP TABLE IF EXISTS `post_like_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_like_approval` (
  `post_id` int NOT NULL,
  `user_id` varchar(9) NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_like_approval`
--

LOCK TABLES `post_like_approval` WRITE;
/*!40000 ALTER TABLE `post_like_approval` DISABLE KEYS */;
INSERT INTO `post_like_approval` VALUES (1,'222'),(2,'111'),(2,'222'),(3,'111'),(3,'222'),(4,'222'),(4,'225'),(4,'333'),(5,'111'),(5,'225'),(5,'333'),(5,'444'),(6,'225'),(345,'222');
/*!40000 ALTER TABLE `post_like_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_response`
--

DROP TABLE IF EXISTS `post_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_response` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` varchar(9) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`post_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_response`
--

LOCK TABLES `post_response` WRITE;
/*!40000 ALTER TABLE `post_response` DISABLE KEYS */;
INSERT INTO `post_response` VALUES (1,1,'111','fire'),(2,1,'111','ice'),(3,1,'222','glass'),(4,2,'333','yesterday'),(5,2,'222','i know'),(7,4,'444','who told you'),(9,2,'225','congratulations'),(10,4,'333','my friend'),(11,5,'444','shchebar'),(33,5,'333','wdf'),(34,5,'111','sdafas'),(35,4,'222','DASD');
/*!40000 ALTER TABLE `post_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `user_id` varchar(9) NOT NULL,
  `gmail` varchar(200) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `profile_picture` varchar(200) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `semi_description` varchar(150) DEFAULT NULL,
  `is_public_elected` tinyint(1) DEFAULT '0',
  `age` int DEFAULT NULL,
  `birthdate` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`gmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES ('111','','idan','ofer','haifa','devops','i did the whole project alone',NULL,'Male','im home',0,NULL,'1990-05-05'),('1234','fairpolitics5@gmail.com','fair','politics','anywhere','','','https://lh3.googleusercontent.com/a/AATXAJzfr2AGxbXbiiyulj1WowTenkwFmvgvwt6WSEnR=s96-c','','',0,NULL,'1995-02-24'),('222','','Omer','Shalom1','elyakim11','s1','e11',NULL,'Male','semi omer description',0,28,'0001-10-10'),('225','','Omer','Shalom','elyakim','s','e',NULL,'Male','secound semi desecreption',0,28,'1993-02-13'),('333','talfreestyle@gmail.com','Tal','Schreiber','Ramat gan','Full Stack','I Did the client side',NULL,'Male','im the client side',0,NULL,'1995-04-26'),('444','','Shai','Bonfil','Ariel','Full Stack','i did the server side','','Male','im the server side',0,NULL,'1993-02-27'),('555','','test','first','','','','','','',0,NULL,'2022-03-15'),('777','','Tal','Schreiber','Ramat gan','','','','Male','',0,NULL,'1995-04-26'),('888','','Tal','Schreiber','Ramat gan','','','','','',0,NULL,''),('999','','Tal','Schreiber3','Ramat gan','','','','','',0,NULL,'');
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06 17:01:45

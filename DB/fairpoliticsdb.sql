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
  `algorithm_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(9) NOT NULL,
  PRIMARY KEY (`algorithm_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `algorithm_user_chosen`
--

LOCK TABLES `algorithm_user_chosen` WRITE;
/*!40000 ALTER TABLE `algorithm_user_chosen` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_like_approval`
--

LOCK TABLES `comment_like_approval` WRITE;
/*!40000 ALTER TABLE `comment_like_approval` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_like_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(9) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`post_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
INSERT INTO `discussion` VALUES (133,'222','sda','null','omer hu lo metachnet','null'),(321,'222','dsad','null','omer hu shuv lo metahnet','null');
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_like_approval`
--

DROP TABLE IF EXISTS `discussion_like_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_like_approval` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(9) NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_like_approval`
--

LOCK TABLES `discussion_like_approval` WRITE;
/*!40000 ALTER TABLE `discussion_like_approval` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion_like_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_response`
--

DROP TABLE IF EXISTS `discussion_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_response` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` varchar(9) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`post_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_response`
--

LOCK TABLES `discussion_response` WRITE;
/*!40000 ALTER TABLE `discussion_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion_response` ENABLE KEYS */;
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
INSERT INTO `follower` VALUES ('111','222'),('111','225'),('111','665'),('665','111'),('665','222');
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
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_details`
--

LOCK TABLES `login_details` WRITE;
/*!40000 ALTER TABLE `login_details` DISABLE KEYS */;
INSERT INTO `login_details` VALUES ('222','0542522545','111'),('225','54656746','44'),('333','054225215','44'),('444','053125121','11');
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll`
--

LOCK TABLES `poll` WRITE;
/*!40000 ALTER TABLE `poll` DISABLE KEYS */;
INSERT INTO `poll` VALUES (1,'111','first Poll','first desc',NULL),(2,'111','first Poll','first desc',NULL),(3,'111','first Poll','first desc',NULL),(4,'111','first feedback','first desccasas',NULL),(5,'111','first feedback','first desccasas',NULL),(6,'111','first feedback','first desccasas',NULL),(7,'111','first feedback','first desccasas',NULL),(8,'111','first feedback','first desccasas',NULL),(9,'111','first feedback','first desccasas',NULL),(10,'111','first feedback','first desccasas',NULL),(11,'111','first feedback','first desccasas',NULL),(12,'111','first feedback','first desccasas',NULL),(13,'111','first feedback','first desccasas',NULL),(14,'111','first feedback','first desccasas',NULL),(15,'111','first feedback','first desccasas',NULL),(16,'111','first feedback','first desccasas',NULL),(17,'111','first feedback','first desccasas',NULL),(18,'111','first feedback','first desccasas',NULL),(19,'111','first feedback','first desccasas',NULL),(20,'111','first feedback','first desccasas',NULL),(21,'111','first feedback','first desccasas',NULL),(22,'111','first feedback','first desccasas',NULL),(23,'111','first feedback','first desccasas',NULL),(24,'111','first feedback','first desccasas',NULL),(25,'111','first feedback','first desccasas',NULL),(26,'111','first feedback','first desccasas',NULL),(27,'111','first feedback','first desccasas',NULL),(28,'111','first feedback','first desccasas',NULL),(29,'111','first feedback','first desccasas',NULL),(30,'111','first feedback','first desccasas',NULL),(31,'111','first feedback','first desccasas',NULL),(32,'111','first feedback','first desccasas',NULL),(33,'111','first feedback','first desccasas',NULL),(34,'111','first feedback','first desccasas',NULL),(35,'111','first feedback','first desccasas',NULL),(36,'111','first feedback','first desccasas',NULL),(37,'111','first feedback','first desccasas',NULL),(38,'111','first feedback','first desccasas',NULL),(39,'111','first feedback','first desccasas',NULL),(40,'111','first feedback','first desccasas',NULL),(41,'111','first feedback','first desccasas',NULL),(42,'111','first feedback','first desccasas',NULL),(43,'111','first feedback','first desccasas',NULL),(44,'111','first feedback','first desccasas',NULL),(45,'111','first feedback','first desccasas',NULL),(46,'111','first feedback','first desccasas',NULL),(47,'111','first feedback','first desccasas',NULL),(48,'111','first feedback','first desccasas',NULL),(49,'111','first feedback','first desccasas',NULL),(50,'111','first feedback','first desccasas',NULL),(51,'111','first feedback','first desccasas',NULL),(52,'111','first feedback','first desccasas',NULL),(53,'111','first feedback','first desccasas',NULL),(54,'111','first feedback','first desccasas',NULL),(55,'111','first feedback','first desccasas',NULL),(56,'111','first feedback','first desccasas',NULL),(57,'111','first feedback','first desccasas',NULL),(58,'111','first feedback','first desccasas',NULL),(59,'111','first feedback','first desccasas',NULL),(60,'111','first feedback','first desccasas',NULL),(61,'111','first feedback','first desccasas',NULL),(62,'111','first feedback','first desccasas',NULL),(63,'111','first feedback','first desccasas',NULL),(64,'111','first feedback','first desccasas',NULL),(65,'111','first feedback','first desccasas',NULL),(66,'111','first feedback','first desccasas',NULL),(67,'111','first feedback','first desccasas',NULL),(68,'111','first feedback','first desccasas',NULL),(69,'111','first feedback','first desccasas',NULL),(70,'111','first feedback','first desccasas',NULL),(71,'111','first feedback','first desccasas',NULL),(72,'111','first feedback','first desccasas',NULL),(73,'111','first feedback','first desccasas',NULL),(74,'111','first feedback','first desccasas',NULL),(75,'111','first feedback','first desccasas',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_answer`
--

LOCK TABLES `poll_answer` WRITE;
/*!40000 ALTER TABLE `poll_answer` DISABLE KEYS */;
INSERT INTO `poll_answer` VALUES (1,3,'111','test'),(2,28,'111','yes'),(3,28,'111','no'),(4,28,'111','not sure'),(5,29,'111','yes'),(6,29,'111','no'),(7,29,'111','not sure'),(8,40,'111','yes'),(9,40,'111','no'),(10,40,'111','not sure'),(11,41,'111','yes'),(12,41,'111','no'),(13,41,'111','not sure'),(14,42,'111','yes'),(15,42,'111','no'),(16,42,'111','not sure'),(17,43,'111','yes'),(18,43,'111','no'),(19,43,'111','not sure'),(20,44,'111','yes'),(21,44,'111','no'),(22,44,'111','not sure'),(23,48,'111','yes'),(24,48,'111','no'),(25,48,'111','not sure'),(26,49,'111','yes'),(27,49,'111','no'),(28,49,'111','not sure'),(29,50,'111','yes'),(30,50,'111','no'),(31,50,'111','not sure'),(32,51,'111','yes'),(33,51,'111','no'),(34,51,'111','not sure'),(35,52,'111','yes'),(36,52,'111','no'),(37,52,'111','not sure'),(38,53,'111','yes'),(39,53,'111','no'),(40,53,'111','not sure'),(41,54,'111','yes'),(42,54,'111','no'),(43,54,'111','not sure'),(44,62,'111','yes'),(45,62,'111','no'),(46,62,'111','not sure'),(47,63,'111','yes'),(48,63,'111','no'),(49,63,'111','not sure'),(50,64,'111','yes'),(51,65,'111','yes'),(52,65,'111','no'),(53,65,'111','not sure'),(54,66,'111','yes'),(55,66,'111','no'),(56,66,'111','not sure'),(57,67,'111','yes'),(58,67,'111','no'),(59,67,'111','not sure'),(60,68,'111','yes'),(61,69,'111','yes'),(62,69,'111','no'),(63,70,'111','yes'),(64,70,'111','no'),(65,70,'111','not sure'),(66,71,'111','yes'),(67,71,'111','no'),(68,71,'111','not sure'),(69,72,'111','yes'),(70,72,'111','no'),(71,72,'111','not sure'),(72,73,'111','yes'),(73,73,'111','no'),(74,73,'111','not sure'),(75,74,'111','yes'),(76,74,'111','no'),(77,74,'111','not sure'),(78,75,'111','yes'),(79,75,'111','no'),(80,75,'111','not sure');
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
/*!40000 ALTER TABLE `poll_answer_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `user_id` varchar(9) NOT NULL,
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
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES ('222','Omer','Shalom','elyakim','s','e',NULL,'Male','semi omer description',0,28,'1993-10-25'),('225','Omer','Shalom','elyakim','s','e',NULL,'Male','secound semi desecreption',0,28,'1993-02-13'),('333','Tal','Schreiber','Ramat gan','Full Stack','I Did the client side',NULL,'male','im the client side',0,NULL,'1995-04-26'),('444','Shai','Bonfil','Ariel','Full Stack','i did the server side','','Male','im the server side',0,NULL,'1993-02-27');
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

-- Dump completed on 2022-03-08  1:49:23

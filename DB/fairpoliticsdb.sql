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
INSERT INTO `algorithm_user_chosen` VALUES (0,'111'),(0,'222'),(0,'333'),(0,'444'),(0,'555'),(0,'666'),(0,'999'),(1,'1234'),(1,'777'),(1,'888');
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
INSERT INTO `follower` VALUES ('111','333'),('333','111'),('444','111'),('444','222'),('444','333'),('444','555'),('444','999'),('777','111'),('777','1234'),('777','333'),('777','666'),('999','222');
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
INSERT INTO `login_details` VALUES ('111','0523456723','demo1@gmail.com',NULL,'111'),('1234','0528133299','demo10@gmail.com',NULL,'1234'),('222','0523455513','demo2@gmail.com',NULL,'222'),('333','0545456723','demo3@gmail.com',NULL,'333'),('444','0508656723','demo4@gmail.com',NULL,'444'),('555','0521145672','demo5@gmail.com',NULL,'555'),('666','0523476109','demo6@gmail.com',NULL,'666'),('777','0542181018','demo7@gmail.com',NULL,'777'),('888','0523420122','demo8@gmail.com',NULL,'888'),('999','0509992313','demo9@gmail.com',NULL,'999');
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
  `upload_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`poll_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll`
--

LOCK TABLES `poll` WRITE;
/*!40000 ALTER TABLE `poll` DISABLE KEYS */;
INSERT INTO `poll` VALUES (1,'777','אירועי יום העצמאות1','לקראת יום העצמאות הקרוב, האם אתה תומך בקיום אירוע יקר עם אומנים מובילים או בצמצום הוצאות עם פסטיבל ודוכנים לכל המשפחה',NULL,NULL),(2,'777','אירועי יום העצמאות2','לקראת יום העצמאות הקרוב, האם אתה תומך ביוזמה ליום עצמאות ללא זיקוקים או בעד להשאיר את מופע הזיקוקים',NULL,NULL),(3,'444','הריסת בתים','האם אתה בעד חוק הריסת בתי מחבלים, למחבלים בעלי תעודת זהות ישראלית',NULL,NULL),(4,'444','עונש מוות למחבלים','האם אתה בעד עונש מוות למחבלים',NULL,NULL),(5,'444','מערכת המשפט','מבין האפשרויות הבאות בחר את מה שאתה רוצה שנקדם בעניין מערכת המשפט במדינה ',NULL,NULL),(6,'777','שפ\"ע','למען שיפור פני העיר מה מבין האופציות הבאות הכי רלוונטי אליכם',NULL,NULL),(7,'444','בחירות','באיזה דרך הייתם מעדיפים שתורכב הרשימה לבחירות הבאות',NULL,NULL),(8,'777','מצעד הגאווה','האם אתם תומכים בקיום מצעד הגאווה בעיר',NULL,NULL),(9,'777','תחבורה ציבורית','האם תשקלו לוותר על הרכב הפרטי במידה ויהיו קווי רכבת קלה בכל שכונות העיר ',NULL,NULL);
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
  `answer` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`answer_id`,`poll_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_answer`
--

LOCK TABLES `poll_answer` WRITE;
/*!40000 ALTER TABLE `poll_answer` DISABLE KEYS */;
INSERT INTO `poll_answer` VALUES (1,3,'444','כן'),(2,3,'444','לא'),(3,4,'444','כן'),(4,4,'444','לא'),(5,4,'444','לא יודע. צריך לחשוב על פתרון אחר להרתעה'),(6,5,'444','פיצול סמכות היועמ\"ש'),(7,5,'444','פסקת ההתגברות'),(8,5,'444','שימוע פומבי למועמדים לעליון'),(9,5,'444','שינוי מבנה הועדה לבחירת שופטים'),(10,7,'444','פריימריז כללי. מפלגה דמוקרטית צריכה שהציבור יבחר את הנציגים'),(11,7,'444','פריימריז ליו\"ר. את הרישמה יכריב יו\"ר הנבחר על ידי הציבור'),(12,7,'444','מרכז המפלגה/ועדה של אישי ציבור שתבחר את נציגי המפלגה'),(13,7,'444','מרכז המפלגה/ועדה של אישי ציבור שתבחר את יו\"ר המפלגה, והוא ישבץ אנשים'),(17,1,'777','אומנים מובילים. לא לכולם יש יכולת ללכת להופעות של זמרים מוכרים במהלך השנה ואנחנו מביאים להם פעם בשנה בחינם'),(18,1,'777','אפשר להביא אומנים קצת פחות נוצצים אבל יותר כמות ויותר מגוון'),(19,1,'777','לא צריך לבזבז תקציב של כל השנה אפשר אירוע סולידי ולא יקר'),(20,1,'777','לא צריך בכלל להוציא כסף על אומנים, יש דברים חשובים יותר'),(21,2,'777','תומך. צריך להתחשב בהלומי הקרב שחיים בינינו'),(22,2,'777','נגד היוזמה. מסורת לא משנים'),(23,2,'777','אין לי דעה כרגע'),(24,6,'777','הגדלת ימי פינוי הזבל וניקוי הרחובות'),(25,6,'777','טיפוח הגינון ושתילת פרחים ועצים חדשים'),(26,6,'777','הקמת פארקים וגינות ציבוריות'),(27,6,'777','אתרים לשחרור כלבים'),(28,6,'777','שיפוץ והארת מגרשי הספורט'),(29,8,'777','לא. מי שרוצה שילך למצעד במקום אחר'),(30,8,'777','כן. אנחנו צריכים להכיל את כולם'),(31,8,'777','קיום אירוע בחסות העירייה אבל לא מצעד'),(32,9,'777','כן. אם יהיו קווים מהבית לעבודה אוותר על הרכב'),(33,9,'777','כן, אבל אחרי כמה זמן שאראה שהתחב\"צ עובד בצורה טובה'),(34,9,'777','לא. בכל מקרה אחזיק רכב, לנוחות אין תחליף');
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
INSERT INTO `poll_answer_approval` VALUES (1,'111'),(1,'222'),(1,'555'),(1,'999'),(2,'333'),(3,'111'),(3,'222'),(3,'555'),(4,'333'),(5,'999'),(6,'111'),(6,'222'),(6,'333'),(7,'111'),(7,'222'),(7,'555'),(7,'999'),(8,'111'),(8,'222'),(8,'555'),(8,'999'),(9,'111'),(9,'555'),(10,'222'),(10,'555'),(10,'999'),(11,'555'),(12,'111'),(13,'111'),(17,'111'),(18,'1234'),(18,'333'),(19,'1234'),(19,'333'),(20,'666'),(21,'333'),(21,'666'),(22,'111'),(23,'1234'),(24,'111'),(24,'1234'),(25,'1234'),(25,'333'),(26,'111'),(26,'1234'),(26,'666'),(27,'1234'),(27,'333'),(27,'666'),(28,'111'),(28,'333'),(29,'111'),(29,'1234'),(30,'333'),(30,'666'),(32,'666'),(33,'1234'),(33,'333'),(34,'111'),(34,'1234');
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
  `upload_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`post_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_response`
--

LOCK TABLES `post_response` WRITE;
/*!40000 ALTER TABLE `post_response` DISABLE KEYS */;
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
INSERT INTO `user_details` VALUES ('111','demo1@gmail.com','shai','bonfil','metar','software developer',NULL,NULL,'male',NULL,0,28,'21-02-1994'),('1234','demo10@gmail.com','tehila','shwartz','jerusalem','occupational therapy',NULL,NULL,'female',NULL,0,48,'09-07-1974'),('222','demo2@gmail.com','omer','shalom','elyakim','full stack developer',NULL,NULL,'male',NULL,0,27,'11-03-1995'),('333','demo3@gmail.com','tal','schraiber','ramat gan','full stack developer',NULL,NULL,'male',NULL,0,26,'28-04-1996'),('444','demo4@gmail.com','david','piperno','jerusalem','member of knesset',NULL,NULL,'male',NULL,1,42,'21-09-1980'),('555','demo5@gmail.com','yossi','pridman','petah tikva','doctor',NULL,NULL,'male',NULL,0,56,'02-01-1966'),('666','demo6@gmail.com','eyal','hadad','ashkelon','software engineer',NULL,NULL,'male',NULL,0,27,'18-08-1995'),('777','demo7@gmail.com','itay','sharabi','raichan','member of knesset',NULL,NULL,'male',NULL,1,51,'14-02-1971'),('888','demo8@gmail.com','rachel','goldberg','eli','teacher',NULL,NULL,'female',NULL,0,34,'28-10-1988'),('999','demo9@gmail.com','shira','cohen','tel aviv','social work',NULL,NULL,'female',NULL,0,37,'05-05-1985');
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

-- Dump completed on 2022-05-16 12:14:35

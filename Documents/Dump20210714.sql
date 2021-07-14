CREATE DATABASE  IF NOT EXISTS `booketlist` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `booketlist`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: booketlist
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `google_api_id` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_id_UNIQUE` (`book_id`),
  UNIQUE KEY `google_api_id_UNIQUE` (`google_api_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (55,'yl4dILkcqm4C','2021-07-04 22:05:31','2021-07-04 22:05:31'),(56,'AVVoPwAACAAJ','2021-07-04 22:08:06','2021-07-04 22:08:06'),(57,'lqHNugAACAAJ','2021-07-04 22:08:09','2021-07-04 22:08:09'),(58,'Dw-NAgAAQBAJ','2021-07-04 22:10:44','2021-07-04 22:10:44'),(59,'FKziXsnqLTEC','2021-07-13 07:56:59','2021-07-13 07:56:59'),(60,'ZcAlEAAAQBAJ','2021-07-13 08:01:44','2021-07-13 08:01:44'),(61,'nh0eAQAAIAAJ','2021-07-13 08:04:55','2021-07-13 08:04:55'),(62,'636fngEACAAJ','2021-07-13 11:11:01','2021-07-13 11:11:01'),(63,'Te5YAQAACAAJ','2021-07-13 12:40:33','2021-07-13 12:40:33'),(64,'oaIRrgEACAAJ','2021-07-13 12:41:03','2021-07-13 12:41:03'),(65,'aWZzLPhY4o0C','2021-07-13 12:41:06','2021-07-13 12:41:06'),(66,'9YvqpeVa-_QC','2021-07-13 12:41:09','2021-07-13 12:41:09'),(67,'6uZ0swEACAAJ','2021-07-13 14:24:47','2021-07-13 14:24:47'),(68,'TxRljwEACAAJ','2021-07-13 20:32:23','2021-07-13 20:32:23'),(69,'i152swEACAAJ','2021-07-13 20:32:25','2021-07-13 20:32:25'),(70,'Vb5fkHxt31MC','2021-07-13 20:32:26','2021-07-13 20:32:26'),(71,'fiJfjgEACAAJ','2021-07-13 20:32:27','2021-07-13 20:32:27'),(72,'eLO9DwAAQBAJ','2021-07-13 20:32:27','2021-07-13 20:32:27'),(73,'x416tAEACAAJ','2021-07-13 20:32:28','2021-07-13 20:32:28'),(74,'eZZFQAAACAAJ','2021-07-13 20:32:29','2021-07-13 20:32:29'),(75,'OWgMPAAACAAJ','2021-07-14 10:11:08','2021-07-14 10:11:08'),(76,'V5s14nks9I8C','2021-07-14 12:08:17','2021-07-14 12:08:17'),(77,'ggU9DwAAQBAJ','2021-07-14 12:08:18','2021-07-14 12:08:18'),(78,'J94fPQAACAAJ','2021-07-14 12:08:18','2021-07-14 12:08:18'),(79,'47mxDsIUjc4C','2021-07-14 12:08:19','2021-07-14 12:08:19'),(80,'BvBaCjMr-rQC','2021-07-14 12:08:20','2021-07-14 12:08:20'),(81,'vW3hmLeu0L4C','2021-07-14 12:08:20','2021-07-14 12:08:20'),(82,'tw7ntAEACAAJ','2021-07-14 12:08:21','2021-07-14 12:08:21'),(83,'CK-IDwAAQBAJ','2021-07-14 12:08:23','2021-07-14 12:08:23'),(84,'54EjAQAAIAAJ','2021-07-14 12:08:28','2021-07-14 12:08:28'),(85,'eQ7ct2r14w0C','2021-07-14 12:08:29','2021-07-14 12:08:29'),(86,'W3MPwQEACAAJ','2021-07-14 12:08:29','2021-07-14 12:08:29'),(87,'1shKrgEACAAJ','2021-07-14 12:08:30','2021-07-14 12:08:30'),(88,'AH3fAAAAMAAJ','2021-07-14 12:08:31','2021-07-14 12:08:31'),(89,'9eigT0Z_sX4C','2021-07-14 12:08:31','2021-07-14 12:08:31'),(90,'iwZmAAAAMAAJ','2021-07-14 12:08:32','2021-07-14 12:08:32');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_reader`
--

DROP TABLE IF EXISTS `book_reader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_reader` (
  `book_reader_id` int NOT NULL AUTO_INCREMENT,
  `reader_id` int NOT NULL,
  `book_id` int NOT NULL,
  `purchase_date` timestamp NULL DEFAULT NULL,
  `reader_rating` int DEFAULT NULL,
  `start_reading` timestamp NULL DEFAULT NULL,
  `end_reading` timestamp NULL DEFAULT NULL,
  `edition_number` varchar(100) DEFAULT NULL,
  `reading_time` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_reader_id`),
  UNIQUE KEY `book_reader_UNIQUE` (`book_reader_id`),
  UNIQUE KEY `reader_id` (`reader_id`,`book_id`),
  UNIQUE KEY `reader_id_2` (`reader_id`,`book_id`),
  KEY `fk_book_reader_reader_id_idx` (`reader_id`),
  KEY `fk_book_reader_book_id_idx` (`book_id`),
  CONSTRAINT `fk_book_reader_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `fk_book_reader_reader_id` FOREIGN KEY (`reader_id`) REFERENCES `reader` (`reader_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reader`
--

LOCK TABLES `book_reader` WRITE;
/*!40000 ALTER TABLE `book_reader` DISABLE KEYS */;
INSERT INTO `book_reader` VALUES (63,2,55,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 15:00:09'),(64,2,57,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 15:28:15'),(66,2,59,NULL,2,'2021-07-01 00:00:00','2021-07-13 00:00:00',NULL,12,'2021-07-13 17:30:38'),(67,2,66,'2021-06-28 00:00:00',NULL,'2021-07-01 00:00:00',NULL,'8',NULL,'2021-07-13 17:33:22'),(69,2,65,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 17:59:36'),(70,2,63,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 18:04:00'),(71,2,61,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 18:13:32'),(72,4,68,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:23'),(73,4,69,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:25'),(74,4,70,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:26'),(75,4,71,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:27'),(76,4,72,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:27'),(77,4,73,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:28'),(78,4,74,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-13 20:32:29'),(79,5,55,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 10:10:58'),(80,5,57,'2020-04-15 00:00:00',4,'2021-07-14 00:00:00','2021-08-18 00:00:00',NULL,35,'2021-07-14 10:11:04'),(82,2,76,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:17'),(83,2,77,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:18'),(84,2,78,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:18'),(85,2,79,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:19'),(86,2,80,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:20'),(87,2,81,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:20'),(88,2,82,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:21'),(89,2,83,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:23'),(90,2,84,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:28'),(91,2,85,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:29'),(92,2,86,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:29'),(93,2,87,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:30'),(94,2,88,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:31'),(95,2,89,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:31'),(96,2,90,NULL,NULL,NULL,NULL,NULL,NULL,'2021-07-14 12:08:32');
/*!40000 ALTER TABLE `book_reader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_writer`
--

DROP TABLE IF EXISTS `book_writer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_writer` (
  `writer_id` int NOT NULL,
  `book_id` int NOT NULL,
  KEY `writer_id_idx` (`writer_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `fk_book_writer_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `fk_book_writer_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_writer`
--

LOCK TABLES `book_writer` WRITE;
/*!40000 ALTER TABLE `book_writer` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_writer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reader`
--

DROP TABLE IF EXISTS `reader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reader` (
  `reader_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reader_id`),
  UNIQUE KEY `reader_id_UNIQUE` (`reader_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `password_UNIQUE` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reader`
--

LOCK TABLES `reader` WRITE;
/*!40000 ALTER TABLE `reader` DISABLE KEYS */;
INSERT INTO `reader` VALUES (1,'Nuno','Mendonça','nuno@gmail.com','$2b$10$oIa.x5RSGJRvwF7l4Zb4iuHZsJRTjb/OTIqm5SgmxChNgeKDNXkRC','2021-06-16 13:44:25','2021-06-18 21:50:05'),(2,'Cris','Pereira','cris@gmail.com','$2b$10$afVEVT3nipnJ.21FOJs6f.0gyJQXp3ZwJIr3zMiYA34VaAHk/pi4C','2021-06-16 13:44:25','2021-07-01 15:09:30'),(3,'Zé','Bsainas','nm@gmail.com','$2b$10$7hF5p37ghxyvY0dO9f.cQubU0WI5yekREIGl7nODa2YqcomXlv8tq','2021-07-13 18:52:31','2021-07-13 18:52:31'),(4,'Irene','Pereira','irene@gmail.com','$2b$10$N85z5UgXL12JflfaJqKV8eaInUtXK2f3YiHQOFhGqcAoTu/rvzW6W','2021-07-13 20:31:33','2021-07-13 20:31:33'),(5,'Mino','Mendonca','gjmm@gmail.com','$2b$10$08l.O5syvBU3i6kA5DhGf.NnKpnHltnDeLdGAiXtWzdi1bjODWcNC','2021-07-13 20:45:55','2021-07-13 20:45:55'),(6,'Cina','Monteiro','cina@gmail.com','$2b$10$Bks6GwHyR8vUD2Gkq07YwOZMXopq1Qolf77iZt7cv.rVkxapsNGiu','2021-07-13 20:47:26','2021-07-13 20:47:26');
/*!40000 ALTER TABLE `reader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `writer`
--

DROP TABLE IF EXISTS `writer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `writer` (
  `writer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`writer_id`),
  UNIQUE KEY `writer_id_UNIQUE` (`writer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `writer`
--

LOCK TABLES `writer` WRITE;
/*!40000 ALTER TABLE `writer` DISABLE KEYS */;
/*!40000 ALTER TABLE `writer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `writer_reader`
--

DROP TABLE IF EXISTS `writer_reader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `writer_reader` (
  `writer_id` int NOT NULL,
  `reader_id` int NOT NULL,
  KEY `reader_id_idx` (`reader_id`),
  KEY `writer_id_idx` (`writer_id`),
  CONSTRAINT `fk_writer_reader_reader_id` FOREIGN KEY (`reader_id`) REFERENCES `reader` (`reader_id`),
  CONSTRAINT `fk_writer_reader_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `writer_reader`
--

LOCK TABLES `writer_reader` WRITE;
/*!40000 ALTER TABLE `writer_reader` DISABLE KEYS */;
/*!40000 ALTER TABLE `writer_reader` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-14 13:13:20

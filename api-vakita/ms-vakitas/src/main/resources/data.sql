CREATE DATABASE  IF NOT EXISTS `vakitadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vakitadb`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: vakitadb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'andres@micorreo.com'),(2,'mglendinning0@correo.com'),(3,'rrmaria@micorreo.com'),(4,'andreagal@micorreo.com'),(5,'melodaniel@micorreo.com'),(6,'karenv@micorreo.com'),(7,'josemartinez@micorreo.com'),(8,'fergarcia@micorreo.com'),(9,'luciamesa@micorreo.com'),(10,'diazjuan@micorreo.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vakita_has_contributors`
--

DROP TABLE IF EXISTS `vakita_has_contributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vakita_has_contributors` (
  `user_id` bigint NOT NULL,
  `vakita_id` bigint NOT NULL,
  KEY `FKaqygejvrbxtxu61j2nfoam6cr` (`user_id`),
  KEY `FKlcj5ew2u8iikp73qbb8gj5fax` (`vakita_id`),
  CONSTRAINT `FKaqygejvrbxtxu61j2nfoam6cr` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKlcj5ew2u8iikp73qbb8gj5fax` FOREIGN KEY (`vakita_id`) REFERENCES `vakitas` (`vakita_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vakita_has_contributors`
--

LOCK TABLES `vakita_has_contributors` WRITE;
/*!40000 ALTER TABLE `vakita_has_contributors` DISABLE KEYS */;
INSERT INTO `vakita_has_contributors` VALUES (1,1),(2,1),(1,2),(2,3),(2,4),(3,5),(4,6),(5,7),(6,8),(7,9),(8,10),(9,10),(3,10),(4,10);
/*!40000 ALTER TABLE `vakita_has_contributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vakitas`
--

DROP TABLE IF EXISTS `vakitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vakitas` (
  `creation_date` date NOT NULL,
  `cumulative_amount` double NOT NULL,
  `expiration_date` date NOT NULL,
  `is_active` bit(1) NOT NULL,
  `total_amount` double NOT NULL,
  `type` tinyint NOT NULL,
  `user_creator_id` bigint NOT NULL,
  `vakita_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `img_url` varchar(200) NOT NULL,
  PRIMARY KEY (`vakita_id`),
  CONSTRAINT `vakitas_chk_1` CHECK ((`type` between 0 and 1))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vakitas`
--

LOCK TABLES `vakitas` WRITE;
/*!40000 ALTER TABLE `vakitas` DISABLE KEYS */;
INSERT INTO `vakitas` VALUES ('2023-04-17',0,'2023-10-17',_binary '',2000,0,1,1,'Cumple Juan','Fiesta sorpresa para Juan','URL'),('2022-12-20',200,'2023-07-10',_binary '',2000,0,1,2,'Paseo familiar','Conocer el mar','URL'),('2023-01-17',500,'2023-09-28',_binary '',1000,0,2,3,'Comprar zapatos','Zapatos comodos','URL'),('2023-03-07',800,'2023-09-17',_binary '',1500,0,2,4,' San Valentin','Cita en su restaurante favorito','URL'),('2023-05-13',950,'2023-10-02',_binary '',3000,0,3,5,'Salida con amigos','Ir a la montaña a divertirnos','URL'),('2023-04-17',0,'2023-04-25',_binary '',2000,0,4,6,'Viernes de karaoke','Compartir con mis amigas mientras nos divertimos','url'),('2023-06-20',350,'2023-06-30',_binary '',3500,0,5,7,'Partido en la empresa','Jugar por unas polas','URL'),('2023-01-17',500,'2023-09-28',_binary '',1000,0,6,8,'Exposición de arte','Ver las obras de Botero','URL'),('2023-11-17',800,'2023-12-17',_binary '',1500,0,7,9,'Ir a el concierto','Ver la banda tocar en vivo !!','URL'),('2023-01-10',1500,'2023-05-02',_binary '',2000,0,8,10,'Adoptar un perrito','Comprarle lo que necesita para su llegada','URL');
/*!40000 ALTER TABLE `vakitas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-06 23:01:46

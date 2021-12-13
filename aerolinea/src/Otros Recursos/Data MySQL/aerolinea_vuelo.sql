-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: aerolinea
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `vuelo`
--

DROP TABLE IF EXISTS `vuelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vuelo` (
  `idVuelo` int NOT NULL AUTO_INCREMENT,
  `numVuelo` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `sillasDisponibles` varchar(180) COLLATE utf8_spanish_ci NOT NULL,
  `precioUnitario` double NOT NULL,
  `fecha` date NOT NULL,
  `duracion` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `tipoRuta` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `idRuta` int NOT NULL,
  `tipoVuelo` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `hora` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idVuelo`),
  KEY `fk_idVueloRuta_idx` (`idRuta`),
  CONSTRAINT `fk_idVueloRuta` FOREIGN KEY (`idRuta`) REFERENCES `ruta` (`idRuta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vuelo`
--

LOCK TABLES `vuelo` WRITE;
/*!40000 ALTER TABLE `vuelo` DISABLE KEYS */;
INSERT INTO `vuelo` VALUES (1,'UA2661','15A,15B,30A,30B,30C',280,'2021-11-05','30m','directo',1,'ida','00:30:00'),(2,'UA2361','10A,10B,25A,25B',400,'2021-11-07','2h','directo',2,'regreso','02:00:00'),(3,'UA2600','15A',380,'2021-11-05','30m','directo',3,'regreso','21:00:00');
/*!40000 ALTER TABLE `vuelo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-12 15:42:33

-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 15, 2021 at 07:49 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `centrosmedicos`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

CREATE TABLE `attachment` (
  `id` int NOT NULL,
  `uploader_user_id` int NOT NULL,
  `file_type_id` int DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `original_filename` varchar(255) NOT NULL,
  `content_type` varchar(255) NOT NULL,
  `size` bigint NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bitacora`
--

CREATE TABLE `bitacora` (
  `id` int NOT NULL,
  `titulo` varchar(40) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bitacora`
--

INSERT INTO `bitacora` (`id`, `titulo`, `descripcion`, `fecha`, `tiempo_creacion`) VALUES
(1, 'PERMISO DENEGADO', '_CUSTOM_POST={\"id\":9,\"id_especialidad\":2,\"id_centro_medico\":2,\"id_imagen\":null,\"color_calendario\":\"#ffba00\",\"duracion_consulta\":30,\"telefono\":\"6461078871\",\"nombre\":\"Cristina Flores Garcia\",\"especialidad\":\"Endodoncia\",\"tiempo_creacion\":\"2020-07-10T22:15:00.000Z\",\"tiempo_actualizacion\":\"2020-07-10T22:15:00.000Z\"}\n---------------------------\n_POST=Array\n(\n)\n\n---------------------------\n_GET=Array\n(\n)\n\n---------------------------\n_REQUEST=Array\n(\n)\n\n---------------------------\n_SERVER=Array\n(\n    [HTTP_HOST] => 127.0.0.1\n    [HTTP_USER_AGENT] => Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0\n    [HTTP_ACCEPT] => application/json, text/plain, */*\n    [HTTP_ACCEPT_LANGUAGE] => en-US,en;q=0.5\n    [HTTP_ACCEPT_ENCODING] => gzip, deflate\n    [CONTENT_TYPE] => application/json\n    [CONTENT_LENGTH] => 299\n    [HTTP_ORIGIN] => http://localhost:4200\n    [HTTP_CONNECTION] => keep-alive\n    [HTTP_REFERER] => http://localhost:4200/\n    [HTTP_COOKIE] => PHPSESSID=stasl6uch7gg47clrapq8ct0a3\n    [PATH] => /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin\n    [SERVER_SIGNATURE] => <address>Apache/2.4.41 (Ubuntu) Server at 127.0.0.1 Port 80</address>\n\n    [SERVER_SOFTWARE] => Apache/2.4.41 (Ubuntu)\n    [SERVER_NAME] => 127.0.0.1\n    [SERVER_ADDR] => 127.0.0.1\n    [SERVER_PORT] => 80\n    [REMOTE_ADDR] => 127.0.0.1\n    [DOCUMENT_ROOT] => /var/www/html\n    [REQUEST_SCHEME] => http\n    [CONTEXT_PREFIX] => \n    [CONTEXT_DOCUMENT_ROOT] => /var/www/html\n    [SERVER_ADMIN] => webmaster@localhost\n    [SCRIPT_FILENAME] => /var/www/html/CentroMedico/doctor.php\n    [REMOTE_PORT] => 34072\n    [GATEWAY_INTERFACE] => CGI/1.1\n    [SERVER_PROTOCOL] => HTTP/1.1\n    [REQUEST_METHOD] => PUT\n    [QUERY_STRING] => \n    [REQUEST_URI] => /CentroMedico//doctor.php\n    [SCRIPT_NAME] => /CentroMedico/doctor.php\n    [PHP_SELF] => /CentroMedico/doctor.php\n    [REQUEST_TIME_FLOAT] => 1597533844.455\n    [REQUEST_TIME] => 1597533844\n)\n\n---------------------------\n', '2020-08-15 23:24:04', '2020-08-15 23:24:04'),
(3, 'NO CAMPOS DE USUARIO', 'NO SE VERIFICO CAMPOS DE USUARIO', '2020-08-31 18:18:03', '2020-08-31 18:18:03'),
(4, 'ERROR_ODONTOGRAMA', '_CUSTOM_POST={\"tipo_pregunta\":\"\",\"es_pregunta_binaria\":\"\",\"depende_del_genero\":\"\"}\n---------------------------\n_POST=Array\n(\n)\n\n---------------------------\n_GET=Array\n(\n)\n\n---------------------------\n_REQUEST=Array\n(\n)\n\n---------------------------\n_SERVER=Array\n(\n    [HTTP_HOST] => 127.0.0.1\n    [HTTP_CONNECTION] => keep-alive\n    [CONTENT_LENGTH] => 69\n    [HTTP_PRAGMA] => no-cache\n    [HTTP_CACHE_CONTROL] => no-cache\n    [HTTP_ACCEPT] => application/json, text/plain, */*\n    [HTTP_USER_AGENT] => Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\n    [CONTENT_TYPE] => application/json\n    [HTTP_ORIGIN] => http://localhost:4200\n    [HTTP_SEC_FETCH_SITE] => cross-site\n    [HTTP_SEC_FETCH_MODE] => cors\n    [HTTP_SEC_FETCH_DEST] => empty\n    [HTTP_REFERER] => http://localhost:4200/\n    [HTTP_ACCEPT_ENCODING] => gzip, deflate, br\n    [HTTP_ACCEPT_LANGUAGE] => en-US,en;q=0.9\n    [PATH] => /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin\n    [SERVER_SIGNATURE] => <address>Apache/2.4.41 (Ubuntu) Server at 127.0.0.1 Port 80</address>\n\n    [SERVER_SOFTWARE] => Apache/2.4.41 (Ubuntu)\n    [SERVER_NAME] => 127.0.0.1\n    [SERVER_ADDR] => 127.0.0.1\n    [SERVER_PORT] => 80\n    [REMOTE_ADDR] => 127.0.0.1\n    [DOCUMENT_ROOT] => /var/www/html\n    [REQUEST_SCHEME] => http\n    [CONTEXT_PREFIX] => \n    [CONTEXT_DOCUMENT_ROOT] => /var/www/html\n    [SERVER_ADMIN] => webmaster@localhost\n    [SCRIPT_FILENAME] => /var/www/html/CentroMedico/odontograma.php\n    [REMOTE_PORT] => 44650\n    [GATEWAY_INTERFACE] => CGI/1.1\n    [SERVER_PROTOCOL] => HTTP/1.1\n    [REQUEST_METHOD] => POST\n    [QUERY_STRING] => \n    [REQUEST_URI] => /CentroMedico//odontograma.php\n    [SCRIPT_NAME] => /CentroMedico/odontograma.php\n    [PHP_SELF] => /CentroMedico/odontograma.php\n    [REQUEST_TIME_FLOAT] => 1603906432.503\n    [REQUEST_TIME] => 1603906432\n)\n\n---------------------------\n', '2020-10-28 17:33:52', '2020-10-28 17:33:52'),
(5, 'ERROR_ODONTOGRAMA', '_CUSTOM_POST={\"tipo_pregunta\":\"\",\"es_pregunta_binaria\":\"\",\"depende_del_genero\":\"\"}\n---------------------------\n_POST=Array\n(\n)\n\n---------------------------\n_GET=Array\n(\n)\n\n---------------------------\n_REQUEST=Array\n(\n)\n\n---------------------------\n_SERVER=Array\n(\n    [HTTP_HOST] => 127.0.0.1\n    [HTTP_CONNECTION] => keep-alive\n    [CONTENT_LENGTH] => 69\n    [HTTP_PRAGMA] => no-cache\n    [HTTP_CACHE_CONTROL] => no-cache\n    [HTTP_ACCEPT] => application/json, text/plain, */*\n    [HTTP_USER_AGENT] => Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\n    [CONTENT_TYPE] => application/json\n    [HTTP_ORIGIN] => http://localhost:4200\n    [HTTP_SEC_FETCH_SITE] => cross-site\n    [HTTP_SEC_FETCH_MODE] => cors\n    [HTTP_SEC_FETCH_DEST] => empty\n    [HTTP_REFERER] => http://localhost:4200/\n    [HTTP_ACCEPT_ENCODING] => gzip, deflate, br\n    [HTTP_ACCEPT_LANGUAGE] => en-US,en;q=0.9\n    [PATH] => /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin\n    [SERVER_SIGNATURE] => <address>Apache/2.4.41 (Ubuntu) Server at 127.0.0.1 Port 80</address>\n\n    [SERVER_SOFTWARE] => Apache/2.4.41 (Ubuntu)\n    [SERVER_NAME] => 127.0.0.1\n    [SERVER_ADDR] => 127.0.0.1\n    [SERVER_PORT] => 80\n    [REMOTE_ADDR] => 127.0.0.1\n    [DOCUMENT_ROOT] => /var/www/html\n    [REQUEST_SCHEME] => http\n    [CONTEXT_PREFIX] => \n    [CONTEXT_DOCUMENT_ROOT] => /var/www/html\n    [SERVER_ADMIN] => webmaster@localhost\n    [SCRIPT_FILENAME] => /var/www/html/CentroMedico/odontograma.php\n    [REMOTE_PORT] => 45560\n    [GATEWAY_INTERFACE] => CGI/1.1\n    [SERVER_PROTOCOL] => HTTP/1.1\n    [REQUEST_METHOD] => POST\n    [QUERY_STRING] => \n    [REQUEST_URI] => /CentroMedico//odontograma.php\n    [SCRIPT_NAME] => /CentroMedico/odontograma.php\n    [PHP_SELF] => /CentroMedico/odontograma.php\n    [REQUEST_TIME_FLOAT] => 1603906545.48\n    [REQUEST_TIME] => 1603906545\n)\n\n---------------------------\n', '2020-10-28 17:35:45', '2020-10-28 17:35:45'),
(6, 'ERROR_ODONTOGRAMA', '_CUSTOM_POST={\"tipo_pregunta\":\"\",\"es_pregunta_binaria\":\"\",\"depende_del_genero\":\"\"}\n---------------------------\n_POST=Array\n(\n)\n\n---------------------------\n_GET=Array\n(\n)\n\n---------------------------\n_REQUEST=Array\n(\n)\n\n---------------------------\n_SERVER=Array\n(\n    [HTTP_HOST] => 127.0.0.1\n    [HTTP_CONNECTION] => keep-alive\n    [CONTENT_LENGTH] => 69\n    [HTTP_PRAGMA] => no-cache\n    [HTTP_CACHE_CONTROL] => no-cache\n    [HTTP_ACCEPT] => application/json, text/plain, */*\n    [HTTP_USER_AGENT] => Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\n    [CONTENT_TYPE] => application/json\n    [HTTP_ORIGIN] => http://localhost:4200\n    [HTTP_SEC_FETCH_SITE] => cross-site\n    [HTTP_SEC_FETCH_MODE] => cors\n    [HTTP_SEC_FETCH_DEST] => empty\n    [HTTP_REFERER] => http://localhost:4200/Posco\n    [HTTP_ACCEPT_ENCODING] => gzip, deflate, br\n    [HTTP_ACCEPT_LANGUAGE] => en-US,en;q=0.9\n    [PATH] => /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin\n    [SERVER_SIGNATURE] => <address>Apache/2.4.41 (Ubuntu) Server at 127.0.0.1 Port 80</address>\n\n    [SERVER_SOFTWARE] => Apache/2.4.41 (Ubuntu)\n    [SERVER_NAME] => 127.0.0.1\n    [SERVER_ADDR] => 127.0.0.1\n    [SERVER_PORT] => 80\n    [REMOTE_ADDR] => 127.0.0.1\n    [DOCUMENT_ROOT] => /var/www/html\n    [REQUEST_SCHEME] => http\n    [CONTEXT_PREFIX] => \n    [CONTEXT_DOCUMENT_ROOT] => /var/www/html\n    [SERVER_ADMIN] => webmaster@localhost\n    [SCRIPT_FILENAME] => /var/www/html/CentroMedico/odontograma.php\n    [REMOTE_PORT] => 40052\n    [GATEWAY_INTERFACE] => CGI/1.1\n    [SERVER_PROTOCOL] => HTTP/1.1\n    [REQUEST_METHOD] => POST\n    [QUERY_STRING] => \n    [REQUEST_URI] => /CentroMedico//odontograma.php\n    [SCRIPT_NAME] => /CentroMedico/odontograma.php\n    [PHP_SELF] => /CentroMedico/odontograma.php\n    [REQUEST_TIME_FLOAT] => 1603909224.04\n    [REQUEST_TIME] => 1603909224\n)\n\n---------------------------\n', '2020-10-28 18:20:24', '2020-10-28 18:20:24'),
(7, 'MYSQL_ERROR', 'Error No.:1064 -[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 54 // FUNCTION: addMysqlError // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 182 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta ==`PREGUNTA_ESPECIFICA` AND tipo_pregunta == `PREGUNTA_GENERAL` AND tipo_pregunta == `SECCION_PREGUNTAS`\n    [2] => 500\n    [3] => \n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/DBTable.php // LINE: 337 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta ==`PREGUNTA_ESPECIFICA` AND tipo_pregunta == `PREGUNTA_GENERAL` AND tipo_pregunta == `SECCION_PREGUNTAS`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/pregunta_historia_clinica.php // LINE: 49 // FUNCTION: getArrayFromQuery // ARGS: Array\n(\n    [0] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta ==`PREGUNTA_ESPECIFICA` AND tipo_pregunta == `PREGUNTA_GENERAL` AND tipo_pregunta == `SECCION_PREGUNTAS`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/RestController.php // LINE: 87 // FUNCTION: get // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/pregunta_historia_clinica.php // LINE: 82 // FUNCTION: execute // ARGS: Array\n(\n)\n ]	-: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'==`PREGUNTA_ESPECIFICA` AND tipo_pregunta == `PREGUNTA_GENERAL` AND tipo_pregunt\' at line 1', '2020-11-05 00:04:59', '2020-11-05 00:04:59'),
(8, 'LOG_ERROR', 'Array\n(\n    [file] => /var/www/html/CentroMedico/akou/src/LoggableException.php\n    [line] => 182\n    [function] => __construct\n    [message] => An error occours please try gain later\n    [technical_message] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta ==`PREGUNTA_ESPECIFICA` AND tipo_pregunta == `PREGUNTA_GENERAL` AND tipo_pregunta == `SECCION_PREGUNTAS`\n    [date] => 2020-11-05 00:04:59\n)\n SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta ==`PREGUNTA_ESPECIFICA` AND tipo_pregunta == `PREGUNTA_GENERAL` AND tipo_pregunta == `SECCION_PREGUNTAS`', '2020-11-05 00:04:59', '2020-11-05 00:04:59'),
(9, 'MYSQL_ERROR', 'Error No.:1064 -[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 54 // FUNCTION: addMysqlError // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 182 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [2] => 500\n    [3] => \n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/DBTable.php // LINE: 337 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 50 // FUNCTION: getArrayFromQuery // ARGS: Array\n(\n    [0] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/RestController.php // LINE: 87 // FUNCTION: get // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 160 // FUNCTION: execute // ARGS: Array\n(\n)\n ]	-: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'== `PREGUNTA_ODONTOGRAMA`\' at line 1', '2020-11-05 01:24:45', '2020-11-05 01:24:45'),
(10, 'LOG_ERROR', 'Array\n(\n    [file] => /var/www/html/CentroMedico/akou/src/LoggableException.php\n    [line] => 182\n    [function] => __construct\n    [message] => An error occours please try gain later\n    [technical_message] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [date] => 2020-11-05 01:24:45\n)\n SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`', '2020-11-05 01:24:45', '2020-11-05 01:24:45'),
(11, 'MYSQL_ERROR', 'Error No.:1064 -[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 54 // FUNCTION: addMysqlError // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 182 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [2] => 500\n    [3] => \n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/DBTable.php // LINE: 337 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 50 // FUNCTION: getArrayFromQuery // ARGS: Array\n(\n    [0] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/RestController.php // LINE: 87 // FUNCTION: get // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 160 // FUNCTION: execute // ARGS: Array\n(\n)\n ]	-: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'== `PREGUNTA_ODONTOGRAMA`\' at line 1', '2020-11-05 03:09:35', '2020-11-05 03:09:35'),
(12, 'LOG_ERROR', 'Array\n(\n    [file] => /var/www/html/CentroMedico/akou/src/LoggableException.php\n    [line] => 182\n    [function] => __construct\n    [message] => An error occours please try gain later\n    [technical_message] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [date] => 2020-11-05 03:09:35\n)\n SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`', '2020-11-05 03:09:35', '2020-11-05 03:09:35'),
(13, 'MYSQL_ERROR', 'Error No.:1064 -[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 54 // FUNCTION: addMysqlError // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 182 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [2] => 500\n    [3] => \n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/DBTable.php // LINE: 337 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 50 // FUNCTION: getArrayFromQuery // ARGS: Array\n(\n    [0] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/RestController.php // LINE: 87 // FUNCTION: get // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 160 // FUNCTION: execute // ARGS: Array\n(\n)\n ]	-: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'== `PREGUNTA_ODONTOGRAMA`\' at line 1', '2020-11-05 03:09:40', '2020-11-05 03:09:40'),
(14, 'LOG_ERROR', 'Array\n(\n    [file] => /var/www/html/CentroMedico/akou/src/LoggableException.php\n    [line] => 182\n    [function] => __construct\n    [message] => An error occours please try gain later\n    [technical_message] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [date] => 2020-11-05 03:09:40\n)\n SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`', '2020-11-05 03:09:41', '2020-11-05 03:09:41'),
(15, 'MYSQL_ERROR', 'Error No.:1064 -[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 54 // FUNCTION: addMysqlError // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 182 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [2] => 500\n    [3] => \n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/DBTable.php // LINE: 337 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 50 // FUNCTION: getArrayFromQuery // ARGS: Array\n(\n    [0] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/RestController.php // LINE: 87 // FUNCTION: get // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 160 // FUNCTION: execute // ARGS: Array\n(\n)\n ]	-: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'== `PREGUNTA_ODONTOGRAMA`\' at line 1', '2020-11-05 03:10:15', '2020-11-05 03:10:15'),
(16, 'LOG_ERROR', 'Array\n(\n    [file] => /var/www/html/CentroMedico/akou/src/LoggableException.php\n    [line] => 182\n    [function] => __construct\n    [message] => An error occours please try gain later\n    [technical_message] => SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`\n    [date] => 2020-11-05 03:10:15\n)\n SELECT * FROM pregunta_historia_clinica WHERE tipo_pregunta == `PREGUNTA_ODONTOGRAMA`', '2020-11-05 03:10:15', '2020-11-05 03:10:15'),
(17, 'MYSQL_ERROR', 'Error No.:1064 -[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 54 // FUNCTION: addMysqlError // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/LoggableException.php // LINE: 182 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE (tipo_pregunta == \"PREGUNTA_ODONTOGRAMA\")\n    [2] => 500\n    [3] => \n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/DBTable.php // LINE: 337 // FUNCTION: __construct // ARGS: Array\n(\n    [0] => An error occours please try gain later\n    [1] => SELECT * FROM pregunta_historia_clinica WHERE (tipo_pregunta == \"PREGUNTA_ODONTOGRAMA\")\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 50 // FUNCTION: getArrayFromQuery // ARGS: Array\n(\n    [0] => SELECT * FROM pregunta_historia_clinica WHERE (tipo_pregunta == \"PREGUNTA_ODONTOGRAMA\")\n)\n ]	--[ FILE: /var/www/html/CentroMedico/akou/src/RestController.php // LINE: 87 // FUNCTION: get // ARGS: Array\n(\n)\n ]	--[ FILE: /var/www/html/CentroMedico/odontograma.php // LINE: 160 // FUNCTION: execute // ARGS: Array\n(\n)\n ]	-: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'== \"PREGUNTA_ODONTOGRAMA\")\' at line 1', '2020-11-05 03:23:43', '2020-11-05 03:23:43'),
(18, 'LOG_ERROR', 'Array\n(\n    [file] => /var/www/html/CentroMedico/akou/src/LoggableException.php\n    [line] => 182\n    [function] => __construct\n    [message] => An error occours please try gain later\n    [technical_message] => SELECT * FROM pregunta_historia_clinica WHERE (tipo_pregunta == \"PREGUNTA_ODONTOGRAMA\")\n    [date] => 2020-11-05 03:23:43\n)\n SELECT * FROM pregunta_historia_clinica WHERE (tipo_pregunta == \"PREGUNTA_ODONTOGRAMA\")', '2020-11-05 03:23:43', '2020-11-05 03:23:43');

-- --------------------------------------------------------

--
-- Table structure for table `categoria_merma`
--

CREATE TABLE `categoria_merma` (
  `id` int NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `centro_medico`
--

CREATE TABLE `centro_medico` (
  `id` int NOT NULL,
  `id_organizacion` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(16) DEFAULT NULL,
  `rfc` varchar(50) DEFAULT NULL,
  `ciudad` varchar(60) DEFAULT NULL,
  `estado` varchar(60) DEFAULT NULL,
  `codigo_postal` int DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `id_imagen` int DEFAULT NULL,
  `id_imagen_ticket` int DEFAULT NULL,
  `saludo_ticket` text,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `iva` decimal(10,2) NOT NULL DEFAULT '16.00',
  `tipo_cambio_dolares` decimal(10,2) NOT NULL DEFAULT '18.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `centro_medico`
--

INSERT INTO `centro_medico` (`id`, `id_organizacion`, `nombre`, `telefono`, `rfc`, `ciudad`, `estado`, `codigo_postal`, `direccion`, `id_imagen`, `id_imagen_ticket`, `saludo_ticket`, `tiempo_creacion`, `iva`, `tipo_cambio_dolares`) VALUES
(1, 1, 'FIFA', '7711485266', '', 'pachuca', 'hidalgo', 42084, 'Blvd. Luis Donaldo Colosio, No. 212 5to piso, Centro Comercial Interplaza', NULL, NULL, 'Gracias, por su preferencia.', '2020-05-04 22:10:25', '16.00', '18.00'),
(2, 2, 'Jireh Dental Care', '6462049134', NULL, 'ensenada', 'baja california', 22887, 'Av. Reforma #174, Col Abelardo Rodriguez, Local 2', NULL, NULL, 'Gracias, por su preferencia.', '2020-07-02 20:03:17', '16.00', '18.00');

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE `cita` (
  `id` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_servicio` int DEFAULT NULL,
  `id_doctor` int DEFAULT NULL,
  `id_centro_medico` int NOT NULL,
  `estatus` enum('PENDIENTE','CANCELADA','ACTIVA') NOT NULL DEFAULT 'PENDIENTE',
  `inicio` datetime NOT NULL,
  `fin` datetime DEFAULT NULL,
  `fecha_inicio_utc` timestamp NULL DEFAULT NULL,
  `nota` text,
  `confirmado_por_doctor` enum('NO','SI') NOT NULL DEFAULT 'NO',
  `confirmado_por_paciente` enum('NO','SI') NOT NULL DEFAULT 'NO',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cita`
--

INSERT INTO `cita` (`id`, `id_paciente`, `id_servicio`, `id_doctor`, `id_centro_medico`, `estatus`, `inicio`, `fin`, `fecha_inicio_utc`, `nota`, `confirmado_por_doctor`, `confirmado_por_paciente`, `tiempo_creacion`) VALUES
(1, 1, NULL, 2, 1, 'ACTIVA', '2020-03-18 15:30:00', NULL, NULL, NULL, 'SI', 'SI', '2020-03-18 17:14:25'),
(2, 1, NULL, 2, 1, 'PENDIENTE', '2020-03-18 18:00:00', NULL, NULL, '\n', 'NO', 'NO', '2020-03-18 18:27:32'),
(3, 1, NULL, 2, 1, 'PENDIENTE', '2020-03-18 18:00:00', NULL, NULL, '', 'NO', 'NO', '2020-03-18 18:27:32'),
(4, 1, NULL, 2, 1, 'PENDIENTE', '2020-03-18 18:00:00', NULL, NULL, 'Cita 2\n', 'NO', 'NO', '2020-03-18 18:27:32'),
(5, 1, NULL, 2, 1, 'PENDIENTE', '2020-03-18 18:00:00', NULL, NULL, 'Cita 2\n', 'NO', 'NO', '2020-03-18 18:27:32'),
(6, 1, NULL, 2, 1, 'ACTIVA', '2020-03-18 18:00:00', NULL, NULL, 'Cita 2\n', 'NO', 'SI', '2020-03-18 18:27:32'),
(7, 1, NULL, 2, 1, 'ACTIVA', '2020-03-20 15:30:00', NULL, NULL, NULL, 'SI', 'SI', '2020-03-18 18:37:36'),
(8, 1, NULL, 2, 1, 'ACTIVA', '2019-10-14 19:20:00', NULL, NULL, 'Cirugia programada', 'SI', 'SI', '2020-04-06 19:57:20'),
(9, 2, NULL, 9, 2, 'PENDIENTE', '2020-07-28 11:20:00', NULL, NULL, 'prueba', 'NO', 'NO', '2020-07-28 17:31:55'),
(10, 2, NULL, 9, 2, 'ACTIVA', '2020-07-28 12:40:00', NULL, NULL, NULL, 'SI', 'SI', '2020-07-28 18:37:00'),
(11, 2, NULL, 13, 2, 'CANCELADA', '2020-07-31 10:00:00', '2020-07-31 00:00:00', NULL, 'Cementar Puente fijo', 'NO', 'NO', '2020-07-30 01:15:05'),
(12, 2, NULL, 9, 2, 'ACTIVA', '2020-08-14 09:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-08-14 07:12:08'),
(13, 3, NULL, 9, 2, 'ACTIVA', '2020-08-14 09:00:00', NULL, NULL, '', 'NO', 'NO', '2020-08-14 07:12:26'),
(14, 2, NULL, 9, 2, 'ACTIVA', '2020-08-14 15:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-08-14 08:56:07'),
(15, 3, NULL, 9, 2, 'ACTIVA', '2020-08-14 17:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-08-14 09:08:04'),
(16, 2, NULL, 9, 2, 'ACTIVA', '2020-08-14 10:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-08-14 16:02:36'),
(17, 2, NULL, 9, 2, 'PENDIENTE', '2020-08-14 11:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-08-14 17:31:24'),
(18, 1, NULL, 9, 1, 'PENDIENTE', '2020-08-14 13:00:00', NULL, NULL, NULL, 'NO', 'NO', '2020-08-14 17:41:06'),
(19, 2, NULL, 9, 2, 'PENDIENTE', '2020-08-14 13:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-08-14 18:03:57'),
(20, 2, NULL, 13, 2, 'PENDIENTE', '2020-09-06 09:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-09-08 23:33:17'),
(21, 2, NULL, 13, 2, 'PENDIENTE', '2020-09-08 10:00:00', NULL, NULL, 'asdf', 'SI', 'SI', '2020-09-09 01:10:34'),
(22, 2, NULL, 13, 2, 'PENDIENTE', '2020-09-09 10:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-09-09 01:26:43'),
(23, 2, NULL, 13, 2, 'ACTIVA', '2020-09-10 10:00:00', NULL, NULL, 'asd', 'SI', 'SI', '2020-09-09 01:31:26'),
(24, 2, NULL, 13, 2, 'PENDIENTE', '2020-09-11 10:00:00', NULL, NULL, 'asd', 'SI', 'SI', '2020-09-09 02:02:33'),
(25, 2, NULL, 13, 2, 'ACTIVA', '2020-09-11 11:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-09-09 02:11:12'),
(26, 2, NULL, 13, 2, 'PENDIENTE', '2020-09-12 10:00:00', NULL, NULL, 'asdf', 'SI', 'SI', '2020-09-09 17:20:27'),
(27, 2, NULL, 13, 2, 'PENDIENTE', '2020-09-12 11:00:00', NULL, NULL, NULL, 'SI', 'SI', '2020-09-09 17:55:47'),
(28, 2, NULL, 13, 2, 'ACTIVA', '2020-10-30 14:00:00', NULL, NULL, '123', 'SI', 'SI', '2020-10-30 17:18:48'),
(29, 3, NULL, 13, 2, 'ACTIVA', '2020-11-06 13:00:00', NULL, NULL, 'aaa prueba', 'SI', 'SI', '2020-11-05 23:47:58');

-- --------------------------------------------------------

--
-- Table structure for table `comisiones_doctor`
--

CREATE TABLE `comisiones_doctor` (
  `id` int NOT NULL,
  `id_doctor` int NOT NULL,
  `id_venta` int NOT NULL,
  `id_comision_por_servicios` int NOT NULL,
  `cantidad` float NOT NULL,
  `status` enum('PAGADO','PENDIENTE') NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comision_por_servios`
--

CREATE TABLE `comision_por_servios` (
  `id` int NOT NULL,
  `id_servicio` int NOT NULL,
  `id_doctor` int NOT NULL,
  `comision_doctor` float NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `configuracion`
--

CREATE TABLE `configuracion` (
  `id_centro_medico` int NOT NULL DEFAULT '0',
  `confirmar_dia_anterior` int NOT NULL,
  `dias_por_confirmar_antes_de_cita` int NOT NULL DEFAULT '1',
  `es_necesaria_confirmacion_dias_antes` enum('SI','NO') NOT NULL,
  `es_necesaria_confirmacion_dia_antes` int NOT NULL,
  `dias_para_confirmar_doctor` int NOT NULL DEFAULT '1',
  `tipo_cobro_poliza` enum('INICIO_MES','POR_DIA_DE_MES') NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consulta`
--

CREATE TABLE `consulta` (
  `id` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_doctor` int NOT NULL,
  `id_cita` int DEFAULT NULL,
  `id_venta` int DEFAULT NULL,
  `id_centro_medico` int NOT NULL,
  `motivo_consulta` text,
  `diagnostico` text,
  `tratamiento` text,
  `medicamento` text,
  `analisis` text,
  `subjetivo` text,
  `inicio_consulta` datetime DEFAULT NULL,
  `fin_consulta` datetime DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `consulta`
--

INSERT INTO `consulta` (`id`, `id_paciente`, `id_doctor`, `id_cita`, `id_venta`, `id_centro_medico`, `motivo_consulta`, `diagnostico`, `tratamiento`, `medicamento`, `analisis`, `subjetivo`, `inicio_consulta`, `fin_consulta`, `tiempo_creacion`) VALUES
(1, 2, 9, 10, 2, 2, 'asd', 'asd', 'sd', NULL, 'asd', 'ad', '2020-07-28 11:56:33', '2020-07-28 11:56:34', '2020-07-28 18:56:34'),
(2, 2, 9, 12, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-14 00:12:52', '2020-08-14 00:46:01', '2020-08-14 07:12:52'),
(3, 3, 9, 15, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-14 02:24:55', '2020-08-14 02:25:01', '2020-08-14 09:24:56'),
(4, 2, 9, 16, 5, 2, 'Capacitacion', 'Capacitacion', 'Realizar Capacitacion', NULL, NULL, 'Capacitacion', '2020-08-14 09:03:31', '2020-08-14 09:04:36', '2020-08-14 16:03:31'),
(5, 2, 9, 17, 6, 2, 'consulta', 'consulta', 'consulta', NULL, NULL, 'consulta', '2020-08-14 10:34:54', '2020-08-14 10:35:51', '2020-08-14 17:34:55'),
(6, 2, 9, 19, 8, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-14 11:07:45', '2020-08-14 11:08:15', '2020-08-14 18:07:45'),
(7, 2, 13, 20, 9, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2020-09-08 18:02:34', '2020-09-08 18:08:42', '2020-09-09 01:02:35'),
(8, 2, 13, 21, 10, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2020-09-08 18:10:59', '2020-09-08 18:11:56', '2020-09-09 01:11:00'),
(9, 2, 13, 22, 11, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2020-09-08 18:26:54', '2020-09-08 18:27:41', '2020-09-09 01:26:54'),
(10, 2, 13, 23, 13, 2, 'asd', 'asd', 'asd', NULL, 'asd', 'asd', '2020-09-08 18:32:47', '2020-09-08 18:35:09', '2020-09-09 01:32:48'),
(11, 2, 13, 24, 14, 2, 'asd', 'sd', 'asd', NULL, 'asd', 'asd', '2020-09-08 19:02:56', '2020-09-08 19:03:06', '2020-09-09 02:02:57'),
(12, 2, 13, 25, 15, 2, 'asd', 'asd', 'asd', NULL, 'asd', 'asd', '2020-09-08 19:11:35', '2020-09-08 19:11:43', '2020-09-09 02:11:36'),
(13, 2, 13, 26, 16, 2, 'asdf', 'asdf', 'asdf', NULL, 'asdf', 'asdf', '2020-09-09 10:20:40', '2020-09-09 10:21:22', '2020-09-09 17:20:41'),
(14, 2, 13, 27, 17, 2, 'asd', 'asd', 'asd', NULL, 'asd', 'asd', '2020-09-09 10:56:11', '2020-09-09 10:56:19', '2020-09-09 17:56:11');

-- --------------------------------------------------------

--
-- Table structure for table `consultorio`
--

CREATE TABLE `consultorio` (
  `id` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consultorio_doctor`
--

CREATE TABLE `consultorio_doctor` (
  `id` int NOT NULL,
  `id_consultorio` int NOT NULL,
  `id_medico` int NOT NULL,
  `start` int NOT NULL,
  `end` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_distribucion`
--

CREATE TABLE `detalle_distribucion` (
  `id` int NOT NULL,
  `id_distribucion` int NOT NULL,
  `id_servicio` int NOT NULL,
  `cantidad` int NOT NULL,
  `id_requisicion` int DEFAULT NULL,
  `recibido` int NOT NULL DEFAULT '0',
  `merma` int NOT NULL DEFAULT '0',
  `extraviado` int NOT NULL DEFAULT '0',
  `nota` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cantidad_enviada` int NOT NULL DEFAULT '0',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_requisicion`
--

CREATE TABLE `detalle_requisicion` (
  `id` int NOT NULL,
  `id_requisicion` int NOT NULL,
  `id_servicio` int NOT NULL,
  `id_categoria_merma` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `iva` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `nota` text,
  `recibido` int DEFAULT '0',
  `merma` int DEFAULT '0',
  `tiempo_caducidad` date DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id` int NOT NULL,
  `id_venta` int NOT NULL,
  `id_servicio` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL DEFAULT '0.00',
  `subtotal` decimal(10,2) NOT NULL,
  `iva` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detalle_venta`
--

INSERT INTO `detalle_venta` (`id`, `id_venta`, `id_servicio`, `cantidad`, `precio`, `valor_unitario`, `subtotal`, `iva`, `total`, `tiempo_creacion`) VALUES
(1, 1, 1, 1, '700.00', '603.45', '603.45', '96.55', '700.00', '2020-06-04 01:35:56'),
(2, 2, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 08:02:32'),
(3, 3, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 08:50:42'),
(4, 4, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 09:24:55'),
(5, 5, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 16:03:31'),
(6, 6, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 17:34:54'),
(7, 7, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 17:56:55'),
(8, 8, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-08-14 18:07:45'),
(9, 17, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '2020-09-09 17:56:11');

-- --------------------------------------------------------

--
-- Table structure for table `distribucion`
--

CREATE TABLE `distribucion` (
  `id` int NOT NULL,
  `id_centro_medico_solicitante` int DEFAULT NULL,
  `id_usuario_recibio` int DEFAULT NULL,
  `id_usuario_envio` int DEFAULT NULL,
  `id_centro_medico_distribuidor` int DEFAULT NULL,
  `id_requisicion` int DEFAULT NULL,
  `estatus` enum('PENDIENTE','EN_TRANSITO','RECIBIDO','CANCELADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDIENTE',
  `guia` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paqueteria` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` int NOT NULL,
  `id_especialidad` int DEFAULT NULL,
  `id_centro_medico` int NOT NULL,
  `id_imagen` int DEFAULT NULL,
  `color_calendario` text,
  `duracion_consulta` tinyint NOT NULL DEFAULT '30',
  `telefono` varchar(20) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `especialidad` varchar(60) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `id_especialidad`, `id_centro_medico`, `id_imagen`, `color_calendario`, `duracion_consulta`, `telefono`, `nombre`, `especialidad`, `tiempo_creacion`) VALUES
(2, 1, 1, NULL, '#eceff1', 30, '7113292181', 'Roberto Montaño Paz', 'GINECOLOGIA Y OBTETRICIA', '2020-05-04 22:20:36'),
(3, 1, 1, NULL, '#0433ff', 30, '4421819356', 'Alejandro Camargo', 'GINECOLOGIA Y OBTETRICIA', '2020-05-04 22:22:52'),
(9, 2, 2, 1, '#ffba00', 30, '6461078871', 'Cristina Flores Garcia', 'Endodoncia', '2020-07-10 22:47:15'),
(10, 3, 2, NULL, '#8200ff', 30, '6462102865', 'Jose Luis Gonzalez Jimenez', 'Ortodoncista', '2020-07-13 05:35:22'),
(12, 3, 2, NULL, '#00ff9a', 30, '6462102865', 'Leonardo Flores García', 'Ortodoncista', '2020-07-13 05:37:01'),
(13, 4, 2, NULL, '#0e9fff', 30, '6641262445', 'Erika Eloiza Zamarripa Sanchez', 'General', '2020-07-13 05:38:43'),
(14, 4, 2, NULL, '#67ff00', 30, '6462763243', 'Jahel Merino Garcia', 'General', '2020-07-13 05:39:24'),
(15, 4, 2, NULL, '#ff8800', 30, '2223214314', 'Omar Lopez Estrada', 'General', '2020-07-13 05:42:01'),
(16, 4, 2, NULL, '#9400ff', 30, '6641273396', 'Denisse Corral Osuna', 'General', '2020-07-13 05:42:53');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_servicio`
--

CREATE TABLE `doctor_servicio` (
  `id` int NOT NULL,
  `id_doctor` int NOT NULL,
  `id_servicio` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `documento_histora_clinica`
--

CREATE TABLE `documento_histora_clinica` (
  `id` int NOT NULL,
  `id_historia_clinica` int NOT NULL,
  `type` int NOT NULL,
  `notes` mediumtext NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `abreviacion` varchar(20) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `especialidad`
--

INSERT INTO `especialidad` (`id`, `id_centro_medico`, `nombre`, `abreviacion`, `tiempo_creacion`) VALUES
(1, 1, 'GINECOLOGIA Y OBTETRICIA', '', '2020-05-04 22:18:03'),
(2, 2, 'Endodoncia', '', '2020-07-10 22:45:18'),
(3, 2, 'Ortodoncista', '', '2020-07-13 05:29:26'),
(4, 2, 'General', 'GRAL', '2020-07-13 05:30:24');

-- --------------------------------------------------------

--
-- Table structure for table `especialidad_pregunta`
--

CREATE TABLE `especialidad_pregunta` (
  `id` int NOT NULL,
  `id_pregunta_historia_clinica` int NOT NULL,
  `id_especialidad` int NOT NULL,
  `grupo` varchar(30) DEFAULT NULL,
  `orden` int NOT NULL DEFAULT '1000',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `especialidad_pregunta`
--

INSERT INTO `especialidad_pregunta` (`id`, `id_pregunta_historia_clinica`, `id_especialidad`, `grupo`, `orden`, `tiempo_creacion`) VALUES
(1, 161, 4, NULL, 30, '2020-11-05 03:34:34'),
(2, 162, 4, NULL, 31, '2020-11-05 03:34:55');

-- --------------------------------------------------------

--
-- Table structure for table `expediente`
--

CREATE TABLE `expediente` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(60) NOT NULL,
  `size` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

CREATE TABLE `factura` (
  `id` int NOT NULL,
  `noFactura` varchar(50) DEFAULT NULL,
  `serie` varchar(10) DEFAULT NULL,
  `folio` int DEFAULT '0',
  `monto` float UNSIGNED DEFAULT NULL,
  `id_cliente` int NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `status` int DEFAULT '1',
  `cancelar` int DEFAULT '0',
  `fechaFac` datetime DEFAULT NULL,
  `formaPago` varchar(50) DEFAULT NULL,
  `moneda` varchar(255) DEFAULT NULL,
  `tipoCambio` float DEFAULT '0',
  `id_centro_medico` int DEFAULT NULL,
  `id_usuario_doctor` int DEFAULT NULL,
  `folioFiscal` varchar(100) DEFAULT NULL,
  `UsoCFDI` varchar(20) DEFAULT NULL,
  `metodoPago` varchar(50) DEFAULT NULL,
  `condicionPago` varchar(50) DEFAULT NULL,
  `generacionFactura` int DEFAULT '0',
  `recuperarPDF` int DEFAULT '0',
  `pdf_path` varchar(255) NOT NULL,
  `xml_path` varchar(255) NOT NULL,
  `notaFactura` varchar(100) DEFAULT NULL,
  `mensajeError` varchar(200) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_type`
--

CREATE TABLE `file_type` (
  `id` int NOT NULL,
  `organization_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `content_type` varchar(200) NOT NULL,
  `extension` varchar(20) DEFAULT NULL,
  `is_image` enum('NO','YES') NOT NULL,
  `image_id` int DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fondo_caja`
--

CREATE TABLE `fondo_caja` (
  `id` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `pesos` double DEFAULT NULL,
  `dolares` double DEFAULT NULL,
  `estatus` int DEFAULT '1',
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gasto_centro_medico`
--

CREATE TABLE `gasto_centro_medico` (
  `id` int NOT NULL,
  `id_tipo_gasto` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_centro_medico` int NOT NULL,
  `descripcion` text,
  `id_proveedor` int DEFAULT NULL,
  `monto` decimal(10,5) DEFAULT NULL,
  `referencia` varchar(300) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `metodo_pago` enum('EFECTIVO','CHEQUE','TARJETA','MONEDA_EXTRANJERA','PUNTOS') DEFAULT 'EFECTIVO',
  `pdf` text,
  `xml` text,
  `tipo` int DEFAULT NULL COMMENT '//1 = gasto | 2 = nomina | 3 = comisiones',
  `colaborador` bigint DEFAULT NULL,
  `foto` text,
  `desde` enum('SISTEMA','PUNTO_VENTA') NOT NULL DEFAULT 'SISTEMA',
  `estatus` enum('ACTIVO','ELIMINADO') NOT NULL DEFAULT 'ACTIVO',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gasto_doctor`
--

CREATE TABLE `gasto_doctor` (
  `id` int NOT NULL,
  `id_usuario_doctor` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historial_inventario`
--

CREATE TABLE `historial_inventario` (
  `id` int NOT NULL,
  `id_servicio` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `id_usuario` int NOT NULL,
  `tipo_movimiento` enum('POSITIVO','NEGATIVO') NOT NULL,
  `cantidad_anterior` float NOT NULL,
  `cantidad_movimiento` float NOT NULL,
  `cantidad_actual` float NOT NULL,
  `id_contenido` bigint DEFAULT NULL,
  `lote` varchar(150) DEFAULT NULL,
  `tiempo_caducidad` date DEFAULT NULL,
  `id_categoria_merma` int DEFAULT NULL,
  `cantidad_merma` int DEFAULT NULL,
  `nota_merma` text,
  `tiempo_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `id` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_organizacion` int NOT NULL,
  `motivo_consulta` text NOT NULL,
  `nota` text NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historia_horario`
--

CREATE TABLE `historia_horario` (
  `id` int NOT NULL,
  `id_doctor` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `historia_horario`
--

INSERT INTO `historia_horario` (`id`, `id_doctor`, `id_centro_medico`, `tiempo_creacion`) VALUES
(2, 9, 2, '2020-08-16 22:50:29');

-- --------------------------------------------------------

--
-- Table structure for table `horario_doctor`
--

CREATE TABLE `horario_doctor` (
  `id` int NOT NULL,
  `id_historia_horario` int NOT NULL,
  `id_centro_medico` int DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_final` time DEFAULT NULL,
  `dia_semana` tinyint NOT NULL,
  `fecha_inicio` timestamp NULL DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `horario_doctor`
--

INSERT INTO `horario_doctor` (`id`, `id_historia_horario`, `id_centro_medico`, `hora_inicio`, `hora_final`, `dia_semana`, `fecha_inicio`, `tiempo_creacion`) VALUES
(7, 2, 2, '09:00:00', '19:00:00', 1, NULL, '2020-08-16 22:50:29'),
(8, 2, 2, '09:00:00', '19:00:00', 2, NULL, '2020-08-16 22:50:29'),
(9, 2, 2, '09:00:00', '19:00:00', 3, NULL, '2020-08-16 22:50:29'),
(10, 2, 2, '09:00:00', '19:00:00', 4, NULL, '2020-08-16 22:50:29'),
(11, 2, 2, '09:00:00', '19:00:00', 5, NULL, '2020-08-16 22:50:29'),
(12, 2, 2, '09:00:00', '19:30:00', 6, NULL, '2020-08-16 22:50:29');

-- --------------------------------------------------------

--
-- Table structure for table `imagen`
--

CREATE TABLE `imagen` (
  `id` int NOT NULL,
  `uploader_user_id` int DEFAULT NULL,
  `es_privada` tinyint(1) NOT NULL DEFAULT '0',
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) NOT NULL,
  `size` bigint NOT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `imagen`
--

INSERT INTO `imagen` (`id`, `uploader_user_id`, `es_privada`, `filename`, `original_filename`, `content_type`, `size`, `width`, `height`, `tiempo_creacion`) VALUES
(1, 9, 0, '5f3870127f041.png', 'Screenshot from 2020-08-09 13-12-31.png', 'image/png', 198703, 510, 369, '2020-08-15 23:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `imagen_usuario`
--

CREATE TABLE `imagen_usuario` (
  `id` int NOT NULL,
  `id_imagen` int NOT NULL,
  `id_usaurio` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingreso`
--

CREATE TABLE `ingreso` (
  `id` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `nota` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventario`
--

CREATE TABLE `inventario` (
  `id` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `id_servicio` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cantidad` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lote_inventario`
--

CREATE TABLE `lote_inventario` (
  `id` int NOT NULL,
  `id_inventario` int DEFAULT NULL,
  `id_centro_medico` int DEFAULT NULL,
  `id_servicio` int NOT NULL,
  `recibido` int NOT NULL,
  `existente` int NOT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `merma`
--

CREATE TABLE `merma` (
  `id` int NOT NULL,
  `id_lote_inventario` int NOT NULL,
  `id_categoria_merma` int NOT NULL,
  `cantidad` int NOT NULL,
  `nota` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int NOT NULL,
  `id_usuario` int NOT NULL,
  `mensaje` int NOT NULL,
  `id_cita` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_imagen` int DEFAULT NULL,
  `path_data` text,
  `mensaje` varchar(200) NOT NULL,
  `path` varchar(30) DEFAULT NULL,
  `status` enum('activo','recibido','eliminado') NOT NULL DEFAULT 'activo',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organizacion`
--

CREATE TABLE `organizacion` (
  `id` int NOT NULL,
  `id_imagen_default_ticket` int DEFAULT NULL,
  `id_imagen_default_login` int DEFAULT NULL,
  `id_imagen_default_logo` int DEFAULT NULL,
  `id_imagen_default_proveedor` int DEFAULT NULL,
  `id_imagen_default_servicio` int DEFAULT NULL,
  `id_imagen_default_usuario` int DEFAULT NULL,
  `id_imagen_default_sucursal` int DEFAULT NULL,
  `nombre` varchar(60) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `organizacion`
--

INSERT INTO `organizacion` (`id`, `id_imagen_default_ticket`, `id_imagen_default_login`, `id_imagen_default_logo`, `id_imagen_default_proveedor`, `id_imagen_default_servicio`, `id_imagen_default_usuario`, `id_imagen_default_sucursal`, `nombre`, `tiempo_creacion`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'FIFA', '2020-05-04 22:05:48'),
(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jireh Dental Care', '2020-07-02 19:58:12');

-- --------------------------------------------------------

--
-- Table structure for table `paciente`
--

CREATE TABLE `paciente` (
  `id` int NOT NULL,
  `id_organizacion` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_imagen` int DEFAULT NULL,
  `id_poliza` int DEFAULT NULL,
  `familiar` tinyint(1) DEFAULT NULL,
  `nombre` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` enum('MASCULINO','FEMENINO') DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nombre_tutor` varchar(120) DEFAULT NULL,
  `telefono_tutor` varchar(20) DEFAULT NULL,
  `correo_electronico_tutor` varchar(60) DEFAULT NULL,
  `domicilio` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `paciente`
--

INSERT INTO `paciente` (`id`, `id_organizacion`, `id_usuario`, `id_imagen`, `id_poliza`, `familiar`, `nombre`, `apellidos`, `fecha_nacimiento`, `sexo`, `telefono`, `tiempo_creacion`, `nombre_tutor`, `telefono_tutor`, `correo_electronico_tutor`, `domicilio`) VALUES
(1, 1, 6, NULL, NULL, NULL, 'Ibeth', 'Ortiz Robles', '1990-04-17', 'FEMENINO', '4421819356', '2020-05-04 22:35:08', NULL, NULL, NULL, 'calle 13'),
(2, 2, 17, NULL, NULL, NULL, 'Daniel', 'Martinez', '1995-01-04', 'MASCULINO', '6461434659', '2020-07-28 17:22:42', NULL, NULL, NULL, 'vista hermosa'),
(3, 2, 18, NULL, NULL, NULL, 'Eduardo', 'Alcala', '1984-07-31', 'MASCULINO', '6461608559', '2020-07-30 01:18:32', NULL, NULL, NULL, 'ggghgh'),
(4, 2, 19, NULL, NULL, NULL, 'IKER GABRIEL', 'ESCOBEDO FLORES', '2016-07-05', 'MASCULINO', '6461193365', '2020-07-30 16:59:19', NULL, NULL, NULL, 'FFFFG FBGFBGBFGB'),
(5, 2, 20, NULL, NULL, NULL, 'ALMA ROSA', 'AVILA GARCIA', '1985-10-04', 'FEMENINO', '6462231970', '2020-07-31 19:04:01', NULL, NULL, NULL, '.'),
(6, 2, 32, NULL, NULL, NULL, 'BRISSET MELISSA', 'BENCOMO NU?EZ', '2036-08-05', 'FEMENINO', '6462391164', '2020-08-01 04:42:26', NULL, NULL, NULL, 'Calle Rayerson y tercera '),
(7, 2, 35, NULL, NULL, NULL, 'LILIANA', 'MU?OZ', NULL, 'FEMENINO', '6462247420', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(8, 2, 36, NULL, NULL, NULL, 'CINTHYA', 'ARMENTA', NULL, 'FEMENINO', '6197994477', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(9, 2, 37, NULL, NULL, NULL, 'HELENA', 'MOCTEZUMA', NULL, 'FEMENINO', '6461488712', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(10, 2, 38, NULL, NULL, NULL, 'JINETTE', 'PI?A', NULL, 'FEMENINO', '6461324488', '2020-08-01 04:42:27', NULL, NULL, NULL, 'callejon ni?os heroes 576 maneadero parte alta'),
(11, 2, 39, NULL, NULL, NULL, 'OFELIA ', 'MEDINA', NULL, 'FEMENINO', '6461431494', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(12, 2, 40, NULL, NULL, NULL, 'HECTOR', 'PONCE', NULL, 'MASCULINO', '6462032470', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(13, 2, 41, NULL, NULL, NULL, 'BLANCA LUZ', 'RAMOS', NULL, 'FEMENINO', '6461516644', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(14, 2, 42, NULL, NULL, NULL, 'JOSE IRAN ', 'VAZQUEZ', NULL, 'MASCULINO', '6461031249', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(15, 2, 43, NULL, NULL, NULL, 'JUAN FERNANDO', 'GARCIA', NULL, 'FEMENINO', '6461504509', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(16, 2, 44, NULL, NULL, NULL, 'DANIEL ', 'CAMBERO', NULL, 'FEMENINO', '6461553024', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(17, 2, 45, NULL, NULL, NULL, 'JOSEFINA', 'ROBLES LOPEZ', NULL, 'FEMENINO', '6461283562', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Avenida lazaro cardenas privada condominio valle grande #378 col. Valle de chapultepec'),
(18, 2, 46, NULL, NULL, NULL, 'ANA ROSA ', 'SEBASTIAN RANGEL', NULL, 'FEMENINO', '6121684590', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Melchor ocampo #783 Maneadero parte alta'),
(19, 2, 47, NULL, NULL, NULL, 'MIRIAM ALEJANDRA', 'FUENTES MACIAS', NULL, 'FEMENINO', '6461198263', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Jose cerda #232 punta Banda 2'),
(20, 2, 48, NULL, NULL, NULL, 'MADAI', 'CHEWUES MARTINEZ', NULL, 'FEMENINO', '6461930232', '2020-08-01 04:42:27', NULL, NULL, NULL, 'calle novena esa con g ex, ejido ruiz cortinez'),
(21, 2, 49, NULL, NULL, NULL, 'ROMINA ', 'DE LOS SANTOS', NULL, 'FEMENINO', '6461797914', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Pedro loyola callejon del paseo 217'),
(22, 2, 50, NULL, NULL, NULL, 'EVA LUZ', 'PEREZ', NULL, 'FEMENINO', '6461792832', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(23, 2, 51, NULL, NULL, NULL, 'ISMAEL ', 'HERNANDEZ CHAPUCHIN', NULL, 'MASCULINO', '6461272900', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Calle Roble #137 Padreras del cipres C.P22785'),
(24, 2, 52, NULL, NULL, NULL, 'DAVID GILBERTO', 'JUAREZ ZAVALA', NULL, 'MASCULINO', '6461192451', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Priv Jazmin #213 Col Lomitas indeco'),
(25, 2, 53, NULL, NULL, NULL, 'MIRIAM PAOLA', 'SAYAS', NULL, 'FEMENINO', '6461286056', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(26, 2, 54, NULL, NULL, NULL, 'FRANCISCA', 'VENEGAS', NULL, 'FEMENINO', '6161270906', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(27, 2, 55, NULL, NULL, NULL, 'CINTHYA ', 'PEREZ', NULL, 'FEMENINO', '6462007575', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(28, 2, 56, NULL, NULL, NULL, 'ASHYLEY ', 'ESTRADA', NULL, 'FEMENINO', '6462409509', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(29, 2, 57, NULL, NULL, NULL, 'PERLA JANETH', 'ARREGUIN MACIEL ', NULL, 'FEMENINO', '6461953836', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Granjas del Gallo, privada Esmeralda #993'),
(30, 2, 58, NULL, NULL, NULL, 'MISAEL', 'SALDA?A ISLAS', NULL, 'MASCULINO', '6461519444', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Ignacio allende #576 col. Centro artesanal'),
(31, 2, 59, NULL, NULL, NULL, 'LUZ DEL CARMEN ', 'BUSTAMANTE ', NULL, 'FEMENINO', '6462388443', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Valle viscaino #32'),
(32, 2, 60, NULL, NULL, NULL, 'ELENA ', 'ZAVALA CARRAZCO', NULL, 'FEMENINO', '6461284190', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Calle c 603 Col Granjas el Gallo'),
(33, 2, 61, NULL, NULL, NULL, 'MARCELA', 'SANCHEZ NOGUEZ', NULL, 'FEMENINO', '6461088377', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(34, 2, 62, NULL, NULL, NULL, 'SAYURI GUADALUPE', 'MENDOZA REALES', NULL, 'FEMENINO', '6462635568', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Ave. Vicente guerrero #1 Col el sauzal'),
(35, 2, 63, NULL, NULL, NULL, 'EDWIN ', 'ESTRADA LOPEZ', NULL, 'MASCULINO', '6462677016', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Calle D #64 col granjas del gallo'),
(36, 2, 64, NULL, NULL, NULL, 'AZUL JAMILETH', 'LEAL', NULL, 'FEMENINO', '6241820610', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Golfo de tehuantepec 242 colonia 89'),
(37, 2, 65, NULL, NULL, NULL, 'JOSUE JARETH', 'LEAL', NULL, 'MASCULINO', '6241820610', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Golfo de t 242 colonia 89'),
(38, 2, 66, NULL, NULL, NULL, 'MARIO ', 'RODRIGUEZ TORRES', NULL, 'MASCULINO', '6461957668', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Calle concha nacas 424 playas de chapultepec'),
(39, 2, 67, NULL, NULL, NULL, 'MARTIN', 'MAYA', NULL, 'MASCULINO', '6461949092', '2020-08-01 04:42:27', NULL, NULL, NULL, NULL),
(40, 2, 68, NULL, NULL, NULL, 'OSIRIS', 'GUTIERREZ SOTO', NULL, 'FEMENINO', '6462394763', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Ave. Lazaro cardenas barco 3 porticos'),
(41, 2, 69, NULL, NULL, NULL, 'JAZMIN LIZETH', 'MENDEZ RIVERA', NULL, 'FEMENINO', '6461395627', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Isla giganta 198 popular 89'),
(42, 2, 70, NULL, NULL, NULL, 'KARLA COPILLI', 'LUIS SANCHEZ', NULL, 'FEMENINO', '6861631810', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Calle baena #112 villas del rey 1'),
(43, 2, 71, NULL, NULL, NULL, 'HINATHA MARINETT', 'GUTIERREZ CARRILLO', NULL, 'FEMENINO', '6463085045', '2020-08-01 04:42:27', NULL, NULL, NULL, 'Lomitas indeco privada jasmin #217'),
(44, 2, 72, NULL, NULL, NULL, 'GERARDO', 'CORTES JAIME', NULL, 'MASCULINO', '6461790709', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Monterrey #153 Fraccionamiento revolici?n '),
(45, 2, 73, NULL, NULL, NULL, 'GLEN ', 'SOLORIO', NULL, 'MASCULINO', '6461931445', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(46, 2, 74, NULL, NULL, NULL, 'BLANCA ', 'SANCHEZ', NULL, 'FEMENINO', '6461877818', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(47, 2, 75, NULL, NULL, NULL, 'JOANA DENISSE', 'CRUZ HERNANDEZ', NULL, 'FEMENINO', '6461879884', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Ave. Matamoros #239 col independencia '),
(48, 2, 76, NULL, NULL, NULL, 'SARA ', 'MANZANAREZ', NULL, 'FEMENINO', '6462062353', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(49, 2, 77, NULL, NULL, NULL, 'ERIK JAVIER', 'MADERO FIGUEROA', NULL, 'MASCULINO', '6461018268', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Viv. Popular #55 fracc. Bahia'),
(50, 2, 78, NULL, NULL, NULL, 'LUCIA ', 'MERLO', NULL, 'FEMENINO', '6462115403', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(51, 2, 79, NULL, NULL, NULL, 'JOSELYN', 'CALDERON CHAVEZ', NULL, 'FEMENINO', '6461989495', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Calle Alipo #737 Villlas del prado'),
(52, 2, 80, NULL, NULL, NULL, 'YESENIA ', 'DOMINGUEZ RUIZ', NULL, 'FEMENINO', '6461846504', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(53, 2, 81, NULL, NULL, NULL, 'HOMERO AUGUSTO', 'JUAREZ ZAVALA', NULL, 'MASCULINO', '6461914542', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Punta san miguel #126 col. 89'),
(54, 2, 82, NULL, NULL, NULL, 'MARIA LETICIA ', 'ORNELAS GUERRERO', NULL, 'FEMENINO', '6461010867', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Emiliano zapata #482 col. Aeropuerto'),
(55, 2, 83, NULL, NULL, NULL, 'VALERIA', 'GOMEZ', NULL, 'FEMENINO', '6462012443', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(56, 2, 84, NULL, NULL, NULL, 'FABIOLA GUADALUPE', 'CASTILLO LUNA', NULL, 'FEMENINO', '6462268517', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(57, 2, 85, NULL, NULL, NULL, 'ROSARIO', 'VALDEZ', NULL, 'FEMENINO', '6461461007', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(58, 2, 86, NULL, NULL, NULL, 'IVAN', 'HERRERA', NULL, 'MASCULINO', '6461605415', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(59, 2, 87, NULL, NULL, NULL, 'DANIELA', 'SAINZ', NULL, 'FEMENINO', '6461510641', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(60, 2, 88, NULL, NULL, NULL, 'VERONICA ', 'LUCERO', NULL, 'FEMENINO', '6462034148', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(61, 2, 89, NULL, NULL, NULL, 'DORA IRENE', NULL, NULL, 'FEMENINO', '6462476693', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(62, 2, 90, NULL, NULL, NULL, 'EVELYN NATALIA', 'ROMERO RIOS', NULL, 'FEMENINO', '6461362980', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Priv. Bahia vizcaino #31 fracc. Vista hermosa'),
(63, 2, 91, NULL, NULL, NULL, 'BERTHA ADRIANA', 'SAMAYOA VIDAL', NULL, 'FEMENINO', '6462033546', '2020-08-01 04:42:28', NULL, NULL, NULL, 'delfines y sirenas #101-2 Fracc Playa Ensenada'),
(64, 2, 92, NULL, NULL, NULL, 'JOANA ', 'GALINDO', NULL, 'FEMENINO', '6161091321', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(65, 2, 93, NULL, NULL, NULL, 'ALEXIS', 'CASTRO', NULL, 'MASCULINO', '6462637633', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(66, 2, 94, NULL, NULL, NULL, 'MARIA ELENA', 'ZAMARRIPA SANCHEZ', NULL, 'FEMENINO', '6461186490', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Calle mision de Sn. Javier #135 Fracc. Misiones de la presa 1a Secci?n'),
(67, 2, 95, NULL, NULL, NULL, 'ALONDRA ESTEFANIA', 'CISNEROS MARTINEZ', NULL, 'FEMENINO', '6161210850', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Santo domingo Residencial, calle Santa Maria #115-1'),
(68, 2, 96, NULL, NULL, NULL, 'BIANCA ', 'GARCIA GALVEZ', NULL, 'FEMENINO', '6461169085', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Avenida Mexico #830 fracc. California'),
(69, 2, 97, NULL, NULL, NULL, 'NORA', 'MOLINA', NULL, 'FEMENINO', '6462597043', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(70, 2, 98, NULL, NULL, NULL, 'LIZBETH ', 'MADUE?A', NULL, 'FEMENINO', '6461216570', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(71, 2, 99, NULL, NULL, NULL, 'YADIRA', 'HERNANDEZ', NULL, 'FEMENINO', '6461342000', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(72, 2, 100, NULL, NULL, NULL, 'ESVEIDY', 'SILVAS CAMACHO', NULL, 'FEMENINO', '6461889843', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Bahia del sur 371 popular 89'),
(73, 2, 101, NULL, NULL, NULL, 'YOHAMARA ALEJANDRA', 'GALINDO BAUTISTA', NULL, 'FEMENINO', '6462719096', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Bahia Magdalena #153 Vista Hermosa'),
(74, 2, 102, NULL, NULL, NULL, 'GABRIELA ', 'BARRERA', NULL, 'FEMENINO', '6461441504', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(75, 2, 103, NULL, NULL, NULL, 'JOSE DE JESUS', 'GONZALEZ MARTINEZ', NULL, 'MASCULINO', '6461171160', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Perico 111'),
(76, 2, 104, NULL, NULL, NULL, 'JOANNA GABRIEL', 'VILLALOBOS ONTIVEROS', NULL, 'FEMENINO', '6461097723', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Lago ontario #860 Villa Colonial'),
(77, 2, 105, NULL, NULL, NULL, 'NOEMI ', 'RODRIGUEZ RAMOS', NULL, 'FEMENINO', '6461016997', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Santa maria 148 dep 4 residencia santo domingo '),
(78, 2, 106, NULL, NULL, NULL, 'MARGARITA ', 'RENTERIA CANO', NULL, 'FEMENINO', '6461950796', '2020-08-01 04:42:28', NULL, NULL, NULL, 'miramar #1588 Centro'),
(79, 2, 107, NULL, NULL, NULL, 'DINORAH ASTRID MARIA ELENA', 'ANAYA ESPINOZA', NULL, 'FEMENINO', '6461136511', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Plutarco Elias calles 309, Maneadero parte alta'),
(80, 2, 109, NULL, NULL, NULL, 'CLARA IVETTE ', 'RODRIGUEZ', NULL, 'FEMENINO', '6461181423', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Ignacio Altamirando #326 Col. Maestros'),
(81, 2, 110, NULL, NULL, NULL, 'ROGELIO ANDRES', 'VILLEGAS ALTAMIRANO', NULL, 'MASCULINO', '6461307369', '2020-08-01 04:42:28', NULL, NULL, NULL, 'C. olivo #129 Fracccionamiento lomas indeco 3'),
(82, 2, 111, NULL, NULL, NULL, 'LORENA ', 'CAUDILLO', NULL, 'FEMENINO', '6462690764', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(83, 2, 112, NULL, NULL, NULL, 'ISABEL ', 'GARCIA', NULL, 'FEMENINO', '6461857141', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(84, 2, 113, NULL, NULL, NULL, 'VALERIA ', 'FLORES ABOYTA', NULL, 'FEMENINO', '6469476467', '2020-08-01 04:42:28', NULL, NULL, NULL, 'Eucalipto #653 Fracc. Valle verde '),
(85, 2, 114, NULL, NULL, NULL, 'CRISTINA ', 'SANTIAGO                                ', NULL, 'FEMENINO', '6461626575', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(86, 2, 115, NULL, NULL, NULL, 'CINTHIA ', 'SAMBRANO', NULL, 'FEMENINO', '6461876767', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(87, 2, 116, NULL, NULL, NULL, 'FRANCISCO ', 'LUCERO', NULL, 'MASCULINO', '6461231232', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(88, 2, 117, NULL, NULL, NULL, 'ELIZABETH ', 'LUNA', NULL, 'FEMENINO', '6462043097', '2020-08-01 04:42:28', NULL, NULL, NULL, NULL),
(89, 2, 118, NULL, NULL, NULL, 'LYDIA LIZBETH', 'ORTEGA BUSTAMANTE', NULL, 'FEMENINO', '6462388443', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Bahia vizcaino #38 col vista hermosa'),
(90, 2, 119, NULL, NULL, NULL, 'SONIA', 'GARCIA OJEDA', NULL, 'FEMENINO', '6461333733', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Av. Juarez #1719 Col Hidalgo'),
(91, 2, 121, NULL, NULL, NULL, 'VALERIA', 'FLORES', NULL, 'FEMENINO', '6469476467', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(92, 2, 122, NULL, NULL, NULL, 'JAIME ', 'TRUJILLO', NULL, 'MASCULINO', '6461601405', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(93, 2, 123, NULL, NULL, NULL, 'JENNIFER', NULL, NULL, 'FEMENINO', '6461340130', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(94, 2, 124, NULL, NULL, NULL, 'MARIA CRISTINA ', 'RUIZ LOPEZ', NULL, 'FEMENINO', '6469474990', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Ave Chapultepec #2023 col hidalgo entre tercera y cuarta'),
(95, 2, 125, NULL, NULL, NULL, 'CARLOS EDUARDO', 'SANDOVAL CASTORENA ', NULL, 'MASCULINO', '6461023553', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Lago ontario #842 Valle dorado'),
(96, 2, 126, NULL, NULL, NULL, 'GABRIELA IRAZEMA', 'LARA RUIZ', NULL, 'FEMENINO', '6469474990', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Ave Chapultepec #2023 col hidalgo entre tercera y cuarta'),
(97, 2, 127, NULL, NULL, NULL, 'BLANCA ', 'BUENROSTRO', NULL, 'FEMENINO', '6461504024', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(98, 2, 128, NULL, NULL, NULL, 'PABLO ALONSO', 'REYMUNDO JASSO', NULL, 'MASCULINO', '6461113301', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle juan de barrera mz 3 lt 7 col. Loma linda C.P 22820'),
(99, 2, 129, NULL, NULL, NULL, 'ROSELYN ', 'GUZMAN ARELLANO', NULL, 'FEMENINO', '6461089722', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Av. Italia #329 col. Lomitas'),
(100, 2, 130, NULL, NULL, NULL, 'ARIADNA SINAI', 'GUZMAN ARELLANO', NULL, 'FEMENINO', '6461089722', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Av. Italia #329 col. Lomitas'),
(101, 2, 131, NULL, NULL, NULL, 'TANIA ', 'ESTRADA BATIZ', NULL, 'FEMENINO', '6461035011', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Bahia del Rosario #102 Vista hermosa '),
(102, 2, 132, NULL, NULL, NULL, 'IVAN ', 'COLLINS', NULL, 'MASCULINO', '4521443672', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(103, 2, 133, NULL, NULL, NULL, 'MARIA FERNANDA', 'QUI?ONEZ JUAREZ', NULL, 'FEMENINO', '6462593510', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle d #30 nueva reforma'),
(104, 2, 134, NULL, NULL, NULL, 'ESTEFANY M ', NULL, NULL, 'FEMENINO', '6461192286', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(105, 2, 135, NULL, NULL, NULL, 'CAMYLA ', 'PERALTA GARCIA ', NULL, 'FEMENINO', '6461018614', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle topacio #889 fracc. Los encinos'),
(106, 2, 136, NULL, NULL, NULL, 'DULCE ADRIANA ', 'DELGADO HERNANDEZ', NULL, 'FEMENINO', '6462560998', '2020-08-01 04:42:29', NULL, NULL, NULL, 'calle armella, fraccionamiento arcoiris #236'),
(107, 2, 137, NULL, NULL, NULL, 'ARTURO ', 'LOPEZ', NULL, 'MASCULINO', '6641786274', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(108, 2, 138, NULL, NULL, NULL, 'AMPARO ', NULL, NULL, 'FEMENINO', '6462391525', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(109, 2, 139, NULL, NULL, NULL, 'TANIA ', NULL, NULL, 'FEMENINO', '6461384601', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(110, 2, 140, NULL, NULL, NULL, 'JENNIFER ', 'CONTRERAS', NULL, 'FEMENINO', '6462602448', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(111, 2, 141, NULL, NULL, NULL, 'BENJAMIN ', 'GAMEZ MARTINEZ', NULL, 'MASCULINO', '6461419348', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Enfermeras y pescadores #3448 Col. Morelos 2'),
(112, 2, 142, NULL, NULL, NULL, 'ALEJANDRA ', 'NI?O AVELAR', NULL, 'FEMENINO', '6462410999', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Av. Sebastian Ruiz #869 maneadero parte alta'),
(113, 2, 143, NULL, NULL, NULL, 'ELIZABETH ', NULL, NULL, 'FEMENINO', '6462564233', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(114, 2, 144, NULL, NULL, NULL, 'ANGELA ISABEL ', 'GARCIA RIOS', NULL, 'FEMENINO', '6462363030', '2020-08-01 04:42:29', NULL, NULL, NULL, 'calle inglaterra #656 col. Las lomitas'),
(115, 2, 145, NULL, NULL, NULL, 'CASSANDRA BERTHA ', 'OLVERA TOVAR', NULL, 'FEMENINO', '6461626313', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle zafiro 140 #3 Col industrial Ensenada'),
(116, 2, 146, NULL, NULL, NULL, 'ERNA GABRIELA ', NULL, NULL, 'FEMENINO', '6461185827', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(117, 2, 147, NULL, NULL, NULL, 'VERONICA ', 'VAZQUEZ', NULL, 'FEMENINO', '6461895897', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(118, 2, 148, NULL, NULL, NULL, 'CECILIA ', 'MATHOS PI?UELAS', NULL, 'FEMENINO', '6462269103', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle las rosas #230 valle verde '),
(119, 2, 149, NULL, NULL, NULL, 'FERNANDO HUMBERTO', 'LOZANO RODRIGUEZ', NULL, 'MASCULINO', '6462609766', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle primera #1811 colonia hidalgo C.P22880'),
(120, 2, 150, NULL, NULL, NULL, 'KARLA YOLANDA', 'HERNANDEZ BELTRAN', NULL, 'FEMENINO', '6461509238', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Calle aguilas serdan #1334 Villas del prado 2'),
(121, 2, 151, NULL, NULL, NULL, 'EVELYN ', 'PIMENTEL PEREZ', NULL, 'FEMENINO', '6462393014', '2020-08-01 04:42:29', NULL, NULL, NULL, 'principal #130 fco. Zarco'),
(122, 2, 152, NULL, NULL, NULL, 'EVANGELINA C ', NULL, NULL, 'FEMENINO', '6461116768', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(123, 2, 153, NULL, NULL, NULL, 'DANIELA ', 'RODRIGUEZ', NULL, 'FEMENINO', '6461925777', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(124, 2, 154, NULL, NULL, NULL, 'DANNA JULIETA ', NULL, NULL, 'FEMENINO', '6461311447', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(125, 2, 155, NULL, NULL, NULL, 'CRISTIAN ', 'TIRADO ', NULL, 'MASCULINO', '6461087294', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(126, 2, 156, NULL, NULL, NULL, 'EDGAR A', NULL, NULL, 'MASCULINO', '6461163671', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(127, 2, 157, NULL, NULL, NULL, 'BRENDA', 'RODRIGUEZ', NULL, 'FEMENINO', '6462882221', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(128, 2, 158, NULL, NULL, NULL, 'ABRAHAM ', 'HERNANDEZ ORTIZ', NULL, 'MASCULINO', '6461342394', '2020-08-01 04:42:29', NULL, NULL, NULL, '3er ayuntamiento calle privada Mexico'),
(129, 2, 159, NULL, NULL, NULL, 'HANNA KAMYLA', 'MURILLO DE LA O', NULL, 'FEMENINO', '6461625357', '2020-08-01 04:42:29', NULL, NULL, NULL, 'Nestor olivas #143 ex ejido chapultepec'),
(130, 2, 160, NULL, NULL, NULL, 'TAMAR ', 'ROSAS', NULL, 'FEMENINO', '6462370906', '2020-08-01 04:42:29', NULL, NULL, NULL, NULL),
(131, 2, 161, NULL, NULL, NULL, 'ANA RUTH ', 'GAXIOLA SALGADO', NULL, 'FEMENINO', '6469477825', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Calle mexicali #422 col 28 de agosto'),
(132, 2, 162, NULL, NULL, NULL, 'PERLA ', 'ROMERO', NULL, 'FEMENINO', '6461904947', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(133, 2, 163, NULL, NULL, NULL, 'RFAEL ', 'CORTEZ', NULL, 'MASCULINO', '6461170974', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(134, 2, 164, NULL, NULL, NULL, 'FRENESY ', 'AYON ', NULL, 'FEMENINO', '6462268736', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(135, 2, 165, NULL, NULL, NULL, 'LAURA YATZIRA', 'VAZQUEZ LOPEZ', NULL, 'FEMENINO', '6461489221', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Calle coral #449 col. Aviaci?n'),
(136, 2, 166, NULL, NULL, NULL, 'ROSA ELENA', 'GRIJALVA GONZALEZ', NULL, 'FEMENINO', '6461604189', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(137, 2, 167, NULL, NULL, NULL, 'JESSICA ', 'BENITO MONTES DE OCA', NULL, 'FEMENINO', '6462761642', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Av. Gpe victoria #484 col. Aviaci?n'),
(138, 2, 168, NULL, NULL, NULL, 'NOE ULISES', NULL, NULL, 'MASCULINO', '3511434574', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(139, 2, 169, NULL, NULL, NULL, 'ABRIL ', 'BELTRAN', NULL, 'FEMENINO', '6461036842', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Marquez de le?n calle coral #2588'),
(140, 2, 170, NULL, NULL, NULL, 'DIEGO ', 'RODRIGUEZ', NULL, 'MASCULINO', '6461018059', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(141, 2, 171, NULL, NULL, NULL, 'LINDSAY ', 'ESTRADA', NULL, 'FEMENINO', '6461320088', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(142, 2, 172, NULL, NULL, NULL, 'MARCO ANTONIO ', 'PALACIOS SANDOVAL', NULL, 'MASCULINO', '6462567588', '2020-08-01 04:42:30', NULL, NULL, NULL, 'islas de las ballenas #168 popular 89'),
(143, 2, 173, NULL, NULL, NULL, 'ITZEL ESTRELLA', 'CAASTRO', NULL, 'FEMENINO', '6462925476', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Las olas #216 puerta del mar'),
(144, 2, 174, NULL, NULL, NULL, 'KAREN', 'RIVERA', NULL, 'FEMENINO', '6462468190', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(145, 2, 175, NULL, NULL, NULL, 'ANDREA ', 'SOSA ', NULL, 'FEMENINO', '6461167790', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(146, 2, 176, NULL, NULL, NULL, 'MARIA FERNANDA ', NULL, NULL, 'FEMENINO', '6461010713', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(147, 2, 177, NULL, NULL, NULL, 'BETZY ', 'SOTO', NULL, 'FEMENINO', '6461969415', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(148, 2, 178, NULL, NULL, NULL, 'ARTURO ', 'SERRANO MORENO', NULL, 'MASCULINO', '6462954871', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(149, 2, 179, NULL, NULL, NULL, 'KARLA', 'GARNICA', NULL, 'FEMENINO', '6461345890', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(150, 2, 180, NULL, NULL, NULL, 'COLUMBA', 'MURO', NULL, 'FEMENINO', '6461940754', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Calle San bernardino Mz 3 #14 Col todos santos'),
(151, 2, 181, NULL, NULL, NULL, 'ELVIRA GUADALUPE ', 'LARA MEDINA', NULL, 'FEMENINO', '6461328348', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Calle rio conchos #87 Valle dorado'),
(152, 2, 182, NULL, NULL, NULL, 'DIEGO ', 'GASTELUM', NULL, 'MASCULINO', '6461360877', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Calle sauces #617 valle verde'),
(153, 2, 183, NULL, NULL, NULL, 'HECTOR ', 'OSUNA PIZANO', NULL, 'MASCULINO', '6461879340', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(154, 2, 184, NULL, NULL, NULL, 'URIEL ', 'GASTELUM', NULL, 'MASCULINO', '6461360877', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(155, 2, 185, NULL, NULL, NULL, 'ALBERTO', 'HERNANDEZ', NULL, 'MASCULINO', '6462635169', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(156, 2, 186, NULL, NULL, NULL, 'EVELYN YADHIRA', 'MORELOS', NULL, 'FEMENINO', '6461442928', '2020-08-01 04:42:30', NULL, NULL, NULL, 'XXI ayundamiento #587 popular 89 C.P 22812'),
(157, 2, 187, NULL, NULL, NULL, 'MONICA ', 'FIMBRES MILANES', NULL, 'FEMENINO', '6461953376', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Calle condesa del mar, colonia villa del mar #387'),
(158, 2, 188, NULL, NULL, NULL, 'MARCO ', 'MEJIA ', NULL, 'MASCULINO', '6462941172', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(159, 2, 189, NULL, NULL, NULL, 'MELANIE ', 'ABUNDIS', NULL, 'FEMENINO', '6462393063', '2020-08-01 04:42:30', NULL, NULL, NULL, 'Salvador burgue?o magisterial la presa #315'),
(160, 2, 190, NULL, NULL, NULL, 'MIRYAM ', NULL, NULL, 'FEMENINO', '6461877552', '2020-08-01 04:42:30', NULL, NULL, NULL, NULL),
(161, 2, 192, NULL, NULL, NULL, 'ANDREA MICHELL', NULL, NULL, 'FEMENINO', '6461265091', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(162, 2, 193, NULL, NULL, NULL, 'JASHIA CALINA ', 'PEREZ MURILLO', NULL, 'FEMENINO', '6462375780', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Colonia cumbres de la presa calle sierra de juarez #266'),
(163, 2, 194, NULL, NULL, NULL, 'JORGE ADRIAN', 'VALENZUELA', NULL, 'MASCULINO', '6462100994', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(164, 2, 195, NULL, NULL, NULL, 'SAUL', 'RAMIREZ', NULL, 'MASCULINO', '6461417584', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(165, 2, 196, NULL, NULL, NULL, 'FABIOLA ', 'GARCIA', NULL, 'FEMENINO', '6461446783', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(166, 2, 197, NULL, NULL, NULL, 'KIMBERLY VALERIA', 'HERNANDEZ VIZCARRA', NULL, 'FEMENINO', '6461958371', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Animas #452 col 89'),
(167, 2, 198, NULL, NULL, NULL, 'GLADYS', 'GALEANA PEREZ', NULL, 'FEMENINO', '6461908847', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(168, 2, 199, NULL, NULL, NULL, 'ANGEL JOSHUA ', 'MARTINEZ', NULL, 'MASCULINO', '6461504777', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(169, 2, 200, NULL, NULL, NULL, 'JANELY ', 'GAMBOA', NULL, 'FEMENINO', '6461894749', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Ave de los catalanes #133 villas del real'),
(170, 2, 201, NULL, NULL, NULL, 'MARIA PAULA', 'DIEGO', NULL, 'FEMENINO', '6461884781', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Camino al orfanatorio L18A'),
(171, 2, 202, NULL, NULL, NULL, 'ISABEL ', 'SALDA?A', NULL, 'FEMENINO', '6461619082', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(172, 2, 204, NULL, NULL, NULL, 'JACKELINE ZEREH', 'ZAMUDIO GERARDO', NULL, 'FEMENINO', '6461933136', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Calle san marcos #110 fraccionamiento nueva ensenada'),
(173, 2, 205, NULL, NULL, NULL, 'ROGELIO ', 'ESTRADA AGUILAR', NULL, 'MASCULINO', '6462130335', '2020-08-01 04:42:31', NULL, NULL, NULL, 'calle nodal #3183 Granjas el gallo'),
(174, 2, 206, NULL, NULL, NULL, 'OCTAVIO ESTRADA', 'DAVILA TOVAR', NULL, 'FEMENINO', '64642119685', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Calle Heriberto Jara #29 loma linda '),
(175, 2, 207, NULL, NULL, NULL, 'REYNA ', 'HERNANDEZ', NULL, 'FEMENINO', '6461134005', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(176, 2, 208, NULL, NULL, NULL, 'ALMA ', 'CORRALES', NULL, 'FEMENINO', '6461631054', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(177, 2, 209, NULL, NULL, NULL, 'LUIS ', 'OSUNA GUZMAN', NULL, 'MASCULINO', NULL, '2020-08-01 04:42:31', NULL, NULL, NULL, 'C. Alhelies #360 Fracc. Lomitas indeco III C.P 22810'),
(178, 2, 211, NULL, NULL, NULL, 'RAUL ', 'PIMENTEL LOPEZ', NULL, 'MASCULINO', '6462393014', '2020-08-01 04:42:31', NULL, NULL, NULL, 'principal #130 fco. Zarco'),
(179, 2, 216, NULL, NULL, NULL, 'JORGE ENRIQUE', 'MENDIVIL RUIZ', NULL, 'MASCULINO', '6461283562', '2020-08-01 04:42:31', NULL, NULL, NULL, 'Avenida lazaro cardenas privada condominio valle grande #378 col. Valle de chapultepec'),
(180, 2, 217, NULL, NULL, NULL, 'NAYELI ANEL', 'GOMEZ AVITIA', NULL, 'FEMENINO', '6462230973', '2020-08-01 04:42:31', NULL, NULL, NULL, NULL),
(181, 2, 219, NULL, NULL, NULL, 'pruebaidorganizacion', 'test', '2020-08-31', 'FEMENINO', '6461233233', '2020-08-31 18:18:03', NULL, NULL, NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `pago`
--

CREATE TABLE `pago` (
  `id` int NOT NULL,
  `id_venta` int NOT NULL,
  `efectivo` decimal(10,2) NOT NULL DEFAULT '0.00',
  `dolares` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tarjeta` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cheque` decimal(10,2) NOT NULL DEFAULT '0.00',
  `deposito` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tipo_cambio_dolares` decimal(10,0) NOT NULL,
  `iva` int DEFAULT NULL,
  `subtotal` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `total_a_pagar` decimal(10,2) NOT NULL,
  `cambio` decimal(10,2) NOT NULL,
  `cambio_en_dolares` int NOT NULL,
  `tipo_tarjeta` enum('CREDITO','DEBITO','NO_APLICA') NOT NULL DEFAULT 'NO_APLICA',
  `terminacion_tarjeta` varchar(4) DEFAULT NULL,
  `tipo_pago` enum('TOTAL','PARCIAL','PENDIENTE') NOT NULL DEFAULT 'PENDIENTE',
  `referencia_deposito` varchar(100) DEFAULT NULL,
  `referencia_cheque` varchar(100) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pago`
--

INSERT INTO `pago` (`id`, `id_venta`, `efectivo`, `dolares`, `tarjeta`, `cheque`, `deposito`, `tipo_cambio_dolares`, `iva`, `subtotal`, `total`, `total_a_pagar`, `cambio`, `cambio_en_dolares`, `tipo_tarjeta`, `terminacion_tarjeta`, `tipo_pago`, `referencia_deposito`, `referencia_cheque`, `tiempo_creacion`, `tiempo_actualizacion`) VALUES
(1, 2, '0.00', '0.00', '0.00', '0.00', '0.00', '18', NULL, NULL, '0.00', '0.00', '0.00', 0, 'NO_APLICA', NULL, 'TOTAL', NULL, NULL, '2020-08-14 08:16:59', '2020-08-14 08:16:59'),
(2, 3, '0.00', '0.00', '0.00', '0.00', '0.00', '18', NULL, NULL, '0.00', '0.00', '0.00', 0, 'NO_APLICA', NULL, 'TOTAL', NULL, NULL, '2020-08-14 08:50:44', '2020-08-14 08:50:44'),
(3, 4, '0.00', '0.00', '0.00', '0.00', '0.00', '18', NULL, NULL, '0.00', '0.00', '0.00', 0, 'NO_APLICA', NULL, 'TOTAL', NULL, NULL, '2020-08-14 09:25:12', '2020-08-14 09:25:12'),
(4, 5, '0.00', '0.00', '0.00', '0.00', '0.00', '18', NULL, NULL, '0.00', '0.00', '0.00', 0, 'NO_APLICA', NULL, 'TOTAL', NULL, NULL, '2020-08-14 16:04:54', '2020-08-14 16:04:54'),
(5, 6, '0.00', '0.00', '0.00', '0.00', '0.00', '18', NULL, NULL, '0.00', '0.00', '0.00', 0, 'NO_APLICA', NULL, 'TOTAL', NULL, NULL, '2020-08-14 17:36:59', '2020-08-14 17:36:59'),
(6, 7, '0.00', '0.00', '0.00', '0.00', '0.00', '18', 0, 0, '0.00', '0.00', '0.00', 0, 'NO_APLICA', NULL, 'TOTAL', NULL, NULL, '2020-08-14 17:56:57', '2020-08-14 17:56:57');

-- --------------------------------------------------------

--
-- Table structure for table `pago_poliza`
--

CREATE TABLE `pago_poliza` (
  `id` int NOT NULL,
  `id_poliza` int DEFAULT NULL,
  `id_organizacion` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_venta` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `fecha_cobro` date DEFAULT NULL,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('PAGADO','PENDIENTE','PROCESADO','') NOT NULL DEFAULT 'PENDIENTE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `poliza`
--

CREATE TABLE `poliza` (
  `id` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_organizacion` int NOT NULL,
  `id_tipo_poliza` int NOT NULL,
  `id_servicio` int DEFAULT NULL,
  `descripcion` text,
  `estado` enum('PENDIENTE_PAGAR','PAGADO') NOT NULL DEFAULT 'PENDIENTE_PAGAR',
  `nombre_mes_pago` varchar(50) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `precio_servicio`
--

CREATE TABLE `precio_servicio` (
  `id` int NOT NULL,
  `id_tipo_precio` int DEFAULT NULL,
  `id_servicio` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `precio_servicio`
--

INSERT INTO `precio_servicio` (`id`, `id_tipo_precio`, `id_servicio`, `id_centro_medico`, `precio`, `tiempo_creacion`) VALUES
(2, 1, 1, 2, '0', '2020-08-14 07:39:40');

-- --------------------------------------------------------

--
-- Table structure for table `pregunta_historia_clinica`
--

CREATE TABLE `pregunta_historia_clinica` (
  `id` int NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `tipo_pregunta` enum('PREGUNTA_ESPECIFICA','PREGUNTA_GENERAL','SECCION_PREGUNTAS','PREGUNTA_ODONTOGRAMA') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_pregunta_historia_medica_depende_de` int DEFAULT NULL,
  `es_pregunta_binaria` enum('SI','NO','OTRO') NOT NULL DEFAULT 'NO',
  `posibles_valores` text,
  `depende_del_genero` enum('NO','MASCULINO','FEMENINO') NOT NULL DEFAULT 'NO',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pregunta_historia_clinica`
--

INSERT INTO `pregunta_historia_clinica` (`id`, `pregunta`, `tipo_pregunta`, `id_pregunta_historia_medica_depende_de`, `es_pregunta_binaria`, `posibles_valores`, `depende_del_genero`, `tiempo_creacion`) VALUES
(1, '11 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(2, '11 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(3, '11 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(4, '11 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(5, '11 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(6, '12 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(7, '12 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(8, '12 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(9, '12 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(10, '12 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(11, '13 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(12, '13 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(13, '13 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(14, '13 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(15, '13 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(16, '14 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(17, '14 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(18, '14 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(19, '14 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(20, '14 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(21, '15 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(22, '15 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(23, '15 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(24, '15 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(25, '15 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(26, '16 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(27, '16 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(28, '16 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(29, '16 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(30, '16 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(31, '17 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(32, '17 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(33, '17 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(34, '17 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(35, '17 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(36, '18 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(37, '18 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(38, '18 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(39, '18 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(40, '18 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(41, '21 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(42, '21 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(43, '21 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(44, '21 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(45, '21 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(46, '22 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(47, '22 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(48, '22 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(49, '22 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(50, '22 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(51, '23 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(52, '23 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(53, '23 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(54, '23 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(55, '23 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(56, '24 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(57, '24 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(58, '24 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(59, '24 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(60, '24 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(61, '25 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(62, '25 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(63, '25 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(64, '25 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(65, '25 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(66, '26 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(67, '26 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(68, '26 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(69, '26 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(70, '26 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(71, '27 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(72, '27 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(73, '27 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(74, '27 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(75, '27 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(76, '28 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(77, '28 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(78, '28 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(79, '28 - Palantino', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(80, '28 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(81, '31 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(82, '31 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(83, '31 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(84, '31 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(85, '31 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(86, '32 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(87, '32 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(88, '32 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(89, '32 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(90, '32 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(91, '33 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(92, '33 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(93, '33 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(94, '33 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(95, '33 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(96, '34 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(97, '34 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(98, '34 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(99, '34 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(100, '34 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(101, '35 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(102, '35 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(103, '35 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(104, '35 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(105, '35 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(106, '36 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(107, '36 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(108, '36 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(109, '36 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(110, '36 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(111, '37 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(112, '37 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(113, '37 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(114, '37 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(115, '37 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(116, '38 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(117, '38 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(118, '38 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(119, '38 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(120, '38 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(121, '41 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(122, '41 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(123, '41 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(124, '41 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(125, '41 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(126, '42 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(127, '42 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(128, '42 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(129, '42 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(130, '42 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(131, '43 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(132, '43 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(133, '43 - Incisal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(134, '43 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(135, '43 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(136, '44 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(137, '44 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(138, '44 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(139, '44 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(140, '44 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(141, '45 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(142, '45 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(143, '45 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(144, '45 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(145, '45 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(146, '46 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(147, '46 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(148, '46 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(149, '46 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(150, '46 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(151, '47 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(152, '47 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(153, '47 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(154, '47 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(155, '47 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(156, '48 - Distal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(157, '48 - Vestibular', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(158, '48 - Oclusal', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(159, '48 - Lingual', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28'),
(160, '48 - Mesial', 'PREGUNTA_ODONTOGRAMA', NULL, 'SI', NULL, 'NO', '2020-11-05 22:19:28');

-- --------------------------------------------------------

--
-- Table structure for table `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int NOT NULL,
  `id_organizacion` int NOT NULL,
  `id_imagen` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(20) DEFAULT NULL,
  `contacto` varchar(255) DEFAULT NULL,
  `rfc` varchar(20) DEFAULT NULL,
  `cuenta_bancaria` varchar(20) DEFAULT NULL,
  `dias_credito` int DEFAULT NULL,
  `nota` text,
  `usuario_creo` varchar(255) DEFAULT NULL,
  `estatus` enum('ACTIVO','ELIMINADO') NOT NULL DEFAULT 'ACTIVO',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recepcionista_doctor`
--

CREATE TABLE `recepcionista_doctor` (
  `id` int NOT NULL,
  `id_usuario_recepcion` int NOT NULL,
  `id_doctor` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recurso`
--

CREATE TABLE `recurso` (
  `id` int NOT NULL,
  `id_servicio_primario` int NOT NULL,
  `id_servicio_secundario` int NOT NULL,
  `cantidad` int NOT NULL,
  `estatus` enum('ACTIVO','ELIMINADO') NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recurso`
--

INSERT INTO `recurso` (`id`, `id_servicio_primario`, `id_servicio_secundario`, `cantidad`, `estatus`, `fecha_creacion`) VALUES
(1, 27, 2, 1, 'ACTIVO', '2020-07-10 20:47:40'),
(2, 27, 3, 1, 'ACTIVO', '2020-07-10 20:47:40'),
(3, 27, 4, 1, 'ACTIVO', '2020-07-10 20:47:40'),
(4, 27, 5, 1, 'ACTIVO', '2020-07-10 20:47:40'),
(5, 27, 6, 1, 'ACTIVO', '2020-07-10 20:47:40'),
(6, 28, 2, 1, 'ACTIVO', '2020-07-10 21:34:48'),
(7, 28, 8, 1, 'ACTIVO', '2020-07-10 21:34:48'),
(8, 28, 5, 1, 'ACTIVO', '2020-07-10 21:34:48'),
(9, 28, 6, 1, 'ACTIVO', '2020-07-10 21:34:48'),
(10, 28, 9, 10, 'ACTIVO', '2020-07-10 21:34:48'),
(11, 28, 7, 2, 'ACTIVO', '2020-07-10 21:34:48'),
(12, 29, 2, 1, 'ACTIVO', '2020-07-10 21:36:04'),
(13, 29, 7, 2, 'ACTIVO', '2020-07-10 21:36:04'),
(14, 29, 8, 1, 'ACTIVO', '2020-07-10 21:36:04'),
(15, 29, 15, 1, 'ACTIVO', '2020-07-10 21:36:04'),
(16, 29, 5, 1, 'ACTIVO', '2020-07-10 21:36:04'),
(17, 29, 6, 1, 'ACTIVO', '2020-07-10 21:36:04'),
(18, 29, 16, 1, 'ACTIVO', '2020-07-10 21:36:04'),
(19, 29, 17, 4, 'ACTIVO', '2020-07-10 21:36:04'),
(20, 30, 2, 1, 'ACTIVO', '2020-07-10 21:48:45'),
(21, 30, 7, 1, 'ACTIVO', '2020-07-10 21:48:45'),
(22, 30, 8, 1, 'ACTIVO', '2020-07-10 21:48:45'),
(23, 30, 9, 10, 'ACTIVO', '2020-07-10 21:48:45'),
(24, 30, 5, 1, 'ACTIVO', '2020-07-10 21:48:45'),
(25, 31, 18, 1, 'ACTIVO', '2020-07-10 21:52:24'),
(26, 31, 19, 1, 'ACTIVO', '2020-07-10 21:52:24'),
(27, 31, 2, 1, 'ACTIVO', '2020-07-10 21:52:24'),
(28, 32, 2, 1, 'ACTIVO', '2020-07-10 21:53:26'),
(29, 32, 20, 1, 'ACTIVO', '2020-07-10 21:53:26'),
(30, 32, 21, 1, 'ACTIVO', '2020-07-10 21:53:26'),
(31, 32, 22, 1, 'ACTIVO', '2020-07-10 21:53:26'),
(32, 32, 7, 2, 'ACTIVO', '2020-07-10 21:53:26'),
(33, 32, 8, 1, 'ACTIVO', '2020-07-10 21:53:26'),
(34, 33, 2, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(35, 33, 7, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(36, 33, 8, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(37, 33, 9, 10, 'ACTIVO', '2020-07-10 21:54:41'),
(38, 33, 17, 5, 'ACTIVO', '2020-07-10 21:54:41'),
(39, 33, 23, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(40, 33, 6, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(41, 33, 5, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(42, 33, 24, 1, 'ACTIVO', '2020-07-10 21:54:41'),
(43, 34, 2, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(44, 34, 7, 2, 'ACTIVO', '2020-07-10 21:57:46'),
(45, 34, 8, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(46, 34, 9, 10, 'ACTIVO', '2020-07-10 21:57:46'),
(47, 34, 17, 5, 'ACTIVO', '2020-07-10 21:57:46'),
(48, 34, 23, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(49, 34, 5, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(50, 34, 24, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(51, 34, 25, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(52, 34, 26, 1, 'ACTIVO', '2020-07-10 21:57:46'),
(53, 35, 2, 1, 'ACTIVO', '2020-07-10 22:07:46'),
(54, 35, 7, 2, 'ACTIVO', '2020-07-10 22:07:46'),
(55, 35, 8, 1, 'ACTIVO', '2020-07-10 22:07:46'),
(56, 35, 9, 10, 'ACTIVO', '2020-07-10 22:07:46'),
(57, 36, 2, 1, 'ACTIVO', '2020-07-30 01:23:22'),
(58, 36, 26, 1, 'ACTIVO', '2020-07-30 01:23:22'),
(59, 36, 9, 1, 'ACTIVO', '2020-07-30 01:23:22'),
(60, 36, 24, 1, 'ACTIVO', '2020-07-30 01:23:22');

-- --------------------------------------------------------

--
-- Table structure for table `requisicion`
--

CREATE TABLE `requisicion` (
  `id` int NOT NULL,
  `id_centro_medico` int DEFAULT NULL,
  `id_usuario_solicito` int DEFAULT NULL,
  `id_usuario_recibio` int DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  `id_centro_medico_distribuidor` int DEFAULT NULL,
  `nota` text,
  `flete` float(11,2) DEFAULT '0.00',
  `importacion` float(11,2) DEFAULT '0.00',
  `rastreo` varchar(50) DEFAULT NULL,
  `total_articulos` float(11,2) DEFAULT NULL,
  `pedimento` varchar(50) DEFAULT NULL,
  `estatus` enum('PENDIENTE','EN_TRANSITO','RECIBIDO','CANCELADO') DEFAULT 'PENDIENTE',
  `subtotal` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT '1.00',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_entrega` timestamp NULL DEFAULT NULL,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `respuesta_historia_clinica`
--

CREATE TABLE `respuesta_historia_clinica` (
  `id` int NOT NULL,
  `id_pregunta_historia_clinica` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_doctor` int NOT NULL,
  `respuesta_binaria` enum('SI','NO','OTRO') NOT NULL,
  `respuesta` text,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `respuesta_historia_clinica`
--

INSERT INTO `respuesta_historia_clinica` (`id`, `id_pregunta_historia_clinica`, `id_paciente`, `id_doctor`, `respuesta_binaria`, `respuesta`, `tiempo_creacion`) VALUES
(1, 36, 2, 13, 'SI', 'PERNO MALO', '2020-11-05 04:41:25'),
(2, 81, 2, 13, 'SI', 'PÓNTICO', '2020-11-05 20:29:03'),
(3, 13, 2, 13, 'SI', 'PROVISIONAL', '2020-11-05 21:25:05'),
(4, 124, 2, 13, 'SI', 'CARIES', '2020-11-05 22:28:26'),
(5, 123, 2, 13, 'SI', 'CARIES', '2020-11-05 22:28:39'),
(6, 128, 2, 13, 'SI', 'CARIES', '2020-11-05 22:28:52'),
(7, 133, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:00'),
(8, 88, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:18'),
(9, 83, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:31'),
(10, 93, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:39'),
(11, 43, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:49'),
(12, 48, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:56'),
(13, 53, 2, 13, 'SI', 'CARIES', '2020-11-05 22:29:59'),
(14, 3, 2, 13, 'SI', 'CARIES', '2020-11-05 22:30:02'),
(15, 8, 2, 13, 'SI', 'CARIES', '2020-11-05 22:30:10'),
(16, 13, 2, 13, 'SI', 'CARIES', '2020-11-05 22:30:13'),
(17, 4, 2, 13, 'SI', 'CARIES', '2020-11-05 22:30:17'),
(18, 9, 2, 13, 'SI', 'CARIES', '2020-11-05 22:30:20'),
(19, 14, 2, 13, 'SI', 'CARIES', '2020-11-05 22:30:23'),
(20, 115, 2, 13, 'SI', 'SELLANTE BUENO', '2020-11-05 22:56:23'),
(21, 111, 2, 13, 'SI', 'SELLANTE BUENO', '2020-11-05 22:56:31'),
(22, 115, 2, 13, 'SI', 'IMPLANTE BUENO', '2020-11-05 23:03:13'),
(23, 112, 2, 13, 'SI', 'EXTRACCIÓN INDICADA', '2020-11-05 23:04:47'),
(24, 113, 2, 13, 'SI', 'ENDODONCIA MALA', '2020-11-05 23:04:53'),
(25, 114, 2, 13, 'SI', 'PROVISIONAL', '2020-11-05 23:04:57'),
(26, 96, 3, 13, 'SI', 'EXTRACCIÓN INDICADA', '2020-11-05 23:48:20');

-- --------------------------------------------------------

--
-- Table structure for table `servicio`
--

CREATE TABLE `servicio` (
  `id` int NOT NULL,
  `id_organizacion` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `id_unidad_medida` int DEFAULT NULL,
  `id_imagen` int DEFAULT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `precio_referencia` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cantidad_minima` int DEFAULT NULL,
  `tipo` enum('PRODUCTO_FISICO','SERVICIO','POLIZA') NOT NULL,
  `nombre` text,
  `prestado_por` enum('CENTRO_MEDICO','DOCTOR') NOT NULL DEFAULT 'CENTRO_MEDICO',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `servicio`
--

INSERT INTO `servicio` (`id`, `id_organizacion`, `id_centro_medico`, `id_unidad_medida`, `id_imagen`, `codigo`, `precio_referencia`, `cantidad_minima`, `tipo`, `nombre`, `prestado_por`, `tiempo_creacion`) VALUES
(1, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Consulta', 'CENTRO_MEDICO', '2020-05-04 23:44:59'),
(2, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Eyector', 'CENTRO_MEDICO', '2020-07-08 20:11:59'),
(3, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Pasta profilactica', 'CENTRO_MEDICO', '2020-07-08 20:12:12'),
(4, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Cepillo profilaxis', 'CENTRO_MEDICO', '2020-07-08 20:12:32'),
(5, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Babero', 'CENTRO_MEDICO', '2020-07-08 20:12:45'),
(6, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Papel secante', 'CENTRO_MEDICO', '2020-07-08 20:13:23'),
(7, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Anestecia', 'CENTRO_MEDICO', '2020-07-08 20:13:36'),
(8, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Aguja', 'CENTRO_MEDICO', '2020-07-08 20:14:00'),
(9, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Gasas', 'CENTRO_MEDICO', '2020-07-08 20:17:05'),
(15, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Microbrush', 'CENTRO_MEDICO', '2020-07-10 19:11:02'),
(16, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Papel articular', 'CENTRO_MEDICO', '2020-07-10 19:11:30'),
(17, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Rollos de algodón', 'CENTRO_MEDICO', '2020-07-10 19:11:54'),
(18, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Acrilico', 'CENTRO_MEDICO', '2020-07-10 19:12:17'),
(19, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Monomero', 'CENTRO_MEDICO', '2020-07-10 19:12:34'),
(20, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Hilo retactor', 'CENTRO_MEDICO', '2020-07-10 19:18:35'),
(21, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Alginato', 'CENTRO_MEDICO', '2020-07-10 19:18:50'),
(22, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Material pesado', 'CENTRO_MEDICO', '2020-07-10 19:19:07'),
(23, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Solucion salina', 'CENTRO_MEDICO', '2020-07-10 19:19:29'),
(24, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Jeringa hipodermica', 'CENTRO_MEDICO', '2020-07-10 19:19:58'),
(25, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Diapex', 'CENTRO_MEDICO', '2020-07-10 19:20:33'),
(26, 2, 2, 2, NULL, NULL, '0.00', NULL, 'PRODUCTO_FISICO', 'Eyector Quirurgico', 'CENTRO_MEDICO', '2020-07-10 19:20:53'),
(27, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Limpieza', 'CENTRO_MEDICO', '2020-07-10 20:47:40'),
(28, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Limpieza Profunda ', 'CENTRO_MEDICO', '2020-07-10 21:34:48'),
(29, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Resina', 'CENTRO_MEDICO', '2020-07-10 21:36:04'),
(30, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Extracción', 'CENTRO_MEDICO', '2020-07-10 21:48:45'),
(31, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Provisional', 'CENTRO_MEDICO', '2020-07-10 21:52:24'),
(32, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Preparación Corona', 'CENTRO_MEDICO', '2020-07-10 21:53:26'),
(33, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Tratamiento Pulpotomia', 'CENTRO_MEDICO', '2020-07-10 21:54:41'),
(34, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Tratamiento Pulpectomia', 'CENTRO_MEDICO', '2020-07-10 21:57:46'),
(35, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Alargamiento', 'CENTRO_MEDICO', '2020-07-10 22:07:46'),
(36, 2, 2, 1, NULL, NULL, '0.00', NULL, 'SERVICIO', 'Endodoncia', 'CENTRO_MEDICO', '2020-07-30 01:23:22');

-- --------------------------------------------------------

--
-- Table structure for table `servicio_poliza`
--

CREATE TABLE `servicio_poliza` (
  `id` int NOT NULL,
  `id_tipo_poliza` int NOT NULL,
  `id_servicio` int NOT NULL,
  `limite_uso_servicio` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sesion`
--

CREATE TABLE `sesion` (
  `id` varchar(16) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `id_usuario` int NOT NULL,
  `estatus` enum('SESION_ACTIVA','SESION_INACTIVA') NOT NULL DEFAULT 'SESION_ACTIVA',
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sesion`
--

INSERT INTO `sesion` (`id`, `id_usuario`, `estatus`, `tiempo_creacion`) VALUES
('11WGojDIrI7IFoyk', 8, 'SESION_ACTIVA', '2020-07-28 18:35:29'),
('178u3HBix0IvWWCY', 7, 'SESION_ACTIVA', '2020-07-08 18:18:30'),
('1cySvrJg7OPAP32Z', 2, 'SESION_ACTIVA', '2020-06-10 20:00:37'),
('1NdvL5Sof4U9UKY1', 9, 'SESION_ACTIVA', '2020-08-15 23:20:24'),
('1zbYFLC8DVv2rRRb', 8, 'SESION_ACTIVA', '2020-07-28 18:35:29'),
('2b9cm1ES6kaSHWoZ', 7, 'SESION_ACTIVA', '2020-10-28 18:20:12'),
('2rwYZXO8lGDxDJKF', 8, 'SESION_ACTIVA', '2020-07-30 01:16:02'),
('3ShD3NzYDjiJT7WH', 7, 'SESION_ACTIVA', '2020-07-31 18:56:36'),
('4p1wpHNFJP2IHtuW', 1, 'SESION_ACTIVA', '2020-05-04 22:11:15'),
('4Z0mbZUDc4dkKZyW', 9, 'SESION_ACTIVA', '2020-08-14 17:56:30'),
('5HeyBN5QcZZ7c7Qb', 1, 'SESION_ACTIVA', '2020-06-04 04:49:55'),
('5nK6ohQOkbbiNfDY', 1, 'SESION_ACTIVA', '2020-05-04 22:11:15'),
('74sxwmdSPUqXsAUv', 9, 'SESION_ACTIVA', '2020-07-28 18:48:37'),
('7jxhAQGVvju5lv5d', 7, 'SESION_ACTIVA', '2020-08-16 20:59:14'),
('8Ca7rltHNaBrHMwj', 1, 'SESION_ACTIVA', '2020-06-10 19:58:36'),
('BhTZvmejCEOSzPSu', 7, 'SESION_ACTIVA', '2020-08-14 07:04:47'),
('bgiFwQhjRLsWDYRY', 8, 'SESION_ACTIVA', '2020-08-02 01:10:38'),
('C6zJ2p04Zsa2JmJv', 9, 'SESION_ACTIVA', '2020-07-28 18:48:37'),
('Cks02cOmYIxvdPTq', 9, 'SESION_ACTIVA', '2020-08-14 08:54:17'),
('CPNYXc3u7hcP5MsG', 8, 'SESION_ACTIVA', '2020-07-28 17:14:23'),
('CuqCNBTX0j5MOfk5', 7, 'SESION_ACTIVA', '2020-07-31 18:56:36'),
('Cy9XlkQxTrm5yjKw', 7, 'SESION_ACTIVA', '2020-08-15 23:06:09'),
('c5dK4XoMo8XXs37T', 8, 'SESION_ACTIVA', '2020-07-28 17:25:46'),
('c8I7naykP7mMQo4h', 3, 'SESION_ACTIVA', '2020-06-10 19:59:54'),
('Dfk4Rozuqmz7zU8r', 7, 'SESION_ACTIVA', '2020-08-14 17:47:37'),
('EorphZ98yVwByAXR', 9, 'SESION_ACTIVA', '2020-08-16 21:01:21'),
('eh7ImDojwPA4XJVb', 8, 'SESION_ACTIVA', '2020-07-28 17:25:46'),
('exwtripctyDOxfE1', 8, 'SESION_ACTIVA', '2020-07-28 17:31:02'),
('FnAqqWO7gNMbQsL9', 9, 'SESION_ACTIVA', '2020-08-14 07:36:53'),
('FOz9ds4j7XtPVd4r', 7, 'SESION_ACTIVA', '2020-08-15 23:06:09'),
('FoP6hdRyvMBNhEJo', 9, 'SESION_ACTIVA', '2020-08-16 20:43:41'),
('FWBa5F86p4G4JEhn', 8, 'SESION_ACTIVA', '2020-08-01 04:43:00'),
('fJSZGt6jvZyJ3BLB', 1, 'SESION_ACTIVA', '2020-06-03 04:26:24'),
('gRBkaWLcqoDftfQK', 7, 'SESION_ACTIVA', '2020-08-16 20:59:14'),
('h1O6fw9rYSbkW0c0', 9, 'SESION_ACTIVA', '2020-08-14 08:54:17'),
('h35DE3Uqy8nqh3WK', 7, 'SESION_ACTIVA', '2020-07-28 17:29:50'),
('hLwmCtQXWf6ZaWuj', 7, 'SESION_ACTIVA', '2020-07-30 01:20:12'),
('hqwURiFESryqnDub', 2, 'SESION_ACTIVA', '2020-06-10 20:00:37'),
('hTjqCDFX3ywlYxa4', 9, 'SESION_ACTIVA', '2020-08-14 07:10:14'),
('I6aQH3c8rFC2zCFC', 7, 'SESION_ACTIVA', '2020-10-28 20:02:35'),
('IdQEf0XNhufrF2Bg', 1, 'SESION_ACTIVA', '2021-02-18 22:55:03'),
('JIcz4WIUzMYyYfXV', 7, 'SESION_ACTIVA', '2020-08-31 17:13:52'),
('JVcIZJeXMzNtKEqi', 7, 'SESION_ACTIVA', '2020-07-08 18:18:30'),
('j3P6vuBwWWNaEt1X', 9, 'SESION_ACTIVA', '2020-08-16 21:01:21'),
('j73JmeZNoczV2bhf', 1, 'SESION_ACTIVA', '2020-06-10 19:57:54'),
('jaekhXH8aJkGi55N', 8, 'SESION_ACTIVA', '2020-07-28 17:17:02'),
('Kjxp4SFiZ2jwOF1y', 1, 'SESION_ACTIVA', '2020-06-10 19:58:36'),
('KvBsqbz7eP5VJK54', 1, 'SESION_ACTIVA', '2020-06-10 19:59:23'),
('KXuiapFLic6u2BLv', 7, 'SESION_ACTIVA', '2020-10-28 20:02:34'),
('kg38rwJ7gKqUjTtq', 1, 'SESION_ACTIVA', '2021-02-18 22:55:03'),
('LsRk0Gy6NWgdIIrC', 7, 'SESION_ACTIVA', '2020-07-28 19:02:06'),
('MI8R1p9Lvt6SZnwo', 1, 'SESION_ACTIVA', '2020-10-27 16:43:22'),
('MTp4e87jRxdc2y0Y', 9, 'SESION_ACTIVA', '2020-08-14 07:23:11'),
('MtQZu6tgYlk64gKj', 1, 'SESION_ACTIVA', '2020-06-10 20:00:07'),
('mMXA3tga6lrQo4z8', 7, 'SESION_ACTIVA', '2020-07-02 20:05:21'),
('N3dOQ2rRmx9eKJQg', 7, 'SESION_ACTIVA', '2020-08-01 04:42:08'),
('NOYtMr7ggpZIbKsi', 9, 'SESION_ACTIVA', '2020-08-14 07:36:53'),
('NpO6aRhSIDgAicNU', 9, 'SESION_ACTIVA', '2020-08-14 17:56:30'),
('ntTvT22TclT5cxQU', 7, 'SESION_ACTIVA', '2020-10-29 05:17:43'),
('oUYcs3tdsIWdhuqH', 1, 'SESION_ACTIVA', '2020-05-26 23:53:56'),
('PXXxSYgDqtZuiolM', 9, 'SESION_ACTIVA', '2020-08-15 23:20:24'),
('pZCLR8D4H8dCa3hf', 7, 'SESION_ACTIVA', '2020-07-28 19:26:37'),
('qhgZRqutxIS0GKg1', 8, 'SESION_ACTIVA', '2020-08-02 01:10:38'),
('qvpm3uJfeLAKm2NW', 7, 'SESION_ACTIVA', '2020-08-14 07:04:47'),
('R4g9eECoUO4uyElL', 7, 'SESION_ACTIVA', '2020-08-01 04:43:26'),
('Rbv510UiRq6u7tZK', 1, 'SESION_ACTIVA', '2020-10-29 05:17:28'),
('RmFUkeQOyLaKIRx8', 7, 'SESION_ACTIVA', '2020-07-28 19:02:06'),
('rUnETlAYwsbz14uh', 13, 'SESION_ACTIVA', '2020-10-29 20:02:06'),
('ryVRPDwlIhaQpn9b', 7, 'SESION_ACTIVA', '2020-07-28 19:26:37'),
('sgKYVHM5e4oMdmL4', 8, 'SESION_ACTIVA', '2020-07-28 17:17:02'),
('skcYXVThSRzma2Pi', 7, 'SESION_ACTIVA', '2020-08-01 04:43:26'),
('sL0Il1tDL35q6k0t', 13, 'SESION_ACTIVA', '2020-09-08 23:33:10'),
('TVkrxSkPxJ7klju5', 1, 'SESION_ACTIVA', '2020-06-10 19:59:23'),
('t3PJTBA031kjBIKg', 7, 'SESION_ACTIVA', '2020-08-31 17:13:52'),
('tBx5jpgDcsUPtIY2', 7, 'SESION_ACTIVA', '2020-08-16 20:20:31'),
('tbBnq9VfQbfjZvQC', 3, 'SESION_ACTIVA', '2020-06-10 20:01:34'),
('U22GQRRuBEMEO1wE', 3, 'SESION_ACTIVA', '2020-06-10 19:59:54'),
('UKz1RAK5o3yb26oM', 9, 'SESION_ACTIVA', '2020-08-16 20:43:41'),
('uMt7prZj1WwrV5og', 8, 'SESION_ACTIVA', '2020-08-01 04:43:00'),
('uSKOxyZrQOe5EE2d', 13, 'SESION_ACTIVA', '2020-10-29 20:02:06'),
('Vhq0EBSdMqD6gRqT', 13, 'SESION_ACTIVA', '2020-08-31 18:45:57'),
('VJsugDd1TwzUCLlh', 7, 'SESION_ACTIVA', '2020-10-28 18:20:12'),
('VjUZ7lpCl0xRX7Fb', 13, 'SESION_ACTIVA', '2020-10-30 17:16:37'),
('veBMmQtfoolurfKN', 1, 'SESION_ACTIVA', '2020-06-03 04:45:12'),
('WDg03PCgM7bsktO1', 7, 'SESION_ACTIVA', '2020-08-16 20:20:31'),
('WhCp6fQY7acPpugV', 7, 'SESION_ACTIVA', '2020-08-14 17:47:37'),
('WMORG0gvKMUvQOOM', 7, 'SESION_ACTIVA', '2020-08-01 04:42:08'),
('WzeXZ6v4EmUyJnmR', 8, 'SESION_ACTIVA', '2020-07-28 17:14:23'),
('wd4xSqoxIMLv7Hoo', 7, 'SESION_ACTIVA', '2020-07-28 17:29:50'),
('wt9ivf4kA96t3qXK', 1, 'SESION_ACTIVA', '2020-06-10 19:57:54'),
('Xucxn4oO0PjJEEmv', 1, 'SESION_ACTIVA', '2020-06-10 20:00:07'),
('x2RMxV7x7IFEKwSX', 1, 'SESION_ACTIVA', '2020-05-26 23:53:56'),
('xpDrudgjmIUfGNxL', 9, 'SESION_ACTIVA', '2020-07-28 17:34:06'),
('YftfMFjgNCL9vx6i', 7, 'SESION_ACTIVA', '2020-07-02 20:05:21'),
('YkHda79upbAjS7hw', 9, 'SESION_ACTIVA', '2020-08-14 07:10:14'),
('yCi6zv7tcmlITQZa', 8, 'SESION_ACTIVA', '2020-07-28 17:31:01'),
('Z6P1djQPiG5QxSEU', 7, 'SESION_ACTIVA', '2020-10-29 05:17:42'),
('ZlxDglMkzUJL437z', 2, 'SESION_ACTIVA', '2020-06-26 00:17:36');

-- --------------------------------------------------------

--
-- Table structure for table `sucursal_doctor`
--

CREATE TABLE `sucursal_doctor` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_doctor` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sucursal_doctor`
--

INSERT INTO `sucursal_doctor` (`id`, `nombre`, `id_doctor`, `id_centro_medico`, `tiempo_actualizacion`) VALUES
(1, 'Jireh Dental Care', 9, 2, '2020-07-28 17:30:38');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_gasto`
--

CREATE TABLE `tipo_gasto` (
  `id` int NOT NULL,
  `id_organizacion` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tipo_poliza`
--

CREATE TABLE `tipo_poliza` (
  `id` int NOT NULL,
  `id_centro_medico` int DEFAULT NULL,
  `id_tipo_precio` int DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` int NOT NULL,
  `meses` int NOT NULL,
  `cantidad_personas` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tipo_precio`
--

CREATE TABLE `tipo_precio` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `id_organizacion` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tipo_precio`
--

INSERT INTO `tipo_precio` (`id`, `nombre`, `id_organizacion`, `tiempo_creacion`) VALUES
(1, 'General', 1, '2020-05-04 22:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `id` int NOT NULL,
  `codigo` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unidad_medida`
--

INSERT INTO `unidad_medida` (`id`, `codigo`, `nombre`, `tipo`) VALUES
(1, 'ACT', 'Actividad', 'unidades de venta'),
(2, 'H87', 'Pieza', 'Múltiplos / Fracciones / Decimales');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `usuario` varchar(250) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `id_centro_medico` int DEFAULT NULL,
  `id_organizacion` int DEFAULT NULL,
  `id_imagen` int DEFAULT NULL,
  `tipo` enum('PACIENTE','DOCTOR','RECEPCIONISTA','ADMIN','ASISTENTE','ROOT') NOT NULL,
  `id_tipo_precio` int DEFAULT NULL,
  `id_device_notification` varchar(30) DEFAULT NULL,
  `contrasena` varchar(60) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `factura_rfc` varchar(20) DEFAULT NULL,
  `factura_razon_social` varchar(200) DEFAULT NULL,
  `factura_codigo_postal` varchar(20) DEFAULT NULL,
  `factura_correo_electronico` varchar(100) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `nombre`, `id_centro_medico`, `id_organizacion`, `id_imagen`, `tipo`, `id_tipo_precio`, `id_device_notification`, `contrasena`, `telefono`, `correo_electronico`, `factura_rfc`, `factura_razon_social`, `factura_codigo_postal`, `factura_correo_electronico`, `tiempo_creacion`) VALUES
(1, 'admin@fifa', 'administrador', 1, 1, NULL, 'ADMIN', NULL, NULL, 'admin@centrosmedicos2020', NULL, NULL, NULL, NULL, NULL, NULL, '2020-05-04 22:10:45'),
(2, 'robertom', 'Roberto Montaño Paz', 1, 1, NULL, 'DOCTOR', NULL, NULL, 'robmp2020', '7113292181', 'drrobertomontano@yahoo.com.mx', NULL, NULL, NULL, NULL, '2020-05-04 22:20:36'),
(3, 'acamargon', 'Alejandro Camargo', 1, 1, NULL, 'DOCTOR', NULL, NULL, 'acmesnace', '4421819356', 'acamargon@gmail.com', NULL, NULL, NULL, NULL, '2020-05-04 22:22:52'),
(4, 'recepcion@fifa', 'recepcion', 1, 1, NULL, 'RECEPCIONISTA', NULL, NULL, 'robmp2020', NULL, '', NULL, NULL, NULL, NULL, '2020-05-04 22:26:22'),
(5, 'lupita', 'lupita', 1, 1, NULL, 'ASISTENTE', NULL, NULL, 'robmp2020', NULL, '', NULL, NULL, NULL, NULL, '2020-05-04 22:29:03'),
(6, 'ibeth.ortiz', 'Ibeth Ortiz Robles', 1, 1, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'chetos_2205@hotmail.com', 'Cama820129ec1', '', '76910', NULL, '2020-05-04 22:35:08'),
(7, 'admin@jireh', 'administrador', 2, 2, NULL, 'ADMIN', NULL, NULL, 'admin@jireh2020', NULL, NULL, NULL, NULL, NULL, NULL, '2020-07-02 20:05:02'),
(8, 'recepcionista@jireh', 'Recepcionista', 2, 2, NULL, 'RECEPCIONISTA', NULL, NULL, 'recepcionista@jireh', '', '', NULL, NULL, NULL, NULL, '2020-07-08 19:06:28'),
(9, 'drcristinaflores@gmail.com', 'Cristina Flores Garcia', 2, 2, NULL, 'DOCTOR', NULL, NULL, 'jireh@2020', '6461078871', 'drcristinaflores@gmail.com', NULL, NULL, NULL, NULL, '2020-07-10 22:47:15'),
(10, '6462102865', 'Jose Luis Gonzalez Jimenez', 2, 2, NULL, 'DOCTOR', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', '6462102865', NULL, NULL, NULL, NULL, NULL, '2020-07-13 05:35:22'),
(12, '6641234070', 'Leonardo Flores García', 2, 2, NULL, 'DOCTOR', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', '6462102865', NULL, NULL, NULL, NULL, NULL, '2020-07-13 05:37:01'),
(13, '6641262445', 'Erika Eloiza Zamarripa Sanchez', 2, 2, NULL, 'DOCTOR', NULL, NULL, '1234', '6641262445', NULL, NULL, NULL, NULL, NULL, '2020-07-13 05:38:43'),
(14, '6462763243', 'Jahel Merino Garcia', 2, 2, NULL, 'DOCTOR', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', '6462763243', NULL, NULL, NULL, NULL, NULL, '2020-07-13 05:39:24'),
(15, '2223214314', 'Omar Lopez Estrada', 2, 2, NULL, 'DOCTOR', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', '2223214314', NULL, NULL, NULL, NULL, NULL, '2020-07-13 05:42:01'),
(16, '6641273396', 'Denisse Corral Osuna', 2, 2, NULL, 'DOCTOR', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', '6641273396', NULL, NULL, NULL, NULL, NULL, '2020-07-13 05:42:53'),
(17, 'daniel@prueba', 'Daniel Martinez', 2, 1, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'daniel@gmail.com', '123', '', '', NULL, '2020-07-28 17:22:42'),
(18, 'ghghhyhhjhj', 'Eduardo Alcala', 2, 2, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'foo@fhjhkjku', 'ggfhfh', 'fhfghgfh', 'fggh', NULL, '2020-07-30 01:18:32'),
(19, 'hjghjghjghjghj', 'IKER GABRIEL ESCOBEDO FLORES', 2, 2, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'FGFG@DFDGFG', 'FGDFG', 'DFGDFG', 'DFGDFG', NULL, '2020-07-30 16:59:19'),
(20, 'aavila912@gmail.com', 'ALMA ROSA AVILA GARCIA', 2, 2, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'aavila912@gmail.com', '6462231970', '', '', NULL, '2020-07-31 19:04:01'),
(32, 'brissetbencomo@gmail.com', 'BRISSET MELISSA BENCOMO NU?EZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'brissetbencomo@gmail.com', '', '', '', NULL, '2020-08-01 04:42:26'),
(35, '6462247420', 'LILIANA MU?OZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(36, '6197994477', 'CINTHYA ARMENTA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(37, '6461488712', 'HELENA MOCTEZUMA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(38, '6461324488', 'JINETTE PI?A', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(39, '6461431494', 'OFELIA  MEDINA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(40, '6462032470', 'HECTOR PONCE', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(41, '6461516644', 'BLANCA LUZ RAMOS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(42, '6461031249', 'JOSE IRAN  VAZQUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(43, '6461504509', 'JUAN FERNANDO GARCIA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(44, '6461553024', 'DANIEL  CAMBERO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(45, 'ing.robles1207@gmail.com', 'JOSEFINA ROBLES LOPEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'ing.robles1207@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(46, 'eru2000live@gmail.com', 'ANA ROSA  SEBASTIAN RANGEL', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'eru2000live@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(47, 'angel2002frausto@gmail.com', 'MIRIAM ALEJANDRA FUENTES MACIAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'angel2002frausto@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(48, 'cheguez75@hotmail.com', 'MADAI CHEWUES MARTINEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'cheguez75@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(49, 'lic.darinkapcardenas@hotmail.com', 'ROMINA  DE LOS SANTOS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'lic.darinkapcardenas@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(50, '6461792832', 'EVA LUZ PEREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(51, 'ismael.hc@gmail.com', 'ISMAEL  HERNANDEZ CHAPUCHIN', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'ismael.hc@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(52, 'davidjuarezzav@gmail.com', 'DAVID GILBERTO JUAREZ ZAVALA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'davidjuarezzav@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(53, '6461286056', 'MIRIAM PAOLA SAYAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(54, '6161270906', 'FRANCISCA VENEGAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(55, '6462007575', 'CINTHYA  PEREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(56, '6462409509', 'ASHYLEY  ESTRADA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(57, 'perjam90.98@outlook.com', 'PERLA JANETH ARREGUIN MACIEL ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'perjam90.98@outlook.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(58, 'misael_2421@outlook.es', 'MISAEL SALDA?A ISLAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'misael_2421@outlook.es', '', '', '', NULL, '2020-08-01 04:42:27'),
(59, 'beba_1770@hotmail.com', 'LUZ DEL CARMEN  BUSTAMANTE ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'beba_1770@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(60, 'elenacarrazco@hotmail.com', 'ELENA  ZAVALA CARRAZCO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'elenacarrazco@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(61, 'brisamarina196@hotmail.com', 'MARCELA SANCHEZ NOGUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'brisamarina196@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(62, 'sayu_mendoza@hotmail.com', 'SAYURI GUADALUPE MENDOZA REALES', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'sayu_mendoza@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(63, 'carmelita.saucedo.lopez@gmail.com', 'EDWIN  ESTRADA LOPEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'carmelita.saucedo.lopez@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(64, 'ismael.lealgonzalez@gmail.com', 'AZUL JAMILETH LEAL', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'ismael.lealgonzalez@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(65, '6241820610', 'JOSUE JARETH LEAL', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(66, 'mrtorres2204@gmail.com', 'MARIO  RODRIGUEZ TORRES', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'mrtorres2204@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(67, '6461949092', 'MARTIN MAYA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:27'),
(68, 'osiris.gutierrez@uabc.edu.mx', 'OSIRIS GUTIERREZ SOTO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'osiris.gutierrez@uabc.edu.mx', '', '', '', NULL, '2020-08-01 04:42:27'),
(69, 'lizethmendez1979@gmail.com', 'JAZMIN LIZETH MENDEZ RIVERA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'lizethmendez1979@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(70, 'copilli22@gmail.com', 'KARLA COPILLI LUIS SANCHEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'copilli22@gmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(71, 'letijuarez_@hotmail.com', 'HINATHA MARINETT GUTIERREZ CARRILLO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'letijuarez_@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:27'),
(72, 'gerardocortes_79@hotmail.com', 'GERARDO CORTES JAIME', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'gerardocortes_79@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(73, '6461931445', 'GLEN  SOLORIO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(74, '6461877818', 'BLANCA  SANCHEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(75, 'johanna_cruz26@hotmail.com', 'JOANA DENISSE CRUZ HERNANDEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'JOHANNA_CRUZ26@HOTMAIL.COM', '', '', '', NULL, '2020-08-01 04:42:28'),
(76, '6462062353', 'SARA  MANZANAREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(77, 'rominaarellanofigueroacastro@gmail.com', 'ERIK JAVIER MADERO FIGUEROA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'rominaarellanofigueroacastro@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(78, '6462115403', 'LUCIA  MERLO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(79, 'joselynchavez2003@gmail.com', 'JOSELYN CALDERON CHAVEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'joselynchavez2003@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(80, '6461846504', 'YESENIA  DOMINGUEZ RUIZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(81, '6461914542', 'HOMERO AUGUSTO JUAREZ ZAVALA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(82, 'leticiaornelas@hotmail.com', 'MARIA LETICIA  ORNELAS GUERRERO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'leticiaornelas@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(83, '6462012443', 'VALERIA GOMEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(84, 'fabiolac.8888@gmail.com', 'FABIOLA GUADALUPE CASTILLO LUNA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'fabiolac.8888@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(85, '6461461007', 'ROSARIO VALDEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(86, '6461605415', 'IVAN HERRERA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(87, '6461510641', 'DANIELA SAINZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(88, '6462034148', 'VERONICA  LUCERO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(89, '6462476693', 'DORA IRENE ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(90, 'evelynnatalia21@hotmail.com', 'EVELYN NATALIA ROMERO RIOS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'evelynnatalia21@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(91, 'samayoa.adriana@gmail.com', 'BERTHA ADRIANA SAMAYOA VIDAL', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'samayoa.adriana@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(92, '6161091321', 'JOANA  GALINDO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(93, '6462637633', 'ALEXIS CASTRO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(94, 'elenazamarripa5@hotmail.com', 'MARIA ELENA ZAMARRIPA SANCHEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'elenazamarripa5@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(95, 'alocis.2415@gmail.com', 'ALONDRA ESTEFANIA CISNEROS MARTINEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'alocis.2415@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(96, 'bianca_friends@hotmail.com', 'BIANCA  GARCIA GALVEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'bianca_friends@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(97, '6462597043', 'NORA MOLINA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(98, '6461216570', 'LIZBETH  MADUE?A', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(99, '6461342000', 'YADIRA HERNANDEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(100, 'esveidy.silvas@uabc.edu.mx', 'ESVEIDY SILVAS CAMACHO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'esveidy.silvas@uabc.edu.mx', '', '', '', NULL, '2020-08-01 04:42:28'),
(101, 'alexagaliba@gmail.com', 'YOHAMARA ALEJANDRA GALINDO BAUTISTA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'alexagaliba@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(102, '6461441504', 'GABRIELA  BARRERA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(103, 'susej1963@gmail.com', 'JOSE DE JESUS GONZALEZ MARTINEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'susej1963@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(104, '6461097723', 'JOANNA GABRIEL VILLALOBOS ONTIVEROS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(105, 'ricardoch32@hotmail.com', 'NOEMI  RODRIGUEZ RAMOS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'ricardoch32@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(106, 'mrenteria2@gmail.com', 'MARGARITA  RENTERIA CANO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'mrenteria2@gmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(107, 'dinorah_anaya@hotmail.com', 'DINORAH ASTRID MARIA ELENA ANAYA ESPINOZA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'dinorah_anaya@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(109, 'clara.rodriguez@uabc.edu.mx', 'CLARA IVETTE  RODRIGUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'clara.rodriguez@uabc.edu.mx', '', '', '', NULL, '2020-08-01 04:42:28'),
(110, 'rogelio.villegas@uabc.edu.mx', 'ROGELIO ANDRES VILLEGAS ALTAMIRANO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'rogelio.villegas@uabc.edu.mx', '', '', '', NULL, '2020-08-01 04:42:28'),
(111, '6462690764', 'LORENA  CAUDILLO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(112, '6461857141', 'ISABEL  GARCIA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(113, 'jossyaboytia@hotmail.com', 'VALERIA  FLORES ABOYTA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'jossyaboytia@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:28'),
(114, '6461626575', 'CRISTINA  SANTIAGO                                                                                  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(115, '6461876767', 'CINTHIA  SAMBRANO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(116, 'elizabeth@hotmail', 'FRANCISCO  LUCERO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'elizabeth@hotmail', '', '', '', NULL, '2020-08-01 04:42:28'),
(117, '6462043097', 'ELIZABETH  LUNA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:28'),
(118, 'lydiaortegab@gmail.com', 'LYDIA LIZBETH ORTEGA BUSTAMANTE', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'lydiaortegab@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(119, '6461333733', 'SONIA GARCIA OJEDA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(121, '6469476467', 'VALERIA FLORES', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(122, '6461601405', 'JAIME  TRUJILLO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(123, '6461340130', 'JENNIFER ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(124, 'macris_r_71472@hotmail.com', 'MARIA CRISTINA  RUIZ LOPEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'macris_r_71472@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(125, 'csandoval16@uabc.edu.mx', 'CARLOS EDUARDO SANDOVAL CASTORENA ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'csandoval16@uabc.edu.mx', '', '', '', NULL, '2020-08-01 04:42:29'),
(126, 'gabira_4_@hotmail.com', 'GABRIELA IRAZEMA LARA RUIZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'gabira_4_@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(127, '6461504024', 'BLANCA  BUENROSTRO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(128, 'pabloareymundo@gmail.com', 'PABLO ALONSO REYMUNDO JASSO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'pabloareymundo@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(129, 'rga2004.8.28@gmail.com', 'ROSELYN  GUZMAN ARELLANO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'rga2004.8.28@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(130, 'sinaiarellano154@gmail.com', 'ARIADNA SINAI GUZMAN ARELLANO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'sinaiarellano154@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(131, 'lictaniaesbat@yahoo.com.mx', 'TANIA  ESTRADA BATIZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'lictaniaesbat@yahoo.com.mx', '', '', '', NULL, '2020-08-01 04:42:29'),
(132, '4521443672', 'IVAN  COLLINS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(133, 'grupopublicitariomexico@gmail.com', 'MARIA FERNANDA QUI?ONEZ JUAREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'grupopublicitariomexico@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(134, '6461192286', 'ESTEFANY M  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(135, 'elisita011@htomail.com', 'CAMYLA  PERALTA GARCIA ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'elisita011@htomail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(136, 'adriana.08.22hernandez@gmail.com', 'DULCE ADRIANA  DELGADO HERNANDEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'adriana.08.22hernandez@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(137, '6641786274', 'ARTURO  LOPEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(138, '6462391525', 'AMPARO  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(139, '6461384601', 'TANIA  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(140, '6462602448', 'JENNIFER  CONTRERAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(141, 'benjamingamez777@gmail.com', 'BENJAMIN  GAMEZ MARTINEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'benjamingamez777@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(142, 'avelaralejandra173@gmail.com', 'ALEJANDRA  NI?O AVELAR', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'avelaralejandra173@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(143, '6462564233', 'ELIZABETH  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(144, 'angelaisabelgarciarios960@gmail.com', 'ANGELA ISABEL  GARCIA RIOS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'angelaisabelgarciarios960@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(145, 'olveratovar@hotmail.com', 'CASSANDRA BERTHA  OLVERA TOVAR', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'olveratovar@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(146, '6461185827', 'ERNA GABRIELA  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(147, '6461895897', 'VERONICA  VAZQUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(148, 'cecilia_mp@outlook.com', 'CECILIA  MATHOS PI?UELAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'cecilia_mp@outlook.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(149, 'fernandolozanorodriguez18@gmail.com', 'FERNANDO HUMBERTO LOZANO RODRIGUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'fernandolozanorodriguez18@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(150, 'karla_hdz86@hotmail.com', 'KARLA YOLANDA HERNANDEZ BELTRAN', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'karla_hdz86@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(151, 'maryperezesca@gmail.com', 'EVELYN  PIMENTEL PEREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'maryperezesca@gmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(152, '6461116768', 'EVANGELINA C  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(153, '6461925777', 'DANIELA  RODRIGUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(154, '6461311447', 'DANNA JULIETA  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(155, '6461087294', 'CRISTIAN  TIRADO ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(156, '6461163671', 'EDGAR A ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(157, '6462882221', 'BRENDA RODRIGUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(158, 'panfilo25@hotmail.com', 'ABRAHAM  HERNANDEZ ORTIZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'panfilo25@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(159, 'maherbebegim@hotmail.com', 'HANNA KAMYLA MURILLO DE LA O', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'maherbebegim@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:29'),
(160, '6462370906', 'TAMAR  ROSAS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:29'),
(161, 'lngaxiola@hotmail.com', 'ANA RUTH  GAXIOLA SALGADO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'lngaxiola@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(162, '6461904947', 'PERLA  ROMERO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(163, '6461170974', 'RFAEL  CORTEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(164, '6462268736', 'FRENESY  AYON ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(165, 'yatzira1104@gmail.com', 'LAURA YATZIRA VAZQUEZ LOPEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'yatzira1104@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(166, 'elena.grijalva0311@gmail.com', 'ROSA ELENA GRIJALVA GONZALEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'elena.grijalva0311@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(167, 'jessicamontes475@gmail.com', 'JESSICA  BENITO MONTES DE OCA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'jessicamontes475@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(168, '3511434574', 'NOE ULISES ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(169, 'abril.beltran@uabc.edu.mx', 'ABRIL  BELTRAN', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'abril.beltran@uabc.edu.mx', '', '', '', NULL, '2020-08-01 04:42:30'),
(170, '6461018059', 'DIEGO  RODRIGUEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(171, '6461320088', 'LINDSAY  ESTRADA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(172, 'markitos168sandoval@gmail.com', 'MARCO ANTONIO  PALACIOS SANDOVAL', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'markitos168sandoval@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(173, 'itzelestrella@hotmail.com', 'ITZEL ESTRELLA CAASTRO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'itzelestrella@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(174, '6462468190', 'KAREN RIVERA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(175, '6461167790', 'ANDREA  SOSA ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(176, '6461010713', 'MARIA FERNANDA  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(177, '6461969415', 'BETZY  SOTO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(178, 'arturo.mcklous8@gmail.com', 'ARTURO  SERRANO MORENO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'arturo.mcklous8@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(179, '6461345890', 'KARLA GARNICA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(180, '6461940754', 'COLUMBA MURO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(181, 'guadalupe_lara_medina@hotmail.com', 'ELVIRA GUADALUPE  LARA MEDINA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'guadalupe_lara_medina@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(182, 'gasmardiego04@gmail.com', 'DIEGO  GASTELUM', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'gasmardiego04@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(183, 'corey_osuna@hotmail.com', 'HECTOR  OSUNA PIZANO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'corey_osuna@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(184, '6461360877', 'URIEL  GASTELUM', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(185, '6462635169', 'ALBERTO HERNANDEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(186, 'noe-moan@hotmail.com', 'EVELYN YADHIRA MORELOS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'noe-moan@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(187, 'milanesm1103@gmail.com', 'MONICA  FIMBRES MILANES', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'milanesm1103@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(188, '6462941172', 'MARCO  MEJIA ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(189, 'aniepaksun@gmail.com', 'MELANIE  ABUNDIS', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'aniepaksun@gmail.com', '', '', '', NULL, '2020-08-01 04:42:30'),
(190, '6461877552', 'MIRYAM  ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:30'),
(192, '6461265091', 'ANDREA MICHELL ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(193, 'jashia234@gmail.com', 'JASHIA CALINA  PEREZ MURILLO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'jashia234@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(194, '6462100994', 'JORGE ADRIAN VALENZUELA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(195, '6461417584', 'SAUL RAMIREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(196, '6461446783', 'FABIOLA  GARCIA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(197, 'edraky@hotmail.com', 'KIMBERLY VALERIA HERNANDEZ VIZCARRA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'edraky@hotmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(198, '6461908847', 'GLADYS GALEANA PEREZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(199, '6461504777', 'ANGEL JOSHUA  MARTINEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(200, '6461894749', 'JANELY  GAMBOA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(201, 'pauladiego415@gmail.com', 'MARIA PAULA DIEGO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'pauladiego415@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(202, '6461619082', 'ISABEL  SALDA?A', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(204, 'jkzereh@gmail.com', 'JACKELINE ZEREH ZAMUDIO GERARDO', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'jkzereh@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(205, 'rogelio12112@gmail.com', 'ROGELIO  ESTRADA AGUILAR', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'rogelio12112@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(206, 'octavio.davila@uabc.ed.mx', 'OCTAVIO ESTRADA DAVILA TOVAR', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'octavio.davila@uabc.ed.mx', '', '', '', NULL, '2020-08-01 04:42:31'),
(207, '6461134005', 'REYNA  HERNANDEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(208, '6461631054', 'ALMA  CORRALES', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(209, 'luisosuna0406@gmail.com', 'LUIS  OSUNA GUZMAN', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'luisosuna0406@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(211, '6462393014', 'RAUL  PIMENTEL LOPEZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, NULL, '', '', '', NULL, '2020-08-01 04:42:31'),
(216, 'mendivil366@gmail.com', 'JORGE ENRIQUE MENDIVIL RUIZ', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'mendivil366@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(217, 'nayeli.anel07@gmail.com', 'NAYELI ANEL GOMEZ AVITIA', 2, NULL, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, 'nayeli.anel07@gmail.com', '', '', '', NULL, '2020-08-01 04:42:31'),
(219, '6461233233', 'pruebaidorganizacion test', 2, 2, NULL, 'PACIENTE', NULL, NULL, '7269ceb24c0931683af89a388117d79b2223c16f', NULL, '', '', '', '', NULL, '2020-08-31 18:18:03');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_centro_medico`
--

CREATE TABLE `usuario_centro_medico` (
  `id` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_centro_medico` int NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venta`
--

CREATE TABLE `venta` (
  `id` int NOT NULL,
  `id_usuario_cliente` int DEFAULT NULL,
  `facturado` enum('NO','FACTURADO','FACTURADO_POR_PARCIALIDADES') NOT NULL DEFAULT 'NO',
  `cliente` varchar(50) DEFAULT NULL,
  `subtotal` double(11,2) DEFAULT NULL,
  `iva` double(11,2) DEFAULT NULL,
  `porcentaje_iva` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` double(11,2) DEFAULT NULL,
  `cambio` double(11,2) DEFAULT NULL,
  `efectivo_desc` double DEFAULT '0',
  `dolares_desc` double DEFAULT '0',
  `tipo_cambio` double DEFAULT NULL,
  `id_usuario_atendio` int NOT NULL,
  `cupon_desc` double DEFAULT '0',
  `id_centro_medico` int DEFAULT '0',
  `fecha` datetime DEFAULT NULL,
  `redondeo` double DEFAULT '0',
  `nombre` varchar(100) DEFAULT '',
  `estatus` enum('PENDIENTE','PROCESADA','PAGADA') NOT NULL DEFAULT 'PENDIENTE',
  `activa` enum('NO','SI') NOT NULL,
  `pendiente` decimal(10,2) DEFAULT '0.00',
  `comprobante` varchar(200) DEFAULT NULL,
  `promocion_desc` double DEFAULT '0',
  `id_tipo_precio` int NOT NULL,
  `folio` int DEFAULT NULL,
  `UUID` varchar(50) DEFAULT NULL,
  `porcentaje_desc` double(11,0) NOT NULL DEFAULT '0',
  `fecha_facturacion` datetime DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tiempo_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `factura_rfc` varchar(20) DEFAULT NULL,
  `factura_razon_social` varchar(200) DEFAULT NULL,
  `factura_codigo_postal` varchar(10) DEFAULT NULL,
  `factura_correo_electronico` varchar(100) DEFAULT NULL,
  `factura_uso_cfdi` varchar(4) DEFAULT NULL,
  `facturada` enum('SI','NO') NOT NULL DEFAULT 'NO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `venta`
--

INSERT INTO `venta` (`id`, `id_usuario_cliente`, `facturado`, `cliente`, `subtotal`, `iva`, `porcentaje_iva`, `total`, `cambio`, `efectivo_desc`, `dolares_desc`, `tipo_cambio`, `id_usuario_atendio`, `cupon_desc`, `id_centro_medico`, `fecha`, `redondeo`, `nombre`, `estatus`, `activa`, `pendiente`, `comprobante`, `promocion_desc`, `id_tipo_precio`, `folio`, `UUID`, `porcentaje_desc`, `fecha_facturacion`, `tiempo_creacion`, `factura_rfc`, `factura_razon_social`, `factura_codigo_postal`, `factura_correo_electronico`, `factura_uso_cfdi`, `facturada`) VALUES
(1, NULL, 'NO', 'General', 1206.90, 193.10, '0.00', 700.00, NULL, 0, 0, NULL, 1, 0, 1, NULL, 0, '', 'PENDIENTE', 'SI', '700.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-06-04 01:35:56', NULL, NULL, NULL, NULL, NULL, 'NO'),
(2, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PAGADA', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-07-28 18:56:33', NULL, NULL, NULL, NULL, NULL, 'NO'),
(3, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PAGADA', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-08-14 07:12:52', NULL, NULL, NULL, NULL, NULL, 'NO'),
(4, 3, 'NO', 'Eduardo', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PAGADA', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-08-14 09:24:55', NULL, NULL, NULL, NULL, NULL, 'NO'),
(5, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PAGADA', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-08-14 16:03:31', NULL, NULL, NULL, NULL, NULL, 'NO'),
(6, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PAGADA', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-08-14 17:34:54', NULL, NULL, NULL, NULL, NULL, 'NO'),
(7, NULL, 'NO', 'General', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PAGADA', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-08-14 17:56:55', NULL, NULL, NULL, NULL, NULL, 'NO'),
(8, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 9, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-08-14 18:07:45', NULL, NULL, NULL, NULL, NULL, 'NO'),
(9, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 01:02:34', NULL, NULL, NULL, NULL, NULL, 'NO'),
(10, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 01:11:00', NULL, NULL, NULL, NULL, NULL, 'NO'),
(11, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 01:26:54', NULL, NULL, NULL, NULL, NULL, 'NO'),
(12, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 01:32:23', NULL, NULL, NULL, NULL, NULL, 'NO'),
(13, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 01:32:47', NULL, NULL, NULL, NULL, NULL, 'NO'),
(14, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 02:02:56', NULL, NULL, NULL, NULL, NULL, 'NO'),
(15, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 02:11:35', NULL, NULL, NULL, NULL, NULL, 'NO'),
(16, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 17:20:40', NULL, NULL, NULL, NULL, NULL, 'NO'),
(17, 2, 'NO', 'Daniel', 0.00, 0.00, '0.00', 0.00, NULL, 0, 0, NULL, 13, 0, 2, NULL, 0, '', 'PENDIENTE', 'SI', '0.00', NULL, 0, 1, NULL, NULL, 0, NULL, '2020-09-09 17:56:11', NULL, NULL, NULL, NULL, NULL, 'NO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachment`
--
ALTER TABLE `attachment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploader_user_id` (`uploader_user_id`),
  ADD KEY `file_type_id` (`file_type_id`);

--
-- Indexes for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categoria_merma`
--
ALTER TABLE `categoria_merma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `centro_medico`
--
ALTER TABLE `centro_medico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_organizacion` (`id_organizacion`),
  ADD KEY `id_imagen` (`id_imagen`);

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_ibfk_2` (`id_paciente`),
  ADD KEY `appointment_ibfk_3` (`id_doctor`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `comisiones_doctor`
--
ALTER TABLE `comisiones_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_doctor` (`id_doctor`),
  ADD KEY `id_comision_por_servicios` (`id_comision_por_servicios`),
  ADD KEY `comisiones_doctor_ibfk_2` (`id_venta`);

--
-- Indexes for table `comision_por_servios`
--
ALTER TABLE `comision_por_servios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_doctor` (`id_doctor`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `configuracion`
--
ALTER TABLE `configuracion`
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_doctor` (`id_doctor`),
  ADD KEY `id_cita` (`id_cita`),
  ADD KEY `id_venta` (`id_venta`);

--
-- Indexes for table `consultorio`
--
ALTER TABLE `consultorio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `consultorio_doctor`
--
ALTER TABLE `consultorio_doctor`
  ADD KEY `id_consultorio` (`id_consultorio`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indexes for table `detalle_distribucion`
--
ALTER TABLE `detalle_distribucion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_distribucion` (`id_distribucion`),
  ADD KEY `detalle_distribucion_ibfk_2` (`id_requisicion`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `detalle_requisicion`
--
ALTER TABLE `detalle_requisicion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_requisicion` (`id_requisicion`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `distribucion`
--
ALTER TABLE `distribucion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico_solicitante` (`id_centro_medico_solicitante`),
  ADD KEY `id_medico_distribuidora` (`id_centro_medico_distribuidor`),
  ADD KEY `id_usuario_envio` (`id_usuario_envio`),
  ADD KEY `id_usuario_recibio` (`id_usuario_recibio`),
  ADD KEY `id_requisicion` (`id_requisicion`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indexes for table `doctor_servicio`
--
ALTER TABLE `doctor_servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_doctor` (`id_doctor`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `documento_histora_clinica`
--
ALTER TABLE `documento_histora_clinica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asdf_ibfk_1` (`id_historia_clinica`);

--
-- Indexes for table `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `especialidad_pregunta`
--
ALTER TABLE `especialidad_pregunta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_pregunta_historia_clinica_2` (`id_pregunta_historia_clinica`,`id_especialidad`),
  ADD KEY `id_pregunta_historia_clinica` (`id_pregunta_historia_clinica`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indexes for table `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_usuario_doctor` (`id_usuario_doctor`);

--
-- Indexes for table `file_type`
--
ALTER TABLE `file_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indexes for table `fondo_caja`
--
ALTER TABLE `fondo_caja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `gasto_centro_medico`
--
ALTER TABLE `gasto_centro_medico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_tipo_gasto` (`id_tipo_gasto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `gasto_doctor`
--
ALTER TABLE `gasto_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_doctor` (`id_usuario_doctor`);

--
-- Indexes for table `historial_inventario`
--
ALTER TABLE `historial_inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sucursal` (`id_centro_medico`),
  ADD KEY `id_servicio` (`id_servicio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_organizacion` (`id_organizacion`),
  ADD KEY `historia_clinica_ibfk_1` (`id_paciente`);

--
-- Indexes for table `historia_horario`
--
ALTER TABLE `historia_horario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_doctor` (`id_doctor`),
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `horario_doctor`
--
ALTER TABLE `horario_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_doctor` (`id_historia_horario`),
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagen_usuario`
--
ALTER TABLE `imagen_usuario`
  ADD UNIQUE KEY `id_imagen` (`id_imagen`),
  ADD KEY `id_usaurio` (`id_usaurio`);

--
-- Indexes for table `ingreso`
--
ALTER TABLE `ingreso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `lote_inventario`
--
ALTER TABLE `lote_inventario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merma`
--
ALTER TABLE `merma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notificacion`
--
ALTER TABLE `notificacion`
  ADD KEY `id_cita` (`id_cita`),
  ADD KEY `notificacion_ibfk_1` (`id_usuario`);

--
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_imagen` (`id_imagen`);

--
-- Indexes for table `organizacion`
--
ALTER TABLE `organizacion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_imagen` (`id_imagen`);

--
-- Indexes for table `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pagos_ibfk_1` (`id_venta`);

--
-- Indexes for table `pago_poliza`
--
ALTER TABLE `pago_poliza`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poliza`
--
ALTER TABLE `poliza`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_organizacion` (`id_organizacion`);

--
-- Indexes for table `precio_servicio`
--
ALTER TABLE `precio_servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo_precio` (`id_tipo_precio`),
  ADD KEY `id_tipo_precio_2` (`id_tipo_precio`,`id_servicio`,`id_centro_medico`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indexes for table `pregunta_historia_clinica`
--
ALTER TABLE `pregunta_historia_clinica`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_organizacion` (`id_organizacion`),
  ADD KEY `id_imagen` (`id_imagen`);

--
-- Indexes for table `recepcionista_doctor`
--
ALTER TABLE `recepcionista_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_medico` (`id_doctor`),
  ADD KEY `id_usuario_recepcion` (`id_usuario_recepcion`);

--
-- Indexes for table `recurso`
--
ALTER TABLE `recurso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_servicio_primario_2` (`id_servicio_primario`,`id_servicio_secundario`),
  ADD KEY `id_servicio_primario` (`id_servicio_primario`),
  ADD KEY `id_servicio_secundario` (`id_servicio_secundario`);

--
-- Indexes for table `requisicion`
--
ALTER TABLE `requisicion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tiempo_creacion` (`tiempo_creacion`),
  ADD KEY `id_centro_medico` (`id_centro_medico`),
  ADD KEY `id_usuario_recibio` (`id_usuario_recibio`),
  ADD KEY `id_usuario_solicito` (`id_usuario_solicito`);

--
-- Indexes for table `respuesta_historia_clinica`
--
ALTER TABLE `respuesta_historia_clinica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pregunta_historia_clinica` (`id_pregunta_historia_clinica`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_doctor` (`id_doctor`);

--
-- Indexes for table `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `id_centro_medico` (`id_organizacion`),
  ADD KEY `imagen_id` (`id_imagen`),
  ADD KEY `id_unidad_medida` (`id_unidad_medida`),
  ADD KEY `id_centro_medico_2` (`id_centro_medico`);

--
-- Indexes for table `servicio_poliza`
--
ALTER TABLE `servicio_poliza`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `sucursal_doctor`
--
ALTER TABLE `sucursal_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_doctor` (`id_doctor`),
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `tipo_gasto`
--
ALTER TABLE `tipo_gasto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_organizacion_2` (`id_organizacion`,`nombre`),
  ADD KEY `id_organizacion` (`id_organizacion`);

--
-- Indexes for table `tipo_poliza`
--
ALTER TABLE `tipo_poliza`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_precio`
--
ALTER TABLE `tipo_precio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro_medico` (`id_organizacion`);

--
-- Indexes for table `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `telefono` (`telefono`),
  ADD KEY `id_organizacion` (`id_organizacion`),
  ADD KEY `id_image` (`id_imagen`);

--
-- Indexes for table `usuario_centro_medico`
--
ALTER TABLE `usuario_centro_medico`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_centro_medico`),
  ADD KEY `id_centro_medico` (`id_centro_medico`);

--
-- Indexes for table `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_usuario_cliente`),
  ADD KEY `id_usuario_recepcionista` (`id_usuario_atendio`),
  ADD KEY `cliente` (`cliente`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachment`
--
ALTER TABLE `attachment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `categoria_merma`
--
ALTER TABLE `categoria_merma`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `centro_medico`
--
ALTER TABLE `centro_medico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cita`
--
ALTER TABLE `cita`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `consultorio`
--
ALTER TABLE `consultorio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detalle_distribucion`
--
ALTER TABLE `detalle_distribucion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detalle_requisicion`
--
ALTER TABLE `detalle_requisicion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `distribucion`
--
ALTER TABLE `distribucion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_servicio`
--
ALTER TABLE `doctor_servicio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `especialidad_pregunta`
--
ALTER TABLE `especialidad_pregunta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_type`
--
ALTER TABLE `file_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fondo_caja`
--
ALTER TABLE `fondo_caja`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gasto_centro_medico`
--
ALTER TABLE `gasto_centro_medico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historial_inventario`
--
ALTER TABLE `historial_inventario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historia_clinica`
--
ALTER TABLE `historia_clinica`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historia_horario`
--
ALTER TABLE `historia_horario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `horario_doctor`
--
ALTER TABLE `horario_doctor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ingreso`
--
ALTER TABLE `ingreso`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lote_inventario`
--
ALTER TABLE `lote_inventario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merma`
--
ALTER TABLE `merma`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizacion`
--
ALTER TABLE `organizacion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT for table `pago`
--
ALTER TABLE `pago`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pago_poliza`
--
ALTER TABLE `pago_poliza`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poliza`
--
ALTER TABLE `poliza`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `precio_servicio`
--
ALTER TABLE `precio_servicio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pregunta_historia_clinica`
--
ALTER TABLE `pregunta_historia_clinica`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recurso`
--
ALTER TABLE `recurso`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `requisicion`
--
ALTER TABLE `requisicion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `respuesta_historia_clinica`
--
ALTER TABLE `respuesta_historia_clinica`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `servicio_poliza`
--
ALTER TABLE `servicio_poliza`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sucursal_doctor`
--
ALTER TABLE `sucursal_doctor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tipo_poliza`
--
ALTER TABLE `tipo_poliza`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipo_precio`
--
ALTER TABLE `tipo_precio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `unidad_medida`
--
ALTER TABLE `unidad_medida`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT for table `usuario_centro_medico`
--
ALTER TABLE `usuario_centro_medico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venta`
--
ALTER TABLE `venta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `centro_medico`
--
ALTER TABLE `centro_medico`
  ADD CONSTRAINT `centro_medico_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`),
  ADD CONSTRAINT `centro_medico_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`);

--
-- Constraints for table `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `cita_ibfk_3` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `cita_ibfk_4` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`);

--
-- Constraints for table `comisiones_doctor`
--
ALTER TABLE `comisiones_doctor`
  ADD CONSTRAINT `comisiones_doctor_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `comisiones_doctor_ibfk_3` FOREIGN KEY (`id_comision_por_servicios`) REFERENCES `comision_por_servios` (`id`);

--
-- Constraints for table `comision_por_servios`
--
ALTER TABLE `comision_por_servios`
  ADD CONSTRAINT `comision_por_servios_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `comision_por_servios_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`);

--
-- Constraints for table `configuracion`
--
ALTER TABLE `configuracion`
  ADD CONSTRAINT `configuracion_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`);

--
-- Constraints for table `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `consulta_ibfk_3` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id`),
  ADD CONSTRAINT `consulta_ibfk_4` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`);

--
-- Constraints for table `consultorio`
--
ALTER TABLE `consultorio`
  ADD CONSTRAINT `consultorio_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`);

--
-- Constraints for table `consultorio_doctor`
--
ALTER TABLE `consultorio_doctor`
  ADD CONSTRAINT `consultorio_doctor_ibfk_1` FOREIGN KEY (`id_consultorio`) REFERENCES `consultorio` (`id`),
  ADD CONSTRAINT `consultorio_doctor_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `doctor` (`id`);

--
-- Constraints for table `detalle_distribucion`
--
ALTER TABLE `detalle_distribucion`
  ADD CONSTRAINT `detalle_distribucion_ibfk_1` FOREIGN KEY (`id_distribucion`) REFERENCES `distribucion` (`id`),
  ADD CONSTRAINT `detalle_distribucion_ibfk_2` FOREIGN KEY (`id_requisicion`) REFERENCES `requisicion` (`id`),
  ADD CONSTRAINT `detalle_distribucion_ibfk_3` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`);

--
-- Constraints for table `detalle_requisicion`
--
ALTER TABLE `detalle_requisicion`
  ADD CONSTRAINT `detalle_requisicion_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`),
  ADD CONSTRAINT `detalle_requisicion_ibfk_2` FOREIGN KEY (`id_requisicion`) REFERENCES `requisicion` (`id`);

--
-- Constraints for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `distribucion`
--
ALTER TABLE `distribucion`
  ADD CONSTRAINT `distribucion_ibfk_1` FOREIGN KEY (`id_centro_medico_solicitante`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `distribucion_ibfk_2` FOREIGN KEY (`id_centro_medico_distribuidor`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `distribucion_ibfk_3` FOREIGN KEY (`id_usuario_envio`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `distribucion_ibfk_4` FOREIGN KEY (`id_usuario_recibio`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `distribucion_ibfk_5` FOREIGN KEY (`id_requisicion`) REFERENCES `requisicion` (`id`);

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `documento_histora_clinica`
--
ALTER TABLE `documento_histora_clinica`
  ADD CONSTRAINT `documento_histora_clinica_ibfk_1` FOREIGN KEY (`id_historia_clinica`) REFERENCES `historia_clinica` (`id`);

--
-- Constraints for table `especialidad`
--
ALTER TABLE `especialidad`
  ADD CONSTRAINT `especialidad_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `especialidad_pregunta`
--
ALTER TABLE `especialidad_pregunta`
  ADD CONSTRAINT `especialidad_pregunta_ibfk_1` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`),
  ADD CONSTRAINT `especialidad_pregunta_ibfk_2` FOREIGN KEY (`id_pregunta_historia_clinica`) REFERENCES `pregunta_historia_clinica` (`id`);

--
-- Constraints for table `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_usuario_doctor`) REFERENCES `doctor` (`id`);

--
-- Constraints for table `fondo_caja`
--
ALTER TABLE `fondo_caja`
  ADD CONSTRAINT `fondo_caja_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gasto_centro_medico`
--
ALTER TABLE `gasto_centro_medico`
  ADD CONSTRAINT `gasto_centro_medico_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `gasto_centro_medico_ibfk_2` FOREIGN KEY (`id_tipo_gasto`) REFERENCES `tipo_gasto` (`id`),
  ADD CONSTRAINT `gasto_centro_medico_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `gasto_doctor`
--
ALTER TABLE `gasto_doctor`
  ADD CONSTRAINT `gasto_doctor_ibfk_1` FOREIGN KEY (`id_usuario_doctor`) REFERENCES `doctor` (`id`);

--
-- Constraints for table `historial_inventario`
--
ALTER TABLE `historial_inventario`
  ADD CONSTRAINT `historial_inventario_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`),
  ADD CONSTRAINT `historial_inventario_ibfk_2` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `historial_inventario_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD CONSTRAINT `historia_clinica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `historia_clinica_ibfk_2` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `historia_horario`
--
ALTER TABLE `historia_horario`
  ADD CONSTRAINT `historia_horario_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historia_horario_ibfk_2` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`);

--
-- Constraints for table `horario_doctor`
--
ALTER TABLE `horario_doctor`
  ADD CONSTRAINT `horario_doctor_ibfk_1` FOREIGN KEY (`id_historia_horario`) REFERENCES `historia_horario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `horario_doctor_ibfk_2` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`);

--
-- Constraints for table `imagen_usuario`
--
ALTER TABLE `imagen_usuario`
  ADD CONSTRAINT `imagen_usuario_ibfk_1` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`),
  ADD CONSTRAINT `imagen_usuario_ibfk_2` FOREIGN KEY (`id_usaurio`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `ingreso`
--
ALTER TABLE `ingreso`
  ADD CONSTRAINT `ingreso_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `ingreso_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`);

--
-- Constraints for table `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `notificacion_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`);

--
-- Constraints for table `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `paciente_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`);

--
-- Constraints for table `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `poliza`
--
ALTER TABLE `poliza`
  ADD CONSTRAINT `poliza_ibfk_2` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`);

--
-- Constraints for table `precio_servicio`
--
ALTER TABLE `precio_servicio`
  ADD CONSTRAINT `precio_servicio_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `precio_servicio_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`),
  ADD CONSTRAINT `precio_servicio_ibfk_3` FOREIGN KEY (`id_tipo_precio`) REFERENCES `tipo_precio` (`id`);

--
-- Constraints for table `proveedor`
--
ALTER TABLE `proveedor`
  ADD CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `proveedor_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`);

--
-- Constraints for table `recepcionista_doctor`
--
ALTER TABLE `recepcionista_doctor`
  ADD CONSTRAINT `recepcionista_doctor_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `recepcionista_doctor_ibfk_2` FOREIGN KEY (`id_usuario_recepcion`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `requisicion`
--
ALTER TABLE `requisicion`
  ADD CONSTRAINT `requisicion_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `requisicion_ibfk_2` FOREIGN KEY (`id_usuario_recibio`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `requisicion_ibfk_3` FOREIGN KEY (`id_usuario_solicito`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `respuesta_historia_clinica`
--
ALTER TABLE `respuesta_historia_clinica`
  ADD CONSTRAINT `respuesta_historia_clinica_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `respuesta_historia_clinica_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `respuesta_historia_clinica_ibfk_3` FOREIGN KEY (`id_pregunta_historia_clinica`) REFERENCES `pregunta_historia_clinica` (`id`);

--
-- Constraints for table `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`),
  ADD CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`),
  ADD CONSTRAINT `servicio_ibfk_3` FOREIGN KEY (`id_unidad_medida`) REFERENCES `unidad_medida` (`id`),
  ADD CONSTRAINT `servicio_ibfk_4` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`);

--
-- Constraints for table `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `sesion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `sucursal_doctor`
--
ALTER TABLE `sucursal_doctor`
  ADD CONSTRAINT `sucursal_doctor_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`);

--
-- Constraints for table `tipo_gasto`
--
ALTER TABLE `tipo_gasto`
  ADD CONSTRAINT `tipo_gasto_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`);

--
-- Constraints for table `tipo_precio`
--
ALTER TABLE `tipo_precio`
  ADD CONSTRAINT `tipo_precio_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`);

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizacion` (`id`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id`);

--
-- Constraints for table `usuario_centro_medico`
--
ALTER TABLE `usuario_centro_medico`
  ADD CONSTRAINT `usuario_centro_medico_ibfk_1` FOREIGN KEY (`id_centro_medico`) REFERENCES `centro_medico` (`id`),
  ADD CONSTRAINT `usuario_centro_medico_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_usuario_cliente`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_usuario_atendio`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

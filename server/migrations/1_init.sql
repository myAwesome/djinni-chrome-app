CREATE TABLE `vacancy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(255) DEFAULT NULL,
  `fav` tinyint DEFAULT NULL,
  `hide` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



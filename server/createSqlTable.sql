CREATE TABLE user_info (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL DEFAULT '',
    name VARCHAR(30) NOT NULL DEFAULT ''
) ENGINE = INNODB;

CREATE TABLE user_file (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL DEFAULT '',
    filename VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(100) NOT NULL,
    size int(11) NOT NULL
) ENGINE = INNODB;

CREATE TABLE file_comments (
    comment_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL DEFAULT '',
    filename VARCHAR(225) NOT NULL DEFAULT '',
    comment VARCHAR(1000) NOT NULL DEFAULT ''
) ENGINE = INNODB;
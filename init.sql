CREATE DATABASE IF NOT EXISTS research;

USE research;

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment TEXT NOT NULL
);

-- Добавьте пример данных
INSERT INTO comments (comment) VALUES ('Hello World!');

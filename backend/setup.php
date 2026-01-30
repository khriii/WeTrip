<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "wetrip";

try {
    $conn = new PDO("mysql:host=$hostname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlCreateDB = "CREATE DATABASE IF NOT EXISTS $dbname";
    $conn->exec($sqlCreateDB);

    $conn->exec("USE $dbname");

    $sql = "
    CREATE TABLE IF NOT EXISTS `USERS` (
        `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
        `username` VARCHAR(64) NOT NULL UNIQUE,
        `password` VARCHAR(64) NOT NULL,
        PRIMARY KEY(`id`)
    );

    CREATE TABLE IF NOT EXISTS `GROUPS` (
        `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
        `name` VARCHAR(64) NOT NULL,
        PRIMARY KEY(`id`)
    );

    CREATE TABLE IF NOT EXISTS `USERS_GROUPS` (
        `id_user` INTEGER NOT NULL,
        `id_group` INTEGER NOT NULL,
        `role` VARCHAR(64) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS `CITIES` (
        `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
        `name` VARCHAR(64) NOT NULL,
        `id_group` INTEGER NOT NULL,
        PRIMARY KEY(`id`)
    );

    CREATE TABLE IF NOT EXISTS `STOPS` (
        `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
        `id_city` INTEGER NOT NULL,
        `name` VARCHAR(64) NOT NULL,
        `description` VARCHAR(255) NOT NULL,
        `price` FLOAT NOT NULL,
        PRIMARY KEY(`id`)
    );

    ALTER TABLE `USERS_GROUPS`
    ADD FOREIGN KEY(`id_user`) REFERENCES `USERS`(`id`)
    ON UPDATE NO ACTION ON DELETE NO ACTION;
    ALTER TABLE `USERS_GROUPS`
    ADD FOREIGN KEY(`id_group`) REFERENCES `GROUPS`(`id`)
    ON UPDATE NO ACTION ON DELETE NO ACTION;
    ALTER TABLE `CITIES`
    ADD FOREIGN KEY(`id_group`) REFERENCES `GROUPS`(`id`)
    ON UPDATE NO ACTION ON DELETE NO ACTION;
    ALTER TABLE `STOPS`
    ADD FOREIGN KEY(`id_city`) REFERENCES `CITIES`(`id`)
    ON UPDATE NO ACTION ON DELETE NO ACTION;
    ";

    $conn->exec($sql);

    echo json_encode(["success" => "Database and tables created successfully"]);

} catch(PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}


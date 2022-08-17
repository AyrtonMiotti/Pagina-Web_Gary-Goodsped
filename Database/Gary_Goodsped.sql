CREATE DATABASE gary_goodsped;
USE gary_goodsped;

CREATE TABLE if not exists Matter(
id_matter INT auto_increment,
name_matter VARCHAR(30),
PRIMARY KEY(id_matter));

CREATE TABLE if not exists Courses(
id_course INT auto_increment,
name_c VARCHAR(30),
division VARCHAR(2),
PRIMARY KEY(id_course));

CREATE TABLE if not exists Teachers(
id_teacher INT auto_increment,
name_t VARCHAR(50),
surname VARCHAR(50),
dni INT,
birthday DATE,
address VARCHAR(30),
PRIMARY KEY(id_teacher));

CREATE TABLE students(
id_student INT auto_increment,
name_s VARCHAR(50),
surname VARCHAR(30),
dni INT,
birthday DATE,
address VARCHAR(30),
PRIMARY KEY(id_student));

CREATE TABLE if not exists USERS(
user_id INT auto_increment,
name_user VARCHAR(30),
passwor VARCHAR(30),
privilege VARCHAR(30),
PRIMARY KEY(user_id));
-- Falta la foto


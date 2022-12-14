DROP DATABASE if exists gary_goodsped;
CREATE DATABASE if not exists gary_goodsped;
USE gary_goodsped;

CREATE TABLE if not exists USERS(
user_id INT,
name_user VARCHAR(30),
passwor VARCHAR(30),
privilege VARCHAR(30),
PRIMARY KEY(user_id));

CREATE TABLE if not exists Teachers(
name_t VARCHAR(50),
surname VARCHAR(50),
dni INT,
birthday DATE,
address VARCHAR(30),
gender VARCHAR(1),
descrip VARCHAR(150),
user_id INT,
FOREIGN KEY (user_id) REFERENCES USERS(user_id),
PRIMARY KEY(dni));

CREATE TABLE if not exists Matter(
id_matter INT auto_increment,
name_matter VARCHAR(30),
dni INT,
FOREIGN KEY (dni) REFERENCES Teachers(dni), -- or DNI
PRIMARY KEY(id_matter));

CREATE TABLE if not exists Divition(
id_divi INT auto_increment,
diviti VARCHAR(1),
PRIMARY KEY (id_divi));

CREATE TABLE if not exists Courses(
id_course INT auto_increment,
name_c VARCHAR(30),
PRIMARY KEY(id_course));

CREATE TABLE if not exists CourXMatter(
id_course INT,
id_matter INT,
FOREIGN KEY (id_course) REFERENCES Courses(id_course),
FOREIGN KEY (id_matter) REFERENCES Matter(id_matter));

CREATE TABLE Students(
name_s VARCHAR(50),
surname VARCHAR(30),
dni INT,
birthday DATE,
address VARCHAR(30),
gender VARCHAR(1),
id_course INT,
id_divi INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
FOREIGN KEY (id_course) REFERENCES Courses(id_course),
FOREIGN KEY (id_divi) REFERENCES Divition(id_divi),
PRIMARY KEY(dni));

/* Privilegios
admin = Administrador
student = Estudiante
teacher = Profesor
*/
DELETE FROM USERS;
INSERT into USERS (user_id, name_user, passwor, privilege) VALUES
(0, 'admin', 'admin', 'admin'),
(45095310, 'Ayrton', 'admin', 'admin'),
(45595444, 'Facu', 'admin', 'admin'),
(1, 'pancho', 'pancho123', 'student'),
(45095311, 'am45095310', '45095310', 'student'),
(35643857, 'Carlos', 'kalo456', 'teacher');


INSERT INTO Divition(diviti) VALUES('A'), ('B'), ('C');
INSERT INTO Courses(name_c) VALUES 
	('Primer Año'),
	('Segundo Año'),
	('Tercer Año'),
	('Cuarto Año'),
	('Quinto Año'),
	('Sexto Año'),
	('Séptimo Año');

DELETE FROM Students;
INSERT INTO Students(name_s, surname, dni, birthday, address, gender, id_course, id_divi, user_id) 
	VALUES ('Ayrton', 'Miotti', 45095310, '2004-01-29', 'Monte 1305', 'M', 7, 1, 1);
SELECT * FROM Students;

-- drop student
SELECT name_s, surname, dni, id_course, id_divi FROM Students WHERE name_s = "Ayrton";
DELETE FROM Students WHERE dni = 123;
SELECT * FROM USERS;



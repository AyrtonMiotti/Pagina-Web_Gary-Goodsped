DROP DATABASE if exists gary_goodsped;
CREATE DATABASE if not exists gary_goodsped;
USE gary_goodsped;

CREATE TABLE if not exists USERS(
user_id INT auto_increment,
name_user VARCHAR(30),
passwor VARCHAR(30),
privilege VARCHAR(30),
PRIMARY KEY(user_id));

CREATE TABLE if not exists Teachers(
id_teacher INT auto_increment,
name_t VARCHAR(50),
surname VARCHAR(50),
dni INT,
birthday DATE,
address VARCHAR(30),
user_id INT,
FOREIGN KEY (user_id) REFERENCES USERS(user_id),
PRIMARY KEY(id_teacher));

CREATE TABLE if not exists Matter(
id_matter INT auto_increment,
name_matter VARCHAR(30),
id_teacher INT,
FOREIGN KEY (id_teacher) REFERENCES Teachers(id_teacher), -- or DNI
PRIMARY KEY(id_matter));

CREATE TABLE students(
name_s VARCHAR(50),
surname VARCHAR(30),
dni INT,
birthday DATE,
address VARCHAR(30),
id_course INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES USERS(user_id),
PRIMARY KEY(dni));

CREATE TABLE if not exists Courses(
id_course INT auto_increment,
name_c VARCHAR(30),
divition VARCHAR(2),
dni INT,
FOREIGN KEY (dni) REFERENCES students(dni),
PRIMARY KEY(id_course));

CREATE TABLE if not exists CourXMatter(
id_course INT,
id_matter INT,
FOREIGN KEY (id_course) REFERENCES Courses(id_course),
FOREIGN KEY (id_matter) REFERENCES Matter(id_matter));




/* Privilegios
admin = Administrador
student = Estudiante
teacher = Profesor
*/

INSERT into USERS (name_user, passwor, privilege) VALUES
('admin', 'admin', 'admin'),
('Ayrton', 'admin', 'admin'),
('Facu', 'admin', 'admin'),
('pancho', 'pancho123', 'student'),
('Carlos', 'kalo456', 'teacher');
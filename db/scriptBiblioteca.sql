DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
use biblioteca;
CREATE TABLE autores (
    Autor_id INT unsigned NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR (150) NOT NULL,
    Nacionalidad VARCHAR (100) NOT NULL,
    Fecha_nacimiento DATE,
    PRIMARY KEY (Autor_id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE usuarios (
    Usuario_id INT unsigned NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR (150) NOT NULL,
    Direccion VARCHAR (200) NOT NULL,
    Telefono INT (10) NOT NULL,
    Correo_electronico VARCHAR (60),
    PRIMARY KEY (Usuario_id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE libros (
    ISBN INT unsigned NOT NULL AUTO_INCREMENT,
    Autor_id INT unsigned NOT NULL,
    Titulo VARCHAR (150) NOT NULL,
    Cantidad_disponible INT,
    Genero VARCHAR (50) NOT NULL,
    PRIMARY KEY (ISBN)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE prestamos (
    Prestamo_id INT unsigned NOT NULL AUTO_INCREMENT,
    Usuario_id INT unsigned NOT NULL,
    ISBN INT unsigned NOT NULL,
    Fecha_prestamo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Fecha_devolucion datetime,
    PRIMARY KEY (Prestamo_id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


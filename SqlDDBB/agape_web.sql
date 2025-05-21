-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 20-05-2025 a las 16:37:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bbdd_antares`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id_usuario` int(11) DEFAULT NULL,
  `permisos` text DEFAULT NULL,
  `estado_conexion` tinyint(1) DEFAULT 0,
  `ultima_conexion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id_usuario`, `permisos`, `estado_conexion`, `ultima_conexion`) VALUES
(43, 'none', 0, '2025-03-13 16:46:30'),
(44, 'none', 0, '2025-03-13 16:51:34'),
(45, 'none', 0, '2025-03-16 23:02:31'),
(46, 'none', 0, '2025-03-16 23:21:06'),
(47, 'none', 0, '2025-03-25 23:48:57'),
(48, 'none', 0, '2025-03-25 23:49:11'),
(49, 'none', 0, '2025-03-25 23:49:26'),
(50, 'none', 0, '2025-03-25 23:50:01'),
(59, 'none', 0, '2025-04-08 17:06:19'),
(62, 'none', 0, '2025-04-08 23:34:21'),
(65, 'none', 0, '2025-04-25 17:28:58'),
(69, 'none', 0, '2025-04-25 19:07:32'),
(70, 'none', 0, '2025-04-25 21:14:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(100) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `id_direccion` int(11) NOT NULL,
  `nombre_calle` varchar(100) NOT NULL,
  `altura_calle` int(11) NOT NULL,
  `numero_departamento` int(11) DEFAULT NULL,
  `numero_piso` int(11) DEFAULT NULL,
  `codigo_postal` varchar(100) DEFAULT NULL,
  `descripcion_direccion` varchar(255) DEFAULT NULL,
  `id_localidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades_medicas`
--

CREATE TABLE `especialidades_medicas` (
  `id_especialidad_medica` int(11) NOT NULL,
  `nombre_especialidad_med` varchar(200) NOT NULL,
  `descripcion_especialidad_med` text NOT NULL,
  `fecha_alta_especialidad_med` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imagen_especialidad_med` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades_medicas`
--

INSERT INTO `especialidades_medicas` (`id_especialidad_medica`, `nombre_especialidad_med`, `descripcion_especialidad_med`, `fecha_alta_especialidad_med`, `imagen_especialidad_med`) VALUES
(42, 'Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio', '2025-04-02 14:10:42', './uploads/Especialidades-Medicas.png'),
(43, 'Pediatría', 'Cuidado integral de la salud de los niños desde el nacimiento hasta la adolescencia, incluye la prevención, tratamiento de enfermedades y apoyo en su desarrollo físico y emocional', '2025-04-02 14:30:31', './uploads/Especialidades-Medicas (1).png'),
(44, 'Oftalmología', 'Diagnóstico tratamiento y prevención de enfermedades relacionadas con los ojos y la visión', '2025-04-02 14:49:11', './uploads/Especialidades-Medicas (2).png'),
(45, 'Odontología', 'Prevención diagnóstico y tratamiento de enfermedades y trastornos de los dientes, encías y boca', '2025-04-02 14:52:11', './uploads/Especialidades-Medicas (3).png'),
(46, 'Ginecología', 'Atención médica de la salud reproductiva y enfermedades del sistema reproductor femenino', '2025-04-02 14:55:15', './uploads/Especialidades-Medicas (4).png'),
(47, 'Imagenología', 'Uso de técnicas de imagen como ecografias para diagnosticar enfermedades', '2025-04-02 14:56:12', './uploads/imagenologia.png'),
(48, 'caracolas muackataaaaa', 'las caracolas se mueven mucho', '2025-04-30 16:39:16', './uploads/DiseÃ±o sin tÃ­tulo (3).png'),
(52, 'Laboratorio', 'Analizamos muestras biológicas como sangre y orina para diagnosticar y tratar enfermedades', '2025-04-08 17:16:58', './uploads/Especialidades-Medicas (6).png'),
(53, 'prueba', 'otra prueba', '2025-04-08 19:40:42', './uploads/Especialidades-Medicas (5).png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `nombre_estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `nombre_estado`) VALUES
(1, 'Barinas'),
(2, 'Mérida'),
(5, 'Amazonas'),
(6, 'Anzoátegui'),
(7, 'Apure'),
(8, 'Aragua'),
(9, 'Bolívar'),
(10, 'Carabobo'),
(11, 'Cojedes'),
(12, 'Delta Amacuro'),
(13, 'Distrito Capital'),
(14, 'Falcón'),
(15, 'Guárico'),
(16, 'Lara'),
(17, 'Miranda'),
(18, 'Monagas'),
(19, 'Nueva Esparta'),
(20, 'Portuguesa'),
(21, 'Sucre'),
(22, 'Táchira'),
(23, 'Trujillo'),
(24, 'Vargas'),
(25, 'Yaracuy'),
(26, 'Zulia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `form_contactos`
--

CREATE TABLE `form_contactos` (
  `id_contacto` int(11) NOT NULL,
  `nombre_cont` varchar(100) NOT NULL,
  `email_cont` varchar(100) NOT NULL,
  `telefono_cont` varchar(20) DEFAULT NULL,
  `mensaje_contacto` text DEFAULT NULL,
  `fecha_registro_contacto` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_genero` int(11) NOT NULL,
  `nombre_genero` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_genero`, `nombre_genero`) VALUES
(1, 'Femenino'),
(2, 'Masculino'),
(3, 'No Binario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_sanguineos`
--

CREATE TABLE `grupos_sanguineos` (
  `id_grupo_sanguineo` int(11) NOT NULL,
  `tipo_grupo_sanguineo` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitos_salud`
--

CREATE TABLE `habitos_salud` (
  `id_habito` int(11) NOT NULL,
  `fumador` tinyint(1) NOT NULL,
  `alcohol` tinyint(1) NOT NULL,
  `ejercicio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias_clinicas`
--

CREATE TABLE `historias_clinicas` (
  `id_historia_clinica` int(11) NOT NULL,
  `id_habito` int(11) DEFAULT NULL,
  `peso` double NOT NULL,
  `estatura` double NOT NULL,
  `id_grupo_sanguineo` int(11) DEFAULT NULL,
  `antecedentes_medicos` text DEFAULT NULL,
  `antecedentes_familiares` text DEFAULT NULL,
  `enfermedades_actuales` text DEFAULT NULL,
  `intervenciones_quirujicas` text DEFAULT NULL,
  `tratamientos_previos` text DEFAULT NULL,
  `medicacion_actual` text DEFAULT NULL,
  `fecha_actualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `id_localidad` int(11) NOT NULL,
  `nombre_localidad` varchar(100) NOT NULL,
  `id_ciudad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_usuario` int(11) NOT NULL,
  `codigo_medico` varchar(255) NOT NULL,
  `biografia_medico` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id_usuario`, `codigo_medico`, `biografia_medico`) VALUES
(51, 'none', 'none');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos_especialidades`
--

CREATE TABLE `medicos_especialidades` (
  `id_medico_especialidad` int(11) NOT NULL,
  `id_especialidad_medica` int(11) NOT NULL,
  `fecha_experiencia` date NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_usuario` int(11) DEFAULT NULL,
  `id_historia_clinica` int(11) DEFAULT NULL,
  `nombre_contacto_emerg` varchar(150) DEFAULT NULL,
  `telefono_contacto_emerg` varchar(20) DEFAULT NULL,
  `seguro_medico` text DEFAULT NULL,
  `domicilio_paciente` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `apellido_usuario` varchar(160) NOT NULL,
  `documento_id` int(11) NOT NULL,
  `numero_telefono` varchar(20) DEFAULT NULL,
  `id_direccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `id_registro` int(11) NOT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `password` varchar(150) NOT NULL,
  `auth` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registros`
--

INSERT INTO `registros` (`id_registro`, `correo_electronico`, `password`, `auth`) VALUES
(1, 'persona.ficticia@example.com', '783021', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion_rol` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion_rol`) VALUES
(1, 'paciente', 'los pacientes pueden registrarse en el sistema, dar de alta turnos y editar su perfil medico y sus datos personales '),
(2, 'medico', 'los medicos pueden registrarse en el sistema, dar consultas, obtener puntuaciones de los pacientes y editar sus datos personales.'),
(3, 'admin', 'los administradores se encargan de modificar informacion en la web, los servicios que se ofrecen, los metodos de pago, entre otras operaciones'),
(5, 'enfermeros', 'Los enfermeros combinan habilidades técnicas, conocimiento médico y empatía para mejorar la calidad de vida de sus pacientes, desempeñando un papel esencial en la atención sanitaria.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` text NOT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_alta_sistema` datetime NOT NULL DEFAULT current_timestamp(),
  `id_rol` int(11) DEFAULT NULL,
  `imagen_perfil_usuario` varchar(255) NOT NULL,
  `id_genero` int(11) NOT NULL,
  `es_borrado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `correo_electronico`, `password`, `fecha_nacimiento`, `fecha_alta_sistema`, `id_rol`, `imagen_perfil_usuario`, `id_genero`, `es_borrado`) VALUES
(43, 'prueba55', 'danielabh1997@gmail.com', '$2a$08$MKP85hQG9AC8l9/pDpXTlefIu9i92r7WdlgZtyy2RY6YBuGmT7YE2', '2025-03-06', '2025-03-13 13:46:29', 3, './uploads/icon-duda.png', 2, 0),
(44, 'Auyandome', 'auyandome1@gmail.com', '$2a$08$2qWwBgS7jv19PJaKy1xKvOcU33wHk5qyH8xgIfqlWAyryZNtmDmCW', '2025-03-03', '2025-03-13 13:51:34', 3, './uploads/edit (1).png', 1, 0),
(45, 'pampita', 'pampita@gmail.com', '$2a$08$bzIX1wnD2L4TBP/BObje.eZo1Q188XDsQ2DN3szFcexYuDnfNO5S6', '2025-03-12', '2025-03-16 20:02:30', 3, './uploads/DiseÃ±o sin tÃ­tulo (2).png', 2, 0),
(46, 'AnaMaria', 'maria@gmail.com', '$2a$08$j2BHnrzKXEfbqFu3XIscn.d1hyAQB8FPTnCwFRlTVecq2lJyUtBW6', '2025-03-03', '2025-03-16 20:21:06', 3, './uploads/Front Page Notion.png', 2, 0),
(47, 'auuu', 'auu@gmail.com', '$2a$08$lXXKBAL2SqhZUG8F3QLcdu5I4I2LqSJNcp3qPYacmolrnBPClRY1a', '2025-03-03', '2025-03-25 20:48:57', 3, './uploads/Front Page Notion (1).png', 1, 0),
(48, 'auuu', 'auu@gmail.com', '$2a$08$zdXjYLNI0mS8WUutXvG1i.fMgH7wJdVhbw6iJyK9UiaO5Np3BbNle', '2025-03-03', '2025-03-25 20:49:11', 3, './uploads/Front Page Notion (1).png', 1, 0),
(49, 'auuu', 'auu@gmail.com', '$2a$08$LmmUIG3tphN79O9L09PX/edwbZXwcyDIOx/k1kzRu390GhVX514Da', '2025-03-03', '2025-03-25 20:49:26', 3, './uploads/Front Page Notion (1).png', 1, 0),
(50, 'auuu1', 'auu1@gmail.com', '$2a$08$ZZ0QiTYLWPLozFdBk5MCTeZL2UBW0j0Z35n6FZ/ReYc3mxaXUPa/O', '2025-03-03', '2025-03-25 20:50:01', 3, './uploads/Front Page Notion (1).png', 1, 0),
(51, 'danita', 'danita@gmail.com', '$2a$08$C6HuUKJF92Ybr51DoZuhauEJezJmxuhUnlsxUgp/ZzxQ0u1oMSfTi', '2025-04-01', '2025-04-03 23:56:25', 2, './uploads/gastro.png', 2, 0),
(59, 'Miguel', 'miguelEdu@gmail.com', '$2a$08$76JUccWxVEF3ZVo5XhT37.uFlK/3jg9ZU8zihg7rX.MTOyEozRyjO', '2025-03-31', '2025-04-08 13:06:19', 3, './uploads/Banner Para Linkedin Recursos Humanos FotogrÃ¡fico Gris Claro (1).png', 1, 0),
(62, 'prueba1111', 'prueba111@gmail.com', '$2a$08$7zsQLaYmsWsBgO/KfXdsRu4NBhE3LPr.O9kh0hQSvRHqbYPgs/bRW', '2025-04-01', '2025-04-08 19:34:21', 3, './uploads/Especialidades-Medicas (6).png', 1, 0),
(65, 'dalilagebelluis', 'dalila@gmail.com', '$2a$08$OTkqqlvDYLpC1PJOiodTLuoP/0MVkxcvM7s3xOtMdJCuiFmCMkjvq', '0000-00-00', '2025-04-25 13:28:58', 3, './uploads/DiseÃ±o sin tÃ­tulo (5).png', 2, 0),
(69, 'luisgerardo', 'luis@gmail.com', '$2a$08$uOOqi1LqhoReB/vWbL.CWe1/3N/1.KLe6eqW3aBjBPVSn3HzfX3RK', '2025-04-09', '2025-04-25 15:07:31', 3, './uploads/DiseÃ±o sin tÃ­tulo (5).png', 3, 0),
(70, 'paulitoLindo', 'paulito1@gmail.com', '$2a$08$vnjz3Ka3thIKrqR6shVnEuZJymung9PZjpiNMNDK5SzBknchDdW4K', '0000-00-00', '2025-04-25 17:14:32', 3, './uploads/DiseÃ±o sin tÃ­tulo (5).png', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`id_direccion`),
  ADD KEY `id_localidad` (`id_localidad`);

--
-- Indices de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  ADD PRIMARY KEY (`id_especialidad_medica`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `form_contactos`
--
ALTER TABLE `form_contactos`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `grupos_sanguineos`
--
ALTER TABLE `grupos_sanguineos`
  ADD PRIMARY KEY (`id_grupo_sanguineo`);

--
-- Indices de la tabla `habitos_salud`
--
ALTER TABLE `habitos_salud`
  ADD PRIMARY KEY (`id_habito`);

--
-- Indices de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD PRIMARY KEY (`id_historia_clinica`),
  ADD KEY `id_habito` (`id_habito`),
  ADD KEY `id_grupo_sanguineo` (`id_grupo_sanguineo`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`id_localidad`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD PRIMARY KEY (`id_medico_especialidad`),
  ADD KEY `id_especialidad_medica` (`id_especialidad_medica`),
  ADD KEY `medicos_especialidades_ibfk_1` (`id_usuario`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_historia_clinica` (`id_historia_clinica`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_direccion` (`id_direccion`);

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id_registro`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `fk_genero` (`id_genero`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  MODIFY `id_especialidad_medica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `form_contactos`
--
ALTER TABLE `form_contactos`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupos_sanguineos`
--
ALTER TABLE `grupos_sanguineos`
  MODIFY `id_grupo_sanguineo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habitos_salud`
--
ALTER TABLE `habitos_salud`
  MODIFY `id_habito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  MODIFY `id_historia_clinica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `id_localidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  MODIFY `id_medico_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`);

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id_localidad`);

--
-- Filtros para la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD CONSTRAINT `historias_clinicas_ibfk_1` FOREIGN KEY (`id_habito`) REFERENCES `habitos_salud` (`id_habito`),
  ADD CONSTRAINT `historias_clinicas_ibfk_2` FOREIGN KEY (`id_grupo_sanguineo`) REFERENCES `grupos_sanguineos` (`id_grupo_sanguineo`);

--
-- Filtros para la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD CONSTRAINT `localidades_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD CONSTRAINT `medicos_especialidades_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `medicos` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `medicos_especialidades_ibfk_2` FOREIGN KEY (`id_especialidad_medica`) REFERENCES `especialidades_medicas` (`id_especialidad_medica`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`id_historia_clinica`) REFERENCES `historias_clinicas` (`id_historia_clinica`);

--
-- Filtros para la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD CONSTRAINT `perfiles_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `perfiles_ibfk_2` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones` (`id_direccion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

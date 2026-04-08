-- Base de datos Postgres para ERP Aleek
-- Ejecutar en Postgres: psql -d <tu_bd> -f database/schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_completo varchar(255) NOT NULL,
  direccion text,
  telefono varchar(20),
  fecha_inicio date,
  last_login timestamptz,
  username varchar(50) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password text NOT NULL,
  permisos_globales uuid[],
  creado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS grupos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre varchar(255) NOT NULL UNIQUE,
  descripcion text,
  creador_id uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  creado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS grupo_miembros (
  grupo_id uuid REFERENCES grupos(id) ON DELETE CASCADE,
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_unido timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(grupo_id, usuario_id)
);

CREATE TABLE IF NOT EXISTS permisos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre varchar(100) NOT NULL UNIQUE,
  descripcion text,
  creado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS grupo_usuario_permisos (
  grupo_id uuid REFERENCES grupos(id) ON DELETE CASCADE,
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  permiso_id uuid REFERENCES permisos(id) ON DELETE CASCADE,
  PRIMARY KEY(grupo_id, usuario_id, permiso_id)
);

CREATE TABLE IF NOT EXISTS estados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre varchar(50) NOT NULL UNIQUE,
  color varchar(7)
);

CREATE TABLE IF NOT EXISTS prioridades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre varchar(50) NOT NULL UNIQUE,
  orden int
);

CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grupo_id uuid REFERENCES grupos(id) ON DELETE SET NULL,
  titulo varchar(500) NOT NULL,
  descripcion text,
  autor_id uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  asignado_id uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  estado_id uuid REFERENCES estados(id),
  prioridad_id uuid REFERENCES prioridades(id),
  creado_en timestamptz NOT NULL DEFAULT now(),
  fecha_final timestamptz
);

CREATE TABLE IF NOT EXISTS comentarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets(id) ON DELETE CASCADE,
  autor_id uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  contenido text NOT NULL,
  creado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS historial_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets(id) ON DELETE CASCADE,
  usuario_id uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  accion varchar(100) NOT NULL,
  detalles jsonb,
  creado_en timestamptz NOT NULL DEFAULT now()
);

-- Indexes básicos
CREATE INDEX IF NOT EXISTS idx_tickets_grupo_id ON tickets(grupo_id);
CREATE INDEX IF NOT EXISTS idx_tickets_autor_id ON tickets(autor_id);
CREATE INDEX IF NOT EXISTS idx_tickets_asignado_id ON tickets(asignado_id);
CREATE INDEX IF NOT EXISTS idx_tickets_estado_id ON tickets(estado_id);
CREATE INDEX IF NOT EXISTS idx_tickets_prioridad_id ON tickets(prioridad_id);

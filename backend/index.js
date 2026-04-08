// backend/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// health endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// users list
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, nombre_completo, username, email, creado_en FROM usuarios ORDER BY creado_en DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// register
app.post('/api/register', async (req, res) => {
  const { nombre_completo, username, email, password } = req.body;
  if (!nombre_completo || !username || !email || !password) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      'INSERT INTO usuarios (nombre_completo, username, email, password) VALUES ($1,$2,$3,$4) RETURNING id, nombre_completo, username, email, creado_en',
      [nombre_completo, username, email, hashed]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Usuario o correo ya existe' });
    }
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Credenciales requeridas' });

  try {
    const { rows } = await db.query('SELECT id, username, password FROM usuarios WHERE username = $1', [username]);
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secreto', { expiresIn: '8h' });
    await db.query('UPDATE usuarios SET last_login = now() WHERE id = $1', [user.id]);

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
});

// tickets sample
app.get('/api/tickets', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tickets ORDER BY creado_en DESC LIMIT 100');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tickets' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listo en http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'tu_secreto_jwt_aqui'; // Cambiar por variable de entorno en producción

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi-lista-tareas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Middleware para verificar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rutas de autenticación
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

    const user = new User({ username, passwordHash: password });
    await user.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Rutas para tareas (protegidas)
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { text, date, status } = req.body;
  if (!text || !date) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const task = new Task({ userId: req.user.id, text, date, status: status || 'programada' });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { text, date, status } = req.body;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (text) task.text = text;
    if (date) task.date = date;
    if (status) task.status = status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
});

app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API de Mi Lista de Tareas funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

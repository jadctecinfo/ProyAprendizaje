const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'mi_secreto_jwt'; // Cambiar por un secreto seguro en producción

// Middleware
app.use(cors({
    origin: 'http://localhost:5500', // Cambiar si el frontend corre en otro puerto
}));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi-lista-tareas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
});

// Esquemas y modelos
const usuarioSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
});

const tareaSchema = new mongoose.Schema({
    text: String,
    date: Date,
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Tarea = mongoose.model('Tarea', tareaSchema);

// Registro de usuario
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

    try {
        const existingUser = await Usuario.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new Usuario({ username, passwordHash });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Login de usuario
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

    try {
        const user = await Usuario.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Middleware para verificar token
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No autorizado' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No autorizado' });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}

// Obtener tareas del usuario
app.get('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const tasks = await Tarea.find({ userId: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
});

// Crear tarea
app.post('/api/tasks', authMiddleware, async (req, res) => {
    const { text, date, status } = req.body;
    if (!text || !date || !status) return res.status(400).json({ message: 'Faltan datos' });

    try {
        const newTask = new Tarea({ text, date, status, userId: req.userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tarea' });
    }
});

// Actualizar tarea
app.put('/api/tasks/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Faltan datos' });

    try {
        const task = await Tarea.findOneAndUpdate({ _id: id, userId: req.userId }, { status }, { new: true });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tarea' });
    }
});

// Eliminar tarea
app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Tarea.findOneAndDelete({ _id: id, userId: req.userId });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tarea' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

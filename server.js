const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

let todos = [
    { id: 1, tarea: 'Baño' },
    { id: 2, tarea: 'Comer' },
    { id: 3, tarea: 'Correr' },
    { id: 4, tarea: 'Comprar' },
    { id: 5, tarea: 'Jugar' },
];

// Obtener todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET: Obtener por ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = todos.find(e => e.id === id);

    if (tarea) {
        res.json(tarea);
    } else {
        res.status(404).send('Tarea no localizada');
    }
});

// POST: Crear una nueva tarea
app.post('/todos', (req, res) => {
    const nuevaTarea = {
        id: todos.length + 1,
        tarea: req.body.tarea
    };
    todos.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// PUT: Actualizar una tarea existente por ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = todos.find(t => t.id === id);

    if (tarea) {
        tarea.tarea = req.body.tarea;
        res.json(tarea);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// DELETE: Eliminar una tarea por ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send("Tarea eliminada");
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Inicializacion del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutando en http://localhost:${PORT}`);
});

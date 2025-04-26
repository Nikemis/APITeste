require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const tarefaModel = require('./models/tarefa');
const app = express();

app.use(express.json());

await mongoose.connect(process.env.MONGO_URL);

app.get('/', function (req, res) {
    res.status(200).send('<h1>Ola Mundo</h1>');
});

app.get('/api/getAll', async (req, res) => {
    try {
        const resultados = await tarefaModel.find();
        res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
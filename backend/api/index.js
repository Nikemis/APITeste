import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import tarefaModel from './models/tarefas.js'
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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

export default app
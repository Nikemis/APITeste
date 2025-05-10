import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import tarefaModel from './models/tarefas.js'

const app = express();

app.use(cors({
    origin: 'https://neon-tiramisu-01b2b8.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
    credentials: true
}))

app.use(express.json());

await mongoose.connect(process.env.MONGO_URL);

app.get('/', function (req, res) {
    res.status(200).send('<h1>Ola Mundo</h1>');
});

app.post('/api/post', async (req, res) => {
    const objetoTarefa = new tarefaModel({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    })
    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.get('/api/getAll', async (req, res) => {
    try {
        const resultados = await tarefaModel.find();
        res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/api/delete/:id', async (req, res) => {
    try {
        const resultado = await tarefaModel.findByIdAndDelete(req.params.id)
        res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/api/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novaTarefa = req.body;
        const options = { new: true };
        const result = await tarefaModel.findByIdAndUpdate(
            id, novaTarefa, options
        )
        res.json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app
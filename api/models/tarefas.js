import mongoose from 'mongoose'

const tarefaSchema = new mongoose.Schema({
    descricao: {
        required: true,
        type: String
    },
    statusRealizada: {
        required: true,
        type: Boolean
    },
},
    {
        versionKey: false
    }
)

export default mongoose.model('Tarefa', tarefaSchema)
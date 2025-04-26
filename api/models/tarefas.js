const mongoose = require('mongoose');

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

module.exports = mongoose.model('Tarefa', tarefaSchema)

import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, unique: true},
    dataCriacao: {type: Date, default: Date.now}
})

const usuario = mongoose.model('usuarios', usuarioSchema);

export default usuario;
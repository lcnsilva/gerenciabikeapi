import mongoose from "mongoose";

const bicicletaSchema = new mongoose.Schema({
    tagRfid: {type: String, required: true, unique: true},
    nome: {type: String, default: tagRfid},
    marca: String,
    disponivel: {type: Boolean, required: true, default: false},
    manutencao: {type: Boolean, required: true, default: false},
    caminhoImagem: String
});

const bicicleta = mongoose.model('Bicicleta', bicicletaSchema);

export default bicicleta
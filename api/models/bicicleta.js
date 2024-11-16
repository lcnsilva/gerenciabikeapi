import mongoose from "mongoose";

const bicicletaSchema = new mongoose.Schema({
    tagRfid: {type: String, required: true, unique: true},
    nome: {type: String, default:(() => {this.tagRfid})},
    disponivel: {type: Boolean, required: true, default: false},
    manutencao: {type: Boolean, required: true, default: false},
    caminhoImagem: {type: String}
});

const bicicletas = mongoose.model('bicicletas', bicicletaSchema);

export default bicicletas;
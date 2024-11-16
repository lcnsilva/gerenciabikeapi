import Bicicletas from "../models/bicicleta.js";

class BicicletaController {
    static listarBicicletas = async(req,res) => {
        try{
            const bicicletas = await Bicicletas.find({})
            res.status(200).json(bicicletas);
        }catch(error){
            res.status(500).json({msg: "Erro ao procurar bicicletas."})
        }
    }

    static listarBicicletasPorId = async(req,res) => {
        try{
            const { id } = req.params;
            console.log(id)
            const bicicleta = await Bicicletas.findById(id);
            res.status(200).json(bicicleta);
        }catch(error){
            console.log(error);
            res.status(500).json({msg: "Bicicleta não encontrada."})
        }
    }

    static criarBicicleta = async(req,res) => {
        try{
            const { tagRfid, nome, disponivel, manutencao, caminhoImagem } = req.body
            if(!nome){
                nome = tagRfid;
            }
            const bicicleta = await Bicicletas.create({
                tagRfid: tagRfid,
                nome: nome,
                disponivel: disponivel,
                manutencao: manutencao,
                caminhoImagem: caminhoImagem
            });
            res.status(201).send(bicicleta.toJSON());
        }catch(error){
            console.log(error)
            res.status(500).send({message: `Falha ao cadastrar bicicleta`});
        }
    }

    static atualizarBicicleta = async(req,res) => {
        try{
            const { id } = req.params;
            console.log(id)
            const { tagRfid, nome, disponivel, manutencao, caminhoImagem } = req.body
            const bicicleta = await Bicicletas.findByIdAndUpdate(id, {$set: {
                tagRfid: tagRfid,
                nome: nome,
                disponivel: disponivel,
                manutencao: manutencao,
                caminhoImagem: caminhoImagem
            }},
            { new: true});
            res.status(200).send(bicicleta.toJSON());
        }catch(error){
            console.log(error);
            res.status(500).send({message: `Falha ao cadastrar bicicleta`});
        }
    }

    static excluirBicicleta = async(req,res) => {
        try {
            const { id } = req.params;
            const bicicleta = await Bicicletas.findByIdAndDelete(id);
            res.status(200).json({message: "Bicicleta excluída com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Falha ao excluir a bicicleta."});
        }
    }

    static disponibilidadeBicicleta = async(req,res) => {
        try{
            
        }catch(error){
            
        }
    }

    static manutencaoBicicleta = async(req,res) => {
        try{

        }catch(error){
            
        }
    }
}

export default BicicletaController;
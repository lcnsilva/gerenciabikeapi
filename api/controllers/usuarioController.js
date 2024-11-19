import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import usuario from "../models/Usuario.js";


class UsuarioController {

    static criarUsuario = async (req,res) => {
        const { nome, email, password, confirmacaoPassword } = req.body;
        var emailLowerCase = email.toLowerCase();
        if(!nome){
            res.status(422).json({msg: "O nome é obrigatório"});
            return;
        }
        if(!emailLowerCase){
            res.status(422).json({msg: "O email é obrigatório"});
            return;
        }
        if(!password){
            res.status(422).json({msg: "A senha é obrigatória"});
            return;
        }
        if(!confirmacaoPassword){
            res.status(422).json({msg: "A confirmação de senha é obrigatória"});
            return;
        }
        if(password !== confirmacaoPassword){
            res.status(422).json({msg: "As senhas não são iguais"});
            return;
        }

        const verificarUsuarioExiste = await Usuario.findOne({email : emailLowerCase});
        if(verificarUsuarioExiste) {
            res.status(422).json({msg: "O email utilizado já existe"});
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const usuario = new Usuario({
            nome,
            email : emailLowerCase,
            password : passwordHash
        })

        try{
            await usuario.save();
            res.status(200).json({msg: 'Usuário criado com sucesso'})
        }catch(error){
            console.log(error);
            res.status(500).json({msg: 'Tente novamente mais tarde.'});
        }
    
    }

    static listarUsuarioPorId = async (req,res) => {
        const id = req.params.id;
        try {
            const usuarioResultado = await usuario.findById(id, "-password");  
            if(!usuarioResultado){
                return res.status(404).json({message: "Usuário não encontrado"})
            }
            res.status(200).send(usuarioResultado);
          } catch (erro) {
            res.status(400).send({message: "Erro ao procurar o usuário."});
          }
    }

    static atualizarUsuario = async (req,res) => {
        const id = req.params.id;
        const {nome, email, password, confirmacaoPassword} = req.body
        var emailLowerCase = email.toLowerCase();
        if(!nome){
            res.status(422).json({msg: "O nome é obrigatório"});
            return;
        }
        if(!emailLowerCase){
            res.status(422).json({msg: "O email é obrigatório"});
            return;
        }
        if(!password){
            res.status(422).json({msg: "A senha é obrigatória"});
            return;
        }
        if(!confirmacaoPassword){
            res.status(422).json({msg: "A confirmação de senha é obrigatória"});
            return;
        }
        if(password !== confirmacaoPassword){
            res.status(422).json({msg: "As senhas não são iguais"});
            return;
        }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        try{
            await usuario.findByIdAndUpdate(id, {$set: {nome, email, password : passwordHash}});
            res.status(200).json({message: "Usuário atualizado com sucesso"});
        }catch(erro){
            console.log(erro);
            res.status(400).json({message: "Erro ao atualizar o usuário."});
        }
    }

    static usuarioLogin = async (req,res) => {
        const { email, password} = req.body

        if(!email){
            res.status(422).json({msg: "O email é obrigatório"});
            return;
        }
        if(!password){
            res.status(422).json({msg: "A senha é obrigatória"});
            return;
        }

        const usuario = await Usuario.findOne({email : email});
        if(!usuario) {
            res.status(422).json({msg: "O email não foi encontrado"});
            return;
        }

        const checarPassword = await bcrypt.compare(password, usuario.password);
        if(!checarPassword){
            return res.status(422).json({msg: "Senha inválida!"});
        }
        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: usuario._id
            }, secret,
            )
            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Tente novamente mais tarde.' });
        }
    }

    static checkToken(req,res,next) {
        const authHeader = req.headers["authorization"]
        console.log(authHeader);
        // const token = authHeader && authHeader.split(" ")[1] //só usaria desse jeito caso viesse Bearer + token
        const token = authHeader;
        console.log(token);
        if(!token){
            return res.status(401).json({msg: "Acesso negado."})
        }    
        try{
            const secret = process.env.SECRET;
            jwt.verify(token, secret);    
            next();

        }catch(error){
            res.status(400).json({msg:"Token Inválido"});
        }
    }
}

export default UsuarioController;
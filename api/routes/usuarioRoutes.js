import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const routes = express.Router();

routes.post('/usuario', UsuarioController.criarUsuario);
routes.get('/usuario/:id', UsuarioController.checkToken, UsuarioController.listarUsuarioPorId);
routes.put('/usuario/:id', UsuarioController.checkToken, UsuarioController.atualizarUsuario);
routes.post('/usuario/login', UsuarioController.usuarioLogin)


export default routes;
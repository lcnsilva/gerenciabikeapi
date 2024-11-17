import express from 'express';
import BicicletaController from '../controllers/bicicletaController.js';

const routes = express.Router();

routes.get('/bicicletas', BicicletaController.listarBicicletas);
routes.get('/bicicletas/:id', BicicletaController.listarBicicletasPorId);
routes.post('/bicicletas', BicicletaController.criarBicicleta);
routes.put('/bicicletas/:id', BicicletaController.atualizarBicicleta);
routes.delete('/bicicletas', BicicletaController.excluirBicicleta);

export default routes;
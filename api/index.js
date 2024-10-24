import express from 'express'
import { config } from '@dotenvx/dotenvx';
import MqttController from './mqtt/mqtt.js';
import conexaoDb from './config/conexaoDb.js';
import usuarioRoutes from './routes/usuarioRoutes.js'


config();
const app = express();
const PORT = 3000;
const topic = process.env.MQTT_TOPIC;
const mensagens = MqttController.receberMensagem(topic);
MqttController.conectarTopico(topic);
MqttController.enviarMensagem(topic);
var db = await conexaoDb();

db.once("connected", () => {
    console.log("Conectado ao banco de dados.")
})

app.use(express.json());
app.use(usuarioRoutes);

app.get('/', (req,res) => {
    res.json(mensagens);
})

app.get('/reset', (req,res) => {
    mensagens = [];
    res.status(200).send("Vetor reiniciado");
})

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});

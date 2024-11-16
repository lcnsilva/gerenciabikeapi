import express from 'express'
import { config } from '@dotenvx/dotenvx';
import MqttController from './mqtt/mqtt.js';
import conexaoDb from './config/conexaoDb.js';
import usuarioRoutes from './routes/usuarioRoutes.js'
import bicicletaRoutes from './routes/bicicletaRoutes.js'
import cors from 'cors';

config();
const app = express();
const PORT = 3000;
const topic = process.env.MQTT_TOPIC;
MqttController.receberMensagem(topic);
MqttController.conectarTopico(topic);
var db = await conexaoDb();

db.once("connected", () => {
    console.log("Conectado ao banco de dados.")
})

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(usuarioRoutes);
app.use(bicicletaRoutes);


app.get('/', MqttController.listarLogs);


app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});

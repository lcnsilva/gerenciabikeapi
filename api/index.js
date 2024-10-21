import express from 'express'
import client from './mqtt.js'

const app = express();
const PORT = 3000;
var vetor = [];


const topic = 'gerenciabike/test'

client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    vetor.push({msg: payload.toString()});
})

client.on('connect', () => {
    client.publish(topic, 'nodejs1 mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})

app.use(express.json());

app.get('/', (req,res) => {
    res.json(vetor);
})

app.get('/reset', (req,res) => {
    vetor = [];
    res.status(200).send("Vetor reiniciado");
})

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});

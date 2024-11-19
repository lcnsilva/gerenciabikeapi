import client from './client.js'
import Bicicletas from '../models/bicicleta.js';
import Log from '../models/Log.js';
import BicicletaController from '../controllers/bicicletaController.js';

class MqttController {

    static conectarTopico = (topic) => {
        try{
            client.on('connect', () => {
                console.log('Client MQTT Connected')
                client.subscribe([topic], () => {
                    console.log(`Subscribe to topic '${topic}'`)
                })
            })
        }catch(error){
            console.log(error);
        }
    }

    static receberMensagem = (topic) => {
        try{
            client.on('message', async (receivedTopic, payload) => {
                if(receivedTopic === topic) {
                    let tag = payload.toString();
                    const bicicleta = await Bicicletas.findOne({
                        tagRfid: tag
                    })
                    if(bicicleta){
                        const log = await Log.create({
                            bicicleta: bicicleta._id,
                        });
                        const newBicicleta = await BicicletaController.disponibilidadeBicicleta(bicicleta);
                        console.log(newBicicleta)           
                    }
                    console.log('Received Message:', topic, payload.toString())
                }                
            })
        }catch(error) {
            console.log(error);
        }
    }
    
    static listarLogs =  async (req,res) => {
        try{
            const logs = await Log.find({}).populate('bicicleta');
            res.status(200).json(logs);
        }catch(error){
            console.log(error);
            res.status(500).json({msg: "Erro ao pesquisar Logs."})
        }
    }

    static enviarMensagem = (topic) => {
        try{
            client.on('connect', () => {
                client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
                    if (error) {
                        console.error(error)
                    }
                })
            })
        }catch(error){
            console.log(error);
        }
    }
}

export default MqttController;





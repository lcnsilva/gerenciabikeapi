import client from './client.js'

class MqttController {

    static mensagens = [];

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
            client.on('message', (receivedTopic, payload) => {
                if(receivedTopic === topic) {
                    console.log('Received Message:', topic, payload.toString())
                    this.mensagens.push({
                        msg: payload.toString(),
                        horario: new Date().toLocaleString()
                    })
                }                
            })
            return this.mensagens;
        }catch(error) {
            console.log(error);
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





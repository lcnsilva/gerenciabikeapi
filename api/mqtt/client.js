import mqtt from "mqtt"; 

const host = 'test.mosquitto.org'
const port = '1883'
const clientId = `gerenciabike_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
})

export default client;

import mongoose from "mongoose";

async function conexaoDb() {
    try{
        mongoose.connect(process.env.MONGO_DB_URI);
        return mongoose.connection;
    } catch(error){
        console.log('Erro ao se conectar ao MongoDB:', error)
    }
}

export default conexaoDb;
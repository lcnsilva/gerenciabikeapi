import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bicicletas',
        required: true
    },
    data: {type: Date, default: Date.now}
})

const Log = mongoose.model('Log', logSchema);

export default Log;
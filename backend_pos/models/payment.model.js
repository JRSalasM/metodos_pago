const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    id : {
        type: String,
    },
    username: {
        type: String
    },
    email : {
        type: String
    },
    amount : {
        type: String
    },
    data_payment : {
        type: String
    }
});
module.exports = mongoose.model('payments', paymentSchema);
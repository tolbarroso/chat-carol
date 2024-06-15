const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    cpf: String,
    email: String,
    sexo: String
});

module.exports = mongoose.model('User', UserSchema);

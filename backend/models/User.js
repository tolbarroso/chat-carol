const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    cpf: String,
    email: String,
    gender: String,
});

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat-carol', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;

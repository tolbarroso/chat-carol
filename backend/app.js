const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const userRoutes = require('./routes/userRoutes');
const externalApiService = require('./services/externalApiService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', userRoutes);
app.use(express.static('frontend/public'));

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('setUsername', (username) => {
        console.log('Username set:', username);  
        socket.username = username;
        io.emit('userJoined', username);
    });

    socket.on('chatMessage', (msg) => {
        console.log('Chat message received:', msg);  
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectou');
    });
});


app.get('/api/cat', async (req, res) => {
    try {
        const imageUrl = await externalApiService.getCatImage();
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cat image' });
    }
});

mongoose.connect('mongodb://localhost/chat-carol', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const externalApiService = require('./services/externalApiService');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint para buscar imagem de gato
app.get('/api/cat', async (req, res) => {
    try {
        const catImageUrl = await externalApiService.getCatImage();
        res.json({ url: catImageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagem de gato' });
    }
});

// Endpoint para buscar endereço pelo CEP
app.get('/api/address/:cep', async (req, res) => {
    try {
        const address = await externalApiService.getAddressByCep(req.params.cep);
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereço' });
    }
});

// Conexão com o banco de dados
connectDB();

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

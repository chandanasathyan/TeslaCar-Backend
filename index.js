require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const CarRoute = require("./Routes/CarRoute");
const handleWebSocket = require('./wsHandler');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize WebSocket handling
handleWebSocket(wss);

mongoose.connect('mongodb+srv://Chandana24:Chandana25@cluster0.rvs5wlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/', CarRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

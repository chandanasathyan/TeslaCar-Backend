const ChatMessage = require('./Model/ChatModel');

const handleWebSocket = (wss) => {
    wss.on('connection', (ws) => {
        console.log('New client connected');

        const sessionId = Math.random().toString(36).substring(2, 15);
        ws.sessionId = sessionId;

        ws.send(JSON.stringify({
            text: "Welcome! You are connected to the chat server.",
            sender: 'system',
            timestamp: new Date(),
            sessionId: sessionId,
        }));

        ws.on('message', async (data) => {
            try {
                const message = JSON.parse(data);
                console.log('Received message from client:', message);

                if (!message.text || !message.sender) {
                    ws.send(JSON.stringify({
                        text: "Invalid message format",
                        sender: 'system',
                        timestamp: new Date(),
                    }));
                    return;
                }

                const chatMessage = new ChatMessage({
                    sessionId: sessionId,
                    text: message.text,
                    sender: message.sender,
                    timestamp: new Date(),
                });
                await chatMessage.save();

                ws.send(JSON.stringify({
                    text: "Message received successfully!",
                    sender: 'system',
                    timestamp: new Date(),
                    sessionId: sessionId,
                }));

                if (message.sender === 'user') {
                    setTimeout(() => {
                        const serviceResponse = {
                            text: generateBotResponse(message.text),
                            sender: 'support',
                            timestamp: new Date(),
                            sessionId: sessionId,
                        };
                        ws.send(JSON.stringify(serviceResponse));
                    }, 1000);
                }
            } catch (error) {
                console.error('Error processing message:', error);
                ws.send(JSON.stringify({
                    text: "An error occurred while processing your message.",
                    sender: 'system',
                    timestamp: new Date(),
                }));
            }
        });

        ws.on('close', () => {
            console.log(`Client with session ID ${sessionId} disconnected`);
        });

        ws.on('error', (error) => {
            console.error(`WebSocket error for session ID ${sessionId}:`, error);
        });
    });
};

const generateBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes('hi')) {
        return "Hello! How can I assist you today?";
    }
    if (userMessage.toLowerCase().includes('help')) {
        return "Sure! What do you need help with?";
    }
    return "Thank you for your message. Our team will assist you shortly.";
};

module.exports = handleWebSocket;


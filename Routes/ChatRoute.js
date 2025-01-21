const express = require('express');
const router = express.Router();
const ChatMessage = require('../Model/ChatModel');
const handleWebSocket = require('../websocket/handleWebSocket');

router.get('/admin/messages', async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/messages/:sessionId', async (req, res) => {
    try {
        const messages = await ChatMessage.find({
            sessionId: req.params.sessionId
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/chat', (req, res) => {
    res.render('chat');
});

router.get('/admin/chat', (req, res) => {
    res.render('admin-chat');
});

module.exports = router;
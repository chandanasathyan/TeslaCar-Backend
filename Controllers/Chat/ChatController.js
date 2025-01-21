const Message = require('../../Model/ChatModel');

const chatController = {
    saveMessage: async (messageData) => {
        try {
            const message = new Message(messageData);
            await message.save();
            return message;
        } catch (error) {
            console.error('Error saving message:', error);
            throw error;
        }
    },

    getMessagesBySession: async (sessionId) => {
        try {
            return await Message.find({ sessionId }).sort({ timestamp: 1 });
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }
};

module.exports = chatController;
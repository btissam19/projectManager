const { Message } = require("../database/mongo");

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).lean();
        console.log(messages)
    } catch (e) {
        res.json({ msg: e });
    }
}
const createMessage = async (req, res) => {
    try {
        const { message} = req.body;
        const newMessage = new Message({ 
            message
        });
        await newMessage.save();
        res.json({ message:newMessage });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}
module.exports = {
    createMessage,
    getAllMessages 

};
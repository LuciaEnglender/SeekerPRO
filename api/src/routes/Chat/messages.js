const routerChat = require("express").Router();
const Message = require("../../models/Message");

//add

routerChat.post("/", async (req, res) => {
	const { message, conversationId, sender, text } = req.body;
	try {
		const savedMessage = await Message.create({
			message,
			conversationId,
			sender,
			text,
		});
		res.status(200).json(savedMessage);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get

routerChat.get("/:conversationId", async (req, res) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(messages);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = routerChat;

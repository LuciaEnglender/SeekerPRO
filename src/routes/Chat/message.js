const routerChat = require("express").Router();
const {Message} = require("../../db");
const {Conversation, Postulant, Business} = require('../../db');
//add

routerChat.post("/postulant", async (req, res) => {
	const {  conversationId, idPostulant, text} = req.body;
	try {
		const conversation = await Conversation.findByPk(conversationId);
		const postulante = await Postulant.findByPk(idPostulant)
        console.log(conversation, postulante)
		const savedMessage = await Message.create({
			sender : postulante.id,
			text,
		});

		await savedMessage.addConversation(conversation)
		await savedMessage.addPostulant(postulante)
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
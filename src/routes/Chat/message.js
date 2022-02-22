const routerChat = require("express").Router();
const { Message } = require("../../db");
const { Conversation, Postulant, Business } = require("../../db");


//add

routerChat.post("/postulant", async (req, res) => {
	const { conversationId, postulantId, text } = req.body;
	try {
		const conversation = await Conversation.findByPk(conversationId);
		const postulante = await Postulant.findByPk(postulantId);

		const savedMessage = await Message.create({
			sender: postulante.id,
			text,
		});

		await savedMessage.addConversation(conversation);
		await savedMessage.setPostulant(postulante);
		res.status(200).json(savedMessage);
	} catch (err) {
		console.log(err);
	}
});

routerChat.post("/business", async (req, res) => {
	const { conversationId, businessId, text } = req.body;
	try {
		const conversation = await Conversation.findByPk(conversationId);
		const business = await Business.findByPk(businessId);

		const savedMessage = await Message.create({
			sender: business.id,
			text,
		});

		await savedMessage.addConversation(conversation);
		await savedMessage.setBusiness(business);
		res.status(200).json(savedMessage);
	} catch (err) {
		console.log(err);
	}
});

//get

routerChat.get("/:conversationId", async (req, res) => {
	try {
		const conversation = await Conversation.findAll({
			where: {
				id: req.params.conversationId,
			},
			include: [{ model: Message }],
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = routerChat;
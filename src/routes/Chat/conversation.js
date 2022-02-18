const routerConversation = require("express").Router();
const { Conversation, Postulant, Business } = require("../../db");
const { Op } = require("sequelize");

//new conversation (or "ROOM")

routerConversation.post("/", async (req, res) => {
	const { businessId, postulantId } = req.body;

	try {
		const business = await Business.findByPk(businessId);
		const postulant = await Postulant.findByPk(postulantId);

		const savedConversation = await Conversation.findOrCreate({
			members: [businessId, postulantId],
		});

		await business.addConversation(savedConversation);
		await postulant.addConversation(savedConversation);
		res.status(200).json(savedConversation);
	} catch (err) {
		console.log(err);
	}
});

//get conversation of all users

routerConversation.get("/", async (req, res) => {
	const conversation = await Conversation.findAll();
	res.status(200).send(conversation);
});

//get conversation of a particular user from business

routerConversation.get("/business/:userId", async (req, res) => {
	const { userId } = req.params;
	try {
		const conversation = await Conversation.findAll({
			where: {
				fk_business: userId,
			},
		});
		res.status(200).send(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get conversation of a particular user from postulant

routerConversation.get("/postulant/:userId", async (req, res) => {
	const { userId } = req.params;
	try {
		const conversation = await Conversation.findAll({
			where: {
				fk_postulant: userId,
			},
		});
		res.status(200).send(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get conversation that includes two userId from one business and one particular postulant

routerConversation.get("/find/:businessId/:postulantId", async (req, res) => {
	try {
		const conversation = await Conversation.findOne({
			where: {
				members: [req.params.businessId, req.params.postulantId],
			},
		});
		conversation.length
			? res.status(200).json(conversation)
			: res.status(400).send("No hay conversación");
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = routerConversation;

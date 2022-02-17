const routerConversation = require("express").Router();
const { Conversation } = require("../../db");

//new conv

routerConversation.post("/", async (req, res) => {
	const { senderId, receiverId } = req.body;
	try {
		const savedConversation = await Conversation.create({
			members: [senderId, receiverId],
		});
		res.status(200).send(savedConversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get conv of a particular user

routerConversation.get("/", async (req, res) => {
	const conversation = await Conversation.findAll()
	res.status(200).send(conversation)
});

routerConversation.get("/:userId", async (req, res) => {
	const { userId } = req.params;
	var userIdStr = userId.toString();
	try {
		const conversation = await Conversation.findAll({
			where: {
				// members: [userIdStr,"3333333333333333"]-----------> harcodeado pero funcionando!
				// members: { $in: [userIdStr]} ----------------> no funciona pero es similar al original
				// members: { $between: [userIdStr, 10] }, -----> prueba fallida
				// members:{$any: [userIdStr,userIdStr] }  -----> prueba fallida
				// members:[userIdStr,userIdStr] ---------------> prueba fallida
				id: [1, 4, 3],
				
				// members:
			},
			// Project.findAll({ where: { id: [1,2,3] } }).then(function(projects) {
			// projects will be an array of Projects having the id 1, 2 or 3
			// this is actually doing an IN query
			//   })
		});
		res.status(200).send(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
});



// // get conv includes two userId

// routerConversation.get("/find/:firstUserId/:secondUserId", async (req, res) => {
// 	try {
// 		const conversation = await Conversation.findOne({
// 			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
// 		});
// 		res.status(200).json(conversation);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = routerConversation;

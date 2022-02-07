const { Technology } = require("../../db");
const { Router } = require("express");
const axios = require("axios");

const router = Router();
const API = require("../Filters/api_filters/technology.json"); //api de technologies

router.get("/", async (req, res) => {
	try {
		const tech = API.technologies; // trajimos el objeto de la api y solo nos quedamos con el array

		for (let i = 0; i < tech.length; i++) {
			await Technology.findOrCreate({
				where: {
					name: tech[i].name,
				},
			});
		}
		const allTech = await Technology.findAll();
		return res.status(200).send(allTech);
	} catch (e) {
		res.send("ERROR " + e);
	}
});

module.exports = router;

const { Skill } = require("../../db");
const { Router } = require("express");
const axios = require("axios");

const router = Router();
const API = require("../Filters/api_filters/skills.json"); //api de skills

router.get("/", async (req, res) => {
	try {
		const skill = API.skills; // trajimos el objeto de la api y solo nos quedamos con el array

		for (let i = 0; i < skill.length; i++) {
			await Skill.findOrCreate({
				where: {
					name: skill[i].name,
				},
			});
		}
		const allSkills = await Skill.findAll();
		return res.status(200).send(allSkills);
	} catch (e) {
		res.send("ERROR " + e);
	}
});

module.exports = router;

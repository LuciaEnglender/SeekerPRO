const { Seniority } = require("../../db");
const { Router } = require("express");

const router = Router();
const API = require("../Filters/api_filters/seniority.json"); //api de seniority

router.get("/", async (req, res) => {
  try {
    const seniorities = API.seniority; // trajimos el objeto de la api y solo nos quedamos con el array

		for (let i = 0; i < seniorities.length; i++) {
			await Seniority.findOrCreate({
				where: {
					name: seniorities[i].name,
				},
			});
		}
		const allSeniorities = await Seniority.findAll();
		return res.status(200).send(allSeniorities);
	} catch (e) {
		res.send("ERROR " + e);
	}
});

module.exports = router;

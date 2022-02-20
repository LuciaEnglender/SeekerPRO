const {Language}=require("../../db")
const {Router}= require("express")
const axios=require("axios");

const router = Router();
const API=require("../Filters/api_filters/language.json")//api de lenguajes 

router.get("/", async (req, res) => {
	try {
		const language = API.languages; // trajimos el objeto de la api y solo nos quedamos con el array

		for (let i = 0; i < language.length; i++) {
			await Language.findOrCreate({
				where: {
					name: language[i].name,
				},
			});
		}
		const allLanguages = await Language.findAll();
		return res.status(200).send(allLanguages);
	} catch (e) {
		res.send("ERROR " + e);
	}
});

module.exports = router;

const {Location}=require("../../db")
const {Router}= require("express")
const axios=require("axios");

const router = Router();
const API=require("../Filters/api_filters/location.json")//api de location 

router.get("/", async (req, res) => {
	try {
		const location = API.location; // trajimos el objeto de la api y solo nos quedamos con el array

		for (let i = 0; i < location.length; i++) {
			await Location.findOrCreate({
				where: {
					name: location[i].name,
				},
			});
		}
		const allLocations = await Location.findAll();
		return res.status(200).send(allLocations);
	} catch (e) {
		res.send("ERROR " + e);
	}
});

module.exports = router;

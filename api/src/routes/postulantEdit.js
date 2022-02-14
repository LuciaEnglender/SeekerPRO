const { Router } = require("express");
const path = require("path");
const {
  Postulant,
  Technology,
  Skill,
  Language,
  Seniority,
  Vacancy,
  Location,
  Login,
} = require("../db");

const { check, validationResult } = require("express-validator");
const routerEditing = Router();
const multer = require("multer");

////subida de archivos//// cv/photo

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "file");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

routerEditing.put('/:id/locationDelete', async (req, res) => {
    try {
        let finderPostulant = await Postulant.findByPk(req.body.id)
        let finderLocation = await Location.findAll({
            where: {
                name: req.body.location
            }
        });

        await finderPostulant.removeLocation(finderLocation)

    } catch (e) {
        console.log(e)
    }
})

routerEditing.post('/:id/locationAdd', async (req, res) => {
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderLocation = await Location.findAll({
            where: {
                name: req.body.location
            }
        });

        await finderPostulant.addLocation(finderLocation)

    }catch (e) {
        console.log(e)
    }
})


module.exports = routerEditing;
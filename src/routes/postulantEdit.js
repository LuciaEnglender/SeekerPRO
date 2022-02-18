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
const { Console } = require("console");

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
        console.log('sou delete body',  req.body)
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderLocation = await Location.findAll({
            where: {
                name: req.body.input
            }
        });

        await finderPostulant.removeLocation(finderLocation)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})

routerEditing.put('/:id/locationAdd', async (req, res) => {
    console.log('soy add body', req.body)
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)

        let finderLocation = await Location.findAll({
            where: {
                name: req.body.input
            }
        });

        await finderPostulant.addLocation(finderLocation)
        res.status(200).json('hecho')
    }catch (e) {
        console.log(e)
    }
})


routerEditing.put('/:id/technologyDelete', async (req, res) => {
    try {
        console.log(req.body)
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderTech = await Technology.findAll({
            where: {
                name: req.body.input
            }
        });
       
        await finderPostulant.removeTechnology(finderTech)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})

routerEditing.put('/:id/technologyAdd', async (req, res) => {
    console.log(req.body)
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderTech = await Technology.findAll({
            where: {
                name: req.body.input
            }
        });
        
        await finderPostulant.addTechnology(finderTech)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})


routerEditing.put('/:id/skillDelete', async (req, res) => {
    
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderSkill = await Skill.findAll({
            where: {
                name: req.body.input
            }
        });
       
        await finderPostulant.removeSkill(finderSkill)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})


routerEditing.put('/:id/skillAdd', async (req, res) => {
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderSkill = await Skill.findAll({
            where: {
                name: req.body.input
            }
        });
        
        await finderPostulant.addSkill(finderSkill)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})

routerEditing.put('/:id/languageDelete', async (req, res) => {
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)
        let finderLang = await Language.findAll({
            where: {
                name: req.body.input
            }
        });
       
        await finderPostulant.removeLanguage(finderLang)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})


routerEditing.put('/:id/languageAdd', async (req, res) => {
    console.log(req.body)
    try {
        let finderPostulant = await Postulant.findByPk(req.params.id)

        let finderLang = await Language.findAll({
            where: {
                name: req.body.input
            }
        });
        
        await finderPostulant.addLanguage(finderLang)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})

routerEditing.put('/:id/seniorityDelete', async (req, res) => {
    try {
        console.log(req.body)
        let finderPostulant = await Postulant.findByPk(req.params.id)

        let finderSeniority = await Seniority.findAll({
            where: {
                name: req.body.input
            }
        });
       
        await finderPostulant.removeSeniority(finderSeniority)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})

routerEditing.put('/:id/seniorityAdd', async (req, res) => {
    try {
       
        let finderPostulant = await Postulant.findByPk(req.params.id)

        let finderSeniority = await Seniority.findAll({
            where: {
                name: req.body.input
            }
        });
        
        await finderPostulant.addSeniority(finderSeniority)
        res.status(200).json('hecho')
    } catch (e) {
        console.log(e)
    }
})


module.exports = routerEditing;
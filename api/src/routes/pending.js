const { Router } = require("express");
const Pending = require("../models/Pending");

// const { Vacancy, Postulant} = require("../db")


const routerPending = Router()

routerPending.post('/', async (req, res) => {
    let { idPostulant, description } = req.body;

    try {
        let createBusiness = await Pending.create({
            idPostulant,
            description
        });


        // createBusiness.setPostulants(allPostulant)
        res.json(createBusiness);
    } catch (error) {
        res.status(404).send("ERROR" + error);
        console.log(error);
    }
}
);

module.exports = routerPending;
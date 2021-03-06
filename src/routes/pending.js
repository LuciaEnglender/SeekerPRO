const { Router } = require("express");

const {
  Pending,
  Vacancy,
  Language,
  Technology,
  Seniority,
  Business,
} = require("../db");
const routerPending = Router();

//(2)este get debe traer de la tabla de relacionada las vacantes pendientes del postulante
routerPending.get("/:id/vacancy", async (req, res) => {
  try {
    Pending.findByPk(req.params.id).then((pending) => {
      pending
        .getVacancies({
          attributes: ["id", "name", "description"],
          include: [
            {
              model: Language,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Seniority,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Technology,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Business,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
        })
        .then((vacancy) => {
          res.json(vacancy);
        });
    });
  } catch (error) {
    coonsole.log(error);
  }
});
//(1)crea el idPostulant modelo pendiente y  postea la relacion en la tabla pending_postulant
routerPending.post("/:idPostulant", async (req, res) => {
  //setea la informacion en tabla Pending_vacancy
  const idPostulant = req.params.idPostulant;
  const { id } = req.body; //id de la vacante
  //verificar perque lo recibo como string el idPostulant de pending para probar
  try {
    let createBusiness = await Pending.create({
      idPostulant,
    });
    let pending = await Pending.findByPk(idPostulant);
    let vacancy = await Vacancy.findByPk(id);

    await pending.addVacancy(vacancy);

    res.status(200).send("Guardada vacante pendiente");
  } catch (error) {
    console.log(error);
  }
});

//borra la vacancy de la tabla pending_vacancy
routerPending.put("/:idPostulant", async (req, res) => {
  const idPostulant = req.params.idPostulant;
  const { id } = req.body;

  try {
    let pending = await Pending.findByPk(idPostulant);
    let vacancy = await Vacancy.findByPk(id);

    await pending.removeVacancy(vacancy);

    res.status(200).json(vacancy);
  } catch (error) {
    console.log(error);
  }
});

module.exports = routerPending;

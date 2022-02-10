const { Router } = require("express");

const {
  Business,
  Vacancy,
  Postulant
} = require("../db");

const routerFavorite = Router();

//cuando le de click a fovoritos muestra sus empresas favoritas 
//(2)Trae empresas favoritas por postulante (recibe id Postulante)
routerFavorite.get("/:id/business", async (req, res) => {
  Postulant.findByPk(req.params.id).then((postulant) => {
    postulant
      .getBusinesses({
        attributes: ["name", "description"],
      })
      .then((business) => {
        console.log(business)
        res.json(business);

      });
  });
});

//(3)Recibe id emp y renderiza las vacantes de la empresa

routerFavorite.get('/:id', async (req, res) => {

  const busId = req.params.id
  const allVacancy = await Vacancy.findAll({
    where: {
      businessId: busId
    }
  })
  res.status(200).json(allVacancy)
});

//(1)Recibe id de postulante y id de empresa Relacion de sus empresas favoritas
//para cuando haga enter en la empresa agregar a favorita lleva la relacion ala tabla
routerFavorite.post('/post/:id', async (req, res) => {
  const idpost = req.params.id
  const { id } = req.body

  const postulant = await Postulant.findByPk(idpost)
  const business = await Business.findByPk(id)

  await postulant.addBusiness(business)

  res.status(200).json(postulant)
});

//(4)borra la vacante de favorito
routerFavorite.put('/pos/:id', async (req, res) => {
  const { id } = req.body
  const idPostulant = req.params.id

  const postulant = await Postulant.findByPk(idPostulant)
  const business = await Business.findByPk(id)

  await postulant.removeBusiness(business)
  res.status(200).json(postulant)
});

module.exports = routerFavorite;
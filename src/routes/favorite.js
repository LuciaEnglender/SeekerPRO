const { Router } = require("express");

const { Business, Vacancy, Postulant } = require("../db");

const routerFavorite = Router();

//cuando le de click a fovoritos muestra sus empresas favoritas
//(2)Trae empresas favoritas por postulante (recibe id Postulante)
routerFavorite.get("/:id/business", async (req, res) => {
 try{ Postulant.findByPk(req.params.id).then((postulant) => {
    postulant
      .getBusinesses({
        attributes: ["name", "description", "id"],
      })
      .then((business) => {
        console.log(business);
        res.json(business);
      });
  });} catch(e ){
    console.log(e)
  }
});

//(3)Recibe id emp y renderiza las vacantes de la empresa
//cuando le de click a una empresa traelas vacantes de la empresa
routerFavorite.post ("/:id/vacancy", async (req, res) => {

 try{ Business.findByPk(req.params.id).then((business) => {
    business
      .getVacancies({
        attributes: ["name", "description"],
      })
      .then((vacancy) => {
        console.log(vacancy);
        res.json(vacancy);
      });
  });
} catch(error){
    console.log(error)
  }
});

//(1)Recibe id de postulante y id de empresa Relacion de sus empresas favoritas
//para cuando haga enter en la empresa agregar a favorita lleva la relacion ala tabla
routerFavorite.post("/post/:id", async (req, res) => {
 try{ const idpost = req.params.id;
  const id  = Number(req.body.id);
 console.log(idpost, id)
  const postulant = await Postulant.findByPk(idpost);
  const business = await Business.findByPk(id);

  await postulant.addBusiness(business);

  res.status(200).json(postulant);
} catch(e){
    console.log(e)
  }
});


// (4)si le da a una vacante
//Setea idVancacy y idBusiness para la tabla business_vacancy
routerFavorite.post("/emp/:id", async (req, res) => {
 try{ const { id } = req.body;
  const idBusiness = req.params.id;
  
  const business = await Business.findByPk(idBusiness);
  const vacancy = await Vacancy.findByPk(id);
  
  await business.addVacancy(vacancy);
  
  res.status(200).json(business);
}catch(error){
  console.log(error)
}
});

//(5)borra la vacante de favorito
routerFavorite.put("/vac/:id", async (req, res) => {
  try{const { id } = req.body;
  const idVacancy = req.params.id;
  
  const business = await Business.findByPk(idVacancy);
  const vacancy = await Vacancy.findByPk(id);
  
  await business.removeVacancy(vacancy);
  res.status(200).json(business);
}catch(error){
  console.log(error)
}
});

//(6)borra la empresa de favorito
routerFavorite.put("/post/:id", async (req, res) => {
  
 try{ 
   const { id } = req.body;
  const idPostulant = req.params.id;
  console.log('edBusiness', id, "idPost", idPostulant)
  const postulant = await Postulant.findByPk(idPostulant);
  const business = await Business.findByPk(id);

  await postulant.removeBusiness(business);
  res.status(200).json(postulant);
}catch(error){
  console.log(error)
}
});

module.exports = routerFavorite;
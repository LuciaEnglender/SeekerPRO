const { Router } = require("express");

const {
  Business,
  Vacancy,
  Postulant,
  Language,
  Technology,
  Skill,
  Seniority,
} = require("../db");
const { Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const router = require("./Filters/language");

const routerBusiness = Router();

// ******************CRUD BUSINESS********************
// Ruta get Recibe por query name y es la ruta '/Business'

routerBusiness.get("/vac", async (req, res) => {
  // const {name} = req.params
  Business.findAll({
    //    where : {name : name},
    include: {
      model: Vacancy,
      attributes: ["name"],
      // where : {name : name},
    },
    attributes: ["name", "description", "location", "cuit"],
  }).then((businesses) => {
    console.log(businesses);
    res.json(businesses);
  });

  // const languageSearch = await Language.findAll({
  //     where: {
  //         name: {[Op.like] : `%${name}%`},
  //     },
  //     include: {
  //         model: Vacancy,
  //         attributes : ["name"],
  //     }
  // });
  // console.log(languageSearch)
  // for (let i = 0; i < languageSearch.length; i++) {
  //     if (languageSearch[i].vacancies.length !== 0){
  //             acum.push(languageSearch[i].vacancies)
  //     }
  // }
});

routerBusiness.get("/", async (req, res) => {
  const { name } = req.query;
  const allBusiness = await Business.findAll();
  //console.log(allBusiness)
  try {
    if (name) {
      const nameBusiness = await allBusiness.filter((el) =>
        el.dataValues.name.toLowerCase().includes(name.toLowerCase())
      );
      console.log(nameBusiness);
      nameBusiness
        ? res.status(200).send(nameBusiness)
        : res.status(404).send("Unregistered company");
    } else {
      allBusiness
        ? res.status(200).json(allBusiness)
        : res.status(400).send("The company does not exist");
    }
  } catch (error) {
    res.status(404).send("Err" + error);
  }
});
routerBusiness.get("/:name", async (req, res) => {
  const { name } = req.params;
  const acum = [];
  try {
    // ******buscar por nombre del Postulante Trae postulantes con sus vacantes*******

    const postulant = await Postulant.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          location: { [Op.iLike]: `%${name}%` },
          github: { [Op.iLike]: `%${name}%` },
          linkedIn: { [Op.iLike]: `%${name}%` },
          portfolio: { [Op.iLike]: `%${name}%` },
        },
      },
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
          model: Skill,
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
        { model: Vacancy },
      ],
    });
    if (postulant.length !== 0) acum.push(postulant);

    //   //NO BUSCO EMPRESA
    //   //trae empresas
    //   //  const business = await Business.findAll({
    //   //   where:{
    //   //     [Op.or] : {
    //   //       name : {[Op.iLike] : `%${name}%`},
    //   //       description : {[Op.iLike] : `%${name}%`},
    //   //       location : {[Op.iLike] : `%${name}%`}
    //   //     },
    //   //   },

    //   // });
    //   //     if(business.length !== 0)acum.push(business);

    //   // Trae Vacante

    //   //***********Busca por VACANTE y trae los POSTULANTES****
    const vacancies = await Vacancy.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          description: { [Op.iLike]: `%${name}%` },
        },
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "fk_business", "businessId"],
      },
      include: [
        {
          model: Postulant,
          attributes: {
            exclude: ["createdAt", "updatedAt", "fk_login", "loginId"],
          },
          include: [
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
              model: Skill,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Language,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    if (vacancies.length !== 0) acum.push(vacancies);
    console.log(vacancies);

    //   //Busco por Skill
    const skills = await Skill.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          // description: { [Op.iLike]: `%${name}%` },
        },
      },
      include: {
        model: Postulant,
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
            model: Skill,
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
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "fk_login", "loginId"],
        },
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "fk_business", "businessId"],
      },
    });
    for (let i = 0; i < skills.length; i++) {
      if (skills[i].postulants.length !== 0) {
        acum.push(skills[i].postulants);
      }
    }
    if (skills.length !== 0) acum.push(skills);

    const language = await Language.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          // description: { [Op.iLike]: `%${name}%` },
        },
      },
      include: {
        model: Postulant,
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
            model: Skill,
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
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "fk_login", "loginId"],
        },
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "fk_business", "businessId"],
      },
    });
    for (let i = 0; i < language.length; i++) {
      if (language[i].postulants.length !== 0) {
        acum.push(language[i].postulants);
      }
    }
    if (language.length !== 0) acum.push(skills);
    // //  //Busca por TECHNOLOGY
    const tech = await Technology.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          // description: { [Op.iLike]: `%${name}%` },
        },
      },
      include: {
        model: Postulant,
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
            model: Skill,
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
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "fk_login", "loginId"],
        },
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "fk_business", "businessId"],
      },
    });
    for (let i = 0; i < tech.length; i++) {
      if (tech[i].postulants.length !== 0) {
        acum.push(tech[i].postulants);
      }
    }
    if (tech.length !== 0) acum.push(tech);

    // // **********SENIORITY*************
    const seniority = await Seniority.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          // description: { [Op.iLike]: `%${name}%` },
        },
      },
      include: {
        model: Postulant,
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
            model: Skill,
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
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "fk_login", "loginId"],
        },
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "fk_business", "businessId"],
      },
    });
    for (let i = 0; i < seniority.length; i++) {
      if (seniority[i].postulants.length !== 0) {
        acum.push(seniority[i].postulants);
      }
    }
    if (seniority.length !== 0) acum.push(seniority);

    console.log(acum);
    res.json(acum[0]);
  } catch (e) {
    console.log(e);
  }
});
//Ruta post Recibe por query name y es la ruta '/Business'

routerBusiness.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "The description is required").not().isEmpty(),
    check("location", "The location is required").not().isEmpty(),
    check("cuit", "The cuit is required").not().isEmpty(),
  ],
  async (req, res) => {
    let { name, description, location, cuit } = req.body;

    /////////////////////// LU y ALI///// COMENTE ESTO PARA PROBAR EL POST DE BUSINESS, NO ME DEJABA PORQUE ESTA 2 VECES EL MISMO CODIGO (error de doble respuesta)
    ////////////////////////// ESTA TODO ORDENADO TAL CUAL LO DEJARON SOLO QUE COMENTE DE LA 46 a la 67 PARA PODER PROBAR PARA LA PRESENTACION
    ///////////////////////////////////////////PRINCIPIO/////////////////////////////////////////
    // try {
    //   //objeto error . //Metodo de expressValidator
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     //se crea un obj errores convierto en array,
    //     res.status(422).json({ errores: errors.array() });
    //   }
    //   let createBusiness = await Business.create({
    //     name,
    //     description,
    //     location,
    //     cuit,
    //   });
    //   res.json(createBusiness);
    // } catch (error) {
    //   res.status(404).send("ERROR" + error);
    //   console.log(error);
    // }
    ////////////////////////////////////////// FIN  /////////////////////////////////////////////////////////

    try {
      let createBusiness = await Business.create({
        name,
        description,
        location,
        cuit,
      });
      res.json(createBusiness);
    } catch (error) {
      res.status(404).send("ERROR" + error);
      console.log(error);
    }
  }
);

//Ruta put Recibe por param id y es la ruta '/Business/'id
routerBusiness.put("/:id", async (req, res) => {
  try {
    await Business.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ sucess: "The company details have been successfully modified" });
  } catch (error) {
    res.status(404).send("ERROR" + error);
  }
});

//Ruta delete Recibe por params id '
routerBusiness.delete("/:id", async (req, res) => {
  try {
    await Business.destroy({
      where: { id: req.params.id },
    });
    res.json({ sucess: "The company data has been successfully deleted" });
  } catch (error) {
    res.status(404).send("ERROR" + error);
  }
});

//esta ruta setea business_vacancy con el id empr y id postulant
routerBusiness.post('/emp/:id',async (req, res) => {
  const {id} = req.body
  const idBusiness = req.params.id
  
  const business = await Business.findByPk(idBusiness)
  const vacancy = await Vacancy.findByPk(id)
  
   await business.addVacancy(vacancy)
  
  res.status(200).json(business)
  });
module.exports = routerBusiness;

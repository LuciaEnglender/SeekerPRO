const { Router } = require("express");

const {
  Business,
  Vacancy,
  Postulant,
  Language,
  Technology,
  Skill,
  Login,
  Seniority,
} = require("../db");
const { Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const router = require("./Filters/language");

const routerBusiness = Router();

// ******************CRUD BUSINESS********************
//Recibe el id de empresa y trae sus vacantes
routerBusiness.get("/:id", async (req, res) => {
  const busId = req.params.id;

  const allVacancy = await Vacancy.findAll({
    where: {
      businessId: busId,
    },
  });
  res.status(200).json(allVacancy);
});

//Cuenta cuantas Vacantes tiene una empresa recibe id de empresa y retona el numero de vacantes
routerBusiness.get("/count/:id", async (req, res) => {
  const busId = req.params.id;
  try {
    Vacancy.findAndCountAll({
      where: { businessId: busId },
      offset: 10,
      limit: 2,
    }).then((result) => {
      const resp = result.count;
      console.log(result.count);
      res.json(resp);
    });
  } catch (erro) {
    console.log(erro);
  }

  //res.json(numVacancy)
});

//Busca empresa por nombre o trae todas solo lo usa dentro de la aplicacion 
routerBusiness.get("/find/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const businessFinder = await Business.findOne({
      where: {
        loginEmail: email,
      },
    });
    console.log(businessFinder);
    res.json(businessFinder);
  } catch (e) {
    console.log(e);
  }
});

routerBusiness.get("/", async (req, res) => {
  const { business } = req.query;
  
  //console.log(allBusiness)
  try {
    if (business) {
      const business = await Business.findOne({
        where: {
          loginEmail: business
        }
      })
      res.status(200).json(business)
    } else {
      const allBusiness = await Business.findAll();
      allBusiness
        ? res.status(200).json(allBusiness)
        : res.status(400).send("The company does not exist");
    }
  } catch (error) {
    res.status(404).send("Err" + error);
  }
});

//****************BUSQUEDA DEL SEARCHBAR DE EMPRESA**************** */
routerBusiness.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  const acum = [];
  try {
    // ******buscar por nombre del Postulante Trae postulantes con sus vacantes*******

    const postulant = await Postulant.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
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

    //Busca por LANGUAGE
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

    //Busca por TECHNOLOGY
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

    // Busca por SENIORYTI
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

  async (req, res) => {
    let { name, description, location, cuit, emailId } = req.body;

    try {
      let createBusiness = await Business.create({
        name,
        description,
        location,
        cuit,
        //createBus
      });

      let finderLogin = await Login.findByPk(emailId);
      console.log(finderLogin);
      await createBusiness.setLogin(finderLogin);
      res.json(createBusiness);
    } catch (error) {
      console.log(error);
    }
  }
);

//Ruta put Recibe por param id y es la ruta '/Business/'id y la modifica
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

//Ruta delete Recibe por params id esto es solo para pruebas'
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
routerBusiness.post("/emp/:id", async (req, res) => {
  const { id } = req.body;
  const idBusiness = req.params.id;

  const business = await Business.findByPk(idBusiness);
  const vacancy = await Vacancy.findByPk(id);

  await business.addVacancy(vacancy);

  res.status(200).json(business);
});

module.exports = routerBusiness;

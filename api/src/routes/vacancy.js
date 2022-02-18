const { Router } = require("express");
const {
  Vacancy,
  Business,
  Language,
  //	Location,
  Seniority,
  Skill,
  Technology,
  Postulant,
} = require("../db");

const { Op } = require("sequelize");
const e = require("express");
const res = require("express/lib/response");

const routerVacancy = Router();

routerVacancy.get("/:id", async (req, res) => {
  //Se busca vacante por id pasado por params
  const id = Number(req.params.id);

  try {
    //si tiene id (o sea que se requiere el detalle) entra acá
    if (id) {
      const vacanciesInDB = await Vacancy.findAll({
        //se busca aquel vacante que coincida con este id
        where: {
          id: id,
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
            model: Technology,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Business,
            attributes: ["name", 'id', 'description'],
            through: {
              attributes: [],
            },
          }
        ],
      });
      //si no está es porque no existe
      vacanciesInDB
        ? res.status(200).send(vacanciesInDB)
        : res.status(400).send("doesnt exist this vacancy");
    } else {
      res.status(400).send("doesnt exist this vacancy");
    }
  } catch (e) {
    res.send("ERROR" + e);
  }
});

routerVacancy.get("/", async (req, res) => {
  const { id, business } = req.query;

  try {
    const ALLVACS = await Vacancy.findAll({
      include: [
        {
          model: Business,
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
          attributes: ["name", 'id', 'description'],
          through: {
            attributes: [],
          },
        }
      ],
    });

    //si tiene id (o sea que se requiere el detalle) entra acá
    if (id) {
      const vacanciesInDB = await Vacancy.findAll({
        //se busca aquel vacante que coincida con este id
        where: {
          id: id,
        },
        include: [
          {
            model: Business,
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
        ],
      });
      //si no está es porque no existe
      vacanciesInDB
        ? res.status(200).send(vacanciesInDB)
        : res.status(400).send("doesnt exist this vacancy");
    } else if (business) {
      const finderBusiness = await Business.findOne({
        where: {
          loginEmail: business,
        },
      });
      //y sino, devuelve todos las vacantes
      const vacanciesInDB = await Vacancy.findAll({
        where: {
          businessId: finderBusiness.id,
        },
        include: [
          {
            model: Business,
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
            attributes: ["name", 'id', 'description'],
            through: {
              attributes: [],
            },
          }
        ],
      });
      vacanciesInDB
        ? res.status(200).json(vacanciesInDB)
        : res.status(400).send("there arent any vacancies yet");
    } else {
      ALLVACS
        ? res.status(200).json(ALLVACS)
        : res.status(400).send("not vacancies yet");
    }
  } catch (e) {
    console.log(e);
  }
});

routerVacancy.post("/", async (req, res) => {
  const {
    name,
    description,
    business,
    language,
    //location,
    seniority,
    // skill,
    technology,
  } = req.body;

  try {
    let newVacancyInDB = await Vacancy.create({
      name,
      description,
    });
    //busco la empresa para obtener su nombre;
    let businessInDB = await Business.findOne({
      where: {
        loginEmail: business,
      },
    });
    //le agrego la empresa a la vacante;
    await newVacancyInDB.setBusiness(businessInDB);
    await newVacancyInDB.addBusiness(businessInDB);
    //repito lo mismo con las otras tablas
    if (language) {
      let lenguageInDB = await Language.findAll({
        where: {
          name: language,
        },
      });
      await newVacancyInDB.addLanguage(lenguageInDB);
    }

    if (seniority) {
      let seniorityInDB = await Seniority.findAll({
        where: {
          name: seniority,
        },
      });
      await newVacancyInDB.addSeniority(seniorityInDB);
    }

    if (technology) {
      let technologyInDB = await Technology.findAll({
        where: {
          name: technology,
        },
      });
      await newVacancyInDB.addTechnology(technologyInDB);
    }
    //console.log(newVacancyInDB);
    res.status(200).json(newVacancyInDB);
  } catch (e) {
    console.log(e);
  }
});

routerVacancy.put("/edit/:vacancyId", async (req, res) => {
  // recibe por params el id, lo busca en la db y le modifica aquellos campos que se modificaron
  try {
    await Vacancy.update(req.body, {
      where: {
        id: req.params.vacancyId,
      },
    });
    res.status(200).send("Modificado");
  } catch (e) {
    console.log(e);
  }
});

routerVacancy.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  const acum = [];
  try {
    const business = await Business.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          description: { [Op.iLike]: `%${name}%` },
          location: { [Op.iLike]: `%${name}%` },
        },
      },
    });
    if (business.length !== 0) acum.push(business);

    const vacancy = await Vacancy.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          description: { [Op.iLike]: `%${name}%` },
          },
      },
     attributes: ['name','id', 'description'],
      include: [
        {
          model: Technology,
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
          model: Language,
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
    });
    if (vacancy.length !== 0) acum.push(vacancy);

    const languageSearch = await Language.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: ["name"],
      include: [
        {
          model: Vacancy,
          attributes: ["name", 'id', 'description'],
          include: [
            {
              model: Technology,
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
              model: Language,
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
        },
      ],
    });
   
    for (let i = 0; i < languageSearch.length; i++) {
      if (languageSearch[i].vacancies.length !== 0) {
        acum.push(languageSearch[i].vacancies);
      }
    }
    
    const techSearch = await Technology.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: ["name"],
      include: [
        {
          model: Vacancy,
          attributes: ["name", "description", 'id'],
          include: [
            {
              model: Language,
              attributes: ["name", 'id'],
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
            }
          ],
        },
      ],
    });
    for (let i = 0; i < techSearch.length; i++) {
      if (techSearch[i].vacancies.length !== 0) {
        acum.push(techSearch[i].vacancies);
      }
    }

    const senioritySearch = await Seniority.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: ["name", 'id'],
      include: {
        model: Vacancy,
        attributes: ["name", "description", 'id'],
        include: [
          {
            model: Language,
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
            model: Seniority,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      },
    });
    for (let i = 0; i < senioritySearch.length; i++) {
      if (senioritySearch[i].vacancies.length !== 0) {
        acum.push(senioritySearch[i].vacancies);
      }
    }

    acum.length
      ? res.status(200).json(acum[0])
      : res.status(404).send("there arent coincidences");
  } catch (e) {
    console.log(e);
  }
});

routerVacancy.delete("/:vacancyId", async (req, res) => {
  //recibe por params el id, lo busca en la db y lo destruye
  try {
    await Vacancy.destroy({
      where: {
        id: req.params.vacancyId,
      },
    });
    res.status(200).send("Destruido");
  } catch (e) {
    console.log(e);
  }
});

routerVacancy.get("/filterByTech", async (req, res) => {
  const info = req.body;

  const vacanciesInDB = await Vacancy.findAll({
    where: {
      tech: info.tech,
    },
  });
  res.status(200).send(vacanciesInDB);
});

// routerVacancy.get("/:name", async (req, res) => {
//   const { name } = req.params;

//   try {
//     const businesss = await Business.findAll({
//       where: {
//         name: name,
//       },
//     });
//     console.log(businesss);

//     const vacanciesXbusiness = await Vacancy.findAll({
//       where: {
//         businessId: businesss.id,
//       },
//     });

//     res.status(200).json(vacanciesXbusiness);
//   } catch (e) {
//     console.log(e);
//   }
// });

routerVacancy.get("/vacs/:id", async (req, res) => {
  // Trae todos los pustulantes de una vacante
 
  // Vacancy.findByPk(req.params.id).then((vacancy) => {
  //   vacancy
  //     .getPostulants({
  //       attributes: ["name"],
  //     })
  //     .then((postulant) => {
  //      res.json(postulant);
  //     });
  // });
  //  console.log(nuevar)
const vacancy = await Vacancy.findByPk(req.params.id, {
  include: [
 {
   model: Postulant,
   }
  ]
})
console.log(vacancy)
res.json(vacancy)
});


routerVacancy.get("/vac/:id", async (req, res) => {
  //cuantos postulantes tiene cada vacante
  Vacancy.findByPk(req.params.id).then((vacancy) => {
    vacancy
      .getPostulants({
        attributes: ["name"],
      })
      .then((postulant) => {
        // console.log(postulant);
        res.json(postulant.length);
      });
  });
});

module.exports = routerVacancy;

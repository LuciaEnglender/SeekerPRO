const { Router } = require("express");
const {
  Vacancy,
  Business,
  Language,
  //	Location,
  Seniority,
  Skill,
  Technology,
} = require("../db");

const { Op } = require("sequelize");
const e = require("express");

const routerVacancy = Router();

routerVacancy.get("/:id", async (req, res) => {
  const id = Number(req.params.id)

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
        ],
      });
      //si no está es porque no existe
      vacanciesInDB
        ? res.status(200).send(vacanciesInDB)
        : res.status(400).send("doesnt exist this vacancy")
    } else { res.status(400).send("doesnt exist this vacancy") }
  } catch (e) {
    res.send("ERROR" + e);
  }
});
        

routerVacancy.get("/", async (req, res) => {
  const id = Number(req.query.id)

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
          // {
          //   model: Skill,
          //   attributes: ["name"],
          //   through: {
          //     attributes: [],
          //   },
          // },
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
    } else {
      //y sino, devuelve todos las vacantes
      const vacanciesInDB = await Vacancy.findAll({
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
          // {
          //   model: Skill,
          //   attributes: ["name"],
          //   through: {
          //     attributes: [],
          //   },
          // },
          {
            model: Technology,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      vacanciesInDB
        ? res.status(200).json(vacanciesInDB)
        : res.status(400).send("there arent any vacancies yet");
    }
  } catch (e) {
    res.send("ERROR" + e);
  }
});



routerVacancy.post("/", async (req, res) => {
  const {
    name,
    description,
    // business,
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
    // let businessInDB = await Business.findOne({
    // 	where: {
    // 		name: business,
    // 	},
    // });
    //le agrego la empresa a la vacante;
    // await newVacancyInDB.setBusiness(businessInDB);
    //repito lo mismo con las otras tablas
    if (language) {
      let lenguageInDB = await Language.findAll({
        where: {
          name: language,
        },
      });
      await newVacancyInDB.addLanguage(lenguageInDB);
    }
    /*if (location) {
			let locationInDB = await Location.findAll({
				where: {
					name: location,
				},
			});
			await newVacancyInDB.addLocation(locationInDB);
		}*/
    if (seniority) {
      let seniorityInDB = await Seniority.findAll({
        where: {
          name: seniority,
        },
      });
      await newVacancyInDB.addSeniority(seniorityInDB);
    }
    // if (skill) {
    //   let skillInDB = await Skill.findAll({
    //     where: {
    //       name: skill,
    //     },
    //   });
    //   await newVacancyInDB.addSkill(skillInDB);
    // }
    if (technology) {
      let technologyInDB = await Technology.findAll({
        where: {
          name: technology,
        },
      });
      await newVacancyInDB.addTechnology(technologyInDB);
    }
    console.log(newVacancyInDB);
    res.status(200).json(newVacancyInDB);
  } catch (e) {
    console.log(e);
  }
});

routerVacancy.put("/:vacancyId", async (req, res) => {
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

routerVacancy.get("/:name", async (req, res) => {
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
    if(business.length !== 0)acum.push(business);
  
    const vacancy = await Vacancy.findAll({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${name}%` },
          description: { [Op.iLike]: `%${name}%` },
          
        },
      },
      include: [{
          model: Technology,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },{
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
        }]
    });
    if(vacancy.length !== 0) acum.push(vacancy);

    const languageSearch = await Language.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes : ["name"],
      include: [{
        model: Vacancy,
        attributes: ["name"],
        inlcude : [{
          model: Technology,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },{
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
        }]
        
      }],
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
      attributes : ["name"],
      include: [
        {
          model: Vacancy,
          attributes: ["name", "description"],
          include: [
            {
              model: Language,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },{
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
            }
          ]
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
      attributes : ["name"],
      include: {
        model: Vacancy,
        attributes: ["name", "description"],
        include:[
          {
            model: Language,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },{
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
            } 
          }
        ]
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

routerVacancy.get("/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const businesss = await Business.findAll({
      where: {
        name: name,
      },
    });
    console.log(businesss);

    const vacanciesXbusiness = await Vacancy.findAll({
      where: {
        businessId: businesss.id,
      },
    });

    res.status(200).json(vacanciesXbusiness);
  } catch (e) {
    console.log(e);
  }
});

// // hacerlo al reves los postulantes de cada vacante
// routerVacancy.get('/:id/postulant', async (req, res) => {
//     Vacancy.findByPk(req.paramas.id).then(vacancy => {
//         vacancy.getPostulants({
//             attribute: ['name']
//         }).then(postulant => {
//             res.json(postulant)
//         });
//     })
// })

module.exports = routerVacancy;

const { Router } = require("express");
const path = require("path");
const {
  New,
  Review,
  Contact,
  InterviewTech,
  InterviewRRHH,
  Offered, Hired, Rejected,
  Postulant,
  Technology,
  Skill,
  Language,
  Seniority,
  Vacancy,
  Location,
  Login,
  Business, 
} = require("../db");

const { check, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const routerPostulant = Router();
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


//validado por el nombre

routerPostulant.get("/", async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const allPostulant = await Postulant.findAll({
        where: {
          loginEmail: id,
        },
        include: [
          {
            model: Location,
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
      });

      console.log(allPostulant)

      allPostulant
        ? res.status(200).send(allPostulant)
        : res.status(400).send("No applicant found");
    } else {
      const allPostulant = await Postulant.findAll({
        include: [
          {
            model: Location,
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
      });
      allPostulant
        ? res.status(200).send(allPostulant)
        : res.status(400).send("No applicant found");
    }
  } catch (error) {
    res.status(400).send("ERROR" + error);
  }
});

//****************BUSQUEDA DEL SEARCHBAR DE POSTULANTE**************** */
routerPostulant.get("/search/:name", async (req, res) => {
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
        // { model: Vacancy,
        //   attributes: ["name"],
        //   through: {
        //     attributes: [],
        //   },
        // },
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
            // {
            //   model: Business,
            //   attributes: ["name"],
            //   through: {
            //     attributes: [],
            //   },
            // },
          ],
        },
      ],
    });

    if (vacancies.length !== 0) acum.push(vacancies);
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
    res.json(acum[0]);
  } catch (e) {
    console.log(e);
  }
});

//*************Ruta que postea un id del postulante para agregar sus vacantes relacion de muchos a muchoa */
routerPostulant.post("/postulate/:id", async (req, res) => {
  const { id } = req.body;

  const postulanteId = req.params.id;
  try {
    let postulante = await Postulant.findByPk(postulanteId);

    let vacancy = await Vacancy.findByPk(id);

    await postulante.addVacancy(vacancy);

    res.status(200).json(postulante);
  } catch (e) {
    console.log(e);
  }
});

//**********Remueve una vacante del postulante */
routerPostulant.put("/postulate/:id", async (req, res) => {
  const { id } = req.body;
  const postulantId = req.params.id;
  try {
    let postulante = await Postulant.findByPk(postulantId);

    let vacancy = await Vacancy.findByPk(id);

    await postulante.removeVacancy(vacancy);

    res.status(200).json("sseasesa");
  } catch (e) {
    console.log(e);
  }
});

routerPostulant.post("/", upload.any("file", 2), async (req, res) => {
  //el campo de genero recibe un solo valor
  let {
    name,
    gender,
    phone,
    location,
    github,
    linkedIn,
    portfolio,
    technologies,
    languages,
    skills,
    seniority,
    vacancy,
    extras,
    loginId,
  } = req.body;

  let file = req.files;
  //let cv =req.file
  console.log(file);
  if (file) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].mimetype === 'image/jpeg') {
        var photo = file[i].path
      }
      else {
        var CV = file[i].path
      }
    }
  }



  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //se crea un obj errores convierto en array,
      res.status(422).json({ errores: errors.array() });
    }
    createPostuland = await Postulant.create({
      name,
      gender,
      phone,
      photo,
      CV,
      location,
      github,
      linkedIn,
      portfolio,
      extras,
    });

    // busca la vacante
    if (vacancy) {

      const allVacancy = await Vacancy.findAll({
        where: { name: vacancy },
      });
      await createPostuland.addVacancy(allVacancy);
    }

    if (languages) {

      let arrL = languages.split(",")
      let lenguageInDB = await Language.findAll({
        where: {
          name: arrL,
        },
      });
      await createPostuland.addLanguages(lenguageInDB);
    }

    if (seniority) {
      let seniorityInDB = await Seniority.findAll({
        where: {
          name: seniority,
        },
      });
      await createPostuland.addSeniority(seniorityInDB);
    }

    if (skills) {
      let skillArr = skills.split(",")
      let skillInDB = await Skill.findAll({
        where: {
          name: skillArr,
        },
      });
      await createPostuland.addSkill(skillInDB);
    }

    if (technologies) {
      let tecno = technologies.split(",")
      let technologyInDB = await Technology.findAll({
        where: {
          name: tecno,
        },
      });
      await createPostuland.addTechnology(technologyInDB);
    }

    if (location) {
      let locationInDB = await Location.findAll({
        where: {
          name: location,
        },
      });
      await createPostuland.addLocation(locationInDB);
    }

    let finderLogin = await Login.findByPk(loginId);
    await createPostuland.setLogin(finderLogin);

    res.json(createPostuland);
  } catch (error) {
    console.log(error);
  }
});


//Trae las vacantes  por postulante
//paso 2
//Ruta que Trae las vacantes con sus estados  por postulante (recibo id de poestulante)

const arr = [New, Review, Contact,InterviewTech, InterviewRRHH, Offered, Hired, Rejected]

routerPostulant.get("/:id/vacancy", async (req, res) => {

  //Aqui busco postulantes con sus estados
  var vacanciesP = []
  var postulantP = []
  for (var i = 0; i < arr.length; i++) {
    postulantP = await Postulant.findByPk(req.params.id, {
      include: [
        {
          model: arr[i],
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        }
      ]
    })
    //le incluyo a vacancies cada estado con su postulante
    vacanciesP.push(postulantP.dataValues)
  }//Fin del for

  //mapea las vacantes de ese postulnte y le agrega el estado
  var news = vacanciesP.map(el => {
    if (el.news) {
      let estado = el.news
      return estado
    }
    if (el.reviews) {
      let estado = el.reviews
      return estado
    }
    if (el.contacts) {
      let estado = el.contacts
      return estado
    }
    if (el.interviewTechs) {
      let estado = el.interviewTechs
      return estado
    }
    if (el.interviewRRHHs) {
      let estado = el.interviewRRHHs
      return estado
    }
    if (el.offereds) {
      let estado = el.offereds
      return estado
    }
    if (el.hireds) {
      let estado = el.hireds
      return estado
    }
    if (el.rejecteds) {
      let estado = el.rejecteds
      return estado
    }
    //Ojo Hasta aqui news trae todos sin el estado incluido
  })
  //aqui le incluto los estados en cada vacante
  var todos = []
  for (var i = 0; i < news.length; i++) {
    if (i === 0) {
      const e = { status: "New" };
      for (var j = 0; j < news[i].length; j++) {
        todos.push(Object.assign(news[i][j], e))
      }
    }
    if (i === 1) {
      const e = { status: "Review" };
      for (var j = 0; j < news[i].length; j++) {
        todos.push(Object.assign(news[i][j], e))
      }
    }
    if (i === 2 && news[i].length !== 0) {
      const e = { status: "Contacted" };
      for (var j = 0; j < news[i].length; j++) {
        todos.push(Object.assign(news[i][j], e))
      }
    }

   
  // if (i === 3 && news[i].length !== 0) {
  //     const e = { status: "Holisssss Naty" };
  //     for (var j = 0; j < news[i].length; j++) {
  //       todos.push(Object.assign(news[i][j], e))
  //     }
  //   }

    if (i === 4 && news[i].length !== 0) {
      const e = { status: "InterviewTech" };
      for (var j = 0; j < news[i].length; j++) {
        todos.push(Object.assign(news[i][j], e))
      }
    }
// [New, Review, Contact, InterviewRRHH, InterviewTech, Offered, Hired, Rejected]
if (i === 5 && news[i].length !== 0) {
  const e = { status: "Offered" };
  for (var j = 0; j < news[i].length; j++) {
    todos.push(Object.assign(news[i][j], e))
  }
}
    if (i === 6 && news[i].length !== 0) {
      const e = { status: "Hired" };
      for (var j = 0; j < news[i].length; j++) {
        todos.push(Object.assign(news[i][j], e))
      }
    }
    if (i === 7 && news[i].length !== 0) {
      const e = { status: "Rejected" };
      for (var j = 0; j < news[i].length; j++) {
        todos.push(Object.assign(news[i][j], e))
      }
    }
  }
  // COdigo de Vacantes por postulantes con un for y sus modelos de estado trae todos 

  var postulant = []
  for (let i = 0; i < arr.length; i++) {
    postulant = await Postulant.findByPk(req.params.id, {
      include: [
        {
          model: Vacancy,
          include: [
            {
              model: Technology,
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
              model: Business,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },

          ],
          through: {
            attributes: [],
          },
        }
      ]
    })
  }
  var agregado = []
  agregado.push(postulant)

  var Nuevo = []
  var filtroUno = agregado.map(el => el.vacancies)

  for (var x = 0; x < todos.length; x++) {
    for (var y = 0; y < filtroUno[0].length; y++) {
      var obj = { status: todos[x].status }

      if (todos[x].id === filtroUno[0][y].id) {
        Nuevo.push(Object.assign(filtroUno[0][y], obj))
      }
    }
  }
  var Nuevo2 = []
  var otro = Nuevo.map(el => el.dataValues)
  var otro2 = Nuevo.map(el => el.status)
  for (var x = 0; x < otro.length; x++) {

    var obj = { status: otro2[x] }
    Nuevo2.push(Object.assign(otro[x], obj))

  }
console.log(postulant)
  res.json(postulant)
})
  //Cuenta cuantos vacantes tiene un postulante
  routerPostulant.get("/:id/vacancy", async (req, res) => {
    try{Postulant.findByPk(req.params.id).then((postulant) => {
      postulant
        .getVacancies({
          attributes: ["name", "description"],
        })
        .then((vacancy) => {
          console.log(vacancy);
          res.json(vacancy.length);
        });
    });
  } catch (e) {
    console.log(e)
  }
});

//put para modificar datos de un detalle / perfil de postulante
routerPostulant.put("/:id", async (req, res) => {
  try {
    await Postulant.update(req.body, {
      where: { id: req.params.id },
    });
    if (req.body.vacancy) {
      const allVacancy = await Vacancy.findAll({
        where: { id: req.params.vacancy },
      });
      await createPostuland.addVacancy(allVacancy);
    }
    res.json({
      sucess: "The postuland details have been successfully modified",
    });
  } catch (error) {
    res.status(400).send("ERROR" + error);
  }
});

routerPostulant.put("/editProfile/:id", async (req, res) => {
  const { loginId } = req.params
  let {
    name,
    gender,
    phone,
    location,
    github,
    linkedIn,
    portfolio,
    technologies,
    languages,
    skills,
    seniority,
    vacancy,
    extras,

  } = req.body;

  try {
    const finderPostulant = await Postulant.findOne({
      where: {
        loginEmail: loginId
      }
    });

    finderPostulant.update({
      name,
      gender,
      phone,
      linkedIn,
      portfolio,
      github,
      extras,
    });

    if (location) {
      let locationInDB = await Location.findAll({
        where: {
          name: location
        }
      });
    }
  } catch (e) {
    console.log(e)
  }
})

routerPostulant.delete("/:id", async (req, res) => {
  try {
    await Postulant.destroy({
      where: { id: req.params.id },
    });
    res.json({ sucess: "The postulant data has been successfully deleted" });
  } catch (error) {
    res.status(400).send("ERROR" + error);
  }
});

module.exports = routerPostulant;

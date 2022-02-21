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
  Business
} = require("../db");

const { check, validationResult } = require("express-validator");
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

routerPostulant.post("/", upload.any("file",2), async (req, res) => {
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
  if(file){
     for(let i=0;i<file.length;i++){
       if(file[i].mimetype==='image/jpeg'){
         var photo=file[i].path
       }
       else{
         var CV=file[i].path
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

      let arrL=languages.split(",")
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
      let skillArr=skills.split(",")
      let skillInDB = await Skill.findAll({
        where: {
          name: skillArr,
        },
      });
      await createPostuland.addSkill(skillInDB);
    }

    if (technologies) {
      let tecno=technologies.split(",")
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
routerPostulant.get("/:id/vacancy", async (req, res) => {
  Postulant.findByPk(req.params.id).then((postulant) => {
    postulant
      .getVacancies({
        attributes: ["name", "description"],
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
        console.log(vacancy);
        res.json(vacancy);
      });
  });
});

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
    });}catch(e){
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
      where : {
        loginEmail : loginId
      }
    });

    finderPostulant.update({
      name ,
      gender ,
      phone,
      linkedIn ,
      portfolio,
      github,
      extras,
    });

    if (location) {
      let locationInDB = await Location.findAll({
        where : {
          name : location
        }
      });
    }
  } catch (e) {
    console.log (e)
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

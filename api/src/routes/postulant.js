const { Router } = require("express");

const {
  Postulant,
  Technology,
  Skill,
  Language,
  Seniority,
  Vacancy,
} = require("../db");
const { check, validationResult } = require("express-validator");

const routerPostulant = Router();

//validado por el nombre

routerPostulant.get("/", async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const allPostulant = await Postulant.findAll({
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
    } else {
      const allPostulant = await Postulant.findAll({
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
      });
      allPostulant
        ? res.status(200).send(allPostulant)
        : res.status(400).send("No applicant found");
    }
  } catch (error) {
    res.status(400).send("ERROR" + error);
  }
});

routerPostulant.post(
  "/",
  [
    /*  check('name', 'name is required').not().isEmpty(),
    check('gender', 'The gender is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('photo', 'The photo is required').not().isEmpty(),
    check('CV', 'CV is required').not().isEmpty(),
    check('location', 'The location is required').not().isEmpty(),
    check('github', 'github is required').not().isEmpty(),
    check('linkedIn', 'The linkedIn is required').not().isEmpty(),
    check('portfolio', 'portfolio is required').not().isEmpty()*/
  ],
  async (req, res) => {
    //el campo de genero recibe un solo valor
    let {
      name,
      gender,
      phone,
      photo,
      CV,
      location,
      github,
      linkedIn,
      portfolio,
      technologies,
      languages,
      skills,
      seniority,
      vacancy,
      extras
    } = req.body;
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
        extras
      });

      // busca la vacante
      if (vacancy) {
        const allVacancy = await Vacancy.findAll({
          where: { name: vacancy },
        });
        await createPostuland.addVacancy(allVacancy);
      }

      if (languages) {
        let lenguageInDB = await Language.findAll({
          where: {
            name: languages,
          },
        });
        await createPostuland.addLanguage(lenguageInDB);
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
        let skillInDB = await Skill.findAll({
          where: {
            name: skills,
          },
        });
        await createPostuland.addSkill(skillInDB);
      }

      if (technologies) {
        let technologyInDB = await Technology.findAll({
          where: {
            name: technologies,
          },
        });
        await createPostuland.addTechnology(technologyInDB);
      }

      res.json(createPostuland);
    } catch (error) {
      res.status(400).send("ERROR" + error);
    }
  }
);
//Trae las vacantes  por postulante
routerPostulant.get("/:id/vacancy", async (req, res) => {
  Postulant.findByPk(req.params.id).then((postulant) => {
    postulant
      .getVacancies({
        attributes: ["name", "description"],
      })
      .then((vacancy) => {
        res.json(vacancy);
      });
  });
});

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
  }})

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

//*************PROBANDO vacName *************** */

routerPostulant.get("/vacName", async (req, res) => {
  const { name } = req.query;

  // const allVacancy = await Vacancy.findAll();
  console.log(name);

  try {
    const allVacancy = await Vacancy.findOne({
      where: { name: name },
    });

    res.status(200).json(allVacancy);
  } catch (e) {
    console.log(e);
  }
});

routerPostulant.post('/postulate/:id', async (req, res) => {
  const {id} = req.body
 
  const postulanteId = req.params.id
  try {
    let postulante = await Postulant.findByPk(postulanteId)
   
    let vacancy = await Vacancy.findByPk(id)
   
    await postulante.addVacancy(vacancy);
    
      res.status(200).json(postulante);

  }catch(e){
    console.log(e)
  }
})

routerPostulant.put('/postulate/:id', async (req, res) =>{
  const id = Number(req.body.id)
  const postulantId = req.params.id;
  try {
      
    let postulante = await Postulant.findByPk(postulantId)
   
    let vacancy = await Vacancy.findByPk(id)

    await postulante.removeVacancy(vacancy) 

    res.status(200).json('Remove succsessfully')
  }catch (e) {
    console.log(e)
  }
})

module.exports = routerPostulant;

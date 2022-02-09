//Comentario de Aly
//const middleware = require('./Middlewares/loginMiddleware')
const { Router } = require("express");
const routerBusiness = require("./business");
const routerPostulant = require("./postulant");
const routerVacancy = require("./vacancy");
const routerSignUp = require("./registroManual");
const routerAdmin = require("./admin");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const language = require("./Filters/language");
const skill = require("./Filters/skills");
const tech = require("./Filters/technology");
const seniority = require("./Filters/seniority");
const allFilters = require("./Filters/allFiltersVacancy");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/business", routerBusiness);
router.use("/postulant", routerPostulant);
router.use("/users", routerSignUp);
router.use("/vacancy", routerVacancy);
router.use("/allFiltersVacancy", allFilters);
router.use("/admin", routerAdmin);

router.use("/languages", language);
router.use("/skills", skill);
router.use("/tech", tech);
router.use("/seniority", seniority);

module.exports = router;

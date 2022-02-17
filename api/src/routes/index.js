//Comentario de Aly
//const middleware = require('./Middlewares/loginMiddleware')
const { Router } = require("express");
const routerBusiness = require("./business");
const routerPostulant = require("./postulant");
const routerVacancy = require("./vacancy");
const routerSignUp = require("./registroManual");
const routerAdmin = require("./admin");
const routerFavorite = require("./favorite");
const routerPending = require("./pending");
const routerEditing = require('./postulantEdit')
const routerEditingVacancy= require('./editVacancy')
const routerMetric = require("./metric");
const routerPipeLine = require("./pipeline")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const language = require("./Filters/language");
const skill = require("./Filters/skills");
const tech = require("./Filters/technology");
const seniority = require("./Filters/seniority");
const allFilters = require("./Filters/allFiltersVacancy");
const allFiltersBuss = require("./Filters/allFiltersBusiness");
const location = require("./Filters/location");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/business", routerBusiness);
router.use("/postulant", routerPostulant);
router.use("/users", routerSignUp);
router.use("/vacancy", routerVacancy);
router.use("/allFiltersVacancy", allFilters);
router.use("/allFiltersBusiness", allFiltersBuss);
router.use("/admin", routerAdmin);
router.use("/favorite", routerFavorite);
router.use("/pending", routerPending);
router.use('/postulantEdit', routerEditing);
router.use("/metric", routerMetric);
router.use("/pipeline", routerPipeLine);
router.use("/location", location);
router.use("/languages", language);
router.use("/skills", skill);
router.use("/tech", tech);
router.use("/seniority", seniority);
router.use('/vacancyEdit', routerEditingVacancy)

module.exports = router;

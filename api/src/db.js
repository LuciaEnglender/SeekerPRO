// comentario

require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/hiredpro`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];
// dale boquita campeon
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Admin, Business, Language, Location, Login,Message, PipeLine,Postulant, Skill,Technology,Vacancy,Seniority} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//Tabla intermedia ente Postulante y Vacante muchos  a  muchos
Business.belongsToMany(Vacancy, {through : "business_vacancy" });
Vacancy.belongsToMany(Business, {through : "business_vacancy" });// 

Postulant.belongsToMany(Vacancy, {through : "postulant_vacancy" });
Vacancy.belongsToMany(Postulant, {through : "postulant_vacancy" });

Vacancy.belongsToMany(Technology, {through : "vacancy_technology"});
Technology.belongsToMany(Vacancy, {through : "vacancy_technology"});

Vacancy.belongsToMany(Skill, {through : "vacancy_skill"});
Skill.belongsToMany(Vacancy, {through : "vacancy_skill"});

Vacancy.belongsToMany(Seniority, {through : "vacancy_seniority"});
Seniority.belongsToMany(Vacancy, {through : "vacancy_seniority"});

Vacancy.belongsToMany(Language, {through : "vacancy_language"});
Language.belongsToMany(Vacancy, {through : "vacancy_language"});

Vacancy.belongsToMany(Location,{through : "vacancy_location"});
Location.belongsToMany(Vacancy,{through : "vacancy_location"});

//Tabla intermedia ente Postulante y todas las demas muchos  a  muchos

Postulant.belongsToMany(Technology, {through : "postulant_technology"});
Technology.belongsToMany(Postulant, {through : "postulant_technology"});

Postulant.belongsToMany(Skill, {through : "postulant_skill"});
Skill.belongsToMany(Postulant, {through : "postulant_skill"});

Postulant.belongsToMany(Seniority, {through : "postulant_seniority"});
Seniority.belongsToMany(Postulant, {through : "postulant_seniority"});


Postulant.belongsToMany(Language, {through : "postulant_language"});
Language.belongsToMany(Postulant, {through : "postulant_language"});

Postulant.belongsToMany(Location,{through : "postulant_location"});
Location.belongsToMany(Postulant,{through : "postulant_location"});


//Tablas intermedias de uno a muchos 

Login.hasMany(Postulant, {foreignKey : "fk_login"});
Postulant.belongsTo(Login);

Login.hasMany(Business, {foreignKey : "fk_login"});
Business.belongsTo(Login);

Login.hasMany(Admin,{foreignKey : "fk_login"});
Admin.belongsTo(Login);

Business.hasMany(Vacancy, {foreignKey : "fk_business"});
Vacancy.belongsTo(Business);

// //Tablas intermedias de uno a uno

Vacancy.hasOne(PipeLine,{foreignKey:"fk_vacancy"})
PipeLine.belongsTo(Vacancy);

///lo Trabajado probando para agragar un postulante a una vacante



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

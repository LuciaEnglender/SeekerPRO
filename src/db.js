//                                   _______
//                            _,,ad8888888888bba,_
//                         ,ad88888I888888888888888ba,
//                       ,88888888I88888888888888888888a,
//                     ,d888888888I8888888888888888888888b,
//                    d88888PP"""" ""YY88888888888888888888b,
//                  ,d88"'__,,--------,,,,.;ZZZY8888888888888,
//                 ,8IIl'"                ;;l"ZZZIII8888888888,
//                ,I88l;'                  ;lZZZZZ888III8888888,
//              ,II88Zl;.                  ;llZZZZZ888888I888888,
//             ,II888Zl;.                .;;;;;lllZZZ888888I8888b
//            ,II8888Z;;                 `;;;;;''llZZ8888888I8888,
//            II88888Z;'                        .;lZZZ8888888I888b
//            II88888Z; _,aaa,      .,aaaaa,__.l;llZZZ88888888I888
//            II88888IZZZZZZZZZ,  .ZZZZZZZZZZZZZZ;llZZ88888888I888,
//            II88888IZZ<'(@@>Z|  |ZZZ<'(@@>ZZZZ;;llZZ888888888I88I
//           ,II88888;   `""" ;|  |ZZ; `"""     ;;llZ8888888888I888
//           II888888l            `;;          .;llZZ8888888888I888,
//          ,II888888Z;           ;;;        .;;llZZZ8888888888I888I
//          III888888Zl;    ..,   `;;       ,;;lllZZZ88888888888I888
//          II88888888Z;;...;(_    _)      ,;;;llZZZZ88888888888I888,
//          II88888888Zl;;;;;' `--'Z;.   .,;;;;llZZZZ88888888888I888b
//          ]I888888888Z;;;;'   ";llllll;..;;;lllZZZZ88888888888I8888,
//          II888888888Zl.;;"Y88bd888P";;,..;lllZZZZZ88888888888I8888I
//          II8888888888Zl;.; `"PPP";;;,..;lllZZZZZZZ88888888888I88888
//          II888888888888Zl;;. `;;;l;;;;lllZZZZZZZZW88888888888I88888
//          `II8888888888888Zl;.    ,;;lllZZZZZZZZWMZ88888888888I88888
//           II8888888888888888ZbaalllZZZZZZZZZWWMZZZ8888888888I888888,
//           `II88888888888888888b"WWZZZZZWWWMMZZZZZZI888888888I888888b
//            `II88888888888888888;ZZMMMMMMZZZZZZZZllI888888888I8888888
//             `II8888888888888888 `;lZZZZZZZZZZZlllll888888888I8888888,
//              II8888888888888888, `;lllZZZZllllll;;.Y88888888I8888888b,
//             ,II8888888888888888b   .;;lllllll;;;.;..88888888I88888888b,
//             II888888888888888PZI;.  .`;;;.;;;..; ...88888888I8888888888,
//             II888888888888PZ;;';;.   ;. .;.  .;. .. Y8888888I88888888888b,
//            ,II888888888PZ;;'                        `8888888I8888888888888b,
//            II888888888'                              888888I8888888888888888b
//           ,II888888888                              ,888888I88888888888888888
//          ,d88888888888                              d888888I8888888888ZZZZZZZ
//       ,ad888888888888I                              8888888I8888ZZZZZZZZZZZZZ
//     ,d888888888888888'                              888888IZZZZZZZZZZZZZZZZZZ
//   ,d888888888888P'8P'                               Y888ZZZZZZZZZZZZZZZZZZZZZ
//  ,8888888888888,  "                                 ,ZZZZZZZZZZZZZZZZZZZZZZZZ
// d888888888888888,                                ,ZZZZZZZZZZZZZZZZZZZZZZZZZZZ
// 888888888888888888a,      _                    ,ZZZZZZZZZZZZZZZZZZZZ888888888
// 888888888888888888888ba,_d'                  ,ZZZZZZZZZZZZZZZZZ88888888888888
// 8888888888888888888888888888bbbaaa,,,______,ZZZZZZZZZZZZZZZ888888888888888888
// 88888888888888888888888888888888888888888ZZZZZZZZZZZZZZZ888888888888888888888
// 88888888888888888888888888888888888ZZZZZZZZZZZZZZ8888888888888888888888888888
// 8888888888888888888888888888888888ZZZZZZZZZZZZZZ88888888888888888 David  8888
// 88888888888888888888888888888888ZZZZZZZZZZZZZZ8888888888888888888 Benja 88888


require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
  
//const { DATABASE_URL } = process.env;
//const DATABASE_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}/hiredpro`
//const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// const { DATABASE_URL } = process.env;
const DATABASE_URL = "postgres://bbvsylwlpvhgqq:3535d924e0c63721da39debabe7a096db94d691e97174e22ee6a9d9d99732191@ec2-52-73-29-239.compute-1.amazonaws.com:5432/d9kbdiduvvh4e"

// const devConfig = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
// const proConfig = DB_DATABASE_URL;
// console.log(`data: ${DB_DATABASE_URL}`)
// console.log(process.env)

const sequelize = new Sequelize(DATABASE_URL,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
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
const {
  Admin,
  Business,
  Language,
  Location,
  Login,
  Message,
  PipeLine,
  Postulant,
  Pending,
  Skill,
  Technology,
  Vacancy,
  Seniority,
  New,
  Review,
  Contact,
  InterviewRRHH,
  InterviewTech,
  Offered,
  Hired,
  Rejected,
  Conversation,
  Order
} = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//Tabla intermedia ente Postulante y Vacante muchos  a  muchos

Business.belongsToMany(Vacancy, {through : "business_vacancy" });
Vacancy.belongsToMany(Business, {through : "business_vacancy" });

Postulant.belongsToMany(Business, {through : "business_postulant" });//agregar al diagrama
Business.belongsToMany(Postulant, {through : "business_postulant" });

Pending.belongsToMany(Vacancy, {through : "pending_vacancy" });
Vacancy.belongsToMany(Pending, {through : "pending_vacancy" });

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

//relaciones para la PIPILINE
// //Tablas intermedias de uno a uno

Vacancy.hasOne(PipeLine,{foreignKey:"fk_vacancy"})
PipeLine.belongsTo(Vacancy);

Vacancy.hasOne(New,{foreignKey:"fk_vacancy"})
New.belongsTo(Vacancy);

Vacancy.hasOne(Review,{foreignKey:"fk_vacancy"})
Review.belongsTo(Vacancy);

Vacancy.hasOne(Contact,{foreignKey:"fk_vacancy"})
Contact.belongsTo(Vacancy);

Vacancy.hasOne(InterviewRRHH,{foreignKey:"fk_vacancy"})
InterviewRRHH.belongsTo(Vacancy);

Vacancy.hasOne(InterviewTech,{foreignKey:"fk_vacancy"})
InterviewTech.belongsTo(Vacancy);

Vacancy.hasOne(Offered,{foreignKey:"fk_vacancy"})
Offered.belongsTo(Vacancy);

Vacancy.hasOne(Hired,{foreignKey:"fk_vacancy"})
Hired.belongsTo(Vacancy);

Vacancy.hasOne(Rejected,{foreignKey:"fk_vacancy"})
Rejected.belongsTo(Vacancy);

Postulant.belongsToMany(Contact, { through: "contact_postulant" });
Contact.belongsToMany(Postulant, { through: "contact_postulant" });

Postulant.belongsToMany(InterviewRRHH, { through: "interviewrrhh_postulant" });
InterviewRRHH.belongsToMany(Postulant, { through: "interviewrrhh_postulant" });

Postulant.belongsToMany(InterviewTech,{through:"interviewtech_postulant"})
InterviewTech.belongsToMany(Postulant, {through:"interviewtech_postulant"});

Postulant.belongsToMany(Offered,{through:"offered_postulant"})
Offered.belongsToMany(Postulant, {through:"offered_postulant"});

Postulant.belongsToMany(Hired,{through:"hired_postulant"})
Hired.belongsToMany(Postulant, {through:"hired_postulant"});

Postulant.belongsToMany(Rejected,{through:"rejected_postulant"})
Rejected.belongsToMany(Postulant, {through:"rejected_postulant"});

Postulant.belongsToMany(New,{through:"new_postulant"})
New.belongsToMany(Postulant,{through:"new_postulant"});

Postulant.belongsToMany(Review,{through:"review_postulant"})
Review.belongsToMany(Postulant, {through:"review_postulant"});

//////////////////CHAT

Business.hasMany(Conversation, { foreignKey: "fk_business" });
Conversation.belongsTo(Business);

Postulant.hasMany(Conversation, { foreignKey: "fk_postulant" });
Conversation.belongsTo(Postulant);

Conversation.belongsToMany(Message, {through:"conversation_message"});
Message.belongsToMany(Conversation, {through:"conversation_message"});

Business.hasMany(Message, { foreignKey: "fk_business" });
Message.belongsTo(Business);

Postulant.hasMany(Message, { foreignKey: "fk_postulant" });
Message.belongsTo(Postulant);

//MERCADOPAGO

Business.hasOne(Order,  { foreignKey: "fk_busines" })
Order.belongsTo(Business)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

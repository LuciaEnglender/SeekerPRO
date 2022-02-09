const { Router } = require("express");
const { Login } = require("../db.js");
// bcrypt para encriptar contraseñas!
const bcrypt = require("bcryptjs");
//express-validator libreria
//metodo check comprueba los diferentes datos que se estan insertando dentro de la ruta
//con la que se está trabajando. Funciona como un middleware
const { check, validationResult } = require("express-validator");
//manejo de fechas
const moment = require("moment");

const jwt = require("jwt-simple");
const routerSignUp = Router();

routerSignUp.post(
  "/register",
  [
    //acá se pasan todos los checks que vamos a verificar. Se concatenan los metodos traidos de expressValidator que verifican
    //los check.

    check("email", "The email must be in email format")
      .isEmail()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          Login.findOne(
            { where: { email: req.body.email } },
            function (err, user) {
              if (err) {
                reject(new Error("Server Error"));
              }
              if (Boolean(user)) {
                reject(new Error("E-mail already in use"));
              }
              resolve(true);
            }
          );
        });
      }),
  ],
  async (req, res) => {
    //me genero el objeto error para verificar luego si esta vacio (que significa que no hay errores)
    //o si tiene cosas dentro, es porque hay errores. Metodo de expressValidator

    const errors = validationResult(req);

    if (errors.length !== 0) {
      res.status(422).json({ errores: errors }); //me creo un objeto errores para mostrar en json,
      //y convierto en array los errores pasados por validationResult
    }
    //function encriptadora de passwords. Primer parámetro la password a encrptar, y el segundo el
    //numero de veces que se va a aplicar el algoritmo de encriptacion para mas seguriadad
    req.body.email = bcrypt.hashSync(req.body.email, 10);
    const newUser = await Login.create(req.body);

    res.status(200).send("creado");
  }
);

routerSignUp.post("/ingresar", async (req, res) => {
  //este método hace la operación inversa de la encriptación
  const iguales = bcrypt.compareSync(req.body.email, user.email);
  //si el método comprobó la comparación, la pass está bien, else error
  if (iguales) {
    let respuestas = "";
    const user = await Login.findAll();
    if (!user.firstTime) {
      respuestas = "es su primera vez";
      user.firstTime = true;
    } else {
      respuestas = "ya está registrado";
    }
    res.json({ succes: createToken(user), answer: respuestas });
    //le paso la info del usuario con la funcion para encriptar (ver línea 59 )
  } else {
    res.json({ error: "El usuario o contraseña es incorrecto" });
  }
});

const createToken = (user) => {
  //objeto que se va codificar dentro del token que se va a enviar al usuario cuando el login sea correcto
  const payload = {
    usuarioId: user.id,
    createdAt: moment().unix(),
    //cuando se ha creado el token?moment devuelve la fecha actual, y unix la vuelve formato unix(el número de segundos que hay desde 01/01/1970. Porqué? No hay porqué)
    expiredAt: moment().add(5, "minutes").unix(), //limite de 5 minutes
  };
  //se devuelve el token encriptado. Recibe el objeto payload y una frase secreta de contraseña
  return jwt.encode(payload, "frase secreta");
};

module.exports = routerSignUp;

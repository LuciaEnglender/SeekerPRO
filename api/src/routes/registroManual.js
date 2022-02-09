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

routerSignUp.post("/register", async (req, res) => {
  const { email } = req.body;
  existenUser = await Login.findOne({
    where: { email: email },
  });

  if (!existenUser) {
    const newUser = await Login.create(req.body);
    return res.status(200).send(newUser);
  } else {
    return res.status(200).send(existenUser);
  }
});

routerSignUp.get("/:email", async (req, res) => {
  const { email } = req.params;

  const finder = await Login.findOne({
    where: {
      email: email,
    },
  });

  res.status(200).send(finder);
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

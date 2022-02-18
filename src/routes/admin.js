const { Router } = require("express");
const { Admin } = require("../db");

const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')


const routerAdmin = Router();

// ***OJO IDEAS A Dialogar La autenticacion de administracion seria como una autenticacion aparte *para que 
// solo con un super_usuario pueda hacer las modificaciones****************
//los usarios administradores qque ya esten en la tabla pueden acceder al sistema pero solo el superusuario maneje las rutas 
// 
routerAdmin.get('/', async (req, res) => {
    const { userName } = req.query;
    const allAdmin = await Admin.findAll();
    try {

        if (userName === 'admin') {

            const userNameAdmin = await allAdmin.filter(el => el.dataValues.userName.toLowerCase().includes(userName.toLowerCase()))
            console.log(userNameAdmin)
            userNameAdmin ?
                res.status(200).send(UserNameAdmin) :
                res.status(404).send('Unregistered admin');

        } else {
            allAdmin ?
                res.status(200).json(allAdmin) :
                res.status(400).send('The username does not exist');
        }
    } catch (erro) {
        res.status(404).send('ERROR' + erro)
    }
});

//creo una ruta para el administrador de id uno sea el unico que pueda conseguir la información de la tabla de admin

routerAdmin.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allAdmin = await Admin.findAll();
    try {

        if (id === "1") {
            res.json(allAdmin)

        } else {
            res.status(400).send('No eres el Master Administrador')

        }
    } catch (erro) {
        res.status(404).send('ERROR' + erro)
    }
});

routerAdmin.post('/', [
    //acá se pasan todos los checks que vamos a verificar. Se concatenan los metodos traidos de expressValidator que verifican 
    //los check. 
    check('userName', 'Username is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The email must be in email format').isEmail()

], async (req, res) => {
    console.log(req.body)
    //objeto error . //Metodo de expressValidator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //se crea un obj errores convierto en array,
        res.status(422).json({ errores: errors.array() })
    }
    //function encriptadora pasada 10 veces
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await Admin.create(req.body)
    res.status(200).send(newUser)

})

//validacion que solo el Admin 1 pueda modificar la tabla
routerAdmin.put('/:id', async (req, res) => {

    try {
        if (req.params.id === '1') {

            await Admin.update(req.body, {
                where: { id: req.params.id }

            });
            res.json({ sucess: 'The admin details have been successfully modified' })
        } else {
            res.json({ sucess: 'You do not have the necessary permissions to access this route' })
        }
    } catch (erro) {
        res.status(404).send('ERROR' + erro)
    }
});

routerAdmin.delete('/:id', async (req, res) => {
    //validacin de modificacin de tabla de administrador
    //como poder validar que si es uno y solo 1 puede borra el id que quiera 
    //podria llegar un segudo parametro para que acceda a la ruta
    try {
        await Admin.destroy({
            where: { id: req.params.id }

        });
        res.json({ sucess: 'The admin details have been successfully deleted' })
    } catch (erro) {
        res.status(404).send('ERROR' + erro)
    }
});

module.exports = routerAdmin;
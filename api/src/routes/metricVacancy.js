const { Router } = require("express");

const { Vacancy, Language, Technology, Seniority } = require("../db");

const routerMetric = Router();

// Traer las vacantes para contabiliza tecnologia language y seniority


/*
routerMetric.get('/:name', async (req, res) => {
    try {
        const numLanguage = await Vacancy.findAll({

            include: [
                {
                    model: Language,
                    where: {
                        name: req.params.name
                    },
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        });
        if (numLanguage.length !== 0) {
            res.json(numLanguage.length)

        } else {

            const numTech = await Vacancy.findAll({

                include: [
                    {
                        model: Technology,
                        where: {
                            name: req.params.name
                        },
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ]
            });
            if (numTech.length !== 0) {
                res.json(numTech.length);

            } else {

                const numSeniority = await Vacancy.findAll({

                    include: [
                        {
                            model: Seniority,
                            where: {
                                name: req.params.name
                            },
                            attributes: ["name"],
                            through: {
                                attributes: [],
                            },
                        },
                    ]
                });
                res.json(numSeniority.length)
            }
        }

    } catch (error) {

    }
});
*/
routerMetric.get('/', async (req, res) => {
    ///*************************INICIO*************************** */


    try {
        var allMetric = []

        const arr = await Vacancy.findAll({
            include: [
                {
                    model: Language,
                    // where: {
                    //     name: req.params.name
                    // },
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        });

        allMetric.push({ "Total de Vacantes": arr.length })
        //aqui pusheo las los lenguages español ingles etc
        var nuevasProp = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].languages.length; j++) {
                nuevasProp.push(arr[i].languages[j].name)
            }
        }
        // // //aqui filtro el array para elementos unicos para crea un obj con esas proiedades 
        const filteredArray = nuevasProp.filter(function (ele, pos) {
            return nuevasProp.indexOf(ele) == pos;
        })

        // //capturar cada uno del nombres y crear un obj con losidiomas como nomb de prop y el valor numerico bucado como value
        const newObjLang = {}

        for (var y = 0; y < filteredArray.length; y++) {
            const numLanguage = await Vacancy.findAll({

                include: [
                    {
                        model: Language,
                        where: {
                            name: filteredArray[y]
                        },
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ]
            });



            Object.defineProperty(newObjLang, filteredArray[y], {
                value: numLanguage.length,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        allMetric.push(newObjLang)

        //**************METRIC TECHNOLOGY*************** */
        const arrTech = await Vacancy.findAll({
            include: [
                {
                    model: Technology,
                    // where: {
                    //     name: req.params.name
                    // },
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        });
        //aqui pusheo las Tecnologias js node 
        var nuevasProp = [];
        for (let i = 0; i < arrTech.length; i++) {
            for (let j = 0; j < arrTech[i].technologies.length; j++) {
                nuevasProp.push(arrTech[i].technologies[j].name)
            }
        }
        // // //aqui filtro el array para elementos unicos para crea un obj con esas proiedades 
        const filteredArrayTech = nuevasProp.filter(function (ele, pos) {
            return nuevasProp.indexOf(ele) == pos;
        })

        // //capturar cada uno del nombres y crear un obj con losidiomas como nomb de prop y el valor numerico bucado como value
        const newObjTech = {}

        for (var y = 0; y < filteredArrayTech.length; y++) {
            const numTech = await Vacancy.findAll({

                include: [
                    {
                        model: Technology,
                        where: {
                            name: filteredArrayTech[y]
                        },
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ]
            });



            Object.defineProperty(newObjTech, filteredArrayTech[y], {
                value: numTech.length,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }

        allMetric.push(newObjTech)


        //************Metricas para SENIORITY ********************** */

        const arrSeni = await Vacancy.findAll({
            include: [
                {
                    model: Seniority,
                    // where: {
                    //     name: req.params.name
                    // },
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        });

        //aqui pusheo las Tecnologias js node 
        var nuevasProp = [];
        for (let i = 0; i < arrSeni.length; i++) {
            for (let j = 0; j < arrSeni[i].seniorities.length; j++) {
                nuevasProp.push(arrSeni[i].seniorities[j].name)
            }
        }
        // // //aqui filtro el array para elementos unicos para crea un obj con esas proiedades 
        const filteredArraySeni = nuevasProp.filter(function (ele, pos) {
            return nuevasProp.indexOf(ele) == pos;
        })

        // //capturar cada uno del nombres y crear un obj con losidiomas como nomb de prop y el valor numerico bucado como value
        const newObjSeni = {}

        for (var y = 0; y < filteredArraySeni.length; y++) {
            const numSeni = await Vacancy.findAll({

                include: [
                    {
                        model: Seniority,
                        where: {
                            name: filteredArraySeni[y]
                        },
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ]
            });



            Object.defineProperty(newObjSeni, filteredArraySeni[y], {
                value: numSeni.length,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }

        allMetric.push(newObjSeni)
        //fin de seniority
        console.log(allMetric)
        res.json(allMetric)

    } catch (error) {
        console.log(error)
    }
});
//metricas de vacante mas postulada
routerMetric.post('/vacpost', async (req, res) => {
    try {
        var allMetric = []

        const arrVacancy = await Vacancy.findAll()

        //sacamos todos los name de las vacancies
        var arrNameVac = []
        for (let i = 0; i < arrVacancy.length; i++) {
            arrNameVac.push(arrVacancy[i].name)
        }

        const filteredArray = arrNameVac.filter(function (ele, pos) {
            return arrNameVac.indexOf(ele) == pos;
        })

        const newObjVacPost = {}
        for (var y = 0; y < filteredArray.length; y++) {
            var numPostulant = []

            // Vacancy.findByPk(y).then((vacancy) => {
            //     vacancy
            //         .getPostulants({

            //             attributes: ["id"],

            //         })
            //         .then((postulant) => {
            //             console.log(postulant.length);

                        
            //         });
            // });
            const vacancy = await Vacancy.findByPk(req.params.id, {
                include: [
               {
                 model: Postulant,
                 }
                ]
              })
              console.log(vacancy)
             ///quedo aqui agrgar la metrica.
              

            Object.defineProperty(newObjVacPost, filteredArray[y], {
                value: postulant.length,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        allMetric.push(newObjVacPost)
        // console.log(numPostulant)
        res.json(newObjVacPost)
    } catch (e) {
        console.log(e)
    }
})
//1 traer todas las vacantes en orden id y su nombre en el orfen que aparece dacarlo en un array 
//para que luego sea la propiedad del objecto y el id sea el parametro de busqueda del findByPk(i)
//hacer un for grade donde me incluya primero el nombre  por el id pasarcelo como findByPk(i) 

//2 traer vacantes por postuante

//3 hacer el obje con name de vacante y numero de postulantes


//Trae todos los pustulantes de una vacante de la tabla
routerMetric.get("/vacs/:id", async (req, res) => {
    var nuevar = []

    Vacancy.findByPk(req.params.id).then((vacancy) => {
        vacancy
            .getPostulants({
                attributes: ["name"],
            })
            .then((postulant) => {
                console.log(postulant);
                nuevar.push(postulant )
            });
    });
console.log(nuevar)
});


module.exports = routerMetric;

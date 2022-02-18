const { Router } = require("express");

const { Vacancy, Language, Technology, Seniority, Postulant } = require("../db");

const routerMetric = Router();

// Traer las vacantes para contabiliza tecnologia language y seniority



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
routerMetric.post('/vac', async (req, res) => {
    try {
        var allMetric = []
        var numVacporPostulante = []
        const arrVacancy = await Vacancy.findAll()
        // const arrVacancy1 = arrVacancy.unshift({"name":"agregado"})
        var newProperty = []
        for (let i =0; i < arrVacancy.length; i++) {
            
            newProperty.push(arrVacancy[i].name)
        }
        
         console.log(newProperty.length)

        //sacamos todos los name de las vacancies
        const newObjGender = {}
        for (var y = 1; y <= newProperty.length; y++) {
            // y++
            numVacporPostulante = await Vacancy.findByPk(y, {
                include: [
                    {
                        model: Postulant,
                    }
                ]
            })
            y--
            Object.defineProperty(newObjGender, newProperty[y], {
                value: numVacporPostulante.postulants.length,
                writable: true,
                enumerable: true,
                configurable: true
            });
            y++
            console.log(numVacporPostulante.postulants.length)
        }
        allMetric.push(newObjGender)
        res.json(newObjGender)
    } catch (e) {
        console.log(e)
    }
})

module.exports = routerMetric;
const {Router} = require("express");

const {Postulant} = require("../db")

const routerMetricP = Router()


// Metrica que busqueda por cantidad de genero

routerMetricP.get('/', async (req, res) => {
    try {
        var allMetric = []

        const arrPost = await Postulant.findAll()
        allMetric.push({"Total Postulant" : arrPost.length})
        
        var newProperty = []
        for (let i = 0; i < arrPost.length; i++) {
            newProperty.push(arrPost[i].gender)
        }

        const filteredArray = newProperty.filter(function (ele, pos) {
            return newProperty.indexOf(ele) == pos;
        })

        const newObjGender = {}
        for (var y = 0; y < filteredArray.length; y++) {
            // console.log(typeof (filteredArray[y]))
            var numGender = await Postulant.findAll({
                where: {
                    gender: filteredArray[y]

                },
                attributes: ["gender"],
                through: {
                    attributes: [],
                },
            });

            Object.defineProperty(newObjGender, filteredArray[y], {
                value: numGender.length,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        allMetric.push(newObjGender)
    
       
    res.json(allMetric)
} catch (e) {
    console.log(e)
}
})

module.exports = routerMetricP;
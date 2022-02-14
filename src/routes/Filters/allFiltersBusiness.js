const { Router } = require("express");
const { Postulant, Language, Skill, Technology, Seniority } = require('../../db');
//aqui debe req los postulantes
const router = Router();

router.post('/' , async (req, res) => {
   try{
        const {
            language,
            seniority,
            skill,
            technology
        } = req.body

        //estos dos no se usan
        const filtersInBody = {}
        const arrInclude = []
       
    //    /* if(language){
    //         filtersInBody.language = language
    //         arrInclude.push({
    //             model: Language,
    //             attributes: ["name"],
    //             where:{
    //                 name : language
    //             },
    //             through:{
    //             attributes:[]
    //             }
    //         })
    //     }
    //     if(seniority){
    //         filtersInBody.seniority = seniority
    //         arrInclude.push({
    //             model: Seniority,
    //             attributes: ["name"],
    //             where:{
    //                 name : seniority
    //             },
    //             through:{
    //             attributes:[]
    //             }
    //         })
    //     }
    //     if(skill){
    //         filtersInBody.skill= skill
    //         arrInclude.push({
    //             model: Skill,
    //             attributes: ["name"],
    //             where:{
    //                 name : skill
    //             },
    //             through:{
    //             attributes:[]
    //             }
    //         })
    //     }
    //     if(technology){
    //         filtersInBody.technology = technology
    //         arrInclude.push({
    //             model: Technology,
    //             attributes: ["name"],
    //             where:{
    //                 name : filtersInBody.technology
    //             },
    //             through:{
    //             attributes:[]
    //             }
    //         })
    //     }*/
        const totalPostulant = await Postulant.findAll(
        {
        //  aqui debe traer los postulantes
            include: [
                {
                    model: Language,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Seniority,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Skill,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Technology,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        })
        // console.log(totalPostulant)

        //Crearon tres banderas para poder manejar cada una de las opciones sin tener que separarlas (sin perderlas)
        var arrPostulant=[] 
        let valor=false;
        let valor2=false;
        let valor3=false;
        // console.log(totalPostulant[4].languages[0]._previousDataValues.name)
        // console.log(totalPostulant[0].languages[0]._previousDataValues)
        for(var i=0;i<totalPostulant.length;i++){

            if(language){                            
                console.log('entro if')
                if(typeof language==="string"){
                    // console.log('entro aca ')
                    for(var j=0;j<totalPostulant[i].languages.length;j++){
                        //res.status(200).json(totalPostulant)//
                        if(totalPostulant[i].languages[j]._previousDataValues.name===language){
                           
                            arrPostulant.push(totalPostulant[i])
                            valor=true
                            break;
                        }
                    }
                    if(valor===true){
                        
                        valor=false;
                        valor3=true;
                        continue;
                    }
                }
                else{
                    for(var j=0;j<totalPostulant[i].languages.length;j++){
                        console.log('entro else ')
                        //res.status(200).json(totalPostulant)//
                        for(var k=0;k<language.length;k++){
                           if(totalPostulant[i].languages[j]._previousDataValues.name===language[k]){
                            
                             arrPostulant.push(totalPostulant[i])
                             valor2=true;
                             break;
                        }
                      }
                      if(valor2===true){
                        valor2=false
                        valor3=true
                        break;
                      }
                    }
                }
                if(valor3===true){
                    valor3=false;
                    continue
                }
            }
    
            if(seniority){
                if(typeof seniority==="string"){
                    for(var j=0;j<totalPostulant[i].seniorities.length;j++){
                        //res.status(200).json(totalPostulant)//
                        if(totalPostulant[i].seniorities[j]._previousDataValues.name===seniority){
                            
                            arrPostulant.push(totalPostulant[i])
                            valor=true
                            break;
                        }
                    }
                    if(valor===true){
                        
                        valor=false;
                        valor3=true;
                        continue;
                    }
                }
                else{
                    for(var j=0;j<totalPostulant[i].seniorities.length;j++){
                        
                        //res.status(200).json(totalPostulant)//
                        for(var k=0;k<seniority.length;k++){
                           if(totalPostulant[i].seniorities[j]._previousDataValues.name===seniority[k]){
                             
                             arrPostulant.push(totalPostulant[i])
                             valor2=true;
                             break;
                        }
                      }
                      if(valor2===true){
                        valor2=false
                        valor3=true
                        break;
                      }
                    }
                }
                if(valor3===true){
                    valor3=false;
                    continue
                }
            }
            if(skill){
                if(typeof skill==="string"){
                    for(var j=0;j<totalPostulant[i].skills.length;j++){
                        //res.status(200).json(totalPostulant)//
                        if(totalPostulant[i].skills[j]._previousDataValues.name===skill){
                            
                            arrPostulant.push(totalPostulant[i])
                            valor=true
                            break;
                        }
                    }
                    if(valor===true){

                        valor=false;
                        valor3=true;
                        continue;
                    }
                }
                else{
                    for(var j=0;j<totalPostulant[i].skills.length;j++){
                        
                        //res.status(200).json(totalPostulant)//
                        for(var k=0;k<skill.length;k++){
                           if(totalPostulant[i].skills[j]._previousDataValues.name===skill[k]){
                             
                             arrPostulant.push(totalPostulant[i])
                             valor2=true;
                             break;
                        }
                      }
                      if(valor2===true){
                        valor2=false
                        valor3=true
                        break;
                      }
                    }
                }
                if(valor3===true){
                    valor3=false;
                    continue
                }
            }
            if(technology){
                if(typeof technology==="string"){
                    for(var j=0;j<totalPostulant[i].technologies.length;j++){
                        //res.status(200).json(totalPostulant)//
                        if(totalPostulant[i].technologies[j]._previousDataValues.name===technology){
                            
                            arrPostulant.push(totalPostulant[i])
                            valor=true
                            break;
                        }
                    }
                    if(valor===true){
                        
                        valor=false;
                        valor3=true;
                        continue;
                    }
                }
                else{
                    for(var j=0;j<totalPostulant[i].technologies.length;j++){
                        
                        //res.status(200).json(totalPostulant)//
                        for(var k=0;k<technology.length;k++){
                           if(totalPostulant[i].technologies[j]._previousDataValues.name===technology[k]){
                             
                             arrPostulant.push(totalPostulant[i])
                             valor2=true;
                             break;
                        }
                      }
                      if(valor2===true){
                        valor2=false
                        valor3=true
                        break;
                      }
                    }
                }
                if(valor3===true){
                    valor3=false;
                    continue
                }
            }
        }
       

    res.status(200).json(arrPostulant)
        
            /*var x= await totalPostulant[0].languages[0]._previousDataValues.name
            console.log(totalVacancies[0].languages[0])
            console.log(x)*/
       
    }catch(e){
        console.log(e)
    }
})


module.exports = router;
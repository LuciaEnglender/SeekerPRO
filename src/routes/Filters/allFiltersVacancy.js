const { Router } = require("express");
const { Vacancy, Language, Skill, Technology, Seniority } = require('../../db');

const router = Router();

router.post('/' , async (req, res) => {
   try{
        const {
            language,
            seniority,
            skill,
            technology
        } = req.body

        const filtersInBody = {}
        const arrInclude = []
       
       /* if(language){
            filtersInBody.language = language
            arrInclude.push({
                model: Language,
                attributes: ["name"],
                where:{
                    name : language
                },
                through:{
                attributes:[]
                }
            })
        }
        if(seniority){
            filtersInBody.seniority = seniority
            arrInclude.push({
                model: Seniority,
                attributes: ["name"],
                where:{
                    name : seniority
                },
                through:{
                attributes:[]
                }
            })
        }
        if(skill){
            filtersInBody.skill= skill
            arrInclude.push({
                model: Skill,
                attributes: ["name"],
                where:{
                    name : skill
                },
                through:{
                attributes:[]
                }
            })
        }
        if(technology){
            filtersInBody.technology = technology
            arrInclude.push({
                model: Technology,
                attributes: ["name"],
                where:{
                    name : filtersInBody.technology
                },
                through:{
                attributes:[]
                }
            })
        }*/
        const totalVacancies = await Vacancy.findAll({
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
        var arrVacancy=[]
        let valor=false;
        let valor2=false;
        let valor3=false;
        console.log(totalVacancies[0].languages[0]._previousDataValues)
        for(var i=0;i<totalVacancies.length;i++){
            if(language){                            
                if(typeof language==="string"){
                    for(var j=0;j<totalVacancies[i].languages.length;j++){
                        //res.status(200).json(totalVacancies)//
                        if(totalVacancies[i].languages[j]._previousDataValues.name===language){
                            
                            arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].languages.length;j++){
                        
                        //res.status(200).json(totalVacancies)//
                        for(var k=0;k<language.length;k++){
                           if(totalVacancies[i].languages[j]._previousDataValues.name===language[k]){
                            
                             arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].seniorities.length;j++){
                        //res.status(200).json(totalVacancies)//
                        if(totalVacancies[i].seniorities[j]._previousDataValues.name===seniority){
                            
                            arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].seniorities.length;j++){
                        
                        //res.status(200).json(totalVacancies)//
                        for(var k=0;k<seniority.length;k++){
                           if(totalVacancies[i].seniorities[j]._previousDataValues.name===seniority[k]){
                             
                             arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].skills.length;j++){
                        //res.status(200).json(totalVacancies)//
                        if(totalVacancies[i].skills[j]._previousDataValues.name===skill){
                            
                            arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].skills.length;j++){
                        
                        //res.status(200).json(totalVacancies)//
                        for(var k=0;k<skill.length;k++){
                           if(totalVacancies[i].skills[j]._previousDataValues.name===skill[k]){
                             
                             arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].technologies.length;j++){
                        //res.status(200).json(totalVacancies)//
                        if(totalVacancies[i].technologies[j]._previousDataValues.name===technology){
                            
                            arrVacancy.push(totalVacancies[i])
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
                    for(var j=0;j<totalVacancies[i].technologies.length;j++){
                        
                        //res.status(200).json(totalVacancies)//
                        for(var k=0;k<technology.length;k++){
                           if(totalVacancies[i].technologies[j]._previousDataValues.name===technology[k]){
                             
                             arrVacancy.push(totalVacancies[i])
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
        
            /*var x= await totalVacancies[0].languages[0]._previousDataValues.name
            console.log(totalVacancies[0].languages[0])
            console.log(x)*/
        
        res.status(200).json(arrVacancy)
    }catch(e){
        console.log(e)
    }
})


module.exports = router;
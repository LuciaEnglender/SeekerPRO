const { Router } = require("express");

const {
    New,
    Review,
    Contact,
    InterviewTech,
    InterviewRRHH,
    Offered, Hired, Rejected,
  Business,
  Vacancy,
  Postulant,
  Language,
  Technology,
  Skill,
  Login,
  Seniority,
} = require("../db");
const { Op } = require("sequelize");


const pipeline = Router();

pipeline.post('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const finderVacancy = await Vacancy.findByPk(id)

        console.log(finderVacancy)

        const newStatus = await New.create({
            name: finderVacancy.name
        })

        const reviewStatus = await  Review.create({
            name: finderVacancy.name
        })
        
        const contactStatus = await  Contact.create({
            name: finderVacancy.name
        })
         
        const interviewRRHHStatus = await  InterviewRRHH.create({
            name: finderVacancy.name
        })

        const interviewTechStatus = await  InterviewTech.create({
            name: finderVacancy.name
        })
        const offeredStatus = await  Offered.create({
            name: finderVacancy.name
        })
        const hiredStatus = await  Hired.create({
            name: finderVacancy.name
        })
        const rejectedStatus = await  Rejected.create({
            name: finderVacancy.name
        })

        await finderVacancy.setNew(newStatus)
         await finderVacancy.setReview(reviewStatus)
         await finderVacancy.setContact(contactStatus)
         await finderVacancy.setInterviewRRHH(interviewRRHHStatus)
         await finderVacancy.setInterviewTech(interviewTechStatus)
         await finderVacancy.setOffered(offeredStatus)
         await finderVacancy.setHired(hiredStatus)
        await finderVacancy.setRejected(rejectedStatus)

        res.json(finderVacancy)
        
    } catch (e) {
        console.log(e)
    }
})

pipeline.put('/:idVacancy/addNew', async (req, res) => {
    const {idPostulant} = req.body
    const {idVacancy} = req.params
    try{
        // const finderVacancy = await Vacancy.findByPk(idVacancy);
        const finderNew = await New.findAll({
            where : {
                fk_vacancy : idVacancy
            }
        })
        const finderPostulant = await Postulant.findByPk(idPostulant);

        await finderPostulant.setNew(finderNew)
        res.send('hecho')
    }catch (e){
        console.log(e)
    }
});

pipeline.put('/:idVacancy/addReview', async (req, res) => {
    const {idPostulant} = req.body
    const {idVacancy} = req.params
    try{
        // const finderVacancy = await Vacancy.findByPk(idVacancy);
        const finderReview = await Review.findAll({
            where : {
                fk_vacancy : idVacancy
            }
        })
        // const finderPostulant = await Postulant.findByPk(idPostulante);
        
        await finderReview.setPostulant(idPostulant)
        res.send('hecho')
    }catch (e){
        console.log(e)
    }
});

pipeline.put('/:idVacancy/addContact', async (req, res) => {
    const {idPostulant} = req.body
    const {idVacancy} = req.params
    try{
        // const finderVacancy = await Vacancy.findByPk(idVacancy);
        const finderContact = await Contact.findAll({
            where : {
                fk_vacancy : idVacancy
            }
        })
        // const finderPostulant = await Postulant.findByPk(idPostulante);
        
        await finderContact.setPostulant(idPostulant)
        res.send('hecho')
    }catch (e){
        console.log(e)
    }
});

pipeline.put('/:idVacancy/addInterviewRRHH', async (req, res) => {
    const {idPostulant} = req.body
    const {idVacancy} = req.params
    try{
        // const finderVacancy = await Vacancy.findByPk(idVacancy);
        const finderInterviewRRHH = await InterviewRRHH.findAll({
            where : {
                fk_vacancy : idVacancy
            }
        })
        // const finderPostulant = await Postulant.findByPk(idPostulante);
        
        await finderInterviewRRHH.setPostulant(idPostulant)
        res.send('hecho')
    }catch (e){
        console.log(e)
    }
});



pipeline.put("/:idVacancy/addInterviewTech", async(req, res) => {
const {idPostulant} = req.body
const {idVacancy} = req.params

try{
    const finderInterviewTech = await InterviewTech.findAll({
        where : {
            fk_vacancy : idVacancy
        }
    })
await finderInterviewTech.setPostulant(idPostulant)
        res.send('hecho')
}catch(e){
    console.log(e)
}
})
//***********OFFERED************* */

pipeline.put("/:idVacancy/addOffered", async(req, res) => {
const {idPostulant} = req.body
const {idVacancy} = req.params

try{
    const finderOffered = await Offered.findAll({
                where : {
                    fk_vacancy : idVacancy
                }
            })
        await finderOffered.setPostulant(idPostulant)
                res.send('hecho')
}catch(e){
    console.log(e)
}
})

//***********HIRED************* */
pipeline.put("/:idVacancy/addHired", async(req, res) => {
const {idPostulant} = req.body
const {idVacancy} = req.params

try{
    const finderHired = await Hired.findAll({
                where : {
                    fk_vacancy : idVacancy
                }
            })
        await finderHired.setPostulant(idPostulant)
                res.send('hecho')
}catch(e){
    console.log(e)
}
});

//***********REJECTED************* */
pipeline.put("/:idVacancy/addRejected", async(req, res) => {
const {idPostulant} = req.body
const {idVacancy} = req.params

try{
    const finderRejected = await Rejected.findAll({
        where : {
            fk_vacancy : idVacancy
        }
    })
await finderRejected.setPostulant(idPostulant)
        res.send('hecho')
}catch(e){
    console.log(e)
}
})

module.exports = pipeline;

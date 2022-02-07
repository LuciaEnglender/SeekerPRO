// **************SEARCHBAR*********************
// buscar todos los postulantes que tiene la empres //recibo 
// 2do  nombre de un postulante que este en mi vacante  //recibo nombre de la vacante  y el nombre del postulante 
// traer todas las empresas y ver como se relacinana probar en el postman
// router.Business.get('/')

// traer todos los postulantes 
//unirlo y dil(
    // routerBusiness.get('/vacName', async (req, res) => {

    //     const {vacName} = req.query
    //     const allBusiness = await Business.fidAll();
    //     const allVacancy = await Vacancy.findAll();
    //     console.log(allVacancy)
    
    //     try{

    //         const nameVacancy = await Vacancy.findOne({
    //             where : { name : vacName}
    //         })
    //         res.status(200).json(nameVacancy)
    //     }catch(e){
    //         console.log(e)
    //     }
    
    // });



    
    // // hacerlo al reves los postulantes de cada vacante
// routerVacancy.get('/:id/postulant', async (req, res) => {
//     Vacancy.findByPk(req.paramas.id).then(vacancy => {
//         vacancy.getPostulants({
//             attribute: ['name']
//         }).then(postulant => {
//             res.json(postulant)
//         });
//     })
// })
    
    // quiero agregar un postulante a una vacante elpostulante de id 1 agregarselo a la vacante 1 qie ya incluye la empresa PDVSA
    //    *********** Lo nuevo ruta postulant/vacancyID*******




// **************CRUD POSTULANT*****************
    
    // Hasta aqui*************************

        // const {name} = req.params
  //  Business.findAll({
  //   //    where : {name : name},
  //       include: {
  //           model: Vacancy,
  //           // required: true,
  //           // attributes:["name"],
  //           // // where : {name : name},
  //       },
  //       attributes: ["name", "description" , "location", "cuit"] 
  //   }).then(businesses =>{
  //       console.log(businesses)
  //       res.json(businesses)});

    // const languageSearch = await Language.findAll({
    //     where: {
    //         name: {[Op.like] : `%${name}%`},
    //     },
    //     include: {
    //         model: Vacancy,
              
    //         attributes : ["name"],
    //     }
    // });
    // console.log(languageSearch)
    // for (let i = 0; i < languageSearch.length; i++) {
    //     if (languageSearch[i].vacancies.length !== 0){
    //             acum.push(languageSearch[i].vacancies)
    //     }
    // }

//4/2GET TRAYENDO LOS ENLACES CON SKILSS TECHNOLOGIES LANGAGES
    // routerBusiness.get('/:name', async (req, res) => {
    //     const { name } = req.params
    //     const acum = []
      
    //     Vacancy.findAll({
    //       where: { name: name },
    //       include: {
    //         model: Postulant,
    //         include: [
    //           {
    //             model: Language,
    //             attributes: ["name"],
    //             through: {
    //               attributes: [],
    //             },
    //           },
    //           {
    //             model: Seniority,
    //             attributes: ["name"],
    //             through: {
    //               attributes: [],
    //             },
    //           },
    //           {
    //             model: Skill,
    //             attributes: ["name"],
    //             through: {
    //               attributes: [],
    //             },
    //           },
    //           {
    //             model: Technology,
    //           },
    //         ]
    //       },
         
    //     attributes: {exclude: ['id',"description","createdAt","updatedAt","fk_business","businessId"]},
        
        
    //     }).then(vacancies => {
      
    //       // for (let i = 0; i < vacancies.length; i++) {
    //       //   if (vacancies[i].vacancies.length !== 0){
    //       //     acum.push(vacancies[i].vacancies)
    //       //   }
    //       // }
    //       console.log(vacancies)
    //       res.json(vacancies)
    //     });

    //  5/2 Ruta get Recibe nombre de vcante y trae todo sus postulantes
// routerBusiness.get('/:name', async (req, res) => {
//     const { name } = req.params
  
//     Vacancy.findAll({
//       where: { name: name },
//       include: {
//         model: Postulant,
//       },
//       attribute: ["name" ]
  
//     }).then(vacancies => {
//       console.log(vacancies)
//       res.json(vacancies)
//     });
  
//   });

// 5/2 intento de ruteo co promesas 
// routerBusiness.get('/:name', async (req, res) => {
//     const { name } = req.params
//     const acum = []
//   //trae empresas
//     Business.findAll({
//       where:{
//         [Op.or] : {
//           name : {[Op.iLike] : `%${name}%`},
//           description : {[Op.iLike] : `%${name}%`},
//           location : {[Op.iLike] : `%${name}%`}
//         }
//       }
  
//     }).then(business =>  {
//         acum.push(business)
//       // res.json(acum)
//     }).then(vacancies => {
//       // Trae Vacante
//     Vacancy.findAll({
//       where: { name: name },
//       include: {
//         model: Postulant,
//         include: [
//           {
//             model: Language,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
//           {
//             model: Seniority,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
//           {
//             model: Skill,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
//           {
//             model: Technology,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
  
//         ],
//       attributes: { exclude: ["createdAt", "updatedAt","fk_login",
//       "loginId"] },
  
//       },
//       attributes: { exclude: ['id', "description", "createdAt", "updatedAt", "fk_business", "businessId"] },
  
//     });
//     acum.push(vacancies)
//     console.log(acum)
//     res.json(acum)
  
//     //aqui quiciera que si la palabra back aparece en Empresa y en vacante apareciere ordenado por vacante 
//     });
  
//   });
//   // for (let i = 0; i < vacancies.length; i++) {
//       //         if (vacancies[i].vacancies.length !== 0){
//       //           acum.push(vacancies[i].vacancies)
//       //         }
//       //       }
  

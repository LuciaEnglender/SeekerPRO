
// ********************************INICIO*********************************************
// [DEVUELVE EST OBJ
//     {
//       "id": "New"
//     },
//     {
//       "id": 1,
//       "name": "Desarrollador Full Stack"
//     },
//     {
//       "id": 2,
//       "name": "Desarrollador Back eND"
//     },
//     {
//       "id": 3,
//       "name": "BACK END Reack"
//     },
//     {
//       "id": 4,
//       "name": "React Redux"
//     }
//   ],

//la respuesta de arriva coincide con agregar un obj con el estado
//CODIGO Aqui

// //Busco en C/ estado sus vacantes donde el id del estado es igul a id de la vacante y trae tambien el nombre
// var news = vacancies.map(el =>{
//     if(el.news){
//       let estado = el.news
//       estado.unshift({  status: 'New'})
//       return estado
//     }
//     if(el.reviews){
      
//       let estado = el.reviews
//       estado.unshift({  status: 'Review'})
//       return estado
//     }
//     if(el.contacts){
//       let estado = el.contacts
//       estado.unshift({  status: 'Contact'})  
//          return estado
//     }
//   } )

//   var final = news.filter(el => el.length >= 2)
//   console.log(final)
  
//      res.json(news);
// ********************************FIN*********************************************

// ******************************************OBJETO VACANCIES************
// 20220219092818
// http://localhost:3001/postulant/2/vacancy

// [
//     {
//       "id": 2,
//       "name": "Alida",
//       "gender": "Femenine",
//       "phone": "920686378",
//       "photo": "file\\1645200108995-14726-pokemon (1).jpg",
//       "CV": "file\\1645200109063-resolución Ingreso 2022- S-59.pdf",
//       "github": "alyperu",
//       "linkedIn": "alyperu",
//       "portfolio": "alyperu",
//       "extras": "dfsdfsdfgsd",
//       "createdAt": "2022-02-18T16:01:49.104Z",
//       "updatedAt": "2022-02-18T16:01:49.365Z",
//       "fk_login": null,
//       "loginEmail": "danidani@gmail.com",
//       "news": [
//         {
//           "status": "New"
//         },
//         {
//           "id": 1,
//           "name": "Desarrollador Full Stack"
//         },
//         {
//           "id": 2,
//           "name": "Desarrollador Back eND"
//         },
//         {
//           "id": 3,
//           "name": "BACK END Reack"
//         },
//         {
//           "id": 4,
//           "name": "React Redux"
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "name": "Alida",
//       "gender": "Femenine",
//       "phone": "920686378",
//       "photo": "file\\1645200108995-14726-pokemon (1).jpg",
//       "CV": "file\\1645200109063-resolución Ingreso 2022- S-59.pdf",
//       "github": "alyperu",
//       "linkedIn": "alyperu",
//       "portfolio": "alyperu",
//       "extras": "dfsdfsdfgsd",
//       "createdAt": "2022-02-18T16:01:49.104Z",
//       "updatedAt": "2022-02-18T16:01:49.365Z",
//       "fk_login": null,
//       "loginEmail": "danidani@gmail.com",
//       "reviews": [
//         {
//           "status": "Review"
//         },
//         {
//           "id": 1,
//           "name": "Desarrollador Full Stack"
//         }
//       ]
//     }, 
// ]

// *******************************FIN DE OBJ VACANCIES************************

// ******************Todo Postulante con todas sus vacantes por estado***********************

// routerPostulant.get("/:id/vacancy", async (req, res) => {

//     //Aqui busco postulantes con sus estados
//     var vacanciesP = []
//     var postulantP = []
//     for (var i = 0; i < arr.length; i++) {
//       postulantP = await Postulant.findByPk(req.params.id, {
//         include: [
//           {
//             model: arr[i],
//             attributes: ["id", "name"],
//             through: {
//               attributes: [],
//             },
//           }
//         ]
//       })
//       //le incluyo a vacancies cada estado con su postulante
//       vacanciesP.push(postulantP.dataValues)
//     }//Fin del for
  
//     //mapea las vacantes de ese postulnte y le agrega el estado
//     var news = vacanciesP.map(el => {
//       if (el.news) {
//         let estado = el.news
//         return estado
//       }
//       if (el.reviews) {
//         let estado = el.reviews
//         return estado
//       }
//       if (el.contacts) {
//         let estado = el.contacts
//         return estado
//       }
//       if (el.interviewTechs) {
//         let estado = el.interviewTechs
//         return estado
//       }
//       if (el.interviewRRHHs) {
//         let estado = el.interviewRRHHs
//         return estado
//       }
//       if (el.offereds) {
//         let estado = el.offereds
//         return estado
//       }
//       if (el.hireds) {
//         let estado = el.hireds
//         return estado
//       }
//       if (el.rejecteds) {
//         let estado = el.rejecteds
//         return estado
//       }
//       //Ojo Hasta aqui news trae todos sin el estado incluido
//     })
//     //aqui le incluto los estados en cada vacante
//     var todos = []
//     for (var i = 0; i < news.length; i++) {
//       if (i === 0) {
//         const e = { status: "New" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
//       if (i === 1) {
//         const e = { status: "Reviews" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
//       if (i === 2 && news[i].length !== 0) {
//         const e = { status: "InterviewTech" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
  
//       // no hace el cuatro porque esta repetido eso no pasara ya que cada vacante solo puese tener un estado
//       //  if(i === 3 && news[i].length !== 0 ){
//       //   const e = { status: "InterviewTech" };
//       //    for(var j=0; j< news[i].length; j++){
//       //       todos.push(Object.assign(news[i][j], e))
//       //    }   
//       //  }
//     if (i === 4 && news[i].length !== 0) {
//         const e = { status: "InterviewRRHH" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
  
//       if (i === 5 && news[i].length !== 0) {
//         const e = { status: "Offered" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
//       if (i === 6 && news[i].length !== 0) {
//         const e = { status: "Hired" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
//       if (i === 7 && news[i].length !== 0) {
//         const e = { status: "Rejected" };
//         for (var j = 0; j < news[i].length; j++) {
//           todos.push(Object.assign(news[i][j], e))
//         }
//       }
//     }
//     // COdigo de Vacantes por postulantes con un for y sus modelos de estado trae todos 
  
//     var postulant = []
//     for (let i = 0; i < arr.length; i++) {
//       postulant = await Postulant.findByPk(req.params.id, {
//         include: [
//           {
//             model: Vacancy,
//             include: [
//               {
//                 model: Technology,
//                 attributes: ["name"],
//                 through: {
//                   attributes: [],
//                 },
//               },
//               {
//                 model: Language,
//                 attributes: ["name"],
//                 through: {
//                   attributes: [],
//                 },
//               },
//               {
//                 model: Seniority,
//                 attributes: ["name"],
//                 through: {
//                   attributes: [],
//                 },
//               },
//               {
//                 model: Business,
//                 attributes: ["name"],
//                 through: {
//                   attributes: [],
//                 },
//               },
  
//             ],
//             attributes: ["id", "name"],
//             through: {
//               attributes: [],
//             },
//           }
//         ]
//       })
//     }
//     var agregado = []
//     agregado.push(postulant)
  
//     var Nuevo = []
//     var filtroUno = agregado.map(el => el.vacancies)
  
//     for (var x = 0; x < todos.length; x++) {
//       for (var y = 0; y < filtroUno[0].length; y++) {
//         var obj = { status: todos[x].status }
  
//         if (todos[x].id === filtroUno[0][y].id) {
//           Nuevo.push(Object.assign(filtroUno[0][y], obj))
//         }
//       }
//     }
//     var Nuevo2 = []
//     var otro = Nuevo.map(el => el.dataValues)
//     var otro2 = Nuevo.map(el => el.status)
//     for (var x = 0; x < otro.length; x++) {
  
//       var obj = { status: otro2[x] }
//       Nuevo2.push(Object.assign(otro[x], obj))
  
//     }
  
//     res.json(postulant)

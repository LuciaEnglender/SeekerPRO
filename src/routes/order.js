
const { Order, Order_detail, Product } = require("../db");
const {Business} = require("../db");
const {Router} = require("express");



const server = Router()

// server.post("/", async (req, res, next) => {
//   const { userId } = req.body;
//   console.log(req.body)
//   try{
//       const orden = await Order.create({
//         status : 'created'
//       })

//       const empresa = await Business.findOne({
//         where:{
//           loginEmail: userId
//         }
//       })

//       await orden.setBusiness(empresa)

//       res.status(200).send(orden)
  
//     }catch(e){
//       console.log(e)
//     }
// });

server.get("/detalle/:id", (req, res, next) => {
  const id = req.params.id;

  Order.findOne({
    where: {
      id: id,
    },
  })
    .then((obj) => {
      res.send(obj);
    })
    .catch(next);
});

module.exports = server;

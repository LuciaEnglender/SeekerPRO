const { Order, Business} = require('../db.js');
const server = require('express').Router();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const moment =require("moment");

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: "TEST-8267019366989212-021713-76aeb122582efd463b75a1bf20744460-138152494"
});


//Ruta que genera la URL de MercadoPago
server.post("/", async (req, res, next) => {
  const {email} = req.body

  const empresa = await Business.findAll({
    where:{
      loginEmail: email
    }
  })
 console.log(empresa)
  const id_orden= await Order.findOne({
    where : {
      fk_busines : empresa[0].dataValues.id
    }
  })
  

  //Cargamos el carrido de la bd
  const carrito = [
    {title: "PlanPro", quantity: 1, price: 100},
  ]
  
  const items_ml = carrito.map(i => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
  }))

  const fecha = moment()

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference : `${id_orden.id}`,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 10,
      currency_id: "ARS",
      start_date: fecha,
      end_date: "2022-07-20T15:59:52.581Z"
    },
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
    },
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    console.info('respondio')
  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    console.log(response.body)
    res.json({ id: global.id });
  })
  .catch(function(error){
    console.log(error);
  })
}) 


//Ruta que recibe la información del pago
server.get("/pagos", async (req, res)=>{
  // console.info("EN LA RUTA PAGOS ", req)

  try{
    const payment_id= req.query.payment_id
    const payment_status= req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id= req.query.merchant_order_id
  // console.log("EXTERNAL REFERENCE ", external_reference)
  
  //Aquí edito el status de mi orden
    const orden= await Order.findByPk(external_reference, {
          include : [
            {model:Business}
          ]
        })

    orden.payment_id= payment_id
    orden.payment_status= payment_status
    orden.merchant_order_id = merchant_order_id
    orden.status = "completed"

   orden.save()

     const empresa= await Business.update({
       pro: true
     },{
        where : {
          id : orden.fk_busines
        }
      })

   console.log(empresa)
      res.redirect('http://localhost:3000/homee')
    }catch (e) {
      console.log(e)
    }
})


//Busco información de una orden de pago
server.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = server;
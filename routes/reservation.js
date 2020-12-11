const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// importar lo importante
const Property = require ('../models/Reservation');
const { veriToken } = require ("../utils/auth");

/* GET property page. 
CRUD = Create, Read, Update & Delete.
Lista de propiedades
crear/editar  la propiedad
borar la propiedad
*/

//Rutas para leer
//todas las reservaciones
router.get('/', veriToken, (req, res, next)=> {
 const {_id} = req.user;
  Reservation.find({ _guest: _id })
  .populate({ // <---- agegar todo este para hacer un populate aninado
    path:"property",
    populate:{
        path:"_owner",
        select: "name",
    },
})
    .then((reservations)=>{
        res.status(200).json({result:reservations})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salió mal", error})
    })
});

//Traer todas las reservaciones por propiedad
router.get('/property/:property_id', veriToken, (req, res, next)=> {
    const {property_id} = req.params;
     Reservation.find({_property: property_id})
     .populate("_guest","name") //<----- Populate
     .then((reservations)=>{
         res.status(200).json({result:reservations})
     })
       .then((reservations)=>{
           res.status(200).json({result:reservations})
       })
       .catch((error)=>{
           res.status(400).json({msg:"Algo salió mal", error})
       })
   });

   //Crear una reservación
   router.post('/',veriToken,(req,res,next)=>{

       const{_id: _guest} = req.user;
       const reservation = {...req.body,_guest};

       Reservation.create(reservation)
       .then((reservation)=>{
         res.status(200).json({result:reservation})
       })
       .catch ((error)=>{
           res.status(400)({msg:"Algo salio mal", error})
       })
   });


 //Editar (Update)
        //post  quiere todas las llaves
        //patch solo quiere una para poder trabajar
router.patch('/:id',veriToken, (req,res,next)=>{
    const {id} = req.params;
   
    Reservation.findByIdAndUpdate(id, req.body,{new:true})
       .then((reservation)=>{
           res.status(200).json({result:reservation})
       })
       .catch((error)=> {
           res.status(400).json({msg:"Algo salio mal", error})
       })
   });


//Eliminar
router.delete('/:id',veriToken, (req,res,next)=>{
    const {id} = req.params;
   
    Reservation.findByIdAndDelete(id)
       .then((reservation)=>{
           res.status(200).json({msg:"Se borro la reservación"})
       })
       .catch((error)=> {
           res.status(400).json({msg:"Algo salio mal", error})
       })
   });



module.exports = router;
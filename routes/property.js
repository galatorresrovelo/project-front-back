const express = require('express');
const router = express.Router();
// importar lo importante
const Property = require ('../models/Property');
const { veriToken } = require ("../utils/auth");
/* GET property page. 
CRUD = Create*, Read*, Update* & Delete.
Lista de propiedades
crear/editar  la propiedad
borar la propiedad
*/


//app.user("/api/property")
//localhost:3000/api/property
//create

router.post('/', veriToken, (req, res, next)=> { 
    //voy a sacar el de la persona loggeada
    //crear una propiedad
    const { _id: _owner } = req.user
    
    //({title,address,description...})
    Property.create({...req.body, _owner})
    .then((property)=>{
        res.status(201).json({result:property})
    }).catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error})
    });
} );

//Rutas para leer
//filtro dinamico
router.get('/', veriToken, (req, res, next)=> {
    //req.query = {key = "value"}
    Property.findById(id)
        .populate("_owner","email name profile_picture") //<----- Populate
        .then((property)=>{
            res.status(200).json({result:property})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error  })
        })
});

//traer uno solo
// por id
router.get('/:id', veriToken, (req, res, next)=> {
    //:id = "23456789012345678"
    //req.params ={id:"23456789tryui34567"}
    const {id} = req.params;

    Property.findById(id)
        .populate("_owner")
        .then((property)=>{
            res.status(200).json({result:property})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
});


//Editar (Update)
//post  quiere todas las llaves
//patch solo quiere una para poder trabajar
router.patch('/:id',veriToken, (req,res,next)=>{
 const {id} = req.params;

 Property.findByIdAndUpdate(id, req.body,{new:true})
    .then((property)=>{
        res.status(200).json({result:property})
    })
    .catch((error)=> {
        res.status(400).json({msg:"Algo salio mal", error})
    })
});

//Eliminar
router.delete('/:id',veriToken, (req,res,next)=>{
    const {id} = req.params;
    Property.findByIdAndRemove(id)
       .then((property)=>{
           res.status(200).json({msg:"Adiosssss"})
       })
       .catch((error)=> {
           res.status(400).json({msg:"Algo salio mal", error})
       })
   });



module.exports = router;

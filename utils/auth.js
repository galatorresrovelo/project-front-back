//esto nos va servir para verificar si existe un usuario y un token

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.veriToken =(req,res,next)=> {
    const {token} = req.cookies;
    // usamos verify para ver si existe un token
    jwt.verify(token, process.env.SECRET, (error,decoded)=>{

        if(error) return res.status(401).json({error});

        // decoded = {id} osea un objeto con la llave id (segun lo que ustedes guardaron)
        //va a buscar con el objeto decoded en a llave id
        User.findById(decoded.id)

        .then((user)=>{
        // guardamos el usuario en el req.user para poder usarlo en cualquier lugar
         req.user = user;
         // con el next le decimos ya puedes seguir 
         next()
        });
    });

};

//haremos un Middleware para checar roles y un utils para limpiar respuesta de datos basura
//["Admin", "Standard User"]
exports.checkRole = (roles) => {
    //(next, req) => Orden es importante porque las propiedades tiene su funcion por orden
    return (req, res, next) => {
        //{name:"Gala",role:"Standard User"}
       const {role} = req.user;
       if(roles.includes(role)){
            return next()
       } else {
           return res.status(403).json({msg:"No tienes permiso para realizar esa acción"})
       }
    }
}

//Limpiar el objeto

exports.clearRes = (data) => {
    //destructuramos el objeto data y retornamos un nuevo objeto unicamente con los datos requeridos.
    const {password, __v,createdAt, updatedAt,...cleanedData} = data;
    //{key:"value"}
    return cleanedData
}


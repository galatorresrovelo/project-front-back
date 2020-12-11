const express = require('express');
const router = express.Router();

//importar cosas importantes
const bcrypt = require ("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const {clearRes}= require ("../utils/auth");



//Post Signup
router.post('/signup', (req, res, next) => {
  //Codigooo
  const {email,password,confirmPassword,name} = req.body;

  if (password != confirmPassword) 
  return  res.status(403).json({msg:"Las contraseñas/passwords no coinciden"})

  bcrypt.hash(password,10)
  .then((hashedPassword)=>{

    const user = {email,password:hashedPassword,name};

    User.create(user).then(()=>{
      res.status(200).json({msg:"Usuario creado exitósamente"});
    }).catch((error)=>{
      res.status(400).json({msg:"ERROR: El usuario no fue creado", error});
    })

  })

});

//Post Login
router.post('/login', (req, res, next) => {
  //Codigooo
  const {email,password} = req.body;
   // email:email
  User.findOne({email})
      .then((user)=>{
       if(user === null)
       return res.status(404).json({msg:"No existe este correo, regístrate"});
       
       bcrypt.compare(password,user.password)
       .then((match)=>{
          if(match){
          //Eliminar Password para que el usuario no lo tenga a la mano
          //Opcion 1

          //  const withoutPass = user.toObject();
          //  delete withoutPass.password

          //con un utils
          const newUser = clearRes(user.toObject())
           //esto nos genera un token mezclando un valor (id) más la palabra secreta y tiene una duración de 1 día
           const token = jwt.sign({id: user._id},process.env.SECRET,{
             expiresIn:"1d"
            })
            res.cookie("token", token, {
              expires:new Date(Date.now + 864.00000),
              secure:false,
              httpOnly:true,
            }).json({user:newUser,code:200})
          }else{
            return res.status(401).json({msg:"Tu contraseña es incorrecta"})}
       })
      }) .catch((error)=>{
        res.status(400).json({msg:"ERROR", error});
      })
});

router.post("/logout",(req,res)=>{
  res.clearCookie("token").json({msg:"Ya te extrañamos"})
})


module.exports = router;

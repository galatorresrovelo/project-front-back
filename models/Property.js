// const mongoose = require("mongoose");
// //Schema = Schema
// const {Schema}   = mongoose;

const {Schema, model} = require ("mongoose");

const propertySchema = new Schema( 
    {
        _owner:{
            // esto es para decirle que insertara un id de un elemento de la base de datos
            type:Schema.Types.ObjectId,
            ref:"User",
            required:[true,"La propiedad debe tener un dueño"]
        },
        //siguen los atributos normales
        title:{
            type:String,
            required:[true,"Debes agregar un título a tu propiedad."],
        },
        address:{
            type:String,
            required:[true,"Debes agregar un dirección para tu propiedad."],  
        },
        decription:{
            type:String,
            minlength:[50,"La descripción es muy pequeña."],  
        },
        images:{
            type:[String], //["http://miImagen.com/oiidasjd.png","http://miImagen.com/oiidasjd.png"]
            minlength:[1,"Debes agregar por lo menos una imagen"],
        },
        price:{
            type:Number,
            min:[1,"El precio de la propiedad por noche es muy bajo"],
            // required:[true,"Debes de agregar un precio forzosamente"]
        },
        capacity:{
            type:Number,
            required: [true,"Debe tener la capacidad de la propiedad"],
        }

    },
    {timestamps:true}
);
// esto es muy importante
//export usando la opcion 1 ve la linea 2 de este archivo
module.exports = model("Property", propertySchema)
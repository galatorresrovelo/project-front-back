const {Schema, model} = require("mongoose");

const reservationSchema = new Schema (
    {
        _property:{
            type:Schema.Types.ObjectId,
            ref: "Property",
            required:true,
        },
        _guest:{
            type:Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        checkin:{
        type:Date,
        required:[true,"Debes indicar tu fecha de entrada"]
        },
        checkout: {
            type:Date,
            required:[true,"Debes indicar tu fecha de salida"]
        },
        guest_number:{
            type:Number,
            min:[1,"El mínimo de personas por reservación es 1"],
        }
    },
    {timestamps:true}
);

module.exports = model("Reservation", reservationSchema);
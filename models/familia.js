const mongoose = require('mongoose');

const ubicacionSchema  = new mongoose.Schema({
    barrio:String,
    partido:String,
    provincia:String
})

const familiaSchema = new mongoose.Schema({
    apellido:{
        type:String,
        required:true
    },
    ubicacion:{
        type:ubicacionSchema,
        required:true
    },
    estado:{
        type:String,
        required:true
    }
    

})

module.exports = mongoose.model('Familia',familiaSchema)
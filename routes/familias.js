const express = require('express');
const router = express.Router();
const Familia = require('../models/familia.js')
const bp = require('body-parser');
var jsonParser = bp.json()
var urlencodedParser = bp.urlencoded({ extended: false })

//Get All
router.get('/',async(req, res)=> {
    try{
        const familias = await Familia.find();
        res.json(familias)

    } catch(err){
        res.status(500).json({message: err.message})
    }
});
//Get by Apellido
router.get('/Apellido/:apellido',jsonParser ,async(req, res)=> {
    try{
        //console.log(req.params.apellido)
        const familias = await Familia.find({apellido:req.params.apellido}).exec();
        res.json(familias)

    } catch(err){
        res.status(500).json({message: err.message})
    }
});
//Get by Barrio
router.get('/Barrio/:barrio',jsonParser ,async(req, res)=> {
    var barrioOrigen = req.params.barrio;
    try{
        //console.log(req.params.barrio)
        const familias = await Familia.find({'ubicacion.barrio':barrioOrigen}).exec();
        res.json(familias)

    } catch(err){
        res.status(500).json({message: err.message})
    }
});
//Get by Partido
router.get('/Partido/:partido',jsonParser ,async(req, res)=> {
    var partidoOrigen = req.params.partido;
    try{
        //console.log(req.params.partido)
        const familias = await Familia.find({'ubicacion.partido':partidoOrigen}).exec();
        res.json(familias)

    } catch(err){
        res.status(500).json({message: err.message})
    }
});
//Get by Provincia
router.get('/Provincia/:provincia',jsonParser ,async(req, res)=> {
    var provOrigen = req.params.provincia;
    try{
        //console.log(req.params.provincia)
        const familias = await Familia.find({'ubicacion.provincia':provOrigen}).exec();
        res.json(familias)

    } catch(err){
        res.status(500).json({message: err.message})
    }
});
router.get('/Estado/:estado',jsonParser ,async(req, res)=> {
    try{
        //console.log(req.params.provincia)
        const familias = await Familia.find({estado:req.params.estado}).exec();
        res.json(familias)

    } catch(err){
        res.status(500).json({message: err.message})
    }
});
// Creating one
router.post('/',jsonParser ,async (req, res) => {

    const familia = new Familia({
        apellido: req.body.apellido,
        ubicacion:req.body.ubicacion,
        estado: req.body.estado

  
    })
    try {
      const newFamilia = await familia.save()
      res.status(201).json(newFamilia)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  });

//Delete one
router.delete('/:id',getFamilia,jsonParser,async(req,res) => {
    try{
        await res.familia.remove();
        res.json({message: 'Family Deleted '})
    }catch(err) {
        res.status(500).json({message : err.message})
    }
})

async function getFamilia(req, res, next){
    let familia
    try{
        familia = await Familia.findById(req.params.id);
        if(familia == null){
            return res.status(404).json({message: 'Cannot find Familias'})
        }
    }
    catch(err){
        return res.status(500).json({message : err.message })
    }
    res.familia = familia
    next()
}

module.exports = router;
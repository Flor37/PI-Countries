const { Router } = require('express');
const services = require('./services_routes');
const { Country, Activity } = require('../db');
const axios = require('axios');
const e = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
    const name = req.query.name    
    const theCountries = await services.getDBInf()
    const allCountries = await theCountries.map(c => {
        return {
            flag: c.flag,
            name: c.name,
            contient: c.continent
        }
    })
    if(name){
        let countryName = await allCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('Country not found')
    } else {
    res.status(200).send(allCountries)
    }
})

router.get('/countries/:id', async(req, res) =>{
    const id = req.params.id
    const allCountries = await services.getDBInf()
    if(id){
        let countryId = await allCountries.find(c => c.id == id)
        countryId ?
        res.status(200).send(countryId) :
        res.status(404).send('Country not found')
    }
})

router.post('/activities', async (req, res) => {
    let {
        name, difficulty, duration, seasson, country
    } = req.body
    let activityCreated = await Activity.create({
        name, difficulty, duration, seasson
    })
    let countryDB = await Country.findAll({
        where:{
            name: country
        }
    })
    activityCreated.addCountry(countryDB)
    res.send('Activity created succesfully')
})

module.exports = router;

const { Router } = require('express');
const services = require('./services_routes');
const { Country, Activity } = require('../db');
const axios = require('axios') 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router(); 
 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {   
    const apiCountry = await services.getApiInf()
    const countries = apiCountry.map(e => e) 
    countries.forEach(c => { 
        Country.findOrCreate({   
            where: c     
        })                         
    }) 
    const allCountries = await Country.findAll()
    res.send(allCountries)
})

module.exports = router;
   
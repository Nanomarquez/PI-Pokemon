const { Router } = require("express");
const axios = require("axios");
const { Type } = require('../db');
const {
    URL_TYPE,
    capitalize
} = require('../utils');


const router = Router()

router.get('/', async (req, res, next) => { 
    try {
        const typeDB = await Type.findAll();
        if (typeDB.length !== 0) {
            res.status(200).send(typeDB);
        } else {
            const getAPI = await axios.get(`${URL_TYPE}`);
            const typeAPIList = [];
            for (let i = 0; i < getAPI.data.results.length; i++) {
                typeAPIList.push({
                    name: capitalize(getAPI.data.results[i].name)
                });
            }
            const typeDB = await Type.bulkCreate(typeAPIList);
            res.status(200).send(typeDB);
        }
    } catch (error) {
        next(error);        
    }
})

module.exports = router;